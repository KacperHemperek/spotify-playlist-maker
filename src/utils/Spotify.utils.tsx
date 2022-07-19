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
    let array: any[] = input.trim().split(" ");
    const resultArray: any[] = [];
    while (array.length > 0) {
        try {
            const res = await getSearchResults(array[0], token);
            console.log(res);
            resultArray.push(res);
            array.splice(0, 1);
        } catch (err) {
            if (array.length <= 1) {
                throw new Error("Couldn't get tracks from search results");
            } else {
                const firstItem = array.splice(0, 2).join(" ");
                array.unshift(firstItem);
            }
        }
    }
    return resultArray;
};

export const createPlaylist = async (
    token: string,
    name: string = "New Playlist",
): Promise<any> => {
        try {
            const userdata = await fetchFromSpotify("me", token)

            const res = await fetch(`https://api.spotify.com/v1/users/${userdata.id}/playlists`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    "name": name,
                    "description": "Description of the playlist",
                    "public": true
                }),
                method:"POST",
            });
        const data = await res.json();
        return data.id;
        } catch (err) {
            throw new Error("Couldn't create playlist");
        }
}

export const addToPlaylist = async(
    token: string,
    playlistId: string,
    tracks: any[],
): Promise<any> => {
    try {
        const tracksUris = tracks.map(function(track) {
            return track.uri;
          });
            const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    "uris": tracksUris
                }),
                method:"POST",
            });
    } catch (err) {
        throw new Error("Couldn't add item to playlist");
    }
}


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
        while (offset <= 400) {
            let url = `search?${`q=${q}`}${`&type=${type}`}${
                limit != null && limit <= 50 ? `&limit=${limit}` : ""
            }${offset != null ? `&offset=${offset}` : ""}`;
            try {
                const data = await fetchFromSpotify(url, token);

                if (data?.tracks?.items) {
                    track = data.tracks.items.find(
                        (item: any) =>
                            item.name.replace(/d/).toLowerCase() === q.toLowerCase()
                    );
                }

                offset += limit;

                if (track !== undefined) {
                    return track;
                }
            } catch (err: any) {
                const error = err.message;
                throw new Error(error);
            }
        }
        throw new Error("Couldn't find in spotify search");
    }
};
