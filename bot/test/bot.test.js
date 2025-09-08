import { describe, it, expect } from "vitest";
import { run as bonus } from "../commands/bonus";

const client = {
    prefix: "?",
};

const message = {
    channel: {
        send: (arg) => {
            return arg;
        },
    },
};

describe("Test commands", () => {
    it("returns valid bonus", async () => {
        const result = bonus(client, message, ["100", "200"]);
        expect(result).toBe("Will reach 299, 419 with bonus.");
    });
});
