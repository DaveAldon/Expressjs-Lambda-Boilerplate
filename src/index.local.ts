import { app } from "./index";

const port = 8080;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}/api-docs`);
});
