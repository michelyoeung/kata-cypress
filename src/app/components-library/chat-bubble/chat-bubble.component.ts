import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss'],
})
export class ChatBubbleComponent implements OnInit {
  @Input() text = '';
  @Input() value = '';
  @Input() isDisabled = false;

  @Output() clicked = new EventEmitter<string>();

  nomSnd = new Audio();

  ngOnInit() {
    this.nomSnd.src = '../../assets/sounds/nom-nom.mp3';
    this.nomSnd.load();
  }

  onClick(): void {
    if (this.isDisabled) {
      return;
    }
    this.nomSnd.play();
    this.clicked.emit(this.value);
  }
}
