/**
 * Node.js script to search binary .upk files for specific map identifier strings.
 *
 * Usage:
 *   1. Place this file in your CookedPCConsole folder (or edit searchDir below)
 *   2. Run: node search_upk_maps.js
 */

import fs from "fs";
import path from "path";

const searchDir =
    "C:/Program Files (x86)/Steam/steamapps/common/Dungeon Defenders/UDKGame/CookedPCConsole"; // 🔧 Change this to your folder path

// 🔍 Add or import your map IDs here
const map_ids = [];
map_ids[0] = "CWWEHE";
map_ids[1] = "VDAY04";
map_ids[2] = "CAMPHP";
map_ids[3] = "CDTVAL";
map_ids[4] = "CAMPST";
map_ids[5] = "CAMPAR"; //
map_ids[6] = "VDAY01";
map_ids[7] = "VDAY02";
map_ids[8] = "CDTTOE"; // Temple of Etheria
map_ids[9] = "CDMAGE"; //
map_ids[10] = "CAMPTD"; //
map_ids[11] = "CDTINF";
map_ids[12] = "CDMONK";
map_ids[13] = "CDTEME"; // Emerald City?
map_ids[14] = "VDAY03";
map_ids[15] = "CDTPAY";
map_ids[16] = "CAMPTL";
map_ids[17] = "CDHUNT";
map_ids[18] = "CAMPMF";
map_ids[19] = "CDTARC";
map_ids[20] = "CDCAVE";
map_ids[21] = "CAMPJ2";
map_ids[22] = "CDKGHT";
map_ids[23] = "CAMPMB"; // Mistymire??
map_ids[24] = "CDTOMN"; // Omenak
map_ids[25] = "CDTTOW"; // Temple of Water
map_ids[26] = "CAMPTM";
map_ids[27] = "TROPIC"; // Tropics
map_ids[28] = "CDTCBB";
map_ids[29] = "CDTTWC";
map_ids[30] = "CDTCOB";
map_ids[31] = "SPECHI"; // Halloween Invasion ??
map_ids[32] = "CAMPAQ"; // Aquanos ??
map_ids[33] = "CDTEMV";
map_ids[34] = "CAMPPA";
map_ids[35] = "CDTTWA"; // TWA
map_ids[36] = "LHOLOC";
map_ids[37] = "CDTCTP";
map_ids[38] = "RETCRD"; // Return to CD
map_ids[39] = "CAMPKG"; // Kings game
map_ids[40] = "CAMPCL"; // Crystalline Dimension
map_ids[41] = "CDCTWR";
map_ids[42] = "CDTTOP"; // Temple of Polybius
map_ids[43] = "SKYSPK"; // Sky Spooktacular
map_ids[44] = "CDTEGG"; // Eternia Gauntlet ??
map_ids[45] = "CAMPSC"; // Sky city??
map_ids[46] = "SPECTH";
map_ids[47] = "SPECT2";
map_ids[48] = "CDTWIM";
map_ids[49] = "CAMPX2"; //
map_ids[50] = "SPECXM"; // SOME XMAS MAP
map_ids[51] = "SPECX2"; // SOME XMAS MAP
map_ids[52] = "SPECTI";

// Read directory for .upk files
const upkFiles = fs
    .readdirSync(searchDir)
    .filter((file) => file.toLowerCase().endsWith(".upk"));

console.log(
    `🔍 Scanning ${upkFiles.length} .upk files for ${map_ids.length} map IDs...\n`
);

for (const file of upkFiles) {
    if (file.includes("LobbyLevel")) continue;
    const filePath = path.join(searchDir, file);
    const data = fs.readFileSync(filePath); // read binary data

    // Convert once to ASCII string for fast search (safe, packages are ASCII-ish)
    const text = data.toString("latin1");
    // Track which IDs this file contains
    const found = map_ids.filter((id) => text.includes(id));

    if (found.length > 0) {
        console.log(`✅ ${file}: found ${found.join(", ")}`);
    }
}

console.log("\n✅ Done!");
