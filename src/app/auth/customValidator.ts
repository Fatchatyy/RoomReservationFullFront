import {
  AbstractControl,
  ValidatorFn,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

export class CustomValidator {
  static emailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(value)) {
      return null; // Valid, contains only letters
    }
    return { invalidEmail: true }; // Invalid, contains non-letter characters
  }
  static passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.value;

      // Check if the password contains at least 8 characters
      if (password.length < 8) {
        return { passwordLength: true };
      }
      return null;
    };
  }
  static confirmPasswordValidator(
    group: FormGroup
  ): { [key: string]: any } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  static passwordValidators(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    const valid = passwordRegex.test(control.value);

    if (!valid && control.value !== '') {
      return { invalidPasswordFormat: true };
    }
    return null;
  }

  static onlyLettersValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const value = control.value as string;
    if (/^[a-zA-Z]*$/.test(value)) {
      return null; // Valid, contains only letters
    }
    return { onlyLetters: true }; // Invalid, contains non-letter characters
  }

  static MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
        // return { mismatch: true };
      } else {
        matchingControl.setErrors(null);
        // return null;
      }
    };
  }
}
