import {Component, Input, Output, OnChanges, SimpleChange, EventEmitter} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

import {ClientInterface} from 'src/app/shared/models/interfaces/client';

import {ClientModel} from 'src/app/shared/models/client.model';
import {ApiService} from 'src/app/shared/services/api.service';

@Component({
    selector: 'app-client-details',
    templateUrl: './client-details.component.html',
    styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnChanges {
    @Input()
    ssn: string;

    @Input()
    addClient: boolean;

    @Output()
    onSaveSuccess: EventEmitter<boolean> = new EventEmitter();

    /** Client data */
    private clientData: ClientInterface;
    /** Copy of the initial client data */
    private _clientData: ClientInterface;
    /** Flag for letting know the user that save is in progress */
    private isSaving: boolean;
    /** Flag for letting know the user that save is in progress */
    private isRemoving: boolean;

    constructor(public clientModel: ClientModel, private apiService: ApiService, private toastr: ToastrService) {
    }

    /**
     * This is an Angular method
     * (one of the lifcecycle component hooks: https://angular.io/guide/lifecycle-hooks)
     * Will detect changes on the @Input data, e.g when user select a diferent client from the list
     */
    ngOnChanges(changes: { ssn: SimpleChange, addClient: SimpleChange }) {
        const {ssn, addClient} = changes;

        if (!ssn || !ssn.currentValue) this.clearComponentData();

        if (ssn && ssn.currentValue && ssn.currentValue !== ssn.previousValue) {
            /** If ssn changes on selection, get the selected client details */
            this.getClientDetailsData(ssn.currentValue);
        }

        if (addClient && addClient.currentValue !== addClient.previousValue) {
            console.log("addClient changed " + addClient.previousValue + " --> " + addClient.currentValue);
            this.onClientSave();
        }
    }

    /**
     * Requesting client details data through the API Service
     * @param ssn  {string}
     */
    getClientDetailsData(ssn: string): void {
        this.apiService.getClientDetails(ssn).subscribe(
            (data: ClientInterface) => {
                /** Saving the obtained client data into a variable */
                this.clientData = data;
                /** Making copy of the initial client data (for comparing purpose only) */
                this._clientData = Object.assign({}, this.clientData);
            },
            (error: HttpErrorResponse) => console.error(error)
        );
    }

    /**
     * Will submit the client data if has been changed
     * This method is it bind to the `Save Client` button
     */
    onClientSave(): void {
        /** Initialize the isSaving flag */
        this.isSaving = true;
        /** Trigger the saving method from the API Service passing the clientData*/
        this.apiService.saveClientDetails(this.clientData).subscribe(
            /** On Success */
            (data: ClientInterface) => {
                /** Update the copy of the initial client data */
                this._clientData = data;
                /** Notify the parent component to refresf the client list */
                this.onSaveSuccess.emit(true);
                /** Notify the user with a successful message */
                this.toastr.success('Client details updated!');
            },
            /** On Error */
            (error: HttpErrorResponse) => {
                /** Notify the user about the error */
                this.toastr.error(error.message);
                /** End the isSaving flag */
                this.isSaving = false;
            },
            /** End the isSaving flag */
            () => (this.isSaving = false)
        );
    }

    /**
     * Will remove the client data through the API service
     * This method is it bind to the `Delete` button
     */
    onClientRemove(): void {
        /** Initialize the isRemoving flag */
        this.isRemoving = true;
        /** Trigger the saving method from the API Service passing the ssn*/
        this.apiService.deleteClient(this.clientData.ssn).subscribe(
            () => {
                /** End the isRemoving flag */
                this.isRemoving = false;
                /** Clear the component data */
                this.clearComponentData();
                /** Notify the parent component to refresf the client list */
                this.onSaveSuccess.emit(true);
                /** Notify the user with a successful message */
                this.toastr.success('Client was removed!');
            },
            (error: HttpErrorResponse) => {
                /** Notify the user about the error */
                this.toastr.error(error.message);
                /** End the isRemoving flag */
                this.isRemoving = false;
            }
        );
    }

    /**
     * Will determinate if the data has been changed or not
     * Buttons will remaing disabled if not change has happened
     */
    hasClientDataChanged(): boolean {
        return JSON.stringify(this.clientData) !== JSON.stringify(this._clientData);
    }

    /** This method will clear the `clientData` value and `_clientData` copy value */
    clearComponentData(): void {
        this.clientData = undefined;
        this._clientData = undefined;
    }

    onClientCreate(): void {
        this.apiService.createClient(this.clientData).subscribe(
            (data: ClientInterface) => {
                /** Saving the obtained client data into a variable */
                this.clientData = data;
                /** Making copy of the initial client data (for comparing purpose only) */
                this._clientData = Object.assign({}, this.clientData);
            },
            (error: HttpErrorResponse) => console.error(error)
        );
    }
}
