const baseConfig = {
  backendDomain: process.env.NEXT_PUBLIC_BACKEND_DOMAIN || 'http://localhost:3001',
  frontendDomain: process.env.NEXT_PUBLIC_FRONTEND_DOMAIN || 'http://localhost:3002',
  imgEndpointDomain: process.env.NEXT_PUBLIC_IMG_ENDPOINT_DOMAIN || process.env.NEXT_PUBLIC_BACKEND_DOMAIN || 'http://localhost:3001',
};

export default baseConfig;
