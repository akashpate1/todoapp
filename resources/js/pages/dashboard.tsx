import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Task } from '@/types/task';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { ClipboardList, Icon, ListTodoIcon } from 'lucide-react';
import { Button } from '@headlessui/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { fallbackAvatar } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

type Props  = {
    tasks: Task[];
    projects: number;
    in_progress_tasks: number;
    completed_tasks: number;
}

export default function Dashboard({tasks,projects,in_progress_tasks,completed_tasks}: Props) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Link href={'/project'}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Projects</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <span className="text-3xl">{projects}</span>
                            </CardContent>
                        </Card>
                    </Link>
                    <Card>
                        <CardHeader>
                            <CardTitle>In Progress Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <span className="text-3xl">{in_progress_tasks}</span>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Finished Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <span className="text-3xl">{completed_tasks}</span>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>My Backlog</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Project</TableHead>
                                    <TableHead>Task Name</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Project Owner</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tasks.map((task) => (
                                    <TableRow
                                        className={'cursor-pointer'}
                                        onClick={() => {
                                            router.visit(`/project/${task.project.slug}`);
                                        }}
                                        key={task.id}
                                    >
                                        <TableCell className="font-medium">{task.project.name}</TableCell>
                                        <TableCell>{task.title}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600">
                                                <ListTodoIcon />
                                                {task.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className={'flex items-center justify-end gap-4'}>
                                                <Avatar>
                                                    <AvatarImage src={task.project.user?.avatar} />
                                                    <AvatarFallback>{fallbackAvatar(task.project.user?.name ?? '')}</AvatarFallback>
                                                </Avatar>
                                                {task.project.user?.name} <br />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {tasks.length === 0 && (
                            <Empty>
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <ClipboardList />
                                    </EmptyMedia>
                                    <EmptyTitle>Empty Backlog</EmptyTitle>
                                    <EmptyDescription>There are 0 items in your backlog. Enjoy!</EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
