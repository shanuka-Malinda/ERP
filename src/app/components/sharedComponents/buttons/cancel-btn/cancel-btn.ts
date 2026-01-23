import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cancel-btn',
  imports: [CommonModule],
  templateUrl: './cancel-btn.html',
  styleUrl: './cancel-btn.scss',
})
export class CancelBtn {
  @Input() label: string = 'Cancel';
  @Input() icon?: string;
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;

  @Output() cancel = new EventEmitter<void>();

  onClick() {
    if (!this.loading && !this.disabled) {
      this.cancel.emit();
    }
  }
}
