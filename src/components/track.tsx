import React from "react";
import { ListGroup } from "react-bootstrap";

type TrackProp = {
    authors: any[];
    title: string;
    img: string;
    id: string;
};

const Track = ({ authors, title, img, id }: TrackProp) => {
    return (
        <ListGroup.Item>
            <div>
                {/* <table>
                    <tbody>
                        <tr>
                            <th>
                                <img
                                    alt={`track-${title}`}
                                    src={img}
                                    width="50"
                                    height="50"
                                />
                            </th>
                            <th>{title}</th>
                            <th>{authors.join(", ")}</th>
                        </tr>
                    </tbody>
                </table> */}
                {title}
            </div>
        </ListGroup.Item>
    );
};

export default Track;
