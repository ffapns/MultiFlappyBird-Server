import * as cors from "cors";
import * as logger from "winston";
import { PlayerRouter } from "./api/players";
import { StageRouter } from "./api/stage";
import { ApplicationWrapper } from "./bootstrap/application-wrapper";
import { SocketIOManager } from "./bootstrap/socket-io-wrapper";
import { IConfig, ProductionConfig } from "./config/index";

const config: IConfig = new ProductionConfig();

const appWrapper = new ApplicationWrapper(config);
const socketIOWrapper = new SocketIOManager(appWrapper.Server);

appWrapper.configure((app) => {
    app.use(cors());
    logger.info("Configuring application routes");
    const stageRouter = new StageRouter();
    app.use("/stage", stageRouter.router);
    const playerRouter = new PlayerRouter(socketIOWrapper);
    app.use("/players", playerRouter.router);
});

appWrapper.start();
socketIOWrapper.start();

process.on("SIGTERM", () => {
    logger.info("Gracefully terminating");
    process.exit();
});
process.on("uncaughtException", (exception: Error) => {
    logger.error(exception.toString());
    logger.info(`Server stopped because of: ${exception.message}`);
    throw exception;
});
