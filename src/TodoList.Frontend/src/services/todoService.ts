import {AxiosResponse} from "axios";
import {Result} from "@/types/models/response/Result.ts";
import {Todo} from "@/types/entities/Todo.ts";
import api from "@/common/axios.ts";
import {ENDPOINTS} from "@/common/endpoints.ts";
import {CreateTodo, UpdateTodo} from "@/types/models/request/TodoRequest.ts";

const todoService = {
    get: async (): Promise<AxiosResponse<Result<Todo[]>>> => {
        return await api.get<Result<Todo[]>>(ENDPOINTS.TODO.GET);
    },
    create: async (by: CreateTodo): Promise<AxiosResponse<Result<void>>> => {
        return await api.post<Result<void>>(ENDPOINTS.TODO.CREATE, by);
    },
    update: async (by: UpdateTodo): Promise<AxiosResponse<Result<void>>> => {
        return await api.put<Result<void>>(ENDPOINTS.TODO.UPDATE(by.todoId), by);
    },
    delete: async (todoId: string): Promise<AxiosResponse<Result<void>>> => {
        return await api.delete<Result<void>>(ENDPOINTS.TODO.DELETE(todoId));
    }
};

export default todoService;