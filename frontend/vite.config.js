import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    base: env.VITE_BASE_URL || "/",
    resolve: {
      alias: {
        crypto: "crypto-browserify",
        stream: "stream-browserify",
      },
    },
  };
});
