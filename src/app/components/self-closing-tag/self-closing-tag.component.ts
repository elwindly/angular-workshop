import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-self-closing-tag',
  imports: [],
  templateUrl: './self-closing-tag.component.html',
  styleUrl: './self-closing-tag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelfClosingTagComponent {}
