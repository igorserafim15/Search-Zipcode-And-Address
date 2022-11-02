export interface Cep {
  bairro:      string;
  cep:         string;
  complemento: string;
  ddd:         string;
  gia:         string;
  ibge:        string;
  localidade:  string;
  logradouro:  string;
  siafi:       string;
  uf:          string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toCep(json: string): Cep {
      return JSON.parse(json);
  }

  public static cepToJson(value: Cep): string {
      return JSON.stringify(value);
  }
}
