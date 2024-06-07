import React from "react";
import "./spinner.css";

export default function Spinner() {
  return (
    <div className="loading">
      <div className="container">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  );
}
