import { FormGroup } from '@angular/forms';

export class GlobalGenericValidator {
    constructor(
        private validatorMessages: { [key: string]: { [key: string]: string } }
    ) {}

    public createErrorMessages(container: FormGroup): {
        [key: string]: string;
    } {
        const errorMessages: Record<string, any> = {};

        for (const controlName in container.controls) {
            if (container.controls.hasOwnProperty(controlName)) {
                const selectedControl = container.controls[controlName];

                if (this.validatorMessages[controlName]) {
                    errorMessages[controlName] = '';

                    if (
                        (selectedControl.dirty || selectedControl.touched) &&
                        selectedControl.errors
                    ) {
                        Object.keys(selectedControl.errors).map(
                            (errorMessagesKey: string) => {
                                if (
                                    this.validatorMessages[controlName][
                                        errorMessagesKey
                                    ]
                                ) {
                                    errorMessages[controlName] +=
                                        this.validatorMessages[controlName][
                                            errorMessagesKey
                                        ] + ' ';
                                }
                            }
                        );
                    }
                }
            }
        }

        return errorMessages;
    }
}
