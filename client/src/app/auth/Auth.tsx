'use client'

import {SubmitHandler, useForm} from "react-hook-form";
import {IAuthForm} from "../../types/auth.types";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import {authService} from "../../services/auth.service";
import {toast} from "sonner";
import {DASHBOARD_PAGES} from "../../config/pages-url.config";
import {Heading} from "../../components/ui/Heading";
import {InputField} from "../../components/ui/fields/InputField";
import {Button} from "../../components/ui/buttons/Button";


export function Auth() {

    //generic <IAuthFormt>
    const {register, handleSubmit, reset} = useForm<IAuthForm>({
        mode: 'onChange'
    })

    const [isLoginForm, setIsLoginForm] = useState(false)

    //for redirect user after success login or register
    const {push} = useRouter()

    const {mutate} = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data:IAuthForm) => authService.main(isLoginForm
            ? 'login' : 'register', data
        ),
        //after user logged or registered success
        onSuccess() {
            toast.success('Successfully login!')
            //clear form
            reset()
            //redirect to
            push(DASHBOARD_PAGES.HONE)
        }
    })

    //send data in form
    const onSubmit:SubmitHandler<IAuthForm> = data => {
        mutate(data)
    }

    return (
        <div className='flex min-h-screen'>
            <form className='w-1/4 m-auto shadow bg-sidebar lg:rounded-xl p-layout'
                  onSubmit={handleSubmit(onSubmit)}
            >
                <Heading title='Auth '/>

                <InputField
                    id='email'
                    label='Email:'
                    placeholder='Enter email'
                    type='email'
                    extra='mb-4'
                    {...register('email',
                        {required: 'Email is required!'}
                    )}

                />

                <InputField
                    id='password'
                    label='Password:'
                    placeholder='Enter password'
                    type='password'
                    extra='mb-6'
                    {...register('password',
                        {required: 'Password is required!'}
                    )}

                />

                <div className='flex items-center gap-5 justify-center'>
                    <Button onClick={() => setIsLoginForm(true)}>Login</Button>
                    <Button onClick={() => setIsLoginForm(false)}>Register</Button>
                </div>
            </form>
        </div>
    )
}
