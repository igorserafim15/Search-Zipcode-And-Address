import React from "react";
import "./Footer.css";

import Container from "@mui/material/Container";

const Footer = () => {
  return (
    <footer className="footer">
      <Container maxWidth="md">
        <strong>{new Date().getFullYear()} - BuscadorCEP!</strong>
      </Container>
    </footer>
  );
};

export default Footer;
