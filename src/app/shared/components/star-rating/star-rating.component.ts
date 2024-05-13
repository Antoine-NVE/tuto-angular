import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'app-star-rating',
    standalone: true,
    imports: [],
    templateUrl: './star-rating.component.html',
    styleUrl: './star-rating.component.css',
})
export class StarRatingComponent implements OnChanges {
    public starWidth: number = 0;

    @Input()
    public rating: number = 0;

    ngOnChanges() {
        this.starWidth = (this.rating * 125) / 5;
    }
}
