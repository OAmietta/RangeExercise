import React from "react";
import "./globals.css";

export const metadata = {
  title: "Range Exercise App",
  description:
    "Small app created to solve 2 exercises with a range component and its tests.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
