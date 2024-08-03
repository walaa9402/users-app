import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  requestCount$ = new BehaviorSubject<number>(0);

  addRequest() {
    this.requestCount$.next(this.requestCount$.value + 1);
  }

  removeRequest() {
    if (this.requestCount$.value < 1) {
      return;
    }
    this.requestCount$.next(this.requestCount$.value - 1);
  }

}
