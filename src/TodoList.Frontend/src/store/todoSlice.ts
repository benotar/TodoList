import {TodoState, TodoSlice} from "@/types/store/Todo.ts";
import {create} from "zustand";
import {CreateTodo, UpdateTodo} from "@/types/models/request/TodoRequest.ts";
import todoService from "@/services/todoService.ts";
import {AxiosResponse} from "axios";
import {Result} from "@/types/models/response/Result.ts";
import {Todo} from "@/types/entities/Todo.ts";

const initialState: TodoState = {todos: [], errorMessage: null, isLoading: false};

export const useTodoSlice = create<TodoSlice>((set) => ({
    ...initialState,

    get: async (): Promise<void> => {

        console.log('Todo slice get');

        try {

            set({isLoading: true});

            const response: AxiosResponse<Result<Todo[]>> = await todoService.get();

            if (!response.data.isSucceed) {

                set({errorMessage: response.data.errorCode});

                return;
            }
        } catch (error: unknown) {

            const catchError = error instanceof Error ? error.message : `Unexpected error.`;

            console.error('Get todo catch error: ', catchError);

            set({errorMessage: catchError});
        } finally {

            set({isLoading: false});
        }


    },
    create: async (by: CreateTodo): Promise<void> => {

        console.log('Todo slice create');

        set({isLoading: true})

        try {

            const response: AxiosResponse<Result<void>> = await todoService.create(by);

            if (!response.data.isSucceed) {

                set({errorMessage: response.data.errorCode});

                return;
            }

        } catch (error: unknown) {

            const catchError = error instanceof Error ? error.message : `Unexpected error.`;

            console.error('Create todo catch error: ', catchError);

            set({errorMessage: catchError});
        } finally {

            set({isLoading: false});
        }
    },
    update: async (by: UpdateTodo): Promise<void> => {

        console.log('Todo slice update');

        set({isLoading: true})

        try {

            const response: AxiosResponse<Result<void>> = await todoService.update(by);

            if (!response.data.isSucceed) {

                set({errorMessage: response.data.errorCode});

                return;
            }

        } catch (error: unknown) {

            const catchError = error instanceof Error ? error.message : `Unexpected error.`;

            console.error('Create todo catch error: ', catchError);

            set({errorMessage: catchError});
        } finally {

            set({isLoading: false});
        }
    },
    delete: async (todoId: string): Promise<void> => {

        console.log('Todo slice delete');

        set({isLoading: true})

        try {

            const response: AxiosResponse<Result<void>> = await todoService.delete(todoId);

            if (!response.data.isSucceed) {

                set({errorMessage: response.data.errorCode});

                return;
            }

        } catch (error: unknown) {

            const catchError = error instanceof Error ? error.message : `Unexpected error.`;

            console.error('Create todo catch error: ', catchError);

            set({errorMessage: catchError});
        } finally {

            set({isLoading: false});
        }
    }
}));