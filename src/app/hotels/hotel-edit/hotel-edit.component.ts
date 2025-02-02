import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChildren,
} from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormControlName,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HotelListService } from '../shared/services/hotel-list.service';
import { IHotel } from '../shared/models/hotel';
import { GlobalGenericValidator } from '../shared/validators/global-generic.validators';
import { Observable, fromEvent, merge } from 'rxjs';

@Component({
    selector: 'app-hotel-edit',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
    templateUrl: './hotel-edit.component.html',
    styleUrl: './hotel-edit.component.css',
})
export class HotelEditComponent implements OnInit, AfterViewInit {
    @ViewChildren(FormControlName, { read: ElementRef })
    inputElements!: ElementRef[];

    public hotelForm!: FormGroup;
    public hotel!: IHotel;
    public pageTitle: string = '';
    public isSaved: boolean = false;
    public errorMessage!: string;
    public formErrors: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } } = {
        hotelName: {
            required: "Le nom de l'hôtel est obligatoire",
        },
        price: {
            required: "Le prix de l'hôtel est obligatoire",
        },
    };
    private globalGenericValidator!: GlobalGenericValidator;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private hotelService: HotelListService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.globalGenericValidator = new GlobalGenericValidator(
            this.validationMessages
        );

        this.hotelForm = this.fb.group({
            hotelName: ['', Validators.required],
            price: ['', Validators.required],
            rating: [''],
            description: [''],
            tags: this.fb.array([]),
        });

        this.route.paramMap.subscribe((params) => {
            const id = +params.get('id')!;

            this.getSelectedHotel(id);
        });
    }

    ngAfterViewInit(): void {
        const formControlBlurs: Observable<unknown>[] = this.inputElements.map(
            (formControlElemRef: ElementRef) =>
                fromEvent(formControlElemRef.nativeElement, 'blur')
        );
        merge(this.hotelForm.valueChanges, ...formControlBlurs).subscribe(
            () => {
                this.formErrors =
                    this.globalGenericValidator.createErrorMessages(
                        this.hotelForm
                    );
                console.log(this.formErrors);
            }
        );
    }

    public hideError(): void {
        this.errorMessage = '';
    }

    public get tags(): FormArray {
        return this.hotelForm.get('tags') as FormArray;
    }

    public addTags(): void {
        this.tags.push(new FormControl());
    }

    public deleteTag(index: number): void {
        this.tags.removeAt(index);
        this.tags.markAsDirty();
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
        this.hotelForm.setControl('tags', this.fb.array(this.hotel.tags || []));
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
                        error: (err) => (this.errorMessage = err),
                    });
                } else {
                    this.hotelService.updateHotel(hotel).subscribe({
                        next: () => {
                            this.isSaved = true;
                            this.saveCompleted();
                        },
                        error: (err) => (this.errorMessage = err),
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

    public deleteHotel(): void {
        if (
            confirm(
                `Voulez-vous réellement supprimer l'hotel ${this.hotel.hotelName} ?`
            )
        ) {
            this.hotelService.deleteHotel(this.hotel.id).subscribe({
                next: () => this.saveCompleted(),
            });
        }
    }
}
