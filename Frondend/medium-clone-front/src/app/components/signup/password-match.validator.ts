import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';


export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const pwd = control.get('pwdFormControl');
  const pwdc = control.get('pwdCFormControl');

  return pwd && pwdc && pwd.value === pwdc.value ? { matchPassword: true } : null;
};

