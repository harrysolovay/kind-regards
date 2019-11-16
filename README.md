# Kind Regards,

## Why?

Because it's kind to...

- be direct and selective about displaying varying kinds of logs to users.
- offer your users `silent`, `verbose`, and `debug` modes.
- offer serialization, highlighting, and pretty-printing of code & other data (circularities included).
- maintain consistency when your API produces logs alongside others.

Between warnings, errors, one-offs, progress indicators, verbose/debug-mode logs, code frames, circular object printing, and their related documentation and suggestions... there's actually a lot of complexity to manage. `kind-regards` takes care of this complexity, letting you focus more on your API, and less on the conventions of CLI output.

## Install

```sh
npm i kind-regards
```

... or install directly from GitHub:

```sh
npm i git+https://git@github.com/harrysolovay/kind-regards.git
```

## Instantiate

```ts
import {Reporter} from "kind-regards";

// configuration is optional
const report = new Reporter();
```

### Configuration Options

The `Reporter` constructor accepts an optional object of the following props.

| Key | Type | Default | Description |
| :--: | :--: | :--: | :-- |
| `documentation` | `string | Falsy` | `undefined` | Relative path to a document, at which a fragment identifier (supplied in a given diagnostic) can be appended. |
| `silent` | `boolean | Falsy` | `undefined` | Disables all logging (which is especially useful in publicly-accessible CI/CD environments). |
| `verbose` | `boolean | Falsy` | `undefined` | When false, `report.verbose` logs will be hidden. |
| `debug` | `boolean | Falsy` | `undefined` | When false, `report.debug` logs will be hidden. |

#### For instance...

```ts
import {Reporter} from "kind-regards";
import {join} from "path";

const report = new Reporter({
  verbose: true,
  debug: true,
  documentation: join(__dirname, "../CODES.md")
});
```

## Methods

* [debug](#debug): description
* [diagnostic](#diagnostic): description
* [info](#info): description
* [pending](#pending): description
* [step](#step): description
* [success](#success): description
* [verbose](#verbose): description

---

<a name="info"></a>

### `info`

> `info(...items: (string | false | undefined | null)[]): void`

Outputs the concatenation of `items`

#### Example Usage

```ts
report.info("Compiling...");
```

#### Example Output

<img src="readme-assets/info.png" />

---