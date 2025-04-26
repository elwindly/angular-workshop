import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-angular-17',
  imports: [],
  templateUrl: './angular-17.component.html',
  styleUrl: './angular-17.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Angular17Component {
  // returns Signal<ElementRef<HTMLDivElement> | undefined>
  divEl = viewChild<ElementRef<HTMLDivElement>>('el');
  // https://nitrowise.sharepoint.com/sites/Nitrowise/SitePages/Angular-17-ujdonsagok.aspx
}
