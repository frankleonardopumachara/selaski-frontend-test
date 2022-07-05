import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {OrdersListComponent} from './pages/orders-list/orders-list.component'
import {OrderComponent} from './pages/order/order.component'
import {UsersComponent} from './pages/users/users.component'
import {HomeComponent} from './pages/home/home.component'

const routes: Routes = [
  {
    path: 'orders-list',
    component: OrdersListComponent,
  },
  {
    path: 'order/:idOrder',
    component: OrderComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
