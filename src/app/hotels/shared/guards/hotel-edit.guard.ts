import { CanDeactivateFn } from '@angular/router';
import { HotelEditComponent } from '../../hotel-edit/hotel-edit.component';

export const hotelEditGuard: CanDeactivateFn<HotelEditComponent> = (
    component: HotelEditComponent,
    currentRoute,
    currentState,
    nextState
) => {
    if (component.hotelForm.dirty && !component.isSaved) {
        const hotelName =
            component.hotelForm.get('hotelName')!.value || 'Nouvel hôtel';
        return confirm(
            `Voulez-vous annuler les changements effectués sur ${hotelName} ?`
        );
    }

    return true;
};
