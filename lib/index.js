"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const cli_highlight_1 = require("cli-highlight");
const path_1 = require("path");
const javascript_stringify_1 = require("javascript-stringify");
const indent_string_1 = __importDefault(require("indent-string"));
const log_symbols_1 = __importDefault(require("log-symbols"));
const { error: errorSymbol, info: infoSymbol, success: successSymbol, warning: warningSymbol, } = log_symbols_1.default;
const symbolByDiagnosticCategory = {
    warning: warningSymbol,
    error: errorSymbol,
};
const pretty = (data) => {
    const serialized = javascript_stringify_1.stringify(data, null, 2, { references: true });
    const highlighted = serialized && cli_highlight_1.highlight(serialized, { language: "javascript" });
    return highlighted;
};
const format = (data) => {
    const type = typeof data;
    switch (type) {
        case "object":
            return `${"\n"}${indent_string_1.default(pretty(data) || "", 3)}`;
        default:
            return String(data);
    }
};
exports.Reporter = (config) => {
    console.log("\n");
    const globalDocumentation = config && config.documentation;
    const [silentMode, debugMode, verboseMode] = [
        "silent",
        "debug",
        "verbose",
    ].map((e) => !config || config[e]);
    const log = (data, prefix = "") => {
        if (!silentMode) {
            const formatted = format(data);
            console.log(`${prefix} `, formatted, "\n");
        }
    };
    const debug = (data) => {
        debugMode && log(data, infoSymbol);
        return data;
    };
    const diagnostic = (d) => {
        const { category, message, file, documentation, recoverable } = d;
        if (!silentMode) {
            const docs = globalDocumentation || documentation;
            !docs &&
                diagnostic({
                    category: "error",
                    message: `Must specify documentation, either in "Reporter" constructor or diagnostic props`,
                    recoverable: false,
                    documentation: path_1.join(__dirname, "../DIAGNOSTICS.md"),
                    file: (module && module.parent && module.parent.filename) || undefined,
                });
            const symbol = symbolByDiagnosticCategory[category];
            console.log(symbol, chalk_1.default.bold(` ${message}`), chalk_1.default.dim(`(explained in ${docs})`), "\n", file ? `  ${category} source --> ${file}` : "", "\n");
            category === "error" && !recoverable && process.exit(0);
        }
    };
    const info = (data) => {
        log(data, infoSymbol);
        return data;
    };
    const success = (data) => {
        log(data, successSymbol);
        return data;
    };
    const verbose = (data) => {
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
