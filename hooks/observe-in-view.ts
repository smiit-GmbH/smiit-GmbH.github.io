/**
 * IntersectionObserver wrapper shared by useRevealOnScroll and useActiveInView.
 *
 * An element hidden with display:none has a 0×0 box at (0, 0), which
 * IntersectionObserver reports as intersecting. Treat "no area" as not in view —
 * otherwise hidden variants (e.g. desktop visuals on phones) start their
 * animations, or loop forever, while nobody can see them. Becoming visible later
 * (display:none → block, e.g. on resize) doesn't necessarily change the
 * intersection state, so the element is re-observed when its box gains or loses area.
 */
export function observeInView(
  node: HTMLElement,
  options: { rootMargin: string; threshold: number },
  onChange: (inView: boolean) => void,
): () => void {
  const hasArea = (r: DOMRectReadOnly) => r.width > 0 && r.height > 0

  const observer = new IntersectionObserver(
    ([entry]) => onChange(entry.isIntersecting && hasArea(entry.boundingClientRect)),
    options,
  )
  observer.observe(node)

  let hadArea = hasArea(node.getBoundingClientRect())
  const resize = new ResizeObserver(() => {
    const nowArea = hasArea(node.getBoundingClientRect())
    if (nowArea === hadArea) return
    hadArea = nowArea
    observer.unobserve(node)
    observer.observe(node)
  })
  resize.observe(node)

  return () => {
    observer.disconnect()
    resize.disconnect()
  }
}
