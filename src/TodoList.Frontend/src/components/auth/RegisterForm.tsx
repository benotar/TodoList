import {FC} from "react";
import AuthCardWrapper from "@/components/auth/AuthCardWrapper.tsx";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import {registerFormSchema} from "@/schema";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {z} from "zod";


const RegisterForm: FC = () => {

    const form = useForm({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            userName: '',
            password: '',
            name: ''
        }
    });

    const onSubmit = (values: z.infer<typeof registerFormSchema>) => {
        console.log(values);
    }

    return (
        <AuthCardWrapper
            label="Create an account"
            title="Register"
            backButtonLink="/login"
            backButtonLabel="Already have an account? Login here."
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="userName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter username..."
                                            autoFocus
                                            {...field}
                                            type="text"/>
                                    </FormControl>
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
                            name='name'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel >Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='text'
                                            placeholder='Enter name...'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div>
                            <Button type="submit" size="sm" className="w-full text-base mt-2">
                                Register
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </AuthCardWrapper>
    );
};

export default RegisterForm;