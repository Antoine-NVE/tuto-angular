import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HotelListComponent } from './hotel-list/hotel-list.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HotelListComponent, RouterLink],
    templateUrl: './app.component.html',
    // template: '<h1>{{ title }}</h1>',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'Gestionnaire hôtels';
}
