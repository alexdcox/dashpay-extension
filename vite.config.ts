import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import webExtension, { readJsonFile } from "vite-plugin-web-extension";
import path from "node:path";
import svgr from 'vite-plugin-svgr'

function generateManifest() {
  const manifest = readJsonFile("src/manifest.json");
  const pkg = readJsonFile("package.json");
  return {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    ...manifest,
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // port: 8080,
    // hmr: false,
  },
  plugins: [
    react(),
    webExtension({
      manifest: generateManifest,
      // browser: "chrome",
      // webExtConfig: {
      //   startUrl: 'chrome-extension://pehllhcpmlhimdapoaheimbljjcdmndk/src/wrapper.html'
      // }
    }),
    svgr(),

  ],
  resolve: {
    alias: {
      // In dev mode, make sure fast refresh works
      "/@react-refresh": path.resolve(
        "node_modules/@vitejs/plugin-react-swc/refresh-runtime.js"
      ),
    },
  },
});
