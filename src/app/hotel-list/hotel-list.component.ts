import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { IHotel } from './hotel';
import { ReplaceComma } from '../shared/pipes/replace-comma.pipe';
import { StarRatingComponent } from '../shared/components/star-rating/star-rating.component';
import { HotelListService } from './hotel-list.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

registerLocaleData(localeFr, 'fr');

@Component({
    selector: 'app-hotel-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReplaceComma,
        StarRatingComponent,
        // HttpClientModule,
        RouterLink,
    ],
    templateUrl: './hotel-list.component.html',
    styleUrl: './hotel-list.component.css',
})
export class HotelListComponent implements OnInit {
    public title = "Liste d'hôtels";
    public hotels: IHotel[] = [];
    public showBadge: boolean = false;
    private _hotelFilter: string = 'mot';
    public filteredHotels: IHotel[] = [];
    public receivedRating: string = '';
    public errMsg: string = '';

    constructor(private hotelListService: HotelListService) {}

    public ngOnInit(): void {
        this.hotelListService.getHotels().subscribe({
            next: (hotels) => {
                this.hotels = hotels;
                this.filteredHotels = this.hotels;
            },
            error: (err) => (this.errMsg = err),
        });
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

    public receiveRatingClicked(message: string): void {
        this.receivedRating = message;
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
