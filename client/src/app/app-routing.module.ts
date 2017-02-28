import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';*/
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
   /* { path: 'crisis-center', component: CrisisListComponent },
    { path: 'heroes',        component: HeroListComponent },*/
    //{ path: '',   redirectTo: '/address-books', pathMatch: 'full' },
    { path: '', component: PageNotFoundComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
