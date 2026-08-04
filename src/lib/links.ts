import baseConfig from "@/configs/base";

const links = {
  backendHost: baseConfig.backendDomain,
  apiEndpoint: `${baseConfig.backendDomain}/api/v1.0`,
  storageEndpoint: baseConfig.frontendDomain,
} as const;

export default links;