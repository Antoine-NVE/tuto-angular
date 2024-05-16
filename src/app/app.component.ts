import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HotelListComponent } from './hotels/hotel-list/hotel-list.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HotelListComponent, RouterLink, RouterLinkActive],
    templateUrl: './app.component.html',
    // template: '<h1>{{ title }}</h1>',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'Gestionnaire hôtels';
}
