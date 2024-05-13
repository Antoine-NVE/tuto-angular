import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { IHotel } from './hotel';
import { ReplaceComma } from '../shared/pipes/replace-comma.pipe';
import { StarRatingComponent } from '../shared/components/star-rating/star-rating.component';

registerLocaleData(localeFr, 'fr');

@Component({
    selector: 'app-hotel-list',
    standalone: true,
    imports: [CommonModule, FormsModule, ReplaceComma, StarRatingComponent],
    templateUrl: './hotel-list.component.html',
    styleUrl: './hotel-list.component.css',
})
export class HotelListComponent implements OnInit {
    public title = "Liste d'hôtels";

    public hotels: IHotel[] = [
        {
            hotelId: 1,
            hotelName: 'Buea sweet life',
            description: 'Belle vue au bord de la mer',
            price: 230.5,
            imageUrl: 'assets/img/hotel-room.jpg',
        },
        {
            hotelId: 2,
            hotelName: 'Marakech',
            description: 'Profitez de la vue sur les montagnes',
            price: 145.5,
            imageUrl: 'assets/img/the-interior.jpg',
        },
        {
            hotelId: 3,
            hotelName: 'Buea sweet life',
            description: 'Belle vue au bord de la mer',
            price: 120.12,
            imageUrl: 'assets/img/indoors.jpg',
        },
        {
            hotelId: 4,
            hotelName: 'Cape town city',
            description: 'Magnifique cadre pour votre séjour',
            price: 135.12,
            imageUrl: 'assets/img/window.jpg',
        },
    ];

    public showBadge: boolean = false;

    private _hotelFilter: string = 'mot';

    public filteredHotels: IHotel[] = [];

    public ngOnInit(): void {
        this.filteredHotels = this.hotels;
        this.hotelFilter = '';
    }

    public toggleIsNewBadge(): void {
        this.showBadge = !this.showBadge;
    }

    public get hotelFilter(): string {
        return this._hotelFilter;
    }

    public set hotelFilter(filter: string) {
        this._hotelFilter = filter;

        this.filteredHotels = this.hotelFilter
            ? this.filterHotels(this.hotelFilter)
            : this.hotels;
    }

    private filterHotels(criteria: string): IHotel[] {
        criteria = criteria.toLocaleLowerCase();

        const res = this.hotels.filter(
            (hotel: IHotel) =>
                hotel.hotelName.toLocaleLowerCase().indexOf(criteria) !== -1
        );

        return res;
    }
}
