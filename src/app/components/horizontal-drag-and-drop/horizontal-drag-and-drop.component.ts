import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-horizontal-drag-and-drop',
  imports: [CdkDropList, CdkDrag],
  templateUrl: './horizontal-drag-and-drop.component.html',
  styleUrl: './horizontal-drag-and-drop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalDragAndDropComponent {
  items = [
    'Zero',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
}
