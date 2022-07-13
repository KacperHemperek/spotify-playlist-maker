import React from "react";
import { Track } from "../App";

type TrackProp ={
  track: Track;
}


const TrackCard = ({ track }:TrackProp) => {
  const {authors, title, img, id} = track;
  return (
    <div className="track-container" key={id}>
      <table>
        <tr>
          <th> <img alt={`track-${title}`} src={img} width="50" height="50"/> </th>
          <th>{title}</th>
          <th>{authors.join(", ")}</th>
        </tr>
      </table>
    </div>
  );
};

export default TrackCard;