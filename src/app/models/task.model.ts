import { TaskStatus } from '../enums/task-status.enum';
import { TaskType } from '../enums/task-type.enum';
import { Model } from './base.model';
import { User } from './user.model';

export class Task extends Model {
  assignedUser: Partial<User> | null;
  description: string;
  id: string;
  name: string;
  projectId: string;
  status: TaskStatus;
  type: TaskType;
}
