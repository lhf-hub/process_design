import { ConnectionPool } from "../..";
import { Query, GetConnection } from "../../common/Query";
import { BaseModel } from "../../mvc/model/BaseModel";

export class UserModel extends BaseModel {
    public override Init(): void {
        super.Init();
        this.tableName = 'user';
        this.primaryKey = 'id';
        this.InitField('id', 'password');
    }
}