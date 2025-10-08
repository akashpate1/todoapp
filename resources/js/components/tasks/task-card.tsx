import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { EditIcon } from 'lucide-react';
import TaskForm from '@/components/tasks/task-form';
import { Project } from '@/types/project';

type Props = {
    task: Task;
    project: Project;
}
export function TaskCard({task, project}: Props){

    const avatarFallback = '';

    return (
        <Card>
            <CardHeader>
                <CardTitle className={"flex justify-between"}>
                    {task.title}
                    <TaskForm isEditing={true} task={task} project={project}>
                        <Button variant={'link'}>
                            <EditIcon/>
                        </Button>
                    </TaskForm>
                </CardTitle>

            </CardHeader>
            {task.description && (
                <CardContent>
                    <CardDescription>
                        {task.description}
                    </CardDescription>
                </CardContent>
            )}
            {task.user && (
                <CardFooter>
                    <Avatar className={"border-2 dark:border-white border-black"}>
                        <AvatarImage src={task.user.avatar} />
                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                    </Avatar>
                </CardFooter>
            )}

        </Card>
    )
}
