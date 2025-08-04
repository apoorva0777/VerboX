import React from "react";
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="app-footer">
      <p>© {new Date().getFullYear()} VerboX Dictionary</p>
    </footer>
  );
}

export default Footer;
