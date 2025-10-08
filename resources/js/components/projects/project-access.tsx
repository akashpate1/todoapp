import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShareIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Project } from '@/types/project';
import { useForm } from '@inertiajs/react';

type Props  = {
    project: Project;
}
type InviteUserForm = {
    email: string;
}
export function ProjectAccess({project}: Props){


    const { data, setData, put, processing } = useForm<InviteUserForm>()

    const handleInviteUser = () => {
        put("/project/"+project.slug+"/invite",{
            onSuccess: () => {
            }
        })
    }

    return (
        <>
            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 ">
                <Dialog>

                    <DialogTrigger asChild>
                        <div className={"flex gap-2"}>
                            {project.users?.map((user) => (
                                <Avatar key={user.id}>
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback>{user.name}</AvatarFallback>
                                </Avatar>
                            ))}
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Project Users</DialogTitle>
                        </DialogHeader>
                        <div>
                            {project.users?.map((user) => (
                                <div className="flex flex-col gap-3">
                                    <div key={user.id} className={"flex flex-row gap-6 items-center"}>
                                        <Avatar key={user.id}>
                                            <AvatarImage src={user.avatar} />
                                            <AvatarFallback>{user.name}</AvatarFallback>
                                        </Avatar>
                                        <div className={"flex flex-col"}>
                                            {user.name} <br/>
                                            {user.email}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>

            </div>
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Button variant={"outline"}><ShareIcon/></Button>
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
                                <Input onChange={event => {
                                    setData("email",event.target.value)
                                }} id="email" value={data.email} name="email" type={'email'} />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={handleInviteUser} type="button">Invite</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    )
}
