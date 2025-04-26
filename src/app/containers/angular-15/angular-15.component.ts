import { IMAGE_CONFIG, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { HighlightAndBorderDirective } from '../../directives/border-and-highlight.directive';
import { BorderDirective } from '../../directives/border.directive';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-angular-15',
  imports: [
    MatSliderModule,
    BorderDirective,
    HighlightDirective,
    HighlightAndBorderDirective,
    NgOptimizedImage,
  ],
  templateUrl: './angular-15.component.html',
  styleUrl: './angular-15.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        placeholderResolution: 40,
      },
    },
  ],
})
export class Angular15Component {}
