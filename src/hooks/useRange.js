import { services } from "../services/index";
import React, { useState, useEffect } from "react";
import { typeMax } from "../utils/constants";

export default function useRange({ fixedValues, editableInputs }) {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [fixedValuesArray, setFixedValuesArray] = useState([]);
  const [isDraggingMin, setIsDraggingMin] = useState(false);
  const [isDraggingMax, setIsDraggingMax] = useState(false);
  const [initialMin, setInitialMin] = useState(null);
  const [initialMax, setInitialMax] = useState(null);

  useEffect(() => {
    if (minValue !== initialMin) {
      setMinValue(initialMin);
    }
    if (maxValue !== initialMax) {
      setMaxValue(initialMax);
    }
  }, [initialMin, initialMax]);

  useEffect(() => {
    if (!fixedValues) {
      services
        .getMinMaxValues()
        .then((res) => {
          setInitialMin(res.min);
          setInitialMax(res.max);
        })
        .catch((error) => {
          throw new Error(error);
        });
    } else {
      services
        .getRangeValues()
        .then((res) => {
          setFixedValuesArray(res.values);
          setInitialMin(res.values[0]);
          setInitialMax(res.values[res.values.length - 1]);
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  }, []);

  const handleMouseDownMin = () => {
    setIsDraggingMin(true);
  };

  const handleMouseDownMax = () => {
    setIsDraggingMax(true);
  };

  const snapToClosestFixedValue = (value) => {
    return fixedValuesArray.reduce((prev, curr) => {
      return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
    });
  };

  const handleMouseMove = (e) => {
    if (isDraggingMin || isDraggingMax) {
      const rect = e.currentTarget.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const percentage = (offsetX / rect.width) * 100;

      let newValue =
        (initialMax - initialMin) * (percentage / 100) + initialMin;
      newValue = Math.max(initialMin, Math.min(initialMax, newValue));

      if (fixedValues) {
        newValue = snapToClosestFixedValue(newValue);
      }

      if (isDraggingMin) {
        setMinValue(Math.min(newValue, maxValue));
      } else if (isDraggingMax) {
        setMaxValue(Math.max(newValue, minValue));
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingMin(false);
    setIsDraggingMax(false);
  };

  const handleInputChange = (e, inputType) => {
    if (!editableInputs) return;
    let value = parseFloat(e.target.value);
    value = Math.max(
      inputType == typeMax ? minValue + 0.01 : initialMin + 0.01,
      value
    );
    value = Math.min(
      inputType == typeMax ? initialMax - 0.01 : maxValue - 0.01,
      value
    );
    if (!isNaN(value)) {
      if (fixedValues) {
        value = snapToClosestFixedValue(value);
      }
      if (inputType == typeMax) {
        setMaxValue(parseFloat(value.toFixed(2)));
      } else {
        setMinValue(parseFloat(value.toFixed(2)));
      }
    }
  };

  return {
    initialMin,
    initialMax,
    minValue,
    maxValue,
    handleInputChange,
    handleMouseMove,
    handleMouseUp,
    handleMouseDownMin,
    handleMouseDownMax,
  };
}
