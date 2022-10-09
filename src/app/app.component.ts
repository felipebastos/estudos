import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'estudos';
  tela = "";
  simbolos : string[] = ['1', '2', '3','4','5','6','7','8','9','0','+','-','*','/','.'];
  digitou(letra:string): void{
    this.tela += letra; 
  }
  result(): void{
    this.tela = eval(this.tela)
  }
  limptela(): void{
    this.tela = "";
  }
}
