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

const LoginForm: FC = () => {

    const {login} = useAuthSlice();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            username: '',
            password: ''
        }
    });


    const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
        const loginValues: LoginValues = {
            username: values.username,
            password: values.password,
            fingerprint: uuidv4()
        };
        console.log('Login handling');
        console.table(loginValues);
        try {

            await login(loginValues);
            const errorMessage = useAuthSlice.getState().errorMessage;
            if (errorMessage === 'user_not_found') {
                toast.error('The login or password is incorrect.');
                return;
            }
            if (errorMessage) {
                toast.error('Unexpected error.');
                return;
            }
            toast.success('You are successfully logged in.');
        } catch (error: unknown) {
            console.log('Error catch:');
            console.log(error);
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
                            name='username'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Enter username'
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
                                    <FormLabel >Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            placeholder='Enter password'
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