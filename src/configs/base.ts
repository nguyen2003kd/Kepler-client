const baseConfig = {
  backendDomain: process.env.NEXT_PUBLIC_BACKEND_DOMAIN || 'https://kepler-dev.meucorp.com',
  frontendDomain: process.env.NEXT_PUBLIC_FRONTEND_DOMAIN || 'https://kepler-dev.meucorp.com',
  imgEndpointDomain:
    process.env.NEXT_PUBLIC_IMG_ENDPOINT_DOMAIN ||
    process.env.NEXT_PUBLIC_FRONTEND_DOMAIN ||
    process.env.NEXT_PUBLIC_BACKEND_DOMAIN ||
    'https://kepler-dev.meucorp.com'
};

export default baseConfig;
