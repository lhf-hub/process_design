import { ConnectionPool } from "../..";
import { GetConnection, Query } from "../../common/Query";
import { BaseModel } from "../../mvc/model/BaseModel";

export class EmployeeModel extends BaseModel {
    constructor() {
        super();
        this.tableName = 'employee';
        this.primaryKey = 'id';
        this.InitField('id', 'name', 'sex', 'age', 'phone', 'e_mail', 'address', 'salary_least', 'entry_time', 'leave_time', 'user_id', 'department_id', 'supervisor_id', 'is_regular');
    }

    public async GetEmployee(name: string): Promise<any> { // 扩展的模糊查询
        var sql = `select * from employee where name like ?`;
        var result = await Query(await GetConnection(ConnectionPool), sql, [`%${name}%`]);
        return result;
    }

    public async GetEmployeeByDepartmentId(department_id: string): Promise<any> { // 根据部门id查询员工
        var sql = `select * from employee where department_id = ?`;
        var result = await Query(await GetConnection(ConnectionPool), sql, [department_id]);
        return result;
    }

    public async GetEmployeeBySupervisorId(supervisor_id: string): Promise<any> { // 根据主管id查询员工
        var sql = `select * from employee where supervisor_id = ? and leave_time is null`;
        var result = await Query(await GetConnection(ConnectionPool), sql, [supervisor_id]);
        return result;
    }

    public async GetSupervisorByDepartmentId(department_id: string): Promise<any> { // 根据部门id查询主管
        // 主管id和员工id一样表明为主管
        var sql = `select * from employee where department_id = ? and id = supervisor_id and leave_time is null`;
        var result = await Query(await GetConnection(ConnectionPool), sql, [department_id]);
        return result;
    }

}