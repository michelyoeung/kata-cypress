import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss'],
})
export class ChatBubbleComponent {
  @Input() text = '';
  @Input() value = '';
  @Input() isDisabled = false;

  @Output() clicked = new EventEmitter<string>();

  nomSnd = new Audio();

  onClick(): void {
    if (this.isDisabled) {
      return;
    }
    this.nomSnd.play();
    this.clicked.emit(this.value);
  }
}
