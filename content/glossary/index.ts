import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

import powerBi, { extras as powerBiExtras } from "./power-bi"
import saas, { extras as saasExtras } from "./saas"
import prozessautomatisierung, { extras as prozessautomatisierungExtras } from "./process-automation"
import dataWarehouse, { extras as dataWarehouseExtras } from "./data-warehouse"
import datenstrategie, { extras as datenstrategieExtras } from "./data-strategy"
import dataGovernance, { extras as dataGovernanceExtras } from "./data-governance"
import mlops, { extras as mlopsExtras } from "./mlops"
import machineLearningAzure, { extras as machineLearningAzureExtras } from "./machine-learning-azure"
import datenmodellierung, { extras as datenmodellierungExtras } from "./data-modeling"
import medallionArchitektur, { extras as medallionArchitekturExtras } from "./medallion-architecture"
import powerQuery, { extras as powerQueryExtras } from "./power-query"
import dax, { extras as daxExtras } from "./dax"
import semanticModel, { extras as semanticModelExtras } from "./semantic-model"
import rowLevelSecurity, { extras as rowLevelSecurityExtras } from "./row-level-security"
import etlElt, { extras as etlEltExtras } from "./etl-elt"
import microsoftFabric, { extras as microsoftFabricExtras } from "./microsoft-fabric"
import azureDatabricks, { extras as azureDatabricksExtras } from "./azure-databricks"
import digitalePlattformen, { extras as digitalePlattformenExtras } from "./digital-platforms"
import cloudComputing, { extras as cloudComputingExtras } from "./cloud-computing"
import cloudInfrastruktur, { extras as cloudInfrastrukturExtras } from "./cloud-infrastructure"
import cloudGovernance, { extras as cloudGovernanceExtras } from "./cloud-governance"
import sdlc, { extras as sdlcExtras } from "./sdlc"
import multiTenantArchitektur, { extras as multiTenantArchitekturExtras } from "./multi-tenant-architecture"
import restApi, { extras as restApiExtras } from "./rest-api"
import mvp, { extras as mvpExtras } from "./mvp"
import devops, { extras as devopsExtras } from "./devops"
import itSicherheit, { extras as itSicherheitExtras } from "./it-security"
import dsgvoDatenschutz, { extras as dsgvoDatenschutzExtras } from "./gdpr"
import powerAutomate, { extras as powerAutomateExtras } from "./power-automate"
import aiBuilder, { extras as aiBuilderExtras } from "./ai-builder"
import stammdatenmanagement, { extras as stammdatenmanagementExtras } from "./master-data-management"
import ciCd, { extras as ciCdExtras } from "./ci-cd"
import iac, { extras as iacExtras } from "./iac"
import iamKeycloak, { extras as iamKeycloakExtras } from "./iam-keycloak"
import mfa2fa, { extras as mfa2faExtras } from "./mfa-2fa"
import networkingSecurity, { extras as networkingSecurityExtras } from "./networking-security"

export { default as glossaryCatalog } from "./_catalog"

/** Terms with a full detail page, in registry order — drives routes, sitemap and auto-linking (see lib/glossary.ts). */
export const glossaryTerms: Record<string, LocalizedGlossaryTerm> = {
  "power-bi": powerBi,
  "saas": saas,
  "process-automation": prozessautomatisierung,
  "data-warehouse": dataWarehouse,
  "data-strategy": datenstrategie,
  "data-governance": dataGovernance,
  "mlops": mlops,
  "machine-learning-azure": machineLearningAzure,
  "data-modeling": datenmodellierung,
  "medallion-architecture": medallionArchitektur,
  "power-query": powerQuery,
  "dax": dax,
  "semantic-model": semanticModel,
  "row-level-security": rowLevelSecurity,
  "etl-elt": etlElt,
  "microsoft-fabric": microsoftFabric,
  "azure-databricks": azureDatabricks,
  "digital-platforms": digitalePlattformen,
  "cloud-computing": cloudComputing,
  "cloud-infrastructure": cloudInfrastruktur,
  "cloud-governance": cloudGovernance,
  "sdlc": sdlc,
  "multi-tenant-architecture": multiTenantArchitektur,
  "rest-api": restApi,
  "mvp": mvp,
  "devops": devops,
  "it-security": itSicherheit,
  "gdpr": dsgvoDatenschutz,
  "power-automate": powerAutomate,
  "ai-builder": aiBuilder,
  "master-data-management": stammdatenmanagement,
  "ci-cd": ciCd,
  "iac": iac,
  "iam-keycloak": iamKeycloak,
  "mfa-2fa": mfa2fa,
  "networking-security": networkingSecurity,
}

/** Per-language extras (misconceptions + sources), merged into terms on read. */
export const glossaryExtras: Record<string, Record<Locale, GlossaryExtra>> = {
  "power-bi": powerBiExtras,
  "data-warehouse": dataWarehouseExtras,
  "data-strategy": datenstrategieExtras,
  "data-governance": dataGovernanceExtras,
  "mlops": mlopsExtras,
  "machine-learning-azure": machineLearningAzureExtras,
  "data-modeling": datenmodellierungExtras,
  "medallion-architecture": medallionArchitekturExtras,
  "power-query": powerQueryExtras,
  "dax": daxExtras,
  "semantic-model": semanticModelExtras,
  "row-level-security": rowLevelSecurityExtras,
  "etl-elt": etlEltExtras,
  "microsoft-fabric": microsoftFabricExtras,
  "azure-databricks": azureDatabricksExtras,
  "saas": saasExtras,
  "digital-platforms": digitalePlattformenExtras,
  "cloud-computing": cloudComputingExtras,
  "cloud-infrastructure": cloudInfrastrukturExtras,
  "cloud-governance": cloudGovernanceExtras,
  "sdlc": sdlcExtras,
  "multi-tenant-architecture": multiTenantArchitekturExtras,
  "rest-api": restApiExtras,
  "mvp": mvpExtras,
  "process-automation": prozessautomatisierungExtras,
  "devops": devopsExtras,
  "it-security": itSicherheitExtras,
  "gdpr": dsgvoDatenschutzExtras,
  "power-automate": powerAutomateExtras,
  "ai-builder": aiBuilderExtras,
  "master-data-management": stammdatenmanagementExtras,
  "ci-cd": ciCdExtras,
  "iac": iacExtras,
  "iam-keycloak": iamKeycloakExtras,
  "mfa-2fa": mfa2faExtras,
  "networking-security": networkingSecurityExtras,
}
