"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const server_1 = require("../config/server");
app_1.app.set("port", server_1.serverConfig.port);
app_1.app.listen(app_1.app.get("port"), () => {
    console.log(`[${process.pid}] - Listening in http://localhost:${app_1.app.get("port")}`);
});
