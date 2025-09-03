// auth.config.ts
import Discord from "@auth/core/providers/discord";
import { defineConfig } from "auth-astro";

export default defineConfig({
    providers: [
        Discord({
            clientId: process.env.AUTH_SECRET,
            clientSecret: process.env.AUTH_SECRET,
        }),
    ],
    secret: process.env.AUTH_SECRET,
});
