"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductionConfig {
    constructor() {
        this.port = parseInt(process.env.PORT, 10) || 9001;
    }
}
exports.ProductionConfig = ProductionConfig;
