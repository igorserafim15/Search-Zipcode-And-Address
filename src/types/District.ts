// To parse this data:
//
//   import { Convert } from "./file";
//
//   const district = Convert.toDistrict(json);

export interface District {
  id:             number;
  nome:           string;
  microrregiao:   Microrregiao;
  regiaoImediata: RegiaoImediata;
}

export interface Microrregiao {
  id:          number;
  nome:        string;
  mesorregiao: Mesorregiao;
}

export interface Mesorregiao {
  id:   number;
  nome: string;
  uf:   Uf;
}

export interface Uf {
  id:      number;
  sigla:   string;
  nome:    string;
  regiao?: Uf;
}

export interface RegiaoImediata {
  id:                  number;
  nome:                string;
  regiaoIntermediaria: Mesorregiao;
}

// Converts JSON strings to/from your types
export class DistrictConvert {
  public static toDistrict(json: string): District[] {
      return JSON.parse(json);
  }

  public static districtToJson(value: District[]): string {
      return JSON.stringify(value);
  }
}