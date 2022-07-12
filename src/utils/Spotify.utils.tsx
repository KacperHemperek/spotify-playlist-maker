export const fetchFromSpotify = (q, token) => {};

export const getSearchResults = async (
    q: string,
    token: string,
    type: string = "track",
    limit: number = 0,
    offset: number = 0
) => {
    let track: any;
    if (q && token) {
        if (limit > 50) {
            console.error("Limit must be less than 50!");
        }
        while (offset <= 1000) {
            const res = await fetch(
                `https://api.spotify.com/v1/search?${`q=${q}`}${`&type=${type}`}${
                    limit != null && limit <= 50 ? `&limit=${limit}` : ""
                }${offset != null ? `&offset=${offset}` : ""}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await res.json();
            track = data.tracks.items.find(
                (item: any) => item.name.toLowerCase() === q.toLowerCase()
            );
            console.log(track);
            offset += limit;
            if (track !== undefined) {
                return track;
            }
        }
    }
};
