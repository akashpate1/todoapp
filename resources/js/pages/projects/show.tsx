import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import NewProject from '@/components/projects/new-project';
import { Project } from '@/types/project';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';



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
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        {project.name}
                    </h3>
                    <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarImage
                                src="https://github.com/maxleiter.png"
                                alt="@maxleiter"
                            />
                            <AvatarFallback>LR</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarImage
                                src="https://github.com/evilrabbit.png"
                                alt="@evilrabbit"
                            />
                            <AvatarFallback>ER</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <div className={"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"}>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Todo</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>In Progress</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Done</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </main>


        </AppLayout>
    );
}
