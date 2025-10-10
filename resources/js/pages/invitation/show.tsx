import Layout from '@/layouts/app-layout'
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import NewProject from '@/components/projects/new-project';
import ProjectCard from '@/components/projects/project-card';
import type { BreadcrumbItem } from '@/types';
import { Invitation } from '@/types/invitation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { fallbackAvatar } from '@/lib/utils';
import { ArrowRight, MailOpen, ShieldX } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type Props = {
    invitation: Invitation;
    expired: boolean;
}
export default function show({invitation,expired}: Props) {

    const acceptInvitation = () => {

        router.post(`/invitation/${invitation.invitation_token}/accept`,{},{
            onSuccess: () => {
                toast("Invitation accepted successfully!",{
                    action: {
                        label: "View Project",
                        onClick: () => {
                            router.visit(`/project/${invitation.project.slug}`)
                        },
                    },
                    onAutoClose: () =>{
                        router.visit("/project")
                    }
                })
            },
            onError: () => {
                toast.error("Failed to accept invitation")
            },
        })
    }
    return (
        <AppLayout breadcrumbs={[]}>
            <Head title="Projects" />
            <main className={"m-5 flex flex-col gap-4 items-center"}>

                {expired && (
                    <Card>
                        <CardContent className={"flex flex-col gap-6 items-center"}>
                            <ShieldX size={50} className={"text-red-400"} />
                            <p>This invitation has been expired. <br/> Please request new invitation from the project owner</p>
                        </CardContent>
                    </Card>
                )}

                {!expired && (
                    <Card className={"align-middle h-full"}>
                        <CardHeader>
                            <CardTitle>
                                Project Invitation
                            </CardTitle>
                        </CardHeader>
                        <CardContent className={"flex flex-col gap-4 items-center"}>
                            <div className="flex flex-row gap-6">
                                <div className="flex flex-col items-center">
                                    <Avatar>
                                        <AvatarImage src={invitation.project.user?.avatar}/>
                                        <AvatarFallback>{fallbackAvatar(invitation.project.user?.name || "")}</AvatarFallback>
                                    </Avatar>
                                    {invitation.project.user?.name}
                                </div>
                                <ArrowRight />
                                <div className="flex flex-col items-center">
                                    <Avatar>
                                        <AvatarFallback>{fallbackAvatar(invitation.project.name)}</AvatarFallback>
                                    </Avatar>
                                    {invitation.project.name}
                                </div>
                            </div>
                            <p>
                                {invitation.project.user?.name} invited you to join the {invitation.project.name}
                            </p>
                            <div className={"flex flex-row gap-4 items-center"}>
                                <Button onClick={acceptInvitation}>
                                    Accept
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}



            </main>


        </AppLayout>
    );
}
