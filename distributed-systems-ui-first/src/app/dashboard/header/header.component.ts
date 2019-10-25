import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {
  constructor(private router: Router, private storageService: StorageService) {}

  ngOnInit() {}

  logout() {
    /** On user logout, the authentication token is removed from the browser localStorage */
    this.storageService.remove(this.storageService.app_token);
    this.storageService.remove(this.storageService.role_token);
    this.storageService.remove(this.storageService.username);
    /** and the user gets redirected to the /login page */
    this.router.navigate(['/login']);
  }

  isDoctor(){
    return this.storageService.get(this.storageService.role_token) === 'ROLE_DOCTOR';
  }

}
