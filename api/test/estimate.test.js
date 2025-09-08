import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../index.js";

describe("Test estimate route", () => {
    it("returns estimated price for valid game value", async () => {
        const res = await request(app)
            .get("/estimate")
            .query({ q: "1600 ab2" });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("estimatedPrice");
        expect(res.body.estimatedPrice).toBeGreaterThan(0);
    });

    it("estimated price must be 0 for valueless item", async () => {
        const res = await request(app)
            .get("/estimate")
            .query({ q: "1000 ab2" });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("estimatedPrice");
        expect(res.body.estimatedPrice).toBe(0);
    });

    it("returns error for missing query", async () => {
        const res = await request(app).get("/estimate").query({ q: "" });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("error", "missing-query");
    });

    it("returns error for missing gameValue within query", async () => {
        const res = await request(app).get("/estimate").query({ q: "ab2" });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("error", "gameValue-not-found");
    });
});
