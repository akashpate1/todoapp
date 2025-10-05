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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertCircle, PlusIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';

type CreateProjectForm = {
    name: string;
    description: string;
}

export default function NewProject() {


    const { data, setData, post, processing, errors, reset } = useForm<CreateProjectForm>()
    const handleNewProject = () => {
            post("/project")
    }

    return (
        <Dialog>
            <form onSubmit={handleNewProject}>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <PlusIcon /> New Project
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>New Project</DialogTitle>
                        <DialogDescription>
                            Create a new project to get started.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="project_name">Name <span className={"text-red-500"}>*</span></Label>
                            <Input onChange={event => {
                                setData("name",event.target.value);
                            }} required={true} id="project_name" name="name" placeholder="My Project" value={data.name} className={errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''} />
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
                                setData("description",event.target.value)
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
                        <Button type="button" onClick={handleNewProject}>Create Project</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
