import { MVCApp } from "../../MVCApp";
import { Action } from "../../common/Action";
import { EventDefines } from "../../common/EventDifines";
import { BaseController } from "../../mvc/controller/BaseController";
import { ModelInfo } from "../../mvc/model/ModelInfo";
import { ModelManager } from "../../mvc/model/ModelManager";
import { ModelType } from "../../mvc/model/ModelType";
import { ViewInfo } from "../../mvc/view/ViewInfo";
import { ViewType } from "../../mvc/view/ViewType";
import { BranchModel } from "./BranchModel";
import { ClientModel } from "./ClientModel";
import { ClientRequestData } from "./ClientRequestData";
import { ClientView } from "./ClientView";
import { CompanyModel } from "./CompanyModel";
import { SubsidiaryModel } from "./SubsidiaryModel";
const { nanoid } = require('nanoid'); // 导入nanoid

export class ClientController extends BaseController {
    public override InitEvent(): void {
        this.Register(EventDefines.GetClient, new Action(this.GetClient.bind(this)));
        this.Register(EventDefines.InsertClient, new Action(this.InsertClient.bind(this)));
        this.Register(EventDefines.DeleteClient, new Action(this.DeleteClient.bind(this)));
        this.Register(EventDefines.UpdateClient, new Action(this.UpdateClient.bind(this)));
        // this.Register(EventDefines.GetCompany, new Action(this.GetCompany.bind(this)));
        this.Register(EventDefines.GetCompanyClient, new Action(this.GetCompanyClient.bind(this)));
    }

    public override InitModel(): void {
        MVCApp.ModelManager.Register(ModelType.ClientModel, new ModelInfo(
            ModelType.ClientModel,
            this,
            ClientModel
        ));
        MVCApp.ModelManager.Register(ModelType.BranchModel, new ModelInfo(
            ModelType.BranchModel,
            this,
            BranchModel
        ));
        MVCApp.ModelManager.Register(ModelType.SubsidiaryModel, new ModelInfo(
            ModelType.SubsidiaryModel,
            this,
            SubsidiaryModel
        ));
        MVCApp.ModelManager.Register(ModelType.CompanyModel, new ModelInfo(
            ModelType.CompanyModel,
            this,
            CompanyModel
        ));
    }

    public override InitView(): void {
        MVCApp.ViewManager.Register(ViewType.ClientView, new ViewInfo(
            ViewType.ClientView,
            this,
            ClientView
        ))
    }

    // 获取客户所有信息，包括所属公司信息，向上级查询
    private async GetClientCompany(...args: any): Promise<any> {
        var view = this.InstantiateView<ClientView>(ViewType.ClientView, args[0], args[1]);
        var model = this.InstantiateModel<ClientModel>(ModelType.ClientModel);
        var branchModel = this.InstantiateModel<BranchModel>(ModelType.BranchModel);
        var subsidiaryModel = this.InstantiateModel<SubsidiaryModel>(ModelType.SubsidiaryModel);
        var companyModel = this.InstantiateModel<CompanyModel>(ModelType.CompanyModel);
        var result: any[] | undefined = [];
        try {
            var clientInfo = await model?.GetClient(view?.GetRequestData<ClientRequestData>()?.GetParam("name") as string);

            for (let tem of clientInfo) {
                // console.log(tem);
                branchModel?.SetFieldValue("id", tem.branch_id);
                var branch = await branchModel?.Find();
                // console.log(branch);
                subsidiaryModel?.SetFieldValue("id", branch?.GetFieldValue("subsidiary_id"));
                var subsidiary = await subsidiaryModel?.Find();
                // console.log(subsidiary);
                companyModel?.SetFieldValue("id", subsidiary?.GetFieldValue("company_id"));
                var company = await companyModel?.Find();
                // console.log(company);
                result?.push({ client: tem, branch: branch, subsidiary: subsidiary, company: company });
            };
            // console.log(result);
        } catch (e) {
            result = undefined;
        }
        return result;
    }

    // 处理上一个函数获得的数据，筛选出需要的数据返回给view
    private async GetClient(...args: any): Promise<void> { // args[0]为Request，args[1]为Response
        var view = this.InstantiateView<ClientView>(ViewType.ClientView, args[0], args[1])
        var model = this.InstantiateModel<ClientModel>(ModelType.ClientModel);
        var result: any;
        try {
            var tem = await this.GetClientCompany(args[0], args[1]);
            result = tem?.map((item) => {
                return {
                    id: item.client.id,
                    name: item.client.name,
                    phone: item.client.phone,
                    qq: item.client.qq,
                    e_mail: item.client.e_mail,
                    firstCompany_name: item.company?.GetFieldValue("name"),
                    secondCompany_name: item.subsidiary?.GetFieldValue("name"),
                    thirdCompany_name: item.branch?.GetFieldValue("name")
                }
            });
            console.log(result);
        } catch (e) {
            result = undefined;
        }
        view?.RenderResponseData(result, "GetClient");
        view?.Response();
    }

