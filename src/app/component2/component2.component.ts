import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-component2',
  templateUrl: './component2.component.html',
  styleUrls: ['./component2.component.css'],
})
export class Component2Component implements OnInit {
  public nome: String = '';

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((valores) => (this.nome = valores['variavel']));
  }

  ngOnInit(): void {}
}
