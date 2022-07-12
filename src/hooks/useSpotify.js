import React from "react";

const useSpotify = () => {
    const getSearchResults = async (
        q,
        token,
        type = "track",
        market = null,
        limit = 0,
        offset = null
    ) => {
        let track;
        let limitChangable = limit;
        if (q && token) {
            if (limit > 50) {
                console.error("Limit must be less than 50!");
            }
            while (offset <= 1000) {
                const res = await fetch(
                    `https://api.spotify.com/v1/search?${`q=${q}`}${`&type=${type}`}${
                        market != null ? `&market=${market}` : ""
                    }${limit != null && limit <= 50 ? `&limit=${limit}` : ""}${
                        offset != null ? `&offset=${offset}` : ""
                    }`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await res.json();
                track = data.tracks.items.find(
                    (item) => item.name.toLowerCase() === q.toLowerCase()
                );
                console.log(track);
                offset += 50;
                if (track !== undefined) {
                    return track;
                }
            }
        }
    };
    return { getSearchResults };
};

export default useSpotify;
