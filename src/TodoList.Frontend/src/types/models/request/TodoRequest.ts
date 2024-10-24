export type CreateTodo = {
    userId: string;
    title: string;
    description?: string;
};

export type UpdateTodo = {
    todoId: string;
    userId: string;
    newTitle: string;
    newDescription: string;
}