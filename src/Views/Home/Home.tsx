import React from "react";
import { Link } from "react-router-dom";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Home = () => {
  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        component="h1"
        fontWeight="bold"
        color="primary"
        marginBottom={2}
      >
        Bem vindo ao BuscadorCEP!
      </Typography>

      <Typography>
        O aplicativo BuscadorCEP! permite que você encontre códigos de
        endereçamento postais (CEP).
        <br />
        Se você já tiver o CEP em mãos e gostaria de buscar em seu endereço, o
        BuscadorCEP! também vai te ajudar.
        <br />
        Aproveite! =D
      </Typography>

      <Box sx={{ display: "flex", gap: "16px", marginTop: "16px" }}>
        <Link to="/BuscadorCEP/BuscarEndereco">
          <Button variant="contained">BUSCAR ENDEREÇO</Button>
        </Link>
        <Link to="/BuscadorCEP/BuscarCEP">
          <Button variant="outlined">BUSCAR CEP</Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Home;
