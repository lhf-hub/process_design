import { ConnectionPool } from "../..";
import { Query, GetConnection } from "../../common/Query";
import { BaseModel } from "../../mvc/model/BaseModel";

export class UserModel extends BaseModel {
    public override Init(): void {
        super.Init();
        this.tableName = "user";
        this.primaryKey = "id";
        this.InitField("id", "password");
    }

    public async FindEmployeeAndAccount(user_id: string, password: string, isSupervisor: boolean): Promise<any> {
        var sql: string = `SELECT * FROM base_user_view 
        WHERE account_id = '${user_id}' 
        AND account_password = '${password}'
        ${!isSupervisor ? "" : "AND employee_id = supervisor_id"}`;
        try {
            var result = await Query(await GetConnection(ConnectionPool), sql);
            if (result.length > 0) {
                return result[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}