export type CreateTodo = {
    title: string;
    isCompleted: boolean;
};

export type UpdateTodo = CreateTodo & {
    todoId: string;
}