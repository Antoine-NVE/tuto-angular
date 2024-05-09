import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-hotel-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './hotel-list.component.html',
    styleUrl: './hotel-list.component.css',
})
export class HotelListComponent {
    public title = "Liste d'hôtels";

    public hotels: any[] = [
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
}
