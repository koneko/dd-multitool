// @ts-check
import { defineConfig } from "astro/config";
import node from "@astrojs/node";

import auth from "auth-astro";

export default defineConfig({
    output: "server",
    publicDir: "./public",

    adapter: node({
        mode: "standalone",
    }),

    devToolbar: {
        enabled: false,
    },

    integrations: [auth()],
});
