import { Model } from './base.model';

export class User extends Model {
  email: string;
  id: string;
  name: string;
  password?: string;
  surname: string;

  get fullName(): string {
    return `${this.name} ${this.surname}`;
  }
}
