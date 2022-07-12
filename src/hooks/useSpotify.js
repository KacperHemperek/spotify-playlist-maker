import React from "react";

const useSpotify = () => {
    const getSearchResults = async (
        q,
        token,
        type = "track",
        market = null,
        limit = null,
        offset = null
    ) => {
        if (q && token) {
            if (limit > 50) {
                console.error("Limit must be less than 50!");
            }
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
            console.log(data);
        }
    };
    return { getSearchResults };
};

export default useSpotify;
