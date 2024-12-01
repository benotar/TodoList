import {Table} from "@tanstack/react-table";
import {DataTableViewOptions} from "@/components/reusable/DataTableViewOptions.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {X} from "lucide-react";

type DataTableToolbarProps<TData> = {
    table: Table<TData>;
    placeholder: string;
    filterField: string;
}

export function DataTableToolbar<TData>({
                                            table,
                                            placeholder,
                                            filterField
                                        }: DataTableToolbarProps<TData>) {

    const isFiltering = table.getState().columnFilters.length > 0;

    return (
        <div className="flex flex-col gap-y-4 sm:flex-row">
            <div className="flex flex-1 items-start gap-x-2">
                <Input
                    placeholder={placeholder}
                    value={(table.getColumn(filterField)?.getFilterValue() as string) ?? ""}
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
                        <X/>
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table}/>
        </div>
    );
}