import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "server-only": path.resolve(root, "tests/vacio.ts"),
      "@": root,
    },
  },
  test: {
    // Las pruebas de Firestore necesitan el simulador: npm run test:firestore
    exclude: ["node_modules/**", process.env.FIRESTORE_EMULATOR_HOST ? "" : "tests/firestore.test.ts"].filter(Boolean),
  },
});
