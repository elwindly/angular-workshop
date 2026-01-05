import { AsyncPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  createComponent,
  EnvironmentInjector,
  inject,
  inputBinding,
  outputBinding,
  resource,
  signal,
  twoWayBinding,
  ViewContainerRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppWarningComponent } from '../../components/warning/warning.component';
import { Post, PostService } from '../../services/post.service';

@Component({
  selector: 'app-angular-20',
  imports: [AsyncPipe, MatButtonModule],
  templateUrl: './angular-20.component.html',
  styleUrl: './angular-20.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Angular20Component {
  postService = inject(PostService);
  readonly canClose = signal(true);
  readonly isExpanded = signal(true);

  private readonly injector = inject(EnvironmentInjector);
  private readonly vcr = inject(ViewContainerRef);

  posts$ = this.postService.getPosts();

  selectedId = signal<string>('');

  postByIdPromise = resource({
    params: () => ({ id: this.selectedId() }),
    loader: (param) => {
      if (!param.params.id) {
        return Promise.resolve(undefined);
      }
      return fetch(`http://localhost:3000/posts/${param.params.id!}`)
        .then((res) => res.json())
        .then((data) => data as Post);
      // return this.postService.findPromiseByIdPromise(
      //   param.params.id!,
      //   param.abortSignal
      // );
    },
  });

  postByIdSimpleHttpResource = httpResource<Post | undefined>(() =>
    this.selectedId() ? `http://localhost:3000/posts/${this.selectedId()}` : undefined,
  );

  // initially, resources are undefined
  postFromResource = computed(() => this.postByIdPromise.value());

  loadPostNmber(postNumber: string): void {
    this.selectedId.set(postNumber);
  }

  async showWarning() {
    const applicationRef = await bootstrapApplication(Angular20Component);
    const host = document.getElementById('container');

    const ref = createComponent(AppWarningComponent, {
      hostElement: host!,
      environmentInjector: this.injector,
      bindings: [
        inputBinding('canClose', this.canClose),
        twoWayBinding('isExpanded', this.isExpanded),
        outputBinding<boolean>('shouldClose', (confirmed) => {
          console.log('Closed with result:', confirmed);
          ref.destroy();
        }),
      ],
    });

    applicationRef.attachView(ref.hostView);
  }

  showWarning2() {
    const compRef = this.vcr.createComponent(AppWarningComponent, {
      bindings: [
        inputBinding('canClose', this.canClose),
        twoWayBinding('isExpanded', this.isExpanded),
        outputBinding<boolean>('shouldClose', (confirmed) => {
          console.log('Closed with result:', confirmed);
          compRef.destroy();
        }),
      ],
    });
    this.vcr.insert(compRef.hostView);
  }
}
