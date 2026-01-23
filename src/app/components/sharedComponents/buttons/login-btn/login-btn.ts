import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-login-btn',
  imports: [CommonModule],
  templateUrl: './login-btn.html',
  styleUrl: './login-btn.scss',
})
export class LoginBtn {
  @Input() label: string = 'Login';
  @Input() icon?: string;
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;

  @Output() login = new EventEmitter<void>();

  onClick() {
    if (!this.loading && !this.disabled) {
      this.login.emit();
    }
  }
}
