import React from "react";
import "./Range.css";
import Spinner from "../spinner/Spinner";
import useRange from "../../hooks/useRange";
import { typeMax, typeMin } from "../../utils/constants";

const Range = ({ editableInputs = true, fixedValues = false }) => {
  const {
    initialMin,
    initialMax,
    minValue,
    maxValue,
    handleInputChange,
    handleMouseMove,
    handleMouseUp,
    handleMouseDownMin,
    handleMouseDownMax,
  } = useRange({ fixedValues, editableInputs });

  if (initialMin != null && initialMax != null) {
    return (
      <div className="container">
        <section className="input-container">
          <span className="euro-span">€</span>
          <input
            type="number"
            data-testid="min-value"
            value={parseFloat(minValue).toFixed(2)}
            onChange={(e) => handleInputChange(e, typeMin)}
            className="slider-input slider-input-min"
            disabled={!editableInputs}
          />
        </section>
        <section
          className="slider-container"
          onMouseMove={(e) => handleMouseMove(e)}
          onMouseUp={handleMouseUp}
        >
          <div
            className="slider-bar"
            style={{
              left: `${
                ((minValue - initialMin) / (initialMax - initialMin)) * 100
              }%`,
              width: `${
                ((maxValue - minValue) / (initialMax - initialMin)) * 100
              }%`,
            }}
          />
          <div
            className="slider-thumb slider-thumb-min"
            data-testid="slider-thumb-min"
            style={{
              left: `${
                ((minValue - initialMin) / (initialMax - initialMin)) * 100
              }%`,
            }}
            onMouseDown={handleMouseDownMin}
          />
          <div
            className="slider-thumb slider-thumb-max"
            data-testid="slider-thumb-max"
            style={{
              left: `${
                ((maxValue - initialMin) / (initialMax - initialMin)) * 100
              }%`,
            }}
            onMouseDown={handleMouseDownMax}
          />
        </section>
        <section className="input-container">
          <span className="euro-span">€</span>
          <input
            type="number"
            data-testid="max-value"
            value={parseFloat(maxValue).toFixed(2)}
            onChange={(e) => handleInputChange(e, typeMax)}
            className="slider-input slider-input-max"
            disabled={!editableInputs}
          />
        </section>
      </div>
    );
  } else {
    return (
      <div className="container">
        <Spinner />
      </div>
    );
  }
};

export default Range;
