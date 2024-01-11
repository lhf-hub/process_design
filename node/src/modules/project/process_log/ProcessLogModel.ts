import { ConnectionPool } from "../../..";
import { Query, GetConnection } from "../../../common/Query";
import { BaseModel } from "../../../mvc/model/BaseModel";
import { nanoid } from "nanoid";

export class ProcessLogModel extends BaseModel {
    public override Init(): void {
        super.Init();
        this.tableName = "process_log";
        this.primaryKey = "id";
        this.InitField("id", "log_content", "date", "employee_id", "project_id");
    }

    public override async Insert(): Promise<boolean> {
        this.SetFieldValue(this.primaryKey, nanoid(8));
        return await super.Insert();
    }

    public async SelectAll(): Promise<any> {
        var sql: string = `SELECT * FROM base_process_log_view`;
        try {
            var result = await Query(await GetConnection(ConnectionPool), sql);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    public async QueryByProjectId(id: string): Promise<any> {
        var sql: string = `SELECT * FROM base_process_log_view WHERE project_id = '${id}'`;
        try {
            var result = await Query(await GetConnection(ConnectionPool), sql);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    public async QueryById(id: string): Promise<any> {
        var sql: string = `SELECT * FROM base_process_log_view WHERE process_log_id = '${id}'`;
        try {
            var result = await Query(await GetConnection(ConnectionPool), sql);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    public async QueryByEmployeeId(id: string): Promise<any> {
        var sql: string = `SELECT * FROM base_process_log_view WHERE employee_id = '${id}'`;
        try {
            var result = await Query(await GetConnection(ConnectionPool), sql);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}