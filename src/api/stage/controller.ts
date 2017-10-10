import { Request, Response } from "express";

interface IPipeSetMarker {
    index: number;
    location: number;
}

const stage = new Array<IPipeSetMarker>();

function generateStage(count: number): void {
    for (let i = 0; i < count; i++) {
        stage.push({
            index: stage.length,
            location: Math.random(),
        });
    }
}

export class StageController {

    public static getStage(req: Request, res: Response): void {
        const startIndex = req.query.start;
        const endIndex = req.query.end;

        if (startIndex === undefined || endIndex === undefined) {
            res.status(400).send("Start and End must not be empty");
            return;
        }

        if (isNaN(startIndex) || isNaN(endIndex)) {
            res.status(400).send("Start and End must be number");
            return;
        }

        const startIndexNumber = parseInt(startIndex, 10);
        const endIndexNumber = parseInt(endIndex, 10);

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
