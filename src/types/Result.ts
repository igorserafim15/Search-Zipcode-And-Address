export interface Result {
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
  public static toResult(json: string): Result[] {
      return JSON.parse(json);
  }

  public static ResultToJson(value: Result[]): string {
      return JSON.stringify(value);
  }
}
