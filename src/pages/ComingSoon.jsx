import { Link } from "react-router-dom";

export default function ComingSoon({ title = "Page Coming Soon" }) {
  return (
    <main className="coming-soon-page">
      <section className="coming-soon-card">
        <h1>{title}</h1>

        <Link to="/" className="coming-soon-button">
          Back to Home
        </Link>
      </section>
    </main>
  );
}