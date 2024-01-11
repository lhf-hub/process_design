import { ConnectionPool } from "../..";
import { GetConnection, Query } from "../../common/Query";
import { BaseModel } from "../../mvc/model/BaseModel";

export class DepartmentModel extends BaseModel {
    constructor() {
        super();
        this.tableName = 'department';
        this.primaryKey = 'id';
        this.InitField('id', 'name');
    }

    public async GetDepartment(name: string): Promise<any> { // 扩展的模糊查询
        var sql = `select * from department where name like ?`;
        var result = await Query(await GetConnection(ConnectionPool), sql, [`%${name}%`]);
        return result;
    }

}