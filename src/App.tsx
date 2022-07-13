import Button from "react-bootstrap/esm/Button";
import React, { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { Col, Form, InputGroup, Modal, Row, Stack } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import { getMultipleTracks, createPlaylist, addToPlaylist } from "./utils/Spotify.utils";
import Track from "./components/Track";

const App = (): JSX.Element => {
    const client_id = "71a0250dc8674aa0b6d49ec82695bfab";
    const redirect = "http://localhost:3000";
    const auth = "https://accounts.spotify.com/authorize";
    const type = "token";
    const searchRef = useRef<HTMLInputElement | null>(null);
    const [spotifyToken, setSpotifyToken] = useState<string>("");
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const hash = window.location.hash;
        if (!hash) {
            setShowPopup(true);
        }

        const token = hash.substring(1).split("&")[0].split("=")[1];

        setSpotifyToken(token);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchRef.current?.value) {
            try {
                setLoading(true);
                const res = await getMultipleTracks(
                    searchRef.current.value,
                    spotifyToken
                );
                console.log(res);
                setSearchResults(res);
                const playlistID = await createPlaylist(spotifyToken);
                addToPlaylist(spotifyToken, playlistID, res);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setSearchValue(e.target.value);
    };

    return (
        <div className="App ">
            <Modal show={showPopup} backdrop="static" centered>
                <Modal.Header>
                    <Modal.Title>
                        You have to log in with your spotify to use App
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <a
                        className="btn btn-primary "
                        href={`${auth}?response_type=${type}&client_id=${client_id}&redirect_uri=${redirect}`}
                    >
                        Log in
                    </a>
                </Modal.Footer>
            </Modal>

            <Container className="mx-md-5 p-3 p-md-5 mt-5 text-center">
                <Row className="g-5">
                    <Col md="7">
                        <Form onSubmit={handleSubmit}>
                            <InputGroup>
                                <Form.Control
                                    ref={searchRef}
                                    type="text"
                                    onChange={handleChange}
                                />
                                <Button
                                    variant="success"
                                    type="submit"
                                    disabled={searchRef.current?.value === ""}
                                >
                                    {loading ? "Loading..." : "Create Playlist"}
                                </Button>
                            </InputGroup>
                        </Form>
                    </Col>
                    <Col md="5">
                        <Stack>
                            {searchResults.map(
                                ({ artists, name, album, uri }, idx) => (
                                    <Track
                                        authors={artists.map(
                                            (item: any) => item.name
                                        )}
                                        title={name}
                                        img={album.images[2].url}
                                        key={idx}
                                        uri={uri}
                                    />
                                )
                            )}
                        </Stack>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default App;
