export interface Address {
  cep:         string;
  logradouro:  string;
  complemento: string;
  bairro:      string;
  localidade:  string;
  uf:          string;
  ibge:        string;
  gia:         string;
  ddd:         string;
  siafi:       string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toAddress(json: string): Address {
      return JSON.parse(json);
  }

  public static addressToJson(value: Address): string {
      return JSON.stringify(value);
  }
}
