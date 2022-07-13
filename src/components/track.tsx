import React from "react";

type TrackProp = {
    authors: any[];
    title: string;
    img: string;
    id: string;
};

const TrackCard = ({ authors, title, img, id }: TrackProp) => {
    return (
        <div className="track-container" key={id}>
            <table>
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
            </table>
        </div>
    );
};

export default TrackCard;
