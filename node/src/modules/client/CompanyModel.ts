import { ConnectionPool } from "../..";
import { GetConnection, Query } from "../../common/Query";
import { BaseModel } from "../../mvc/model/BaseModel";

export class CompanyModel extends BaseModel {
    public override Init(): void {
        super.Init();
        this.tableName = "client_company";
        this.primaryKey = "id";
        this.InitField("id", "name");

    }

    public async GetCompany(name: string): Promise<any> {
        var sql = `select * from client_company where name like ?`;
        var result = await Query(await GetConnection(ConnectionPool), sql, [`%${name}%`]);
        // console.log(result);
        return result;
    }

}