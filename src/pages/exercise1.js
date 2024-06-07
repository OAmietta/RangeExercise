import React, { useState, useEffect } from "react";
import Range from "../components/range/Range";
import { services } from "@/services";
import Link from "next/link";

const Exercise1 = () => {
  return (
    <div>
      <h1>Exercise 1: Normal Range</h1>
      <Range />
      <ul>
        <li>
          <Link href="/exercise2">Exercise 2</Link>
        </li>
      </ul>
    </div>
  );
};

export default Exercise1;
