const baseConfig = {
  backendDomain: (process.env.NEXT_PUBLIC_BACKEND_DOMAIN || 'https://kepler-dev.meucorp.com').trim(),
  frontendDomain: (process.env.NEXT_PUBLIC_FRONTEND_DOMAIN || 'https://kepler-dev.meucorp.com').trim(),
  imgEndpointDomain: (process.env.NEXT_PUBLIC_FRONTEND_DOMAIN || 'https://kepler-dev.meucorp.com').trim()
};

export default baseConfig;
