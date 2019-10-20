import { AccountInterface } from './account';

/** Client Interface */

export interface ClientInterface {
  accountList: Array<AccountInterface>;

  address: string;

  email: string;

  firstname: string;

  identityCardNumber: string;

  lastname: string;

  ssn: string;

}
