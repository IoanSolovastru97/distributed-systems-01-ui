import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { CaregiverInterface } from 'src/app/shared/models/interfaces/caregiver';
import { HttpErrorResponse } from '@angular/common/http';
import { PatientInterface } from 'src/app/shared/models/interfaces/patient';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ActivityInterface } from 'src/app/shared/models/interfaces/activity';

@Component({
  selector: 'app-caregiver',
  templateUrl: './caregiver.component.html',
  styleUrls: ['./caregiver.component.scss']
})
export class CaregiverComponent implements OnInit, OnDestroy {


  private caregiverData: CaregiverInterface = new CaregiverInterface();
  private patients: Array<PatientInterface>;
  private serverUrl = 'http://localhost:8080/activity';
  private stompClient;

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private readonly toastr: ToastrService) {
    this.webSocket(toastr);
  }

  ngOnInit() {
    this.getCaregiverDetailsData(this.storageService.get(this.storageService.username));

  }
  ngOnDestroy(): void {
    this.stompClient.disconnect();
  }

  webSocket(toastr) {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    let activity: ActivityInterface;
    this.stompClient.connect({}, function () {
      that.stompClient.subscribe("/topic/activity", (message) => {
        if (message.body) {
          activity = JSON.parse(message.body);
            toastr.info(message.body);
        }
      });
    });
  }

  checkUsername(activity: ActivityInterface): Boolean {
    this.patients.forEach(patient => {
      if (patient.username === activity.username) {
        console.log("Patient ", patient.username);
        console.log("Activity ", activity.username);
        return true;
      }
    });
    console.log("No equal");
    return false;
  }

  /**
 * Requesting caregiver details data through the API Service
 * @param username  {string}
 */
  getCaregiverDetailsData(username: string): void {
    console.log("getCaregiver username = " + username);
    this.apiService.getCaregiverDetails(username).subscribe(
      (data: CaregiverInterface) => {
        this.caregiverData = data;
        this.patients = data.patients;
      },
      (error: HttpErrorResponse) => console.error(error)
    );

  }



}
