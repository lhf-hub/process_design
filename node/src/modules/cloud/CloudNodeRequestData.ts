import { RequestDataBase } from "../../mvc/RequestDataBase";

export class CloudNodeRequestData extends RequestDataBase {
    public constructor() {
        super();
        this.Init();
    }

    public override Init(): void {
        this.SetParams("id", "parent_id", "name", "path", "type","project_id");
    }
}
