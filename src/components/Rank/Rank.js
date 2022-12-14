import React from "react";
import "./Rank.css";

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className="white f3">{`${name}, your currently uploaded ${entries} videos.`}</div>
    </div>
  );
};

export default Rank;
