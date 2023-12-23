import { ConnectionPool } from "../..";
import { GetConnection, Query } from "../../common/Query";
import { BaseModel } from "../../mvc/model/BaseModel";

export class SubsidiaryModel extends BaseModel {
    public override Init(): void {
        super.Init();
        this.tableName = "subsidiary_company";
        this.primaryKey = "id";
        this.InitField("id", "name", "company_id");
    }

    public async GetSubsidiary(name: string): Promise<any> {
        var sql = `select * from subsidiary_company where name like ?`;
        var result = await Query(await GetConnection(ConnectionPool), sql, [`%${name}%`]);
        // console.log(result);
        return result;
    }

    public async GetSubsidiaryByCompanyId(companyId: string): Promise<any> {
        var sql = `select * from subsidiary_company where company_id = ?`;
        var result = await Query(await GetConnection(ConnectionPool), sql, [companyId]);
        // console.log(result);
        return result;
    }
}