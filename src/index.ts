import { Config, Diagnostic } from "./types";
import chalk from "chalk";
import { highlight } from "cli-highlight";
import { join } from "path";
import { stringify } from "javascript-stringify";
import indent from "indent-string";
import symbols from "log-symbols";

const {
  error: errorSymbol,
  info: infoSymbol,
  success: successSymbol,
  warning: warningSymbol,
} = symbols;

const symbolByDiagnosticCategory = {
  warning: warningSymbol,
  error: errorSymbol,
};

const pretty = <T>(data: T): string | undefined => {
  const serialized = stringify(data, null, 2, { references: true });
  const highlighted =
    serialized && highlight(serialized, { language: "javascript" });
  return highlighted;
};

const format = <T>(data: T): string => {
  const type = typeof data;
  switch (type) {
    case "object":
      return `${"\n"}${indent(pretty(data) || "", 3)}`;
    default:
      return String(data);
  }
};

type Mode = "silent" | "debug" | "verbose";
export const Reporter = (config?: Config) => {
  console.log("\n");

  const globalDocumentation = config && config.documentation;
  const [silentMode, debugMode, verboseMode] = ([
    "silent",
    "debug",
    "verbose",
  ] as Mode[]).map((e) => !config || config[e]);

  const log = <T>(data: T, prefix = "") => {
    if (!silentMode) {
      const formatted = format(data);
      console.log(`${prefix} `, formatted, "\n");
    }
  };

  const debug = <T>(data: T): T => {
    debugMode && log(data, infoSymbol);
    return data;
  };

  const diagnostic = (d: Diagnostic) => {
    const { category, message, file, documentation, recoverable } = d;
    if (!silentMode) {
      const docs = globalDocumentation || documentation;
      !docs &&
        diagnostic({
          category: "error",
          message: `Must specify documentation, either in "Reporter" constructor or diagnostic props`,
          recoverable: false,
          documentation: join(__dirname, "../DIAGNOSTICS.md"),
          file:
            (module && module.parent && module.parent.filename) || undefined,
        });

      const symbol = symbolByDiagnosticCategory[category];

      console.log(
        symbol,
        chalk.bold(` ${message}`),
        chalk.dim(`(explained in ${docs})`),
        "\n",
        file ? `  ${category} source --> ${file}` : "",
        "\n",
      );
      category === "error" && !recoverable && process.exit(0);
    }
  };

  const info = <T>(data: T): T => {
    log(data, infoSymbol);
    return data;
  };

  const success = <T>(data: T): T => {
    log(data, successSymbol);
    return data;
  };

  const verbose = <T>(data: T): T => {
    verboseMode && log(data, infoSymbol);
    return data;
  };

  return {
    debug,
    diagnostic,
    info,
    success,
    verbose,
  };
};
