import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelListService } from '../hotel-list.service';
import { IHotel } from '../hotel';
import { CommonModule } from '@angular/common';
import { ReplaceComma } from '../../shared/pipes/replace-comma.pipe';
import { StarRatingComponent } from '../../shared/components/star-rating/star-rating.component';

@Component({
    selector: 'app-hotel-detail',
    standalone: true,
    imports: [CommonModule, ReplaceComma, StarRatingComponent],
    templateUrl: './hotel-detail.component.html',
    styleUrl: './hotel-detail.component.css',
})
export class HotelDetailComponent implements OnInit {
    public hotel: IHotel | undefined = <IHotel>{};

    constructor(
        private route: ActivatedRoute,
        private hotelService: HotelListService
    ) {}

    ngOnInit(): void {
        const id: number = +this.route.snapshot.paramMap.get('id')!;

        this.hotelService.getHotels().subscribe((hotels: IHotel[]) => {
            this.hotel = hotels.find((hotel) => hotel.hotelId === id);

            console.log('hotel: ', this.hotel);
        });
    }
}
