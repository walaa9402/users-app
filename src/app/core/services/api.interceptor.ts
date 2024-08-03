import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (
      !req.url.startsWith("http") &&
      !req.url.startsWith("https") &&
      !req.url.includes("assets")
    ) {
      const BaseUrl = environment.BaseUrl;
      const apiReq = req.clone({ url: `${BaseUrl}${req.url}` });
      return next.handle(apiReq)
    } else return next.handle(req)
  }
}
