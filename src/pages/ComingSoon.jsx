import React from "react";
import { Link } from "react-router-dom";

export default function ComingSoon({ title = "Page Coming Soon" }) {
  return (
    <main className="coming-soon-page">
      <section className="coming-soon-card">
        <p className="eyebrow">In Progress</p>

        <h1>{title}</h1>

        <p className="coming-soon-text">
          We are currently working on making this page live. Please check back soon.
        </p>

        <Link to="/" className="coming-soon-button">
          Back to Home
        </Link>
      </section>
    </main>
  );
}