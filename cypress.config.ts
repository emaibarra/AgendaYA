import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Busca cualquier archivo .cy.js en cualquier subcarpeta dentro de cypress
    specPattern: "cypress/**/*.cy.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:3000",
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});