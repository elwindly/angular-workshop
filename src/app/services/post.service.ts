import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { toPromise } from '../utils/to-promise';

export interface Post {
  id: string;
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

  getPostsById(id: string): Observable<Post> {
    return this.http
      .get(`http://localhost:3000/posts/${id}`)
      .pipe(map((data) => data as Post));
  }

  findPromiseByIdPromise(
    id: string,
    abortSignal?: AbortSignal
  ): Promise<Post | undefined> {
    return toPromise(this.getPostsById(id), abortSignal);
  }
}
