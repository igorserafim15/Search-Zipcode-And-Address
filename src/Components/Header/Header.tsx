import React from "react";

import { Link } from "react-router-dom";
import './Header.css'

import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Header = () => {
  return (
    <AppBar color="default" elevation={0} className='header'>
      <Toolbar>
        <Container maxWidth="md">
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link to="/">
              <Typography fontWeight="bold" variant="h5" component="span" color='grey'>
                BuscadorCEP!
              </Typography>
            </Link>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <Link to="/BuscadorCEP/BuscarEndereco">
                <Button>Buscar Endereço</Button>
              </Link>
              <Link to="/BuscadorCEP/BuscarCEP">
                <Button>Buscar CEP</Button>
              </Link>
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
