import { User } from '@/types/index';
import { Project } from '@/types/project';

export type Task = {
    id: string;
    title: string;
    description: string;
    status: "todo" | "in_progress" | "done";
    user: User;
    project: Project;
}
