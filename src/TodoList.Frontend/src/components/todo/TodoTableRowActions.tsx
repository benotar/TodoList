import {Row} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {todoTableSchema} from "@/schema/index.ts";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {toast} from "sonner";

type TodoTableRowActionsProps<TData> = {
    row: Row<TData>
}

export function TodoTableRowActions<TData>({row}: TodoTableRowActionsProps<TData>) {

    const todo = todoTableSchema.parse(row.original);

    return(
        <div className="flex space-x-2">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Edit</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit todo</DialogTitle>
                        <DialogDescription>
                            Make changes to your todo here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input id="title" value={todo.title} className="col-span-3"/>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit"
                        >
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Delete</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>

                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Button variant="ghost"
                    onClick={() => {
                        void navigator.clipboard.writeText(todo.todoId);
                        toast.success("Copied!")
                    }}
            >
                Copy ID
            </Button>
        </div>
    );
}
