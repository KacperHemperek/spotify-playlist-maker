import { useEffect, useState } from "react";

function App() {
    const client_id = "71a0250dc8674aa0b6d49ec82695bfab";
    const redirect = "http://localhost:3000";
    const auth = "https://accounts.spotify.com/authorize";
    const type = "token";

    const [spotifyToken, setSpotifyToken] = useState("");

    useEffect(() => {
        const hash = window.location.hash;

        const token = hash.substring(1).split("&")[0].split("=")[1];

        setSpotifyToken(token);
    }, []);

    useEffect(() => {
        console.log(spotifyToken);

        const fetchArtist = async () => {
            const res = await fetch(
                `https://api.spotify.com/v1/artists/5K4W6rqBFWDnAN6FQUkS6x`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + spotifyToken,
                    },
                }
            );
            const data = await res.json();
            console.log(data);
        };
        fetchArtist();
    }, [spotifyToken]);

    return (
        <div className="App text-center ">
            <a
                className="btn btn-primary mt-5"
                href={`${auth}?response_type=${type}&client_id=${client_id}&redirect_uri=${redirect}`}
            >
                Log in
            </a>
        </div>
    );
}

export default App;
