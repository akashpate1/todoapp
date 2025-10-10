import { Project } from '@/types/project';

export type Invitation = {
    invitation_token: string;
    expires_at: Date;
    email: string;
    accepted_at: Date;
    project: Project;
}
