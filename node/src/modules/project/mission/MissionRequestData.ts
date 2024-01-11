import { RequestDataBase } from "../../../mvc/RequestDataBase";

export class MissionRequestData extends RequestDataBase {
    public constructor() {
        super();
        this.Init();
    }

    public override Init(): void {
        this.SetParams("id", "name", "content", "project_id", "status", "create_date", "publisher_id", "receiver_id", "receiver_reply", "bonus");
    }
}