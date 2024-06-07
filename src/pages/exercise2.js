import React, { useState, useEffect } from "react";
import Range from "../components/range/Range";
import Link from "next/link";

const Exercise2 = () => {
  return (
    <div>
      <h1>Exercise 2: Fixed Values Range</h1>
      <Range editableInputs={false} fixedValues={true} />
      <ul>
        <li>
          <Link href="/exercise1">Exercise 1</Link>
        </li>
      </ul>
    </div>
  );
};

export default Exercise2;
