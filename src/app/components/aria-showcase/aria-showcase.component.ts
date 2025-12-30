import {
  AccordionContent,
  AccordionGroup,
  AccordionPanel,
  AccordionTrigger,
} from '@angular/aria/accordion';
import { Menu, MenuItem, MenuTrigger } from '@angular/aria/menu';
import { Toolbar, ToolbarWidget, ToolbarWidgetGroup } from '@angular/aria/toolbar';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-aria-showcase',
  imports: [
    Toolbar,
    ToolbarWidget,
    ToolbarWidgetGroup,
    Menu,
    MenuItem,
    MenuTrigger,
    AccordionGroup,
    AccordionPanel,
    AccordionTrigger,
    AccordionContent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './aria-showcase.component.html',
  styleUrl: './aria-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AriaShowcaseComponent {
  // Toolbar state
  boldActive = signal(false);
  italicActive = signal(false);
  underlineActive = signal(false);
  alignment = signal('left');

  // Menu actions
  lastAction = signal<string>('No action yet');

  // Toolbar actions
  handleToolbarAction(action: string): void {
    switch (action) {
      case 'bold':
        this.boldActive.update((v) => !v);
        break;
      case 'italic':
        this.italicActive.update((v) => !v);
        break;
      case 'underline':
        this.underlineActive.update((v) => !v);
        break;
      case 'left':
      case 'center':
      case 'right':
        this.alignment.set(action);
        break;
      default:
        this.lastAction.set(`Toolbar: ${action}`);
    }
  }

  // Menu actions
  handleMenuAction(action: string): void {
    this.lastAction.set(`Menu: ${action}`);
  }
}
