import {FC} from "react";
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button.tsx";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form.tsx";
import {Input} from '@/components/ui/input.tsx';
import {loginFormSchema} from '@/components/LoginForm/loginFormSchema.ts';
import {v4 as uuidv4} from 'uuid';
import {useAuthSlice} from "@/store/authSlice.ts";
import { toast } from 'sonner'
import {LoginValues} from "@/types/store/Auth.ts";

const LoginForm: FC = () => {

    const {login} = useAuthSlice();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            username: '',
            password: ''
        },
        mode: 'onChange'
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
            if(errorMessage) {

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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 max-w-md mx-auto p-6 border rounded-lg shadow-md'>
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
                            <FormDescription>
                                Username must be 2 to 50 characters long and can only contain letters, numbers,
                                underscores, and dashes.
                            </FormDescription>
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
                                    placeholder='Enter password'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Password must contain at least one uppercase letter, one lowercase letter, one number,
                                and be at least 8 characters long.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className='flex justify-center'>
                    <Button type='submit'>Submit</Button>
                </div>
            </form>
        </Form>
    );
};

export default LoginForm;