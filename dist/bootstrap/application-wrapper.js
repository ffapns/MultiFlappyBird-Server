"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const compression = require("compression");
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const logger = require("winston");
class ApplicationWrapper {
    constructor(config) {
        this.config = config;
        this.app = express();
        this.app.use(compression());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(morgan("dev"));
        // this.app.use(express.static(this.app.get("appPath")));
        this.app.use((err, req, res, next) => {
            if (err) {
                logger.error(err.message);
                logger.error(err.stack);
            }
        });
        this.server = http.createServer(this.app);
    }
    start(callback = () => null) {
        this.server.listen(this.config.port, () => {
            logger.info(`Express server listening on ${this.config.port}, in ${process.env.NODE_ENV} mode`);
            callback();
        });
    }
    configure(func = () => null) {
        func(this.app);
    }
    get Server() {
        return this.server;
    }
}
exports.ApplicationWrapper = ApplicationWrapper;
