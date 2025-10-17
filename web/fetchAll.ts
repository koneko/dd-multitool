(async function () {
    const mapID = 4201;
    const res = await fetch("localhost:4321/api/ddfetch?id=" + mapID);
    const data = await res.json();

    const output = [];
    if (data.success.build.uniqueImages) {
        data.success.build.uniqueImages.forEach((image) => {
            const url = "https://dundefplanner.com" + image;
        });
    }
})();
