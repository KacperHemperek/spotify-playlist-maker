export const fetchFromSpotify = async (
    q: string,
    token: string
): Promise<any> => {
    try {
        const res = await fetch(`https://api.spotify.com/v1/${q}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return res.json();
    } catch (err) {
        throw new Error("Couldn't fetch from spotify");
    }
};

export const getMultipleTracks = async (
    input: string,
    token: string
): Promise<any[]> => {
    let array: any[] = input.split(" ");
    const resultArray: any[] = [];
    while (array.length > 0) {
        try {
            const res = await getSearchResults(array[0], token);
            console.log(res);
            resultArray.push(res);
            array.splice(0, 1);
            continue;
        } catch (err) {
            if (array.length <= 1) {
                throw new Error("Couldn't create playlist");
            } else {
                array[0] = [array[0], array[1]].join(" ");
            }
        }
    }
    return resultArray;
};

export const getSearchResults = async (
    q: string,
    token: string,
    type: string = "track",
    limit: number = 50,
    offset: number = 0
): Promise<any> => {
    let track: any;

    if (q && token) {
        if (limit > 50) {
            console.error("Limit must be less than 50!");
        }
        while (offset <= 1000) {
            let url = `search?${`q=${q}`}${`&type=${type}`}${
                limit != null && limit <= 50 ? `&limit=${limit}` : ""
            }${offset != null ? `&offset=${offset}` : ""}`;
            try {
                const data = await fetchFromSpotify(url, token);

                if (data?.tracks?.items) {
                    track = data.tracks.items.find(
                        (item: any) =>
                            item.name.toLowerCase() === q.toLowerCase()
                    );
                }

                offset += limit;

                if (track !== undefined) {
                    return track;
                }
            } catch (err) {
                throw new Error(err.message);
            }
        }
        throw new Error("Couldn't find in spotify search");
    }
};
