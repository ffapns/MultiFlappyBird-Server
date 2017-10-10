export interface IConfig {
    port: string;
}

export class ProductionConfig implements IConfig {
    public port: string = process.env.PORT || "9001";
}
