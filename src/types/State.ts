// To parse this data:
//
//   import { Convert, State } from "./file";
//
//   const state = Convert.toState(json);

export interface State {
  id:     number;
  sigla:  string;
  nome:   string;
  regiao: Regiao;
}

export interface Regiao {
  id:   number;
  sigla: string;
  nome:  string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toState(json: string): State[] {
      return JSON.parse(json);
  }

  public static stateToJson(value: State[]): string {
      return JSON.stringify(value);
  }
}
