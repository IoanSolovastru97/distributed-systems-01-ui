import { Injectable } from '@angular/core';
import { ClientInterface } from './interfaces/client';

@Injectable()
export class ClientModel {
  /** will grab the list of all Clients */
  all: Array<ClientInterface>;

  /** will grab the ssn value of the selected Client */
  selectedClientSsn: string;

  setSelected(ssn: string) {
    return this.all.find((client: ClientInterface) => client.ssn === ssn);
  }

  removeSelected() {
    this.selectedClientSsn = undefined;
  }

  clear() {
    this.removeSelected();
    this.all = undefined;
  }
}
