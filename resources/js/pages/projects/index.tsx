import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import ProjectCard from '@/components/projects/project-card';
import NewProject from '@/components/projects/new-project';
import { Pagination } from '@/types/pagination';
import { Project } from '@/types/project';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects',
        href: '/projects'
    },
];

type Props = {
    projects: Pagination<Project>;
}

export default function index({projects}: Props) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <main className={"m-5 flex flex-col gap-4"}>
                <div className={"flex flex-row justify-between"}>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        My Projects
                    </h3>
                    <NewProject/>
                </div>
                <div className={"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"}>
                    {projects.data.map((project) => (
                        <ProjectCard key={project.id} project={project}/>
                    ))}
                </div>
            </main>


        </AppLayout>
    );
}
