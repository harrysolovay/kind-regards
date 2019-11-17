import { Reporter } from "../src";
import { join } from "path";

const report = Reporter({
  verbose: true,
  debug: true,
  documentation: join(__dirname, "DIAGNOSTICS.md"),
});

report.diagnostic({
  category: "warning",
  message: "Warning Log",
  file: __filename,
});

report.diagnostic({
  category: "error",
  message: "Recoverable error log",
  file: __filename,
  recoverable: true,
});

report.info("Info log");
report.verbose("Verbose-mode only log");
report.success("Success log");

const a = {
  b: {
    c: {
      d: () => console.log("e"),
    },
  },
};
// @ts-ignore
a.b.c.f = a;
report.debug(a);

report.diagnostic({
  category: "error",
  message: "Unrecoverable error log",
  file: __filename,
});
