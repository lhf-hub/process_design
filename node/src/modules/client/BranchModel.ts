import { ConnectionPool } from "../..";
import { GetConnection, Query } from "../../common/Query";
import { BaseModel } from "../../mvc/model/BaseModel";

export class BranchModel extends BaseModel {
    public override Init(): void {
        super.Init();
        this.tableName = "branch_company";
        this.primaryKey = "id";
        this.InitField("id", "name", "subsidiary_id");
    }

    public async GetBranch(name: string): Promise<any> {
        var sql = `select * from branch_company where name like ?`;
        var result = await Query(await GetConnection(ConnectionPool), sql, [`%${name}%`]);
        // console.log(result);
        return result;
    }

    public async GetBranchBySubsidiaryId(subsidiaryId: string): Promise<any> {
        var sql = `select * from branch_company where subsidiary_id = ?`;
        var result = await Query(await GetConnection(ConnectionPool), sql, [subsidiaryId]);
        // console.log(result);
        return result;
    }
}