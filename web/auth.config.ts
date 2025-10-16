// auth.config.ts
import Discord from "@auth/core/providers/discord";
import { defineConfig } from "auth-astro";

export default defineConfig({
    providers: [
        Discord({
            clientId:
                import.meta.env.DDMT_WEB_CLIENT_ID ||
                process.env.DDMT_WEB_CLIENT_ID,
            clientSecret:
                import.meta.env.DDMT_WEB_CLIENT_SECRET ||
                process.env.DDMT_WEB_CLIENT_SECRET,
        }),
    ],
    secret: import.meta.env.AUTH_SECRET || process.env.AUTH_SECRET,
});
