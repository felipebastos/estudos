import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';

@Injectable()
export class XwingInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let ok: string;

    return next.handle(request).pipe(
      tap({
        next: (event) => (ok = event instanceof HttpResponse ? 'sucesso' : ''),
        error: (error) => (ok = 'falhou'),
      }),
      finalize(() => {
        const msg = `${request.method} "${request.urlWithParams}" ${ok}.`;
        console.log(msg);
      })
    );
  }
}
