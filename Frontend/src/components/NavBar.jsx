import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <a
          className="navbar-brand"
          target="_blank"
          href="http://127.0.0.1:8000/docs"
        >
          FastAPI App, using React
        </a>
      </div>
    </nav>
  );
};

export default Navbar
