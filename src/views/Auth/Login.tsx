import { useState } from "react";
import logo from '../../img/logo.png';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from '../../components/ui/button.tsx';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form.tsx";
import { Input } from '../../components/ui/input.tsx';
import { loginSchema } from '../../components/Forms/validaciones.ts';
import { ModeToggle } from '../../components/ui/mode-toggle.tsx';
import axiosClient from '../../axios-client.ts';
import { useStateContext } from '../../contexts/ContextProvider.tsx';
import Loader from "../../components/ui/Loader.tsx";
import Error from "../../components/ui/Error.tsx";


const Login = () => {

  const { setUser, setToken } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      password: ""
    },
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
    setLoading(true);
    axiosClient.post('/login', values)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        setLoading(false);
        localStorage.setItem("user_id", data.user.id);
      })
      .catch(err => {
        setLoading(false);
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({
              credentials: [response.data.message],
            })
          }
        }
      })
  }

  return (
    <div className='h-[100vh] w-[100%] flex justify-center items-center'>
      <div className=' flex gap-5  w-[600px] bg-background rounded-xl shadow-lg px-[30px] py-[20px] border border-border'>

        {/*
               <div className='w-[50%] h-[400px]  flex items-center justify-center '>
          <img src={logo} alt="" className='w-[270px] h-[270px]' />
        </div>
       */}




        <div className='w-[100%] h-full py-[15px] overflow-auto px-1'>
          <div className="">    {
            loading && <Loader />
          }</div>


          <div>
            <Error errors={errors} />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usuario</FormLabel>
                      <FormControl>
                        <Input placeholder="Escribe tu usuario" {...field} />
                      </FormControl>
                      <FormDescription>
                        Escribe tu usuario de acceso.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input placeholder="Escribe tu contraseña" {...field} type='password' />
                      </FormControl>
                      <FormDescription>
                        Escribe tu contraseña.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Iniciar Sesion</Button>
              </form>
            </Form>
            <div className="mt-[20px]">
              <ModeToggle />
            </div>
          </div>

        </div>
      </div>
    </div>
  )


}


export default Login