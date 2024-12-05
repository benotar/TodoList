import {Table} from "@tanstack/react-table";
import {DataTableViewOptions} from "@/components/reusable/DataTableViewOptions.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {X} from "lucide-react";
import {ReactNode} from "react";

type DataTableToolbarProps<TData> = {
    table: Table<TData>;
    placeholder: string;
    filterField: string;
    children?: ReactNode;
}

export function DataTableToolbar<TData>({
                                            table,
                                            placeholder,
                                            filterField,
                                            children
                                        }: DataTableToolbarProps<TData>) {

    const isFiltering = table.getState().columnFilters.length > 0;

    return (
        <div className="flex flex-col justify-center items-center gap-y-4 sm:flex-row">
            <div className="flex flex-1 items-start gap-x-2">
                <Input
                    placeholder={placeholder}
                    value={(table.getColumn(filterField)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(filterField)?.setFilterValue(event.target.value)
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
            <div className="flex space-x-4">
                {children /* Optional: Additional toolbar actions or components */}
                <DataTableViewOptions table={table}/>
            </div>
        </div>
    );
}