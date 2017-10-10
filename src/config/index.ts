export interface IConfig {
    port: any;
}

export class ProductionConfig implements IConfig {
    public port: any = process.env.PORT || 9001;
}
