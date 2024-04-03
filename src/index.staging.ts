import { app } from "./index";
import path from "path";
import express from "express";
import swaggerUi from "swagger-ui-express";
require("dotenv").config();

const swaggerSpec = require("./swagger-spec.json");

app.get("/swagger-ui-init.js", (_req, res) => {
  const script = `
    window.onload = function () {
      const ui = SwaggerUIBundle({
        url: "/swagger-spec.json",
        dom_id: "#swagger-ui",
        presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
        layout: "StandaloneLayout",
        onComplete: () => {
          ui.preauthorizeApiKey(
            "Bearer",
            \`Bearer ${process.env.CLERK_LONG_LIVE_JWT}\`
          );
        },
      });
    };
  `;
  res.type("text/javascript").send(script);
});

app.use(
  "/swagger-spec.json",
  express.static(path.join(__dirname, "/swagger-spec.json"))
);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customJs: "/swagger-ui-init.js",
  })
);

export { app };
