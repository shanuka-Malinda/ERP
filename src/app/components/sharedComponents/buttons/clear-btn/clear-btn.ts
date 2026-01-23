import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-clear-btn',
  imports: [CommonModule],
  templateUrl: './clear-btn.html',
  styleUrl: './clear-btn.scss',
})
export class ClearBtn {
  @Input() label: string = 'Clear';
  @Input() icon?: string;
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;

  @Output() clear = new EventEmitter<void>();

  onClick() {
    if (!this.loading && !this.disabled) {
      this.clear.emit();
    }
  }
}
