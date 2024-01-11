import { ConnectionPool } from "../../..";
import { GetConnection, Query } from "../../../common/Query";
import { BaseModel } from "../../../mvc/model/BaseModel";

export class MissionLogModel extends BaseModel {
    public override Init(): void {
        super.Init();
        this.tableName = "mission_log";
        this.primaryKey = "id";
        this.InitField("mission_id", "receiver_id", "publisher_id", "receiver_reply");
    }
    public override async Update() {
        console.log("我在missionlogModel", this.GetFieldValue("receiver_reply"));
        const sql = `update ${this.tableName} set receiver_reply = ? where mission_id = ? and receiver_id = ? and publisher_id = ?`;

        const result = await Query(
            await GetConnection(ConnectionPool),
            sql,
            [
                this.GetFieldValue("receiver_reply"),
                this.GetFieldValue("mission_id"),
                this.GetFieldValue("receiver_id"),
                this.GetFieldValue("publisher_id")
            ]
        );
        return result;
    }

    public override async Find() {
        const sql = `select * from ${this.tableName} where mission_id = ? and receiver_id = ? and publisher_id = ?`;
        const result = await Query(
            await GetConnection(ConnectionPool),
            sql,
            [
                this.GetFieldValue("mission_id"),
                this.GetFieldValue("receiver_id"),
                this.GetFieldValue("publisher_id")
            ]
        );
        return result[0];
    }

}