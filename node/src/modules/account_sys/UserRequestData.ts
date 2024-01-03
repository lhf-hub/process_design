import { RequestDataBase } from "../../mvc/RequestDataBase";

export class UserRequestData extends RequestDataBase {
    public constructor() {
        super();
        this.Init();
    }

    public override Init(): void {
        this.SetParams("id", "password", "role");
    }
}