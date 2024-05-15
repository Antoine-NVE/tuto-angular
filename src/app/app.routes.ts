import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HotelDetailComponent } from './hotel-list/hotel-detail/hotel-detail.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { hotelDetailGuard } from './hotel-list/hotel-detail.guard';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'hotels/:id',
        component: HotelDetailComponent,
        canActivate: [hotelDetailGuard],
    },
    { path: 'hotels', component: HotelListComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
