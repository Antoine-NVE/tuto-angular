import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
        price: ['', Validators.required],
        rating: [''],
        description: [''],
    });
    public hotel!: IHotel;
    public pageTitle: string = '';
    public isSaved: boolean = false;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private hotelService: HotelListService,
        private router: Router
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

        if (this.hotel.id === 0) {
            this.pageTitle = 'Créer un hôtel';
        } else {
            this.pageTitle = `Modifier l'hôtel ${this.hotel.hotelName}`;
        }

        this.hotelForm.patchValue({
            hotelName: this.hotel.hotelName,
            price: this.hotel.price,
            rating: this.hotel.rating,
            description: this.hotel.description,
        });
    }

    public saveHotel(): void {
        if (this.hotelForm.valid) {
            if (this.hotelForm.dirty) {
                const hotel: IHotel = {
                    ...this.hotel,
                    ...this.hotelForm.value,
                };

                if (hotel.id === 0) {
                    this.hotelService.createHotel(hotel).subscribe({
                        next: () => {
                            this.isSaved = true;
                            this.saveCompleted();
                        },
                    });
                } else {
                    this.hotelService.updateHotel(hotel).subscribe({
                        next: () => {
                            this.isSaved = true;
                            this.saveCompleted();
                        },
                    });
                }
            } else {
                this.saveCompleted();
            }
        }
        console.log(this.hotelForm.value);
    }

    public saveCompleted(): void {
        this.hotelForm.reset;
        this.router.navigate(['/hotels']);
    }
}
