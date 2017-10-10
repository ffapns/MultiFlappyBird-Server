"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductionConfig {
    constructor() {
        this.port = process.env.PORT || 9001;
    }
}
exports.ProductionConfig = ProductionConfig;
