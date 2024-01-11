import { ConnectionPool } from "../..";
import { GetConnection, Query } from "../../common/Query";
import { BaseModel } from "../../mvc/model/BaseModel";

export class CloudNodeModel extends BaseModel {
    constructor() {
        super();
    }
    override Init(): void {
        super.Init();
        this.tableName = "cloud";
        this.primaryKey = "id";
        this.InitField("id", "parent_id", "name", "path", "type", "size", "modify_date");
    }

    public async GetEmployeeByUserId(id: string): Promise<any> {
        var sql: string = `SELECT * FROM employee WHERE user_id = '${id}'`;
        try {
            var result = await Query(await GetConnection(ConnectionPool), sql);
            return result[0];
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    public async GetAllNodes(): Promise<any> {
        const sql = `select * from ${this.tableName}`;
        const result = await Query(await GetConnection(ConnectionPool), sql);
        return result;
    }

    public async GetChildren(): Promise<any> {
        const sql = `select * from ${this.tableName} where parent_id = ?`;
        const result = await Query(await GetConnection(ConnectionPool), sql, [this.GetFieldValue("id")]);


        return result;
    }

    public async GetParent(): Promise<any> {
        const sql = `select * from ${this.tableName} where id = ?`;
        const result = await Query(await GetConnection(ConnectionPool), sql, [this.GetFieldValue("parent_id")]);
        return result;
    }

}