    // 级联插入，先插入一级公司，再插入二级公司，再插入三级公司，最后插入客户,id自动分配
    // "name", "phone", "qq", "e_mail", "firstCompany_name", "secondCompany_name", "thirdCompany_name"
    private async InsertClient(...args: any): Promise<void> {
        var view = this.InstantiateView<ClientView>(ViewType.ClientView, args[0], args[1]);
        var model = this.InstantiateModel<ClientModel>(ModelType.ClientModel);
        var branchModel = this.InstantiateModel<BranchModel>(ModelType.BranchModel);
        var subsidiaryModel = this.InstantiateModel<SubsidiaryModel>(ModelType.SubsidiaryModel);
        var companyModel = this.InstantiateModel<CompanyModel>(ModelType.CompanyModel);
        var result: any;
        try {
            var company_id = nanoid();
            companyModel?.SetFieldValue("id", company_id);
            companyModel?.SetFieldValue("name", view?.GetRequestData().GetParam("firstCompany_name"));
            await companyModel?.Insert();
            var subsidiary_id = nanoid();
            subsidiaryModel?.SetFieldValue("id", subsidiary_id);
            subsidiaryModel?.SetFieldValue("name", view?.GetRequestData().GetParam("secondCompany_name"));
            subsidiaryModel?.SetFieldValue("company_id", company_id);
            await subsidiaryModel?.Insert();
            var branch_id = nanoid();
            branchModel?.SetFieldValue("id", branch_id);
            branchModel?.SetFieldValue("name", view?.GetRequestData().GetParam("thirdCompany_name"));
            branchModel?.SetFieldValue("subsidiary_id", subsidiary_id);
            await branchModel?.Insert();
            model?.SetFieldValue("id", nanoid());
            model?.SetFieldValue("name", view?.GetRequestData().GetParam("name"));
            model?.SetFieldValue("phone", view?.GetRequestData().GetParam("phone"));
            model?.SetFieldValue("qq", view?.GetRequestData().GetParam("qq"));
            model?.SetFieldValue("e_mail", view?.GetRequestData().GetParam("e_mail"));
            model?.SetFieldValue("branch_id", branch_id);
            result = await model?.Insert();
        } catch (e) {
            result = false;
        }
        view?.RenderResponseData(result);
        view?.Response();
    }


    // 客户所有信息都可以更新，所有id延用，根据传回的客户id更新对应的客户以及三级公司信息
    private async UpdateClient(...args: any): Promise<void> {
        var view = this.InstantiateView<ClientView>(ViewType.ClientView, args[0], args[1]);
        var model = this.InstantiateModel<ClientModel>(ModelType.ClientModel);
        var branchModel = this.InstantiateModel<BranchModel>(ModelType.BranchModel);
        var subsidiaryModel = this.InstantiateModel<SubsidiaryModel>(ModelType.SubsidiaryModel);
        var companyModel = this.InstantiateModel<CompanyModel>(ModelType.CompanyModel);
        var result: any;
        try {
            model?.SetFieldValue("id", view?.GetRequestData().GetParam("id"));
            await model?.Find();
            model?.SetFieldValue("name", view?.GetRequestData().GetParam("name") ?? model.GetFieldValue("name"));
            model?.SetFieldValue("phone", view?.GetRequestData().GetParam("phone") ?? model.GetFieldValue("phone"));
            model?.SetFieldValue("qq", view?.GetRequestData().GetParam("qq") ?? model.GetFieldValue("qq"));
            model?.SetFieldValue("e_mail", view?.GetRequestData().GetParam("e_mail") ?? model.GetFieldValue("e_mail"));

            branchModel?.SetFieldValue("id", model?.GetFieldValue("branch_id"));
            await branchModel?.Find();
            // console.log(view?.GetRequestData().GetParam("thirdCompany_name"));
            branchModel?.SetFieldValue("name", view?.GetRequestData().GetParam("thirdCompany_name") ?? branchModel.GetFieldValue("name"));


            subsidiaryModel?.SetFieldValue("id", branchModel?.GetFieldValue("subsidiary_id"));
            await subsidiaryModel?.Find();
            subsidiaryModel?.SetFieldValue("name", view?.GetRequestData().GetParam("secondCompany_name") ?? subsidiaryModel.GetFieldValue("name"));

            companyModel?.SetFieldValue("id", subsidiaryModel?.GetFieldValue("company_id"));
            await companyModel?.Find();
            companyModel?.SetFieldValue("name", view?.GetRequestData().GetParam("firstCompany_name") ?? companyModel.GetFieldValue("name"));
            await companyModel?.Update();
            await subsidiaryModel?.Update();
            await branchModel?.Update();
            result = await model?.Update();
        } catch (e) {
            result = false;
        }
        view?.RenderResponseData(result);
        view?.Response();
    }

