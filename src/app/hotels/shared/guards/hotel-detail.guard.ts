import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const hotelDetailGuard: CanActivateFn = (route, state) => {
    const id = +route.url[1].path;
    const router = inject(Router);

    if (isNaN(id) || id <= 0) {
        alert('Hotel inconnu');

        router.navigate(['/hotels']);
        return false;
    }

    return true;
};
