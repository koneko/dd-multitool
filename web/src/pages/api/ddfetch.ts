import * as cheerio from "cheerio";
import { APIRoute } from "astro";
export const GET: APIRoute = async ({ request }) => {
    const url = "https://dundefplanner.com/map.php?load=";
    const mapId = new URL(request.url).searchParams.get("id");

    if (!mapId) {
        return new Response(
            JSON.stringify({
                error: "No id query param.",
                success: null,
            })
        );
    }
    try {
        const $ = await cheerio.fromURL(url + mapId);
        let mapImage = "";
        const uniqueImages = [];
        const towers = [];
        const build = {
            name: $("h2").find("u").text(),
        };
        $(".canvas")
            .children()
            .toArray()
            .forEach((item) => {
                if (item.tagName == "img") {
                    mapImage = item.attribs.src;
                } else {
                    const tower = $(item);
                    const styles = tower.attr("style").split("\n");
                    towers.push({
                        name: tower.find("img").attr("title"),
                        src: tower.find("img").attr("src"),
                        left: styles[1]
                            .trim()
                            .replace("left: ", "")
                            .replace(";", ""),
                        top: styles[2]
                            .trim()
                            .replace("top: ", "")
                            .replace(";", ""),
                        transform: styles[3]
                            .trim()
                            .replace("transform: ", "")
                            .replace(";", ""),
                        transformOrigin: styles[4]
                            .trim()
                            .replace("transform-origin: ", "")
                            .replace(";", ""),
                    });
                    if (
                        uniqueImages.filter(
                            (img) => img == tower.find("img").attr("src")
                        ).length == 0
                    ) {
                        uniqueImages.push(tower.find("img").attr("src"));
                    }
                }
            });
        return new Response(
            JSON.stringify({
                error: null,
                success: {
                    build,
                    mapImage,
                    uniqueImages,
                    towers,
                },
            })
        );
    } catch (e) {
        return new Response(
            JSON.stringify({
                error: "Build is either down or 404ed.",
                success: null,
            })
        );
    }
};
