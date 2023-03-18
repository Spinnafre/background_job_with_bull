import { app } from "./app";
import { ServerConfig } from "./config";

app.set("port", ServerConfig.port);

const server = app.listen(app.get("port"), () => {
  console.log(
    `[${process.pid}] - Listening in http://localhost:${app.get("port")}`
  );
});

function handle(signal: any) {
  console.log(`Received signal: ${signal}`);

  server.close((err) => {
    process.exit(signal);
  });

  setTimeout(() => {
    process.exit(0);
  }, 1000).unref();
}

process.on("SIGHUP", handle);
process.on("SIGTERM", handle);
process.on("SIGINT", handle);

process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

process.on("exit", (signal) => {
  console.log(`Proccess exited with signal : ${signal}`);
});
