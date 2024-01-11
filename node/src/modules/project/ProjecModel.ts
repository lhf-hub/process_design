import { ConnectionPool } from "../..";
import { GetConnection, Query } from "../../common/Query";
import { BaseModel } from "../../mvc/model/BaseModel";

export class ProjectModel extends BaseModel {
    public override Init(): void {
        super.Init();
        this.tableName = "project";
        this.primaryKey = "id";
        this.InitField("id", "name", "quotation", "client_id", "status", "create_date", "complete_date", "cloud_id");
    }

    public async SelectAll(): Promise<any> {
        var sql: string = `SELECT * FROM base_project_view`;
        try {
            var result = await Query(await GetConnection(ConnectionPool), sql);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    /**
     * 根据name模糊查询
     * @param name 
     * @returns 
     */
    public async QueryByName(name: string): Promise<any> {
        var sql: string = `SELECT * FROM base_project_view WHERE project_name LIKE '%${name}%'`;
        try {
            var result = await Query(await GetConnection(ConnectionPool), sql);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    /**
     * 根据id查询
     * @param id
     */
    public async QueryById(id: string): Promise<any> {
        var sql: string = `SELECT * FROM base_project_view WHERE project_id = '${id}'`;
        try {
            var result = await Query(await GetConnection(ConnectionPool), sql);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    /**
     * 根据客户id查询
     * @param id 
     */
    public async QueryByClientId(id: string): Promise<any> {
        var sql: string = `SELECT * FROM base_project_view WHERE client_id = '${id}'`;
        try {
            var result = await Query(await GetConnection(ConnectionPool), sql);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    public async QueryByEmployeeId(id: string): Promise<any> {
        var sql: string = `SELECT * FROM employee_project_view WHERE employee_id = '${id}'`;
        try {
            var result = await Query(await GetConnection(ConnectionPool), sql);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
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
}