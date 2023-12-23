import { RequestDataBase } from "../../mvc/RequestDataBase";

export class ClientRequestData extends RequestDataBase {


    public Init(): void {
        this.SetParams("id", "name", "phone", "qq", "e_mail",
            "firstCompany_name",
            "secondCompany_name",
            "thirdCompany_name");
    }

}