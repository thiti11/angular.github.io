
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
 

  token?: string;
  
}

export interface order{
  No_ID: any;
  List:string;
  Hat:string;
  Quantity:number;
  Remark:string;
}
