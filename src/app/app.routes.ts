import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HotelDetailComponent } from './hotels/hotel-detail/hotel-detail.component';
import { HotelListComponent } from './hotels/hotel-list/hotel-list.component';
import { hotelDetailGuard } from './hotels/shared/guards/hotel-detail.guard';
import { HotelEditComponent } from './hotels/hotel-edit/hotel-edit.component';
import { hotelEditGuard } from './hotels/shared/guards/hotel-edit.guard';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'hotels/:id/edit',
        component: HotelEditComponent,
        canDeactivate: [hotelEditGuard],
    },
    {
        path: 'hotels/:id',
        component: HotelDetailComponent,
        canActivate: [hotelDetailGuard],
    },
    { path: 'hotels', component: HotelListComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
