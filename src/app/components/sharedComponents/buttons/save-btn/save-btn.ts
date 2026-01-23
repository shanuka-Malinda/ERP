import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-save-btn',
  imports: [CommonModule],
  templateUrl: './save-btn.html',
  styleUrl: './save-btn.scss',
})
export class SaveBtn {
  @Input() label: string = 'Save';
  @Input() icon?: string;              // e.g. "fa fa-save"
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;

  @Output() save = new EventEmitter<void>();

  onClick() {
    if (!this.loading && !this.disabled) {
      this.save.emit();
    }
  }
}
