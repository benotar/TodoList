import {FC} from "react";
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button.tsx";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form.tsx";
import {Input} from '@/components/ui/input.tsx';
import {loginFormSchema} from '@/schema/index.ts';
import {v4 as uuidv4} from 'uuid';
import {toast} from 'sonner'
import {LoginValues} from "@/types/store/Auth.ts";
import AuthCardWrapper from "@/components/auth/AuthCardWrapper.tsx";
import {useNavigate} from "react-router-dom";
import {useAuthAction} from "@/common/hooks/useAuthAction.ts";
import {useAuthStore} from "@/store/authStore.ts";
import {ErrorCode} from "@/types/models/response/Errors.ts";

const LoginForm: FC = () => {

    const {login} = useAuthAction();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            userName: '',
            password: '',
            confirm: ''
        }
    });

    const handleSubmitBtn = async (values: z.infer<typeof loginFormSchema>) => {

        const loginValues: LoginValues = {
            userName: values.userName,
            password: values.password,
            fingerprint: uuidv4()
        };

        console.log("Login handling");
        console.table(loginValues);

        await login(loginValues);

        const currentErrorMessage = useAuthStore.getState().errorMessage;

        if (currentErrorMessage) {

            toast.error(currentErrorMessage || ErrorCode.UnknownError);

            return;
        }

        toast.success("You are successfully logged in.");
        navigate("/");
        form.reset();
    };

    return (

        <AuthCardWrapper
            label="Login to your account"
            title="Login"
            backButtonLink="/register"
            backButtonLabel="Don't have an account? Register here."
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmitBtn)}>
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name='userName'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Enter username...'
                                            {...field}
                                            autoFocus
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            placeholder='Enter password...'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='confirm'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            placeholder='Confirm password...'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div>
                            <Button type="submit" size="sm" className="w-full text-base mt-2">
                                Log in
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </AuthCardWrapper>


    );
};

export default LoginForm;