/** @type {import('next').NextConfig} */
let nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true
    // Do NOT include parallelServerBuildTraces or parallelServerCompiles – they are invalid
  },
};

// Optional: attempt to import a user override config (for custom builds)
let userConfig;
try {
  userConfig = await import('./v0-user-next.config.mjs');
  userConfig = userConfig.default || userConfig; // ESM default export support
  mergeConfig(nextConfig, userConfig);
} catch (e) {
  // No override, safe to ignore
}

function mergeConfig(base, override) {
  for (const key in override) {
    if (typeof base[key] === 'object' && !Array.isArray(base[key])) {
      base[key] = {
        ...base[key],
        ...override[key],
      };
    } else {
      base[key] = override[key];
    }
  }
}

export default nextConfig;

