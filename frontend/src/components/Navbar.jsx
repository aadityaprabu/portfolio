import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar bg-transparent flex justify-center">
      <ul className="flex space-x-4 p-4 bg-transparent text-[var(--primary)] justify-center">
        <li>
          <Link to="/">Welcome</Link>
        </li>
        <li>
          <Link to="/resume">Resume</Link>
        </li>
        <li>
          <Link to="/work">Work</Link>
        </li>

        <li>
          <Link to="/education">Education</Link>
        </li>
        <li>
          <Link to="/project">Project</Link>
        </li>
        {/* <li>
          <Link to="/other">Other</Link>
        </li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
