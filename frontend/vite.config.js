import { defineConfig } from "vite";
import TemplatePlugin from "./plugins/vite-template-plugin";

export default defineConfig({
    server: {
        port: 3000,
        host: "0.0.0.0",
        hmr: true,
    },
    plugins: [
        TemplatePlugin(),
    ],
});