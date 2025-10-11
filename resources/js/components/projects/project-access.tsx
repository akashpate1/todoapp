import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle, Share } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Project } from '@/types/project';
import { useForm, usePage } from '@inertiajs/react';
import { fallbackAvatar } from '@/lib/utils';
import { toast } from 'sonner';
import { useState } from 'react';
import { AuthProps } from '@/components/projects/project-card';

type Props  = {
    project: Project;
}
type InviteUserForm = {
    email: string;
}
export function ProjectAccess({project}: Props){

    const { data, setData, put, processing, errors } = useForm<InviteUserForm>()
    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const [usersModalOpen, setUsersModalOpen] = useState(false);

    const handleInviteUser = () => {
        put("/project/"+project.slug+"/invite",{
            onSuccess: () => {
                toast.success('User invited successfully!');
                setInviteModalOpen(false);
            }
        })
    }

    const authProps: AuthProps = usePage().props.auth as AuthProps;

    return (
        <>
            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 ">
                <Dialog open={usersModalOpen} onOpenChange={setUsersModalOpen}>
                    <DialogTrigger asChild>
                        <div className={"flex gap-2 cursor-pointer"}>
                            {project.users?.map((user) => (
                                <Avatar key={user.id}>
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback>{fallbackAvatar(user.name)}</AvatarFallback>
                                </Avatar>
                            ))}
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Project Users</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-3">
                            {project.users?.map((user) => (
                                <div key={user.id} className={"flex flex-row gap-6 items-center"}>
                                    <Avatar>
                                        <AvatarImage src={user.avatar} />
                                        <AvatarFallback>{fallbackAvatar(user.name)}</AvatarFallback>
                                    </Avatar>
                                    <div className={"flex flex-col"}>
                                        <span>{user.name}</span>
                                        <span className="text-sm text-muted-foreground">{user.email}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {project.user?.id === authProps.user.id && (
                <Dialog open={inviteModalOpen} onOpenChange={setInviteModalOpen}>
                    <DialogTrigger asChild>
                        <Button variant={"outline"}><Share/></Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Invite User</DialogTitle>
                            <DialogDescription>
                                Invite the user to your project using email id.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    onChange={event => {
                                        setData("email", event.target.value)
                                    }}
                                    id="email"
                                    value={data.email}
                                    name="email"
                                    type={'email'}
                                    className={errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="h-4 w-4" />
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={handleInviteUser} type="button" disabled={processing}>
                                Invite
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}
