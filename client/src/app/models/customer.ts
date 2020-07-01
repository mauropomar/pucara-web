export interface CustomerModel {
    code:string;
    name:string;
    description:string;
    credit:number;
    deactivationDate:Date,
    deactivationReason:string,
    active:boolean;
}
