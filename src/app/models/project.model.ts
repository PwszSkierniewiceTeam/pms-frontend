import { ProjectUserRole } from '../enums/project-user-role.enum';
import { Model } from './base.model';

export class Project extends Model {
  description: string;
  id: string;
  name: string;
  userRole: ProjectUserRole;
  private _endDate: Date;
  private _startDate: Date;

  get endDate(): Date {
    return this._endDate;
  }

  set endDate(date: Date) {
    this._endDate = date instanceof Date ? date : new Date(date);
  }

  get startDate(): Date {
    return this._startDate;
  }

  set startDate(date: Date) {
    this._startDate = date instanceof Date ? date : new Date(date);
  }
}
