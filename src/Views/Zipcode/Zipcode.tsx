import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../Utils/useFetch";
import useForm from "../../Utils/useForm";
import "./Zipcode.css";

import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "../../Components/Input/Input";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { Address, Convert } from "../../types/Address";

const Zipcode = () => {
  const { request, loading } = useFetch();
  const cep = useForm("cep");
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = React.useState<null | Address>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cep.validate()) {
      const data = await request(`https://viacep.com.br/ws/${cep.value}/json/`);
      if (data !== null && Object.keys(data).length !== 0) {
        const convert = Convert.toAddress(JSON.stringify(data));
        setAddress(convert);
        setOpen(true);
      }
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/">
            <Button>Início</Button>
          </Link>
          <Typography color="text.primary">Buscar Endereço</Typography>
        </Breadcrumbs>
        <form onSubmit={handleSubmit}>
          <Input label="CEP" id="cep" {...cep} />
          <Box sx={{ display: "flex", gap: "16px", marginTop: "12px" }}>
            <Button disabled={loading} variant="contained" type="submit">
              {!loading ? "BUSCAR" : <CircularProgress size={20} />}
            </Button>
            <Link to="/">
              <Button variant="text">VOLTAR</Button>
            </Link>
          </Box>
        </form>
      </Container>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <Typography variant="h6" component="h2">
            Resultados para o CEP: {address?.cep}
          </Typography>
          <Typography>
            <strong>Logradouro:</strong> {address?.logradouro} <br />
            <strong>Município / UF:</strong> {address?.localidade} {address?.uf}
            <br />
            <strong>Bairro:</strong> {address?.bairro}
            <br />
            <strong>CEP:</strong> {address?.cep}
            <br />
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Zipcode;
