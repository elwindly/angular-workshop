import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-default-content',
  imports: [],
  templateUrl: './default-content.component.html',
  styleUrl: './default-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultContentComponent {}
