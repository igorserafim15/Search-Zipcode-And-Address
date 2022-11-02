import { Link } from "react-router-dom";
import React from "react";
import "./Address.css";

import useForm from "../../Utils/useForm";
import useFetch from "../../Utils/useFetch";
import { Convert } from "../../types/State";
import { DistrictConvert } from "../../types/District";
import { Result, Convert as ResultConvert } from "../../types/Result";

import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Input from "../../Components/Input/Input";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";

type State = {
  label: string;
  uf: string;
};

const Address = () => {
  const { request, loading } = useFetch();
  const street = useForm("street");
  const [open, setOpen] = React.useState(false);

  const [listStates, setListStates] = React.useState<State[]>([]);
  const [state, setState] = React.useState<State | null>(null);
  const [listDistricts, setListDistricts] = React.useState<string[]>([]);
  const [district, setDistrict] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<Result[]>([]);

  React.useEffect(() => {
    const fetchListStates = async () => {
      const data = await request(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome",
      );
      if (data !== null && Object.keys(data).length !== 0) {
        const convert = Convert.toState(JSON.stringify(data));
        const optionsStates = convert.map((item) => {
          return { label: item.nome, uf: item.sigla };
        });
        setListStates(optionsStates);
      }
    };
    fetchListStates();
  }, [request]);

  React.useEffect(() => {
    if (state != null) {
      const fetchListDistricts = async () => {
        const data = await request(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.uf}/municipios?orderBy=nome`,
        );
        if (data !== null && Object.keys(data).length !== 0) {
          const convert = DistrictConvert.toDistrict(JSON.stringify(data));
          const optionsDistrict = convert.map((item) => {
            return item.nome;
          });
          setListDistricts(optionsDistrict);
        }
      };
      fetchListDistricts();
    }
  }, [request, state]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (street.validate()) {
      const data = await request(
        `https://viacep.com.br/ws/${state?.uf}/${district}/${street.value}/json`,
      );
      if (data !== null && Object.keys(data).length !== 0) {
        const convert = ResultConvert.toResult(JSON.stringify(data));
        setResult(convert);
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
          <Typography color="text.primary">Buscar CEP</Typography>
        </Breadcrumbs>
        <form onSubmit={handleSubmit}>
          <Autocomplete
            id="states"
            options={listStates}
            value={state}
            onChange={(
              event: React.SyntheticEvent<Element, Event>,
              value: State | null,
            ) => setState(value)}
            renderInput={(params) => (
              <TextField {...params} label="Estado" margin="normal" />
            )}
          />
          <Autocomplete
            id="districts"
            disabled={state == null}
            options={listDistricts}
            value={district}
            onChange={(
              event: React.SyntheticEvent<Element, Event>,
              value: string | null,
            ) => setDistrict(value)}
            renderInput={(params) => (
              <TextField {...params} label="Município" margin="normal" />
            )}
          />
          <Input
            id="street"
            label="Rua"
            disabled={district == null}
            {...street}
          />
          <Box sx={{ display: "flex", gap: "16px", marginTop: "12px" }}>
            <Button
              disabled={loading || state == null || district == null}
              variant="contained"
              type="submit"
            >
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
            Encontramos {result.length} resultado(s)
          </Typography>
          <div className="scroll">
            {result.map((item, index) => (
              <Card key={index} elevation={3} className="card">
                <Typography>
                  <strong>CEP:</strong> {item.cep}<br />
                  <strong>Município / UF:</strong>{item.localidade} {item.uf} <br />
                  <strong>Bairro:</strong> {item.bairro}<br />
                  <strong>Logradouro:</strong>{item.logradouro} <br />
                </Typography>
              </Card>
            ))}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Address;
