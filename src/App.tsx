import Button from "react-bootstrap/esm/Button";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Col, Form, InputGroup, ListGroup, Modal, Row } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import { getSearchResults, getMultipleTracks } from "./utils/Spotify.utils";

export type Track = {
    title: string;
    author: string;
    img: string;
}

const App = (): JSX.Element => {
    const client_id = "71a0250dc8674aa0b6d49ec82695bfab";
    const redirect = "http://localhost:3000";
    const auth = "https://accounts.spotify.com/authorize";
    const type = "token";
    const textRef = useRef<HTMLTextAreaElement | null>(null);
    const [spotifyToken, setSpotifyToken] = useState<string>("");
    const [showPopup, setShowPopup] = useState<boolean>(false);

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
        console.log("cokolwiek");
        if (textRef.current?.value) {
            try {
                console.log("lalla");
                const searchResult = await getMultipleTracks(
                    textRef.current.value,
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

            <Container className="mx-md-5 p-3 p-md-5 mt-5 ">
                <Row className="g-5">
                    <Col md>
                        <Form onSubmit={handleSubmit}>
                            <Form.Control
                                ref={textRef}
                                as="textarea"
                                className=""
                                rows={4}
                            />
                            <Button
                                variant="success "
                                className="mt-4"
                                type="submit"
                            >
                                Create Playlist
                            </Button>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    );
};

export default App;
