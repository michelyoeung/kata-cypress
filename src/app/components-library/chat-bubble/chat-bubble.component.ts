import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss'],
})
export class ChatBubbleComponent {
  @Input() text = '';
  @Input() value = '';

  @Output() clicked = new EventEmitter<string>();

  onClick(): void {
    this.clicked.emit(this.value);
  }
}
