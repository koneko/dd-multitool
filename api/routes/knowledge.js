const knowledge = [
    {
        topic: "cv",
        title: "CV Explanation",
        content:
            '[Theoran\'s video if you don\'t want to read](https://www.youtube.com/watch?v=BqNyES4hCTw)\n\nIt\'s supposed to be "companion cube value," but people use the shorter CV in terms of overall currency.\n(Companion cubes no longer hold any value in the game, due hackers duplicating them.)\nThe main currency is Diamonds / Crystal Hearts and/or for smaller things Coal / Heart Fragments.\n[Event Items](https://docs.google.com/spreadsheets/d/1XzYuWB4I9RoNe8x-DD2M1koWs72tW8sTgyQ_n-d7l-E/edit?gid=145819532#gid=145819532) Can also be used as currency.\nDiamonds / Crystal Hearts are generally valued at:\n- 5cv for a non-tower damage capping one\n- 10cv for a tower damage capping one\n- 15cv for one that caps tower damage + one other tower stat.\n- If a diamond caps tower damage + 2 other tower stats, it is worth >50cv atleast.\n*(diamonds that cap other stats without capping tower damage are worth 5cv, unless they triple cap.)*\nWhen a player states an item is worth x amount of CV they just mean any amount 5/10/15 CV Diamonds / Crystal Hearts or Event Items (if they are accepting them as currency) as long as it adds up to that amount of "cv."',
    },
    {
        topic: "stacking",
        title: "How to stack",
        content:
            "[Watch this video](https://www.youtube.com/watch?v=8zjqUsIMXrg)\n[Link to the script if you just want to copy-paste](https://drive.overflow.fun/public/script.txt)",
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
    {
        topic: "censor",
        title: "Why and how do we censor items",
        content:
            'Please turn on the in-game censor option before posting a picture of an item here. (shortcut CTRL+C or the "Censor items" option in game.)\nIt will replace the last digit of stats on special rare items with an x to hide that digit.\nThis stops people from making duplicates of the item and helps prevent hackers from learning too much about how these items roll to make their own legitimate looking ones.\nWe ask that you censor all Ultimate++ (and higher for Redux) items as well as Ultimate accessories, Ultimate seahorses, Transcendent propeller cats and Supreme unicorns.',
    },
    {
        topic: "canthostgame",
        title: "Can't host games?",
        content:
            "If you CAN'T host your own matches but CAN join other people's, disable all network adapters but your primary internet connection in your Network and Sharing Centre section of the Control Panel. If this does not work, try disabling any potentially active tunneling engine on your computer, most often created by a VPN or Hamachi. There is an alternate method to fixing this issue pinned in <#556864412338749440> for more advanced users who would like a better permanent solution.",
    },
    {
        topic: "mismatch",
        title: "Is the game talking about some package mismatch?",
        content:
            'Package mismatches happen most often when either you or the person you are trying to join played a custom map on **"Open"** without restarting their game. The person who had been playing custom maps must restart their game. \nIf this does not fix the error, one or both of you may need to delete all the contents of your **CookedMods** folder found within the **UDKGame** folder in your installation folder and unsubscribe to those mods on the workshop so steam will not re-download it.\nYou could also try verifying your game cache, Steam Library, right-click the game, select "Properties," then "Installed Files," and click "Verify integrity of game files...".',
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
