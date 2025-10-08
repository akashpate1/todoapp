import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Project } from '@/types/project';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { TaskCard } from '@/components/tasks/task-card';
import { ProjectAccess } from '@/components/projects/project-access';
import TaskForm from '@/components/tasks/task-form';



type Props = {
    project: Project;
}

export default function show({project}: Props) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Projects',
            href: '/project'
        },
        {
            title: project.name,
            href: `/project/${project.slug}`
        }
    ];



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <main className={"m-5 flex flex-col gap-4"}>
                <div className={"flex flex-row justify-between"}>
                    <div className={"flex flex-row gap-4"}>
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            {project.name}
                        </h3>
                        <div className={"flex flex-row gap-2"}>
                            <ProjectAccess
                                project={project}
                            />
                        </div>
                    </div>
                    <TaskForm project={project} isEditing={false}>
                        <Button variant={'outline'}>
                            <PlusIcon/>
                            New Task
                        </Button>
                    </TaskForm>

                </div>
                <div className={"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"}>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Todo</CardTitle>
                            </CardHeader>
                            <CardContent className={""}>
                                <div className={"flex flex-col gap-4"}>
                                    {project.tasks.filter(task => task.status === 'todo').map((task) => (
                                        <TaskCard project={project} task={task} key={task.id} />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>In Progress</CardTitle>
                            </CardHeader>
                            <CardContent className={""}>
                                <div className={"flex flex-col gap-4"}>
                                    {project.tasks.filter(task => task.status === 'in_progress').map((task) => (
                                        <TaskCard project={project} task={task} key={task.id} />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Done</CardTitle>
                            </CardHeader>
                            <CardContent className={""}>
                                <div className={"flex flex-col gap-4"}>
                                    {project.tasks.filter(task => task.status === 'done').map((task) => (
                                        <TaskCard project={project} task={task} key={task.id} />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>


        </AppLayout>
    );
}
