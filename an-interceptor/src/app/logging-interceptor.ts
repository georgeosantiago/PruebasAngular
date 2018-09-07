import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,  HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

function sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
   
    const started = Date.now();
    let ok: string = '';
    const myReq = req.clone();

    return next.handle(myReq)
    .pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
            ok= 'succeeded';

            if( typeof(event.body[0]) !== 'undefined' && event.body[0].name == 'Superman' ){                
                console.log(' -->Superman' + ' SuperPepe');
                event.body[0].name = 'SuperPepe';
            }
        }
      },  error => ok = 'failed'),
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
        console.log(' -->' + msg);
      })
    );

  }

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler) /*:Observable<HttpEvent<any>>*/ {

    return sendRequest(req, next);

    /*
    const started = Date.now();
    let ok: string;
    return next.handle(req)
    .pipe(
        tap(
            event => ok = event instanceof HttpResponse ? 'succeeded' : '', error => ok = 'failed'
          ),        
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
        console.log(' -->' + msg);
      })
    ); */

  }

}
