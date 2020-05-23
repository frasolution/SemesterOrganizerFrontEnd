import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div>
      <p>Oops... Something went wrong</p>
      <Link to="/">Return Home</Link>
    </div>
  );
}
