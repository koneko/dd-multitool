// auth.config.ts
import Discord from "@auth/core/providers/discord";
import { defineConfig } from "auth-astro";

export default defineConfig({
    providers: [
        Discord({
            clientId: process.env.DDMT_WEB_CLIENT_ID,
            clientSecret: process.env.DDMT_WEB_CLIENT_SECRET,
        }),
    ],
    secret: process.env.AUTH_SECRET,
});
