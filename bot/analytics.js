module.exports = async function sendAnalytics(
    username,
    userID,
    userURL,
    command,
    args,
    botResult,
    displayName,
    endpoint,
) {
    if (endpoint == undefined) return;
    try {
        const checkHealth = await fetch(endpoint + "health");
        if (checkHealth.status != 200)
            return console.log(
                "Analytics API is not healthy, probably down, aborting sending analytics data.",
            );

        const result = await fetch(endpoint + "api/command", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                userID,
                userURL,
                command,
                args,
                nickname: displayName,
                botResult,
            }),
        });
        // console.log(result.status);
        if (result.status == 200) {
            // console.log("Analytics data collection success!");
        }
    } catch (e) {
        console.log("something went wrong with analytics.js");
        console.log(e);
    }
};
