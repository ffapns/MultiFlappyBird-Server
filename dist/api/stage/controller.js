"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let stage = new Array();
function generateStage(count) {
    for (let i = 0; i < count; i++) {
        stage.push({
            index: stage.length,
            location: Math.random(),
        });
    }
}
class StageController {
    static getStage(req, res) {
        let startIndex = req.query.start;
        let endIndex = req.query.end;
        if (startIndex === undefined || endIndex === undefined) {
            res.status(400).send("Start and End must not be empty");
            return;
        }
        if (isNaN(startIndex) || isNaN(endIndex)) {
            res.status(400).send("Start and End must be number");
            return;
        }
        let startIndexNumber = parseInt(startIndex, 10);
        let endIndexNumber = parseInt(endIndex, 10);
        if (startIndexNumber > endIndexNumber) {
            res.status(400).send("Start must be greater than End");
            return;
        }
        if (stage.length < endIndexNumber) {
            generateStage(Math.abs(stage.length - endIndexNumber - 1));
        }
        res.status(200).json(stage.slice(startIndexNumber, endIndexNumber + 1));
    }
}
exports.StageController = StageController;
