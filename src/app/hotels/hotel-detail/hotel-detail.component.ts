import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelListService } from '../shared/services/hotel-list.service';
import { IHotel } from '../shared/models/hotel';
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
        private hotelService: HotelListService,
        private router: Router
    ) {}

    ngOnInit(): void {
        const id: number = +this.route.snapshot.paramMap.get('id')!;

        this.hotelService.getHotels().subscribe((hotels: IHotel[]) => {
            this.hotel = hotels.find((hotel) => hotel.id === id);

            console.log('hotel: ', this.hotel);
        });
    }

    public backToList(): void {
        this.router.navigate(['/hotels']);
    }
}
