import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MobileSidebarToggleService {
  private mobileSidebarVisibleSource = new Subject<boolean>();

  public mobileSidebarVisibilityChanged$ = this.mobileSidebarVisibleSource.asObservable();

  constructor() { }

  public updateVisibility(visibility: boolean) {
    this.mobileSidebarVisibleSource.next(visibility);
  }
}
