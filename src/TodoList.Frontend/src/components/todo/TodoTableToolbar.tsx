import {Table} from "@tanstack/react-table";
import { X } from "lucide-react"
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

type TodoTableToolbarProps<TData> = {
    table: Table<TData>
}

export function TodoTableToolbar<TData>({
                                            table
                                        }: TodoTableToolbarProps) {

    const isFiltering = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Filtert todos..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {isFiltering && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2"
                    >
                        Reset
                        <X />
                    </Button>
                )}
            </div>
        </div>
    );
}