"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import * as THREE from "three";
import type { GlobeMethods } from "react-globe.gl";
import { LOCATIONS } from "@/lib/locations";

type GlobePoint = (typeof LOCATIONS)[number] & {
  pinScale: number;
  pinOpacity: number;
};

type GlobeArc = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
  dashOffset: number;
};

const reactGlobeModulePromise = import("react-globe.gl");
const ReactGlobe = dynamic(() => reactGlobeModulePromise, { ssr: false });

let countriesGeoJsonPromise: Promise<GeoJSON.FeatureCollection | null> | null = null;

function loadCountriesGeoJson() {
  if (!countriesGeoJsonPromise) {
    countriesGeoJsonPromise = fetch("/data/world.geojson")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load world geojson");
        }

        return response.json() as Promise<GeoJSON.FeatureCollection>;
      })
      .catch(() => null);
  }

  return countriesGeoJsonPromise;
}

interface GlobeProps {
  progress: number;
}

type GlobeViewState = "overview" | "focus";
type CameraPov = { lat: number; lng: number; altitude: number };

const OVERVIEW_POV = { lat: 18, lng: 0, altitude: 2.05 } as const;
const FOCUS_POV = { lat: 50, lng: 11.1, altitude: 0.22 } as const;
const ENTER_FOCUS_THRESHOLD = 0.16;
const LEAVE_FOCUS_THRESHOLD = 0.14;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

export function Globe({ progress }: GlobeProps) {
  const globeWrapRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const rafRef = useRef<number | null>(null);
  const isScrollControlledRef = useRef(false);
  const idleLngRef = useRef(0);
  const idleLastTsRef = useRef(0);
  const idleScrollTimeoutRef = useRef<number | null>(null);
  const viewStateRef = useRef<GlobeViewState>("overview");
  const pendingViewStateRef = useRef<GlobeViewState | null>(null);
  const transitionTweenRef = useRef<gsap.core.Tween | null>(null);
  const viewBlendRef = useRef({ value: 0 });
  const viewBlendCommittedRef = useRef(0);
  const cameraTweenRef = useRef({ value: 0 });
  const transitionFromPovRef = useRef<CameraPov>({ ...OVERVIEW_POV });
  const transitionToPovRef = useRef<CameraPov>({ ...FOCUS_POV });
  const transitionFromBlendRef = useRef(0);
  const transitionToBlendRef = useRef(1);
  const isVisibleRef = useRef(true);
  const isPointerActiveRef = useRef(false);
  const tooltipOverlayRef = useRef<HTMLDivElement | null>(null);

  const [isMounted, setIsMounted] = useState(false);
  const [isGlobeReady, setIsGlobeReady] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 520, height: 520 });
  const [viewBlend, setViewBlend] = useState(0);
  const [showLocations, setShowLocations] = useState(false);
  const [countriesGeoJson, setCountriesGeoJson] = useState<GeoJSON.FeatureCollection | null>(null);

  const desktopProgress = useMemo(() => {
    if (isTouchDevice) return progress;
    return Math.round(clamp01(progress) * 24) / 24;
  }, [isTouchDevice, progress]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    void reactGlobeModulePromise;
    void loadCountriesGeoJson();

    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const updateTouchCapability = () => setIsTouchDevice(mediaQuery.matches);

    updateTouchCapability();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateTouchCapability);
      return () => mediaQuery.removeEventListener("change", updateTouchCapability);
    }

    mediaQuery.addListener(updateTouchCapability);
    return () => mediaQuery.removeListener(updateTouchCapability);
  }, []);

  const smoothedProgress = useMemo(() => {
    // Reduce high-frequency prop jitter while preserving visual continuity.
    return Math.round(clamp01(desktopProgress) * 120) / 120;
  }, [desktopProgress]);

  const globeMaterial = useMemo(() => {
    const material = new THREE.MeshPhongMaterial();
    material.color = new THREE.Color("#c5d4db");
    material.emissive = new THREE.Color("#edf8ff");
    material.specular = new THREE.Color("#000000");
    material.shininess = 1;
    return material;
  }, []);

  const points = useMemo<GlobePoint[]>(() => {
    if (!showLocations) return [];

    return LOCATIONS.map((location) => ({
      ...location,
      pinScale: 1.2,
      pinOpacity: 1,
    }));
  }, [showLocations]);

  const introArcs = useMemo<GlobeArc[]>(() => {
    const revealFactor = clamp01((0.42 - viewBlend) / 0.42);
    if (revealFactor <= 0.02) return [];

    const alpha = 0.9 * revealFactor;
    const total = 5;
    const golden = 137.508;

    return Array.from({ length: total }, (_, index) => {
      const startLat = (((index * 29.7) % 140) - 70);
      const startLng = ((index * golden * 1.9) % 360) - 180;

      const endLat = Math.max(-70, Math.min(70, -startLat * 0.82 + ((index % 3) - 1) * 6));
      const rawOppositeLng = startLng + 170 + (index % 2 === 0 ? 12 : -12);
      const endLng = ((rawOppositeLng + 540) % 360) - 180;

      const isFirstColor = index % 2 === 0;
      const color = isFirstColor 
        ? `rgba(33,86,156,${alpha.toFixed(3)})` // #21569c
        : `rgba(247,3,235,${alpha.toFixed(3)})`; // #F703EB

      return {
        startLat,
        startLng,
        endLat,
        endLng,
        color,
        dashOffset: (index * 0.37) % 1,
      };
    });
  }, [viewBlend]);

  useEffect(() => {
    setIsMounted(true);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const maxByHeight = Math.max(280, Math.min(entry.contentRect.height * 0.92, 760));
      const maxSide = Math.min(entry.contentRect.width, maxByHeight);
      const width = Math.max(280, maxSide);
      const height = Math.max(280, maxSide);

      setDimensions((current) => {
        if (Math.abs(current.width - width) < 2 && Math.abs(current.height - height) < 2) {
          return current;
        }

        return { width, height };
      });
    });

    if (globeWrapRef.current) {
      observer.observe(globeWrapRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let mounted = true;

    loadCountriesGeoJson().then((data) => {
      if (mounted) {
        setCountriesGeoJson(data);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const container = globeWrapRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = Boolean(entry?.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const markPointerActive = () => {
      isPointerActiveRef.current = true;

      if (idleScrollTimeoutRef.current !== null) {
        window.clearTimeout(idleScrollTimeoutRef.current);
      }

      idleScrollTimeoutRef.current = window.setTimeout(() => {
        isPointerActiveRef.current = false;
        idleScrollTimeoutRef.current = null;
      }, 140);
    };

    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === "visible";
    };

    handleVisibilityChange();

    window.addEventListener("scroll", markPointerActive, { passive: true });
    window.addEventListener("wheel", markPointerActive, { passive: true });
    window.addEventListener("touchmove", markPointerActive, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("scroll", markPointerActive);
      window.removeEventListener("wheel", markPointerActive);
      window.removeEventListener("touchmove", markPointerActive);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (idleScrollTimeoutRef.current !== null) {
        window.clearTimeout(idleScrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      viewStateRef.current = "focus";
      viewBlendRef.current.value = 1;
      viewBlendCommittedRef.current = 1;
      setViewBlend(1);
      setShowLocations(true);
      globeRef.current?.pointOfView(FOCUS_POV, 0);
      isScrollControlledRef.current = true;
      return;
    }

    const resolveTargetState = (clamped: number, current: GlobeViewState): GlobeViewState => {
      if (current === "overview") {
        return clamped >= ENTER_FOCUS_THRESHOLD ? "focus" : "overview";
      }

      return clamped <= LEAVE_FOCUS_THRESHOLD ? "overview" : "focus";
    };

    const applyBlend = () => {
      const globe = globeRef.current;
      const cameraT = clamp01(cameraTweenRef.current.value);
      if (globe) {
        const from = transitionFromPovRef.current;
        const to = transitionToPovRef.current;

        globe.pointOfView(
          {
            lat: lerp(from.lat, to.lat, cameraT),
            lng: lerp(from.lng, to.lng, cameraT),
            altitude: lerp(from.altitude, to.altitude, cameraT),
          },
          0
        );
      }

      const blend = clamp01(lerp(transitionFromBlendRef.current, transitionToBlendRef.current, cameraT));
      viewBlendRef.current.value = blend;

      const quantized = Math.round(blend * 200) / 200;
      if (quantized === viewBlendCommittedRef.current) return;
      viewBlendCommittedRef.current = quantized;
      setViewBlend(quantized);
    };

    const startTransition = (targetState: GlobeViewState) => {
      const targetBlend = targetState === "focus" ? 1 : 0;
      const targetPov: CameraPov = targetState === "focus" ? { ...FOCUS_POV } : { ...OVERVIEW_POV };

      const globe = globeRef.current;
      const currentPov = globe?.pointOfView();

      transitionFromPovRef.current = currentPov
        ? {
            lat: currentPov.lat,
            lng: currentPov.lng,
            altitude: currentPov.altitude,
          }
        : targetState === "focus"
          ? { ...OVERVIEW_POV }
          : { ...FOCUS_POV };

      transitionToPovRef.current = { ...targetPov };
      transitionFromBlendRef.current = clamp01(viewBlendRef.current.value);
      transitionToBlendRef.current = targetBlend;
      cameraTweenRef.current.value = 0;

      if (targetState === "overview") {
        setShowLocations(false);
      }

      transitionTweenRef.current?.kill();
      isScrollControlledRef.current = true;

      transitionTweenRef.current = gsap.to(cameraTweenRef.current, {
        value: 1,
        duration: 1.4,
        ease: "power2.inOut",
        overwrite: true,
        onUpdate: applyBlend,
        onComplete: () => {
          viewBlendRef.current.value = targetBlend;
          transitionTweenRef.current = null;
          viewStateRef.current = targetState;

          const pending = pendingViewStateRef.current;
          pendingViewStateRef.current = null;

          if (pending && pending !== viewStateRef.current) {
            startTransition(pending);
            return;
          }

          if (viewStateRef.current === "overview") {
            const globe = globeRef.current;
            if (globe) {
              idleLngRef.current = globe.pointOfView().lng;
            }
            isScrollControlledRef.current = false;
            return;
          }

          setShowLocations(true);

          isScrollControlledRef.current = true;
        },
      });
    };

    const clampedProgress = smoothedProgress;
    const desiredState = resolveTargetState(clampedProgress, viewStateRef.current);

    if (desiredState === viewStateRef.current && !transitionTweenRef.current) {
      return;
    }

    if (transitionTweenRef.current) {
      pendingViewStateRef.current = desiredState;
      if (desiredState === "overview") {
        setShowLocations(false);
      }
      return;
    }

    startTransition(desiredState);
  }, [isMounted, smoothedProgress]);

  useEffect(() => {
    if (!isGlobeReady || showLocations) return;

    const animateIdle = (ts: number) => {
      const globe = globeRef.current;
      if (globe) {
        const shouldAnimateIdle =
          isGlobeReady &&
          !isScrollControlledRef.current &&
          !transitionTweenRef.current &&
          isVisibleRef.current &&
          !isPointerActiveRef.current &&
          document.visibilityState === "visible";

        if (shouldAnimateIdle) {
          const idleFrameInterval = isTouchDevice ? 33 : 50;
          if (ts - idleLastTsRef.current >= idleFrameInterval) {
            idleLastTsRef.current = ts;
            idleLngRef.current += 0.05;
            globe.pointOfView({ lat: 18, lng: idleLngRef.current, altitude: 2.05 }, 0);
          }
        } else {
          idleLastTsRef.current = ts;
        }
      }

      rafRef.current = requestAnimationFrame(animateIdle);
    };

    rafRef.current = requestAnimationFrame(animateIdle);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isGlobeReady, isTouchDevice, showLocations]);

  useEffect(() => {
    if (!isGlobeReady) return;

    const globe = globeRef.current;
    if (!globe) return;

    const renderer = (globe as GlobeMethods & { renderer?: () => THREE.WebGLRenderer }).renderer?.();
    if (renderer) {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isTouchDevice ? 2 : 1.2));
    }

    const controls = globe.controls();
    controls.autoRotate = false;
    controls.enableZoom = false;
    controls.enableRotate = false;
    controls.enablePan = false;
    controls.enableDamping = false;

    globe.pointOfView(OVERVIEW_POV, 0);
  }, [isGlobeReady, isTouchDevice]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const existingOverlay = document.getElementById("globe-tooltip-overlay") as HTMLDivElement | null;
    if (existingOverlay) {
      tooltipOverlayRef.current = existingOverlay;
      return;
    }

    const overlay = document.createElement("div");
    overlay.id = "globe-tooltip-overlay";
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.minWidth = "30px";
    overlay.style.maxWidth = "240px";
    overlay.style.padding = "12px 14px";
    overlay.style.borderRadius = "10px";
    overlay.style.background = "#0A1128";
    overlay.style.color = "#ffffff";
    overlay.style.boxShadow = "0 10px 28px rgba(0,0,0,.28)";
    overlay.style.border = "1px solid rgba(255,255,255,.14)";
    overlay.style.fontFamily = "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
    overlay.style.fontSize = "12px";
    overlay.style.lineHeight = "1.35";
    overlay.style.whiteSpace = "normal";
    overlay.style.zIndex = "2147483647";
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    overlay.style.transition = "opacity 160ms ease";

    document.body.appendChild(overlay);
    tooltipOverlayRef.current = overlay;

    return () => {
      if (tooltipOverlayRef.current === overlay) {
        tooltipOverlayRef.current = null;
      }

      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    };
  }, []);

  useEffect(() => {
    const hideOverlayTooltip = () => {
      const overlay = tooltipOverlayRef.current;
      if (overlay) {
        overlay.style.opacity = "0";
      }
    };

    window.addEventListener("scroll", hideOverlayTooltip, { passive: true });
    window.addEventListener("wheel", hideOverlayTooltip, { passive: true });
    window.addEventListener("touchmove", hideOverlayTooltip, { passive: true });
    window.addEventListener("blur", hideOverlayTooltip);
    document.addEventListener("visibilitychange", hideOverlayTooltip);

    return () => {
      window.removeEventListener("scroll", hideOverlayTooltip);
      window.removeEventListener("wheel", hideOverlayTooltip);
      window.removeEventListener("touchmove", hideOverlayTooltip);
      window.removeEventListener("blur", hideOverlayTooltip);
      document.removeEventListener("visibilitychange", hideOverlayTooltip);
    };
  }, []);

  return (
    <div className="relative h-full min-h-0 w-full overflow-x-clip">
      <div
        ref={globeWrapRef}
        className="mx-auto flex h-full min-h-0 w-full max-w-[48rem] items-center justify-center overflow-hidden"
      >
        <div 
          className="relative max-w-full flex items-center justify-center overflow-hidden"
          style={{
            width: dimensions.width,
            height: dimensions.height,
            borderRadius: '50%',
            boxShadow: viewBlend > 0.01 ? `inset 0 0 ${40 * viewBlend}px ${20 * viewBlend}px var(--background)` : 'none',
            transition: 'box-shadow 300ms ease',
            touchAction: 'pan-y',
            pointerEvents: isTouchDevice ? 'none' : 'auto'
          }}
        >
          {isMounted && (
            <ReactGlobe
              ref={globeRef}
              onGlobeReady={() => setIsGlobeReady(true)}
              width={dimensions.width}
              height={dimensions.height}
              animateIn={false}
              globeImageUrl={null}
              bumpImageUrl={null}
              globeMaterial={globeMaterial}
              backgroundColor="rgba(0,0,0,0)"
              showAtmosphere
              atmosphereColor="#cacaca"
              atmosphereAltitude={0.14}
              showGraticules={false}
              polygonsData={countriesGeoJson?.features ?? []}
              polygonCapColor={() => "#cacaca"}
              polygonSideColor={() => "#cacaca"}
              polygonStrokeColor={() => (showLocations ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.25)")}
              polygonAltitude={0.008}
              arcsData={introArcs}
              arcStartLat="startLat"
              arcStartLng="startLng"
              arcEndLat="endLat"
              arcEndLng="endLng"
              arcColor="color"
              arcStroke={0.7}
              arcAltitudeAutoScale={0.36}
              arcDashLength={0.42}
              arcDashGap={1.1}
              arcDashInitialGap="dashOffset"
              arcDashAnimateTime={4600}
              arcsTransitionDuration={250}
              enablePointerInteraction={!isTouchDevice}
              htmlElementsData={points}
              htmlLat="lat"
              htmlLng="lng"
              htmlElement={(point) => {
                const p = point as GlobePoint;
                const el = document.createElement("div");
                el.style.position = "relative";
                el.style.transform = `translate(-50%, -100%) scale(${p.pinScale})`;
                el.style.transformOrigin = "center bottom";
                el.style.opacity = "1";
                el.style.transition = "transform 260ms ease";
                el.style.pointerEvents = "auto";
                el.style.cursor = "pointer";
                el.style.zIndex = "2";

                const marker = document.createElement("div");
                marker.style.display = "flex";
                marker.style.alignItems = "center";
                marker.style.justifyContent = "center";
                marker.style.width = "20px";
                marker.style.height = "20px";
                marker.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#21569c" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="white" stroke="none"></circle></svg>`;

                const getOverlayTooltip = () => {
                  return tooltipOverlayRef.current;
                };

                el.appendChild(marker);

                const parts: string[] = [];

                if (p.city?.length) {
                  parts.push(`<div style=\"opacity:.95\">${p.city}</div>`);
                }

                const positionTooltip = (event: MouseEvent) => {
                  const overlay = getOverlayTooltip();
                  if (!overlay) return;
                  const xOffset = 14;
                  const yOffset = 14;
                  const vw = window.innerWidth;
                  const vh = window.innerHeight;
                  const rect = overlay.getBoundingClientRect();

                  let left = event.clientX + xOffset;
                  let top = event.clientY + yOffset;

                  if (left + rect.width > vw - 12) {
                    left = event.clientX - rect.width - xOffset;
                  }

                  if (top + rect.height > vh - 12) {
                    top = vh - rect.height - 12;
                  }

                  if (top < 12) {
                    top = 12;
                  }

                  if (left < 12) {
                    left = 12;
                  }

                  overlay.style.left = `${left}px`;
                  overlay.style.top = `${top}px`;
                };

                el.addEventListener("mouseenter", (event) => {
                  const overlay = getOverlayTooltip();
                  if (!overlay) return;
                  overlay.innerHTML = parts.join("");
                  positionTooltip(event);
                  el.style.zIndex = "1000";
                  overlay.style.opacity = "1";
                });

                el.addEventListener("mousemove", (event) => {
                  positionTooltip(event);
                });

                el.addEventListener("mouseleave", () => {
                  const overlay = getOverlayTooltip();
                  if (!overlay) return;
                  el.style.zIndex = "2";
                  overlay.style.opacity = "0";
                });

                return el;
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
