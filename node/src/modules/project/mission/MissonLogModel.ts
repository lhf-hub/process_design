import { BaseModel } from "../../../mvc/model/BaseModel";

export class MissionLogModel extends BaseModel {
    public override Init(): void {
        super.Init();
        this.tableName = "mission_log";
        this.primaryKey = "id";
        this.InitField("mission_id", "receiver_id", "publisher_id", "receiver_reply", "publisher_reply");
    }
}