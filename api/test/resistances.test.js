import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../index.js";

describe("Test resistances route", () => {
    it("returns error for NaN values", async () => {
        const res = await request(app).get("/resistances").query({
            mainStat: "abcd",
            upgrades: "1",
            subStat: "100",
        });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty(
            "error",
            "mainStat, upgrades, and subStat must be numbers"
        );
    });

    it("returns error for invalid resistances array", async () => {
        const res = await request(app).get("/resistances").query({
            mainStat: "100",
            upgrades: "100",
            subStat: "100",
            resistances: "ab;cd",
        });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty(
            "error",
            "resistances must be a valid JSON array"
        );
    });

    it("returns error for too short resistances array", async () => {
        const res = await request(app).get("/resistances").query({
            mainStat: "100",
            upgrades: "100",
            subStat: "100",
            resistances: "[10,10,10]",
        });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty(
            "error",
            "resistances must be an array of 4 elements"
        );
    });

    it("returns error for invalid resistances array", async () => {
        const res = await request(app).get("/resistances").query({
            mainStat: "100",
            upgrades: "100",
            subStat: "100",
            resistances: '[10,10,10,"hello"]',
        });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty(
            "error",
            "resistances[3] must be a number or null"
        );
    });
    it("returns resistance for valid query", async () => {
        const res = await request(app).get("/resistances").query({
            mainStat: "300",
            upgrades: "400",
            subStat: "100",
            resistances: "[10,-6,10,-10]",
        });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("resUpgrades", 90);
        expect(res.body).toHaveProperty("mainStat", 609);
        expect(res.body).toHaveProperty("subStat", 100);
        expect(res.body).toHaveProperty("bonus", 993);
    });
});
