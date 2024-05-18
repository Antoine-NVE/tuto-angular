import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IHotel } from '../models/hotel';

export class HotelData implements InMemoryDbService {
    createDb(): Record<string, IHotel[]> {
        const hotels: IHotel[] = [
            {
                id: 1,
                hotelName: 'Buea sweet life',
                description: 'Belle vue au bord de la mer',
                price: 230.5,
                imageUrl: 'assets/img/hotel-room.jpg',
                rating: 3.5,
                tags: ['Nouveau'],
            },
            {
                id: 2,
                hotelName: 'Marakech',
                description: 'Profitez de la vue sur les montagnes',
                price: 145.5,
                imageUrl: 'assets/img/the-interior.jpg',
                rating: 5,
                tags: ['Nouveau'],
            },
            {
                id: 3,
                hotelName: 'Buea sweet life',
                description: 'Belle vue au bord de la mer',
                price: 120.12,
                imageUrl: 'assets/img/indoors.jpg',
                rating: 4,
                tags: ['Nouveau'],
            },
            {
                id: 4,
                hotelName: 'Cape town city',
                description: 'Magnifique cadre pour votre séjour',
                price: 135.12,
                imageUrl: 'assets/img/window.jpg',
                rating: 2.5,
                tags: ['Nouveau'],
            },
        ];

        return { hotels };
    }
}
