import { RequestDataBase } from "../../mvc/RequestDataBase";

export class ProjectRequestData extends RequestDataBase {
    public constructor() {
        super();
        this.Init();
    }

    public override Init(): void {
        this.SetParams("id", "name", "quotation", "client_id", "status", "create_date", "complete_date", "cloud_id");
    }
}