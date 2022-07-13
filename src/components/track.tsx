import React from "react";
import { Card } from "react-bootstrap";

type TrackProp = {
    authors: any[];
    title: string;
    img: string;
    uri: string;
};

const Track = ({ authors, title, img, uri }: TrackProp) => {
    const centerText = {
        display: "flex",
        alignItems: "center",
        margin: "0 2rem",
    };

    return (
        <a href={uri} style={{ textDecoration: "none" }} className="text-dark">
            <Card className="py-3 px-4 mb-3">
                <div
                    style={{
                        display: "flex",

                        alignItems: "center",
                    }}
                >
                    <img
                        width={"60px"}
                        height={"60px"}
                        style={{ borderRadius: "100%" }}
                        alt={`track-${title}`}
                        src={img}
                    />

                    <div>
                        <h5 style={centerText}>{title}</h5>

                        <p style={centerText}>
                            {authors.length > 2
                                ? [authors[0], authors[1]]
                                      .join(", ")
                                      .concat(" ...")
                                : authors.join(", ")}
                        </p>
                    </div>
                </div>
            </Card>
        </a>
    );
};

export default Track;
