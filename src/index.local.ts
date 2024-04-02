import { app } from "./index";
import https from "https";
import fs from "fs";
import path from "path";
import express from "express";
import swaggerUi from "swagger-ui-express";

const swaggerSpec = require("./swagger-spec.json");

const port = 8080;

const httpsOptions = {
  key: fs.readFileSync(path.resolve(__dirname, "../certificates/key.pem")),
  cert: fs.readFileSync(path.resolve(__dirname, "../certificates/cert.pem")),
};

const server = https.createServer(httpsOptions, app);

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

server.listen(port, () => {
  console.log(`App listening at https://localhost:${port}/api-docs`);
});
