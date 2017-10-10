"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
const logger = require("winston");
const players_1 = require("./api/players");
const stage_1 = require("./api/stage");
const application_wrapper_1 = require("./bootstrap/application-wrapper");
const socket_io_wrapper_1 = require("./bootstrap/socket-io-wrapper");
const index_1 = require("./config/index");
const config = new index_1.ProductionConfig();
const appWrapper = new application_wrapper_1.ApplicationWrapper(config);
const socketIOWrapper = new socket_io_wrapper_1.SocketIOManager(appWrapper.Server);
appWrapper.configure((app) => {
    app.use(cors());
    logger.info("Configuring application routes");
    const stageRouter = new stage_1.StageRouter();
    app.use("/stage", stageRouter.router);
    const playerRouter = new players_1.PlayerRouter(socketIOWrapper);
    app.use("/players", playerRouter.router);
});
appWrapper.start();
socketIOWrapper.start();
process.on("SIGTERM", () => {
    logger.info("Gracefully terminating");
    process.exit();
});
process.on("uncaughtException", (exception) => {
    logger.error(exception.toString());
    logger.info(`Server stopped because of: ${exception.message}`);
    throw exception;
});
