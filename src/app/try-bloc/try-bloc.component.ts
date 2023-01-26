import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Section } from '../models/section.model';

@Component({
  selector: 'app-try-bloc',
  templateUrl: './try-bloc.component.html',
  styleUrls: ['./try-bloc.component.scss']
})
export class TryBlocComponent {

  @Input()
  section?: Section;

  @Input()
  active?: boolean;

  @Output()
  reset = new EventEmitter<Section>();

  @Output()
  try = new EventEmitter<Section>();

  constructor() { }



}
