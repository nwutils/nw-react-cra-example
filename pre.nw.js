import fs from "node:fs";

// TODO(ayushmanchhabra): Remove this once managed manifest mode in nw-builder is fixed.
await fs.promises.copyFile("./package.nw.json", "./out/react/package.json");
