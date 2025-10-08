import { User } from '@/types/index';
import { Task } from '@/types/task';

export type Project = {
    id: number;
    slug: string;
    description: string;
    name: string;
    users?: User[];
    tasks: Task[];
}
