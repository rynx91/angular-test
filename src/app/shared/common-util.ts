import { FormGroup } from '@angular/forms';

export class CommonUtil {
  public static readonly ALPHABETS_PATTERN = '^[a-zA-Z ]+$';

  public static markFormAsTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        if (CommonUtil.isArray(control.controls)) {
          control.controls.forEach(c => this.markFormAsTouched(c));
        } else if (CommonUtil.isObject(control.controls)) {
          CommonUtil.markFormAsTouched(control);
        }
      }
    });
  }

  public static isArray(value) {
    return value && typeof value === 'object' && value.constructor === Array;
  }

  public static isObject(value) {
    return value && typeof value === 'object' && value.constructor === Object;
  }
}
