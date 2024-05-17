import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HotelListService } from '../shared/services/hotel-list.service';
import { IHotel } from '../shared/models/hotel';

@Component({
    selector: 'app-hotel-edit',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
    templateUrl: './hotel-edit.component.html',
    styleUrl: './hotel-edit.component.css',
})
export class HotelEditComponent implements OnInit {
    public hotelForm: FormGroup = this.fb.group({
        hotelName: ['', Validators.required],
        hotelPrice: ['', Validators.required],
        starRating: [''],
        description: [''],
    });
    public hotel!: IHotel;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private hotelService: HotelListService
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const id = +params.get('id')!;

            this.getSelectedHotel(id);
        });
    }

    public getSelectedHotel(id: number): void {
        this.hotelService.getHotelById(id).subscribe((hotel: IHotel) => {
            this.displayHotel(hotel);
        });
    }

    public displayHotel(hotel: IHotel): void {
        this.hotel = hotel;
        this.hotelForm.patchValue({
            hotelName: this.hotel.hotelName,
            hotelPrice: this.hotel.price,
            starRating: this.hotel.rating,
            description: this.hotel.description,
        });
    }

    public saveHotel(): void {
        console.log(this.hotelForm.value);
    }
}
