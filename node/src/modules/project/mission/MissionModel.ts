import { ConnectionPool } from "../../..";
import { Query, GetConnection } from "../../../common/Query";
import { BaseModel } from "../../../mvc/model/BaseModel";

export class MissionModel extends BaseModel {

    public override Init(): void {
        super.Init();
        this.tableName = "mission";
        this.primaryKey = "id";
        this.InitField("id", "name", "content", "project_id", "status", "create_date", "complete_date", "publisher_id", "receiver_id", "bonus");
    }

    public async SelectAll(): Promise<any> {
        var sql: string = `SELECT * FROM base_mission_view`;
        try {
            var result = await Query(await GetConnection(ConnectionPool), sql);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    public async QueryById(id: string): Promise<any> {
        var sql: string = `SELECT * FROM base_mission_view WHERE mission_id = '${id}'`;
        try {
            var result = await Query(await GetConnection(ConnectionPool), sql);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    public async QueryByProjectId(id: string): Promise<any> {
        var sql: string = `SELECT * FROM base_mission_view WHERE project_id = '${id}'`;
        try {
            var result = await Query(await GetConnection(ConnectionPool), sql);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    public async QueryByPublisherId(id: string): Promise<any> {
        var sql: string = `SELECT * FROM base_mission_view WHERE publisher_id = '${id}'`;
        try {
            var result = await Query(await GetConnection(ConnectionPool), sql);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    public async QueryByReceiverId(id: string): Promise<any> {
        var sql: string = `SELECT * FROM base_mission_view WHERE receiver_id = '${id}'`;
        try {
            var result = await Query(await GetConnection(ConnectionPool), sql);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    public async QueryByName(name: string): Promise<any> {
        var sql: string = `SELECT * FROM base_mission_view WHERE mission_name LIKE '%${name}%'`;
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