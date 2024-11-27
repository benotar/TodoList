export type CreateTodo = {
    userId: string;
    title: string;
    description?: string;
};

export type UpdateTodo = {
    todoId: string;
    title: string;
    isCompleted: boolean;
}