import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

/** Class interface which can tell the router whether or not it should allow navigation to a requested route */
@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * Constructor
   */
  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Will allow the user to continue to the next route if he's authenticated
   * @param  {ActivatedRouteSnapshot} route instance of the active route
   * @param  {RouterStateSnapshot}    state instance of the router state
   * @return {Observable|Promise|boolean}   true if user is logged in or redirect to /login if he's not
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated: boolean = this.authService.isLoggedIn();
    console.log("auth.guard.service.ts isAuthenticated = " + isAuthenticated);
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return isAuthenticated;
    }
  }
}
