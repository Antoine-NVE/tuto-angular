import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-hotel-edit',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
    templateUrl: './hotel-edit.component.html',
    styleUrl: './hotel-edit.component.css',
})
export class HotelEditComponent {
    public hotelForm: FormGroup = this.fb.group({
        hotelName: ['', Validators.required],
        hotelPrice: ['', Validators.required],
        starRating: [''],
        description: [''],
    });

    constructor(private fb: FormBuilder) {}

    public saveHotel(): void {
        console.log(this.hotelForm.value);
    }
}
