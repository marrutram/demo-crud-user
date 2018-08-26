import { Routes, RouterModule } from '@angular/router';
 
import { CrudUsersComponent } from './crudUsers/crudUsers.component';
import { LoginComponent } from './login';
import { AuthGuard} from './helpers';
 
const appRoutes: Routes = [
    { path: '', component: CrudUsersComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);
