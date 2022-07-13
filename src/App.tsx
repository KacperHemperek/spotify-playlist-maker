import Button from "react-bootstrap/esm/Button";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import { getSearchResults, getMultipleTracks } from "./utils/Spotify.utils";

const App = (): JSX.Element => {
    const client_id = "71a0250dc8674aa0b6d49ec82695bfab";
    const redirect = "http://localhost:3000";
    const auth = "https://accounts.spotify.com/authorize";
    const type = "token";
    const searchRef = useRef<HTMLInputElement>(null);
    const [spotifyToken, setSpotifyToken] = useState("");

    useEffect(() => {
        const hash = window.location.hash;

        const token = hash.substring(1).split("&")[0].split("=")[1];

        setSpotifyToken(token);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchRef.current?.value) {
            try {
                const searchResult = await getMultipleTracks(
                    searchRef.current.value,
                    spotifyToken
                );
                searchResult.forEach((result) => {
                    console.log(result?.name);
                });
            } catch (err) {
                console.error(err);
            }
        }
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
};

export default App;
