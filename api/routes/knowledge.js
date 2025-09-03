const knowledge = [
    {
        topic: "cv",
        title: "CV Explanation",
        content:
            "[Theoran's video if you don't want to read](https://www.youtube.com/watch?v=BqNyES4hCTw)",
    },
    {
        topic: "stacking",
        title: "How to stack",
        content:
            "[Watch this video](https://www.youtube.com/watch?v=8zjqUsIMXrg)",
    },
    {
        topic: "lm waves",
        title: "Love Machine Magicite Waves",
        content:
            "Splits are counted as seperate players, so keep that in mind.\n1 player = Reach Wave 17\n2 players = Reach Wave 20\n3 players = Reach Wave 23\n4 players = Reach Wave 26\n5 and 6 players = Reach Wave 29",
    },
    {
        topic: "old one resistances",
        title: "Old One resistances",
        content:
            "From Thales.\nTavern Incursion Old One:\nFeet - 35% generic nerf\nChest - 50% fire\nLeft Hand - 50% electric\nRight Hand - 50% poison\nHead - 80% nerf all\n\nGreat Old One - Ruthless TBR\nAll same as TI Old one, except:\nHead - 89% nerf all",
    },
    {
        topic: "misc",
        title: "Miscelaneous",
        content:
            "https://discord.com/channels/148849688722800640/556864412338749440/1344037464783720510",
    },
    {
        topic: "tbr",
        title: "True Boss Rush",
        content:
            'True Boss Rush is the hardest hero only content in the game.\nTo access True Boss Rush, you need to complete the Eternal Defender achievement and have defeated Great Old One in CR3 (the required maps for unlocking Great Old One are Crystalline Dimension, Dread Dungeon, Arcane Library, Buccaneer Bay, Pirate Invasion, Embermount Volcano, Temple of Water, Temple of Polybius and Crystalline Resurgence Parts 1-3 on NMHC).\nBefore you can do great old one you have to beat cr3 again after beating all of the aforementioned maps, you beat it, it counts towards the secret button unlocking, then you have to beat it again after pressing the button, the button should say something like "!??!?!?!?!?".\nAfter that, a button will appear next to the Experience Orb in the basement. Press the button to enter the map.',
    },
];

export const get = async (req, res) => {
    const topic = req.query.topic;
    if (!topic) {
        return res.status(400).json({ error: "no-topic" });
    }
    if (topic == "list") {
        const topics = knowledge.map((v) => {
            return v.topic;
        });
        return res.json({ topics });
    }

    for (let idx = 0; idx < knowledge.length; idx++) {
        const t = knowledge[idx];
        if (t.topic != topic) continue;
        return res.json({
            title: t.title,
            content: t.content,
        });
    }
    res.status(400).json({ error: "topic-not-found" });
};
