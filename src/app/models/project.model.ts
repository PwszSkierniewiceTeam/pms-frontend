import { ProjectUserRole } from '../enums/project-user-role.enum';
import { Model } from './base.model';

export class Project extends Model {
  description: string;
  endDate: string;
  id: string;
  name: string;
  startDate: string;
  userRole: ProjectUserRole;
}