    // 根据客户id，删除所有客户信息，包括所属公司信息
    private async DeleteClient(...args: any): Promise<any> {
        // console.log(args);
        var view = this.InstantiateView<ClientView>(ViewType.ClientView, args[0], args[1]);
        var model = this.InstantiateModel<ClientModel>(ModelType.ClientModel);
        var result: any | undefined;
        try {
            model?.SetFieldValue("id", view?.GetRequestData().GetParam("id"));
            result = await model?.Delete();
        } catch (e) {
            result = false;
        }
        view?.RenderResponseData(result);
        view?.Response();
    }

    // 根据公司名字，模糊查询公司信息，级联查询，封装所有信息返回给view
    private async GetCompany(...args: any): Promise<any> {
        var view = this.InstantiateView<ClientView>(ViewType.ClientView, args[0], args[1]);
        var companyModel = this.InstantiateModel<CompanyModel>(ModelType.CompanyModel);
        var subsidiaryModel = this.InstantiateModel<SubsidiaryModel>(ModelType.SubsidiaryModel);
        var branchModel = this.InstantiateModel<BranchModel>(ModelType.BranchModel);
        var result: any[] | undefined = [];
        try {
            var companyInfo = await companyModel?.GetCompany(view?.GetRequestData<ClientRequestData>()?.GetParam("name") as string);
            for (let tem of companyInfo) {
                // console.log(tem);
                subsidiaryModel?.SetFieldValue("company_id", tem.id);
                var subsidiary = await subsidiaryModel?.Find();
                // console.log(subsidiary);
                branchModel?.SetFieldValue("subsidiary_id", subsidiary?.GetFieldValue("id"));
                var branch = await branchModel?.Find();
                // console.log(branch);
                result?.push({ company: tem, subsidiary: subsidiary, branch: branch });
            }
            // console.log(result);
        } catch (e) {
            result = undefined;
        }
        view?.RenderResponseData(result, "GetCompany");
        view?.Response();

    }

    // 获取公司下的所有客户信息，级联查询
    private async GetCompanyClient(...args: any): Promise<any> {
        var view = this.InstantiateView<ClientView>(ViewType.ClientView, args[0], args[1]);

        var model = this.InstantiateModel<ClientModel>(ModelType.ClientModel);
        var branchModel = this.InstantiateModel<BranchModel>(ModelType.BranchModel);
        var subsidiaryModel = this.InstantiateModel<SubsidiaryModel>(ModelType.SubsidiaryModel);
        var companyModel = this.InstantiateModel<CompanyModel>(ModelType.CompanyModel);
        var result: any[] | undefined = [];
        try {
            var companyList = await companyModel?.GetCompany("");
            // console.log(companyList);
            for (let tem of companyList) {
                // console.log(tem);
                let company = {
                    id: tem.id,
                    name: tem.name,
                    secondCompany: [] as any
                };

                // subsidiaryModel?.SetFieldValue("company_id", tem.id);
                let subsidiaryList = await subsidiaryModel?.GetSubsidiaryByCompanyId(tem.id);
                for (let tem2 of subsidiaryList) {
                    // console.log(tem2);
                    let subsidiary = {
                        id: tem2.id,
                        name: tem2.name,
                        thirdCompany: [] as any
                    };
                    // branchModel?.SetFieldValue("subsidiary_id", tem2.id);
                    let branchList = await branchModel?.GetBranchBySubsidiaryId(tem2.id);
                    for (let tem3 of branchList) {
                        // console.log(tem3);
                        let branch = {
                            id: tem3.id,
                            name: tem3.name,
                            client: [] as any
                        };

                        // model?.SetFieldValue("branch_id", tem3.id);
                        let clientList = await model?.GetClientByBranchId(tem3.id);
                        // console.log(clientList);
                        for (let tem4 of clientList) {
                            // console.log(tem4);
                            branch.client?.push(tem4);
                            // console.log(branch);
                        }
                        subsidiary.thirdCompany?.push(branch);
                    }
                    company.secondCompany?.push(subsidiary);
                }
                result?.push(company);
                // setTimeout(() => {
                //     console.log(result);
                // }, 3000);
            }
            // console.log(result);
        } catch (e) {
            result = undefined;
        }

        // console.log(view);
        view?.RenderResponseData(result, "GetCompanyClient");
        view?.Response();
    }
}