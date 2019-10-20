import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClientModel } from 'src/app/shared/models/client.model';
import { ClientInterface } from 'src/app/shared/models/interfaces/client';

@Component({
  selector: 'app-client-item',
  templateUrl: './client-item.component.html',
  styleUrls: ['./client-item.component.scss']
})
export class ClientItemComponent {
  /** Index number */
  @Input() index: number;

  /** Will hold the data of a single Client */
  @Input() clientData: ClientInterface;

  @Output()
  selectedClientSsn: EventEmitter<string> = new EventEmitter();

  constructor(public clientModel: ClientModel) {}

  /**
   * Will notify the parent component (client-list.component.ts)
   * when a client as been selected, an pass the ssn value of the selected client
   */
  onClientSelect() {
    this.selectedClientSsn.emit(this.clientData.ssn);
  }
}
