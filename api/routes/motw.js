const maps = [
    { friendlyName: "Campagin Silent Night", eit: "CDTSIL" },
    { friendlyName: "Crystal Escore: Wandering Heart", eit: "VDAY04" },
    { friendlyName: "Akatiti Jungle", eit: "CAMPJ2" },
    { friendlyName: "The Love Machine", eit: "CDTVAL" },
    { friendlyName: "The Striking Tree", eit: "CAMPST" },
    { friendlyName: "Morrago Desert Town", eit: "CAMPAR" },
    { friendlyName: "Valentine Citadel", eit: "MAGUSV" },
    { friendlyName: "Temple O' Love", eit: "VDAY02" },
    { friendlyName: "Riddle of the Deep", eit: "SPECAQ" },
    { friendlyName: "Crystalline Resurgence: Part 3", eit: "CDMAGE" },
    { friendlyName: "Portal Defense", eit: "SPECMF" },
    { friendlyName: "Temple of Polybius", eit: "CDTTOP" },
    { friendlyName: "Crystalline Resurgence: Part 2", eit: "CDMONK" },
    { friendlyName: "Crystal Escort: Spring Valley", eit: "CDTPAY" },
    { friendlyName: "Lover's Paradise", eit: "VDAY03" },
    { friendlyName: "Tropics of Etheria", eit: "TROPIC" },
    { friendlyName: "The Tinkerer's Lab", eit: "CAMPTL" },
    { friendlyName: "Tavern Incursion", eit: "SPECTI" },
    { friendlyName: "Mistymire Forest", eit: "CAMPMF" },
    { friendlyName: "Eternia Gauntlet", eit: "CDTEGG" },
    { friendlyName: "Crystal Cave", eit: "CDCAVE" },
    { friendlyName: "Spooktacular Bay", eit: "CAMPHP" },
    { friendlyName: "Crystalline Resurgence: Part 4", eit: "CDKGHT" },
    { friendlyName: "Moonbase", eit: "CAMPMB" },
    { friendlyName: "Omenak", eit: "CDTOMN" },
    { friendlyName: "Magus Citadel", eit: "CDTTOW" },
    { friendlyName: "Talay Mining Complex", eit: "CAMPTM" },
    { friendlyName: "Emerald City", eit: "CDTEME" },
    { friendlyName: "Buccaneer Bay", eit: "CDTCBB" },
    { friendlyName: "Tinkerer's Workshop", eit: "CDTTWC" },
    { friendlyName: "Coastal Bazaar", eit: "CDTCOB" },
    { friendlyName: "Halloween Invasion", eit: "SPECHI" },
    { friendlyName: "Aquanos", eit: "CAMPAQ" },
    { friendlyName: "Embermount Volcano", eit: "CDTEMV" },
    { friendlyName: "Infested Ruins", eit: "CDTINF" },
    { friendlyName: "Boss Rush", eit: "SPECSC" },
    { friendlyName: "Uber Death From Above", eit: "SPECCC" },
    { friendlyName: "Jester's Spooktacular", eit: "JSTSPK" },
    { friendlyName: "Return to Crystalline Dimension", eit: "RETCRD" },
    { friendlyName: "King's Game", eit: "CAMPKG" },
    { friendlyName: "War of the Djinn", eit: "SPECAR" },
    { friendlyName: "Rumble in the Jungle", eit: "SPECJU" },
    { friendlyName: "Crystalline Resurgence: Part 1", eit: "CDHUNT" },
    { friendlyName: "Sky Spooktacular", eit: "SKYSPK" },
    { friendlyName: "Arcane Library", eit: "CDTARC" },
    { friendlyName: "Sky City", eit: "CAMPSC" },
    { friendlyName: "Crystalline Dimension", eit: "CAMPCL" },
    { friendlyName: "The Greater Turkey Hunt!", eit: "SPECT2" },
    { friendlyName: "Lifestream Hollow", eit: "LIFHOL" },
    { friendlyName: "Wintermire", eit: "CDTWIM" },
    { friendlyName: "Frostdale Wonderland", eit: "CWWEHE" },
    { friendlyName: "Winter Wonderland", eit: "CAMPX2" },
    { friendlyName: "Workshop Assault", eit: "CDTTWA" },
];

function getOrdinalDateStringUTC(date = new Date()) {
    const year = date.getUTCFullYear();
    const startOfYear = Date.UTC(year, 0, 0); // midnight Jan 0 UTC+0
    const diff = date.getTime() - startOfYear;
    const dayOfYear = Math.floor(diff / 86400000);
    return dayOfYear;
}

export const get = async (req, res) => {
    const ord = getOrdinalDateStringUTC();
    const idx = Math.floor(ord / 7);
    return res.json({
        prev: idx != 0 ? maps[idx - 1] : maps[52],
        curr: maps[idx],
        next: idx != 52 ? maps[idx + 1] : maps[0],
        ord,
    });
};
