"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { PlayerController } from "./controller";
class PlayerRouter {
    constructor(socketIOManager) {
        this.router = express_1.Router();
        this.router.get("/", (req, res) => {
            res.status(200).json(socketIOManager.currentPlayers);
        });
        this.router.get("/stats", (req, res) => {
            res.status(200).json({
                count: socketIOManager.currentPlayers.length,
            });
        });
    }
}
exports.PlayerRouter = PlayerRouter;
