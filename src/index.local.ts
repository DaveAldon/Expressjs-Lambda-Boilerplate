import { app } from "./index.staging";
import https from "https";
import fs from "fs";
import path from "path";

const port = 443;
const httpsOptions = {
  key: fs.readFileSync(
    path.resolve(__dirname, "../certificates/server-certificates/device.key")
  ),
  cert: fs.readFileSync(
    path.resolve(__dirname, "../certificates/server-certificates/localhost.crt")
  ),
};

const server = https.createServer(httpsOptions, app);
server.listen(port, () => {
  console.log(`App listening at https://localhost/api-docs`);
});

process.on("SIGTSTP", () => {
  server.close(() => {
    console.log(`Server closed. Port ${port} freed up.`);
    process.exit(0);
  });
});

export { app };
