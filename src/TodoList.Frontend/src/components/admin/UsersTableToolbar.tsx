import {Table} from "@tanstack/react-table";
import {DataTableToolbar} from "@/components/reusable/DataTableToolbar.tsx";

type TodoTableToolbarProps<TData> = {
    table: Table<TData>;
}

export function UsersTableToolbar<TData>({
                                            table
                                        }: TodoTableToolbarProps<TData>) {

    // const isFiltering = table.getState().columnFilters.length > 0;

    return (
        <DataTableToolbar
            table={table}
        >
            {/*<Input*/}
            {/*    placeholder="Filter todos by title..."*/}
            {/*    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}*/}
            {/*    onChange={(event) =>*/}
            {/*        table.getColumn("title")?.setFilterValue(event.target.value)*/}
            {/*    }*/}
            {/*    className="h-8 w-[150px] lg:w-[250px]"*/}
            {/*/>*/}
            {/*{isFiltering && (*/}
            {/*    <Button*/}
            {/*        variant="ghost"*/}
            {/*        onClick={() => table.resetColumnFilters()}*/}
            {/*        className="h-8 px-2"*/}
            {/*    >*/}
            {/*        Reset*/}
            {/*        <X />*/}
            {/*    </Button>*/}
            {/*)}*/}
            <>
                Users Table Tool Bar
            </>
        </DataTableToolbar>
    );
}