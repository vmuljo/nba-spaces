import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="navbar bg-light mb-2">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" style={{margin: "0 auto"}}>
          NBA Spaces
        </Link>
      </div>
    </nav>
  );
}
