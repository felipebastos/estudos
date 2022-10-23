import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-botao',
  templateUrl: './botao.component.html',
  styleUrls: ['./botao.component.css']
})
export class BotaoComponent implements OnInit {
  @Input() texto = '';
  @Output() apertou = new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void {
  }
  onClick() {
    this.apertou.emit(this.texto)

  }

}
