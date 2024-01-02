import { BaseJsonView } from "../../mvc/view/BaseJsonView";
import { EmployeeRequestData } from "./EmployeeRequestData";

export class EmployeeView extends BaseJsonView {
    public override Init(): void {
        this.requestData = new EmployeeRequestData();
        this.requestData.Init();
        // console.log(this.request.body);
        Object.keys(this.request.body).forEach((key) => {
            this.requestData.SetParamValue(key, this.request.body[key]);
        });
    }
    public RenderResponseData(...data: any): void {
        switch (data[1]) {
            case "GetEmployee":
            case "GetDepartmentEmployee":
                this.responseData = {
                    code: data[0] == undefined ? 500 : 200,
                    msg: data[0] == undefined ? "error" : "success",
                    data: data[0] == undefined ? null : data[0]
                }
                break;
            default:
                this.responseData = {
                    code: !data[0] ? 500 : 200,
                    msg: !data[0] ? "error" : "success",
                }
        }
    }
    public Response(): void {
        this.response.json(this.responseData);
    }
}