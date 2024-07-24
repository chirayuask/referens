import Server from "./server.js";

const { app, server_port } = new Server();

app.listen(server_port, () => {
  console.log("Server is listening on port ", server_port);
});
