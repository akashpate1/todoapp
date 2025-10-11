import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { JSX } from 'react';
import { Task } from '@/types/task';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { User } from '@/types';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, CircleCheck, List, Loader, Timer } from 'lucide-react';
import { Project } from '@/types/project';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { fallbackAvatar } from '@/lib/utils';

type Props = {
    isEditing: boolean,
    project: Project,
    task?: Task,
    children: JSX.Element,
}

type TaskForm = {
    title: string;
    description: string;
    status: "todo" | "in_progress" | "done";
    user_id: number | null;
}

type StatusDropDownProps = {
    handleChange: (status: "todo" | "in_progress" | "done") => void;
    status: "todo" | "in_progress" | "done";
}
function TaskStatusDropDown({handleChange,status} : StatusDropDownProps) {
    return (
        <Select onValueChange={handleChange} value={status}>
            <SelectTrigger>
                <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem defaultChecked={true} value="todo">
                        <List />Todo</SelectItem>
                    <SelectItem value="in_progress">
                        <Timer />In Progress</SelectItem>
                    <SelectItem value="done">
                        <CircleCheck />Done</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

type UserDropDownProps = {
    users: User[];
    handleChange: (user_id: number) => void;
    user_id: string;
}
function TaskUserDropDown({users, handleChange, user_id}: UserDropDownProps) {
    return (
        <Select onValueChange={(value: string) => {
            handleChange(Number(value));
        }} value={user_id}>
            <SelectTrigger>
                <SelectValue placeholder="Assign user" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {users.map((user: User) => (
                        <SelectItem key={user.id} value={String(user.id)}>
                            <Avatar>
                                <AvatarImage src={user.avatar}/>
                                <AvatarFallback>{fallbackAvatar(user.name)}</AvatarFallback>
                            </Avatar>
                            {user.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default function TaskForm({isEditing, task, project, children}: Props){

    const {data, setData, processing, post, put, errors} = useForm<TaskForm>({
        title: task?.title ?? "",
        description: task?.description ?? "",
        status: task?.status ?? "todo",
        user_id: task?.user?.id ?? null
    });

    const handleSave = () => {

        if(!isEditing){
            post("/project/"+project.slug+"/task")
        }else{
            put("/project/"+project.slug+"/task/"+task?.id)
        }
    }

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Task' : 'Add Task'}</DialogTitle>
                    <DialogDescription>{isEditing ? 'Update your task details' : 'Add your task details'}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="title">Title</Label>
                        <Input onChange={event => {
                            setData("title",event.target.value)
                        }} id="title" value={data.title} name="title" type={'text'} className={errors.title ? 'border-red-500 focus-visible:ring-red-500' : ''} />
                        {errors.title && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="h-4 w-4" />
                                {errors.title}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea onChange={event => {
                            setData("description",event.target.value)
                        }} id="description" value={data.description} name="description"  />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="status">Status</Label>
                        <TaskStatusDropDown status={data.status} handleChange={status => setData("status",status)}/>
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="user">User</Label>
                        <TaskUserDropDown user_id={String(data.user_id)} handleChange={user_id => {setData("user_id",user_id)}}  users={project.users ?? []} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSave} type="button"> {processing && <Loader/>} { isEditing ? 'Save Task' : 'Add Task'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
