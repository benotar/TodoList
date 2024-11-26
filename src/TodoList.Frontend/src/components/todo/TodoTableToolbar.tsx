import {Table} from "@tanstack/react-table";
import { X } from "lucide-react"
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {DataTableViewOptions} from "@/components/shared/DataTableViewOptions.tsx";

type TodoTableToolbarProps<TData> = {
    table: Table<TData>;
}

export function TodoTableToolbar<TData>({
                                            table
                                        }: TodoTableToolbarProps<TData>) {

    const isFiltering = table.getState().columnFilters.length > 0;

    return (
        <div className="flex flex-col gap-y-4 sm:flex-row">
            <div className="flex flex-1 items-start gap-x-2">
                <Input
                    placeholder="Filter todos by title..."
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
            <DataTableViewOptions table={table} />
        </div>
    );
}