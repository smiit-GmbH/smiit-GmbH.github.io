import type React from "react"
import type { DiagramProps } from "./diagrams/primitives"
import {
  DataWarehouseDiagram,
  EtlEltDiagram,
  FabricDiagram,
  MedallionDiagram,
  MlopsDiagram,
  PowerBiDiagram,
  SemanticModelDiagram,
  StarSchemaDiagram,
} from "./diagrams/analytics"
import {
  CloudComputingDiagram,
  MultiTenantDiagram,
  RestApiDiagram,
  SaasStackDiagram,
  SdlcDiagram,
} from "./diagrams/apps"
import {
  CicdDiagram,
  DevopsDiagram,
  DigitalPlatformDiagram,
  IamDiagram,
  MfaDiagram,
  NetworkingDiagram,
  ProcessAutomationDiagram,
} from "./diagrams/strategy"

/**
 * Glossary diagrams as themed HTML/Tailwind compositions (portfolio look):
 * card shell with accent gradient + soft shadow, eyebrow + status pill, tinted
 * chips, icons and depth. Each diagram uses a layout that fits its concept and
 * is tinted with the term's cluster accent (`color`). Server-rendered (SSG) so
 * the labels ship as real, crawlable text.
 */

export const glossaryDiagrams: Record<string, (props: DiagramProps) => React.ReactNode> = {
  "medallion-architecture": MedallionDiagram,
  "data-modeling": StarSchemaDiagram,
  "etl-elt": EtlEltDiagram,
  "cloud-computing": CloudComputingDiagram,
  "data-warehouse": DataWarehouseDiagram,
  saas: SaasStackDiagram,
  "multi-tenant-architecture": MultiTenantDiagram,
  "ci-cd": CicdDiagram,
  sdlc: SdlcDiagram,
  mlops: MlopsDiagram,
  "process-automation": ProcessAutomationDiagram,
  "power-bi": PowerBiDiagram,
  "semantic-model": SemanticModelDiagram,
  "microsoft-fabric": FabricDiagram,
  "rest-api": RestApiDiagram,
  "iam-keycloak": IamDiagram,
  "mfa-2fa": MfaDiagram,
  "networking-security": NetworkingDiagram,
  devops: DevopsDiagram,
  "digital-platforms": DigitalPlatformDiagram,
}
