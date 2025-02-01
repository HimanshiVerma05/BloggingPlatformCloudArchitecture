const config = {
  REACT_APP_API_URL: "",
  REACT_APP_API_GATEWAY_URL: "",
};

// Fetch runtime configuration from `config.json`
export const fetchConfig = async () => {
  try {
    const response = await fetch('/config.json');
    const runtimeConfig = await response.json();
    Object.assign(config, runtimeConfig);
  } catch (error) {
    console.error("Failed to load runtime configuration:", error);
  }
};

export default config;
