import { CommonModule } from '@angular/common';
import { Component, forwardRef, Optional, Self, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

type InputType =
  | 'text'
  | 'number'
  | 'password'
  | 'email'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'time';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.html',
  styleUrls: ['./input.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppInputComponent),
      multi: true
    }
  ],
})
export class AppInputComponent implements ControlValueAccessor {

  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: InputType = 'text';

  @Input() hint = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() readonly = false;

  @Input() min?: number;
  @Input() max?: number;
  @Input() step?: number;

  @Input() inputId = `app-input-${Math.random().toString(16).slice(2)}`;
  @Input() autocomplete: string = 'on';

  value: any = '';
  isPasswordVisible = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(val: any): void {
    this.value = val ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    let val: any = input.value;

    if (this.type === 'number') {
      val = val === '' ? null : Number(val);
      if (Number.isNaN(val)) val = null;
    }

    this.value = val;
    this.onChange(val);
  }

  markTouched() {
    this.onTouched();
  }

  get actualType(): string {
    if (this.type !== 'password') return this.type;
    return this.isPasswordVisible ? 'text' : 'password';
  }

  togglePassword() {
    if (this.disabled) return;
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  get control() {
    return this.ngControl?.control;
  }

  get showError(): boolean {
    return !!(this.control && this.control.invalid && (this.control.dirty || this.control.touched));
  }

  get firstErrorMessage(): string {
    const errors = this.control?.errors;
    if (!errors) return '';
    if (errors['required']) return 'This field is required';
    if (errors['email']) return 'Please enter a valid email';
    if (errors['minlength']) return `Minimum ${errors['minlength'].requiredLength} characters`;
    if (errors['maxlength']) return `Maximum ${errors['maxlength'].requiredLength} characters`;
    if (errors['min']) return `Minimum value is ${errors['min'].min}`;
    if (errors['max']) return `Maximum value is ${errors['max'].max}`;
    if (errors['pattern']) return 'Invalid format';
    return 'Invalid value';
  }
}
