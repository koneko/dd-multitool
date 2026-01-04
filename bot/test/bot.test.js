import { describe, it, expect } from "vitest";
import { run as bonus } from "../commands/bonus.js";
import { run as cat } from "../commands/cat.js";
import { run as ev } from "../commands/ev.js";
import { run as tb } from "../commands/tb.js";
import { run as hb } from "../commands/hb.js";

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
    it("pointless test", async () => {
        expect(1 + 1).toBe(2);
    });
});
// describe("Test commands", () => {
//     it("returns valid bonus", async () => {
//         const result = bonus(client, message, ["100", "200"]);
//         expect(result).toBe("Will reach 299, 419 with bonus.");
//     });
//     it("returns valid cat stats", async () => {
//         const result = cat(client, message, ["150", "200"]);
//         expect(result).toBe(
//             "Your cat's boost should be atleast **213**. It will boost atleast **4** players."
//         );
//     });
//     it("returns valid and balanced ev ratio", async () => {
//         const result = ev(client, message, ["5000", "5000"]);
//         expect(result).toBe(
//             "You should aim for **5490** hero damage and **4510** ab2. *(approximately)*"
//         );
//     });
//     it("returns valid hb multiplier", async () => {
//         const result = tb(client, message, ["8000"]);
//         expect(result).toBe(
//             "With **8000** points in your tower boost, you will boost towers with a **4.1758** multiplier."
//         );
//     });
//     it("returns valid tb multiplier", async () => {
//         const result = hb(client, message, ["8000"]);
//         expect(result).toBe(
//             "With **8000** points in your hero boost, you will boost with a **4.4621** damage multiplier."
//         );
//     });
//     it("expects usersToReactTo to be >1", async () => {
//         const response = await fetch(
//             "https://drive.overflow.fun/public/react.json"
//         );
//         const usersToReactTo = await response.json();
//         expect(usersToReactTo.length).toBeGreaterThan(0);
//     });
// });
