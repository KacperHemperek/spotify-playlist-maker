import Button from "react-bootstrap/esm/Button";

import { useEffect, useRef, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import useSpotify from "./hooks/useSpotify";
function App() {
    const client_id = "71a0250dc8674aa0b6d49ec82695bfab";
    const redirect = "http://localhost:3000";
    const auth = "https://accounts.spotify.com/authorize";
    const type = "token";
    const searchRef = useRef();
    const [spotifyToken, setSpotifyToken] = useState("");
    const { getSearchResults } = useSpotify();

    useEffect(() => {
        const hash = window.location.hash;

        const token = hash.substring(1).split("&")[0].split("=")[1];

        setSpotifyToken(token);
    }, []);

    useEffect(() => {
        // const fetchArtist = async () => {
        //     const res = await fetch(
        //         `https://api.spotify.com/v1/search?q=Hi&type=track`,
        //         {
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 Authorization: "Bearer " + spotifyToken,
        //             },
        //         }
        //     );
        //     const data = await res.json();
        //     console.log(data.tracks.items);
        // };
        // fetchArtist();
    }, [spotifyToken]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(searchRef.current.value);
        getSearchResults(
            searchRef.current.value,
            spotifyToken,
            "track",
            null,
            50
        );
    };

    return (
        <div className="App text-center">
            <Container className="mt-5 p-5">
                <Form onSubmit={handleSubmit}>
                    <InputGroup>
                        <Form.Control
                            placeholder="Search"
                            ref={searchRef}
                            type="text"
                            className=""
                        />
                        <Button
                            variant="success "
                            className="btn-lg"
                            type="submit"
                        >
                            Search
                        </Button>
                    </InputGroup>
                </Form>

                <a
                    className="btn btn-primary mt-5"
                    href={`${auth}?response_type=${type}&client_id=${client_id}&redirect_uri=${redirect}`}
                >
                    Log in
                </a>
            </Container>
        </div>
    );
}

export default App;
