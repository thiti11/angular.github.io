import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OrderComponent } from './order/order.component';
import { OrderEquComponent } from './order-equ/order-equ.component';
import { UpdateOrderComponent } from './update-order/update-order.component';
import { AdminComponent } from './admin/admin.component';
import { ApprovalComponent } from './approval/approval.component';


const routes: Routes = [
  {path:"",component:LoginComponent},
  
  {path:"login",component:LoginComponent},

  {path:"register",component:RegisterComponent},

  {path:"order",component:OrderComponent},

  {path:"orderequ",component:OrderEquComponent},

  {path:"updateorder/:No_ID",component:UpdateOrderComponent},
  
  {path:"Admin",component:AdminComponent},

  {path:"approval/:No_ID",component:ApprovalComponent},

  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
