import { Config, Diagnostic } from "./types";
export declare const Reporter: (config?: Config | undefined) => {
    debug: <T>(data: T) => T;
    diagnostic: (d: Diagnostic) => void;
    info: <T_1>(data: T_1) => T_1;
    success: <T_2>(data: T_2) => T_2;
    verbose: <T_3>(data: T_3) => T_3;
};
