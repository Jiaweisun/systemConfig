import { provideRouter, RouterConfig }  from '@angular/router';
import { DashboardComponent } from './component/dashboard.component';
import { SystemAddingComponent } from './component/system-adding.component';
import { SystemConfigComponent } from './component/system-config.component';
import { SystemFileComponent } from './component/system-files.component';
import { SystemXmlConfigComponent } from './component/system-config-xml.component';
import { SystemFilesAddingComponent } from './component/system-files-adding.component';





const routes: RouterConfig = [
{
  path: '',
  redirectTo: '/dashboard',
  pathMatch: 'full'
},
{
  path: 'dashboard',

  component: DashboardComponent
},
{
  path: 'addSystem',
  component: SystemAddingComponent
},
{
  path: 'config/:system_id/:file_id',
  component: SystemConfigComponent
},
{
  path: 'xml/:system_id/:file_id',
  component: SystemXmlConfigComponent
},
{
  path: 'files/:id',

  component: SystemFileComponent
},
{
  path: 'addSystemFile/:id',
  component: SystemFilesAddingComponent
}
];

export const appRouterProviders = [
  provideRouter(routes)
];
