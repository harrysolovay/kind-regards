export interface Config {
  debug?: boolean;
  silent?: boolean;
  verbose?: boolean;
  documentation?: string;
}

export interface Diagnostic {
  category: "warning" | "error";
  message: string;
  file?: string;
  documentation?: string;
  recoverable?: boolean;
}

export type Identity = <T>(data: T) => T;

export interface Reporter {
  info: Identity;
}
