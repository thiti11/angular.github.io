import { Role } from "./role";

export class User {

  Employee_ID!: number;
  Username!: string;
  Password!: string;
  Firsenamr!: string;
  Lastname!: string;
  EmpNo!: number;
  Position!:string;
  Department!:string;
  Section!: string;
  Type_of_Employee!: string;
  Employee_Detail!: string;
  Joined_date!: number;

  role!: Role;
  token?: string;
  No_ID: any;
  item:any;
  

}

export interface order{
  No_ID: any;
  List:string;
  Hat:string;
  Quantity:number;
  Remark:string;
}
