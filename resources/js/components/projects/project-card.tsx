import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { AlertCircle, EditIcon } from 'lucide-react';
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Project } from '@/types/project';
import { router, useForm } from '@inertiajs/react';

type Props = {
    project: Project;
}

type UpdateProjectForm = {
    name: string;
    description: string;
}

export default function ProjectCard({project} : Props) {

    const { data, setData, put, processing, errors, reset } = useForm<UpdateProjectForm>({
        name: project.name,
        description: project.description ?? "",
    })
    const handleUpdateProject = () => {
        put("/project/"+project.slug)
    }

    const handleDeleteProject = () => {
        router.delete("/project/"+project.slug)
    }

    return (
        <Card>
            <CardHeader className={'flex flex-row items-center justify-between'}>
                <CardTitle>{project.name}</CardTitle>
                <Dialog>
                    <form>
                        <DialogTrigger asChild>
                            <Button variant={'outline'}>
                                <EditIcon />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit Project</DialogTitle>
                                <DialogDescription>Update the project details.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="project_name">
                                        Name <span className={'text-red-500'}>*</span>
                                    </Label>
                                    <Input onChange={event => {
                                        setData("name",event.target.value);
                                    }} required={true} id="project_name" name="name" value={data.name} />
                                    {errors.name && (
                                        <p className="text-sm text-red-500 flex items-center gap-1">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="project_description">Description</Label>
                                    <Textarea onChange={event => {
                                        setData("description",event.target.value);
                                    }} id="project_description" name="description" value={data.description} />
                                    {errors.description && (
                                        <p className="text-sm text-red-500 flex items-center gap-1">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button onClick={handleUpdateProject} type="submit">Save Project</Button>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    {project.description}
                </CardDescription>
            </CardContent>
            <CardFooter className={'flex flex-row gap-3'}>
                <Button onClick={()=>{
                    router.visit("/project/"+project.slug)
                }} variant={'outline'}>View Details</Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>This action cannot be undone. This will permanently delete project.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteProject}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    );
}
