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
import {useAuthSlice} from "@/store/authSlice.ts";
import {toast} from 'sonner'
import {LoginValues} from "@/types/store/Auth.ts";
import CardWrapper from "@/components/auth/card-wrapper.tsx";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/common/hooks/useAuth.ts";

const LoginForm: FC = () => {

    const {login} = useAuth();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            userName: '',
            password: '',
            confirm: ''
        }
    });

    const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {

        const loginValues: LoginValues = {
            userName: values.userName,
            password: values.password,
            fingerprint: uuidv4()
        };

        console.log('Login handling');
        console.table(loginValues);

        try {

            await login(loginValues);

            const errorMessage = useAuthSlice.getState().errorMessage;

            if (errorMessage) {
                toast.error(errorMessage || 'Unexpected error.');
                return;
            }

            toast.success("You are successfully logged in.");

            navigate('/');
        } catch (error: unknown) {
            console.log('Error catch: ', error);

            toast.error('An error occurred on the server.');
        } finally {
            form.reset();
        }
    };

    return (

        <CardWrapper
            label="Login to your account"
            title="Login"
            backButtonLink="/register"
            backButtonLabel="Dont't have an account? Register here."
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
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
                            <Button type="submit" className="w-full text-base">Log in</Button>
                        </div>
                    </div>
                </form>
            </Form>
        </CardWrapper>


    );
};

export default LoginForm;