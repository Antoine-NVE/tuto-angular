import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HotelListComponent } from './hotel-list/hotel-list.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HotelListComponent],
    templateUrl: './app.component.html',
    // template: '<h1>{{ title }}</h1>',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'Tuto_Angular';
}
