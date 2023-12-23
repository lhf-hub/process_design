import { ConnectionPool } from "../..";
import { GetConnection, Query } from "../../common/Query";
import { BaseModel } from "../../mvc/model/BaseModel";

export class ClientModel extends BaseModel {

    public override Init(): void {
        super.Init();
        this.tableName = "client";
        this.primaryKey = "id";
        this.InitField("id", "name", "phone", "qq", "e_mail", "branch_id");
    }

    public async GetClient(name: string): Promise<any> { // 扩展的模糊查询
        var sql = `select * from client where name like ?`;
        var result = await Query(await GetConnection(ConnectionPool), sql, [`%${name}%`]);
        // console.log(result);
        return result;
    }

    public async GetClientByBranchId(branchId: string): Promise<any> {
        var sql = `select * from client where branch_id = ?`;
        var result = await Query(await GetConnection(ConnectionPool), sql, [branchId]);
        // console.log(result);
        return result;
    }

}