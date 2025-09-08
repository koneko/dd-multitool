import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../index.js";

describe("Test knowledge route", () => {
    it("returns error for missing topic in query", async () => {
        const res = await request(app).get("/knowledge").query({});
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("error", "no-topic");
    });

    it("returns error for not finding a valid topic", async () => {
        const res = await request(app)
            .get("/knowledge")
            .query({ topic: "aabbccddeeff" });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("error", "topic-not-found");
    });

    it("returns list for topic being equal list", async () => {
        const res = await request(app)
            .get("/knowledge")
            .query({ topic: "list" });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("topics");
        expect(res.body.topics).toBeTypeOf("object");
        expect(res.body.topics.length).toBeGreaterThan(3);
    });

    it("returns a knowledge object for a valid topic", async () => {
        const res = await request(app)
            .get("/knowledge")
            .query({ topic: "misc" });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("title");
        expect(res.body).toHaveProperty("content");
        expect(res.body.title).toBe("Miscelaneous");
        expect(res.body.content).toBe(
            "https://discord.com/channels/148849688722800640/556864412338749440/1344037464783720510"
        );
    });
});
