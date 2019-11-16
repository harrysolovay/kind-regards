# Kind Regards,

## Why?

Because it's kind to...

- maintain consistency when your API produces logs alongside others.
- be concise when displaying varying kinds of logs to users.
- offer your users `silent`, `verbose`, and `debug` modes.
- offer serialization, highlighting, and pretty-printing of code & other data (circularities included).

Between warnings, errors, one-off console logs, progress indicators, verbose/debug-mode logs, code frames, circular object printing, and their related documentation and suggestions... there's actually a lot of complexity to manage. `kind-regards` takes care of this complexity, letting you focus more on your API, and less on the implementation and conventions of CLI output.

## Installation

```sh
npm i kind-regards
```

... or install directly from GitHub:

```sh
npm i git+https://git@github.com/harrysolovay/kind-regards.git
```

## Instantiation

```ts
import { Reporter } from "kind-regards";

const report = new Reporter();
```

### Configuration Options

The `Reporter` constructor accepts an optional object with the following properties.

| Key | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `documentation` | `string | Falsy` | `undefined` | Relative path to a document, at which a fragment identifier (supplied in a given diagnostic) can be appended. |
| `silent` | `boolean | Falsy` | `undefined` | Disables all logging (which is especially useful in publicly-accessible CI/CD environments). |
| `verbose` | `boolean | Falsy` | `undefined` | When false, `report.verbose` logs will be hidden. |
| `debug` | `boolean | Falsy` | `undefined` | When false, `report.debug` logs will be hidden. |

#### For instance...

```ts
import { Reporter } from "kind-regards";
import { join } from "path";

const report = new Reporter({
  verbose: true,
  debug: true,
  documentation: join(__dirname, "../CODES.md"),
});
```

## Methods

Every `Reporter` instance has the following methods.

- [debug](#debug): description
- [diagnostic](#diagnostic): description
- [info](#info): description
- [pending](#pending): description
- [step](#step): description
- [success](#success): description
- [verbose](#verbose): description

---

<a name="info"></a>

### `info`

<br />

#### Description

Outputs the concatenation of `items`.

<br />

#### Signature

`info(...items: (string | false | undefined | null)[]): void`

<br />

#### Example

```ts
report.info("Compiling...");
```

... outputs the following.

<img src="readme-assets/info.png" />

---
