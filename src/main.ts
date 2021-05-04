import { app } from "./app";
import http from "http";
import winstonLogger from "./startup/logger";
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT);
server.on("listening", () => {
  winstonLogger.info(
    `${process.env.NODE_ENV || "dev"} server up listening on PORT ${PORT}`
  );
});
