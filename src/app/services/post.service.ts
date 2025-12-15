import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Post {
  id: number;
  title: string;
  views: number;
}

@Injectable({ providedIn: 'root' })
export class PostService {
  http = inject(HttpClient);

  getPosts(): Observable<Post[]> {
    return this.http
      .get('http://localhost:3000/posts')
      .pipe(map((data) => data as Post[]));
  }
}
