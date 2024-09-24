import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ComboBoxDescuentos } from './ComboBoxDescuentos';
import { useStateContext } from '../../contexts/ContextProvider';
import { ZustandGeneralUsuario } from '../../contexts/ZustandGeneralUsuario';
import Dropzone from 'react-dropzone'
import MyDropzone from './dropzone';
import descuentoService from '../../lib/DescuentoService';
import { useToast } from './use-toast';

interface ModalProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  onConfirm: () => void;
}

const formSchema = z.object({
  id_descuento: z.number().min(1),
  folio: z.string().min(2).max(50),
  vigencia: z.string().min(2).max(50),
})

const ModalCrearDescuento: React.FC<ModalProps> = ({ update_data, trigger, open, set_open }) => {

  const { toast } = useToast();
  const { user } = useStateContext();
  const [archivos, set_archivos] = useState([]);
  const { usuariosEncontrados, toma } = ZustandGeneralUsuario();
  console.log(toma)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      folio: "",
      vigencia: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    //console.log(values)
    let data = {
      ...values,
      id_registra: user?.operador?.id,
      id_evidencia: 9,
      estatus: "vigente",
      modelo_dueno: "toma",
      id_modelo: toma?.id,
    }

    upload(data);
  }

  const upload = async (data: any) => {

    try {
      let data_temp = {};
      data_temp = await descuentoService.create_descueto(data, archivos);
      toast({
        title: "¡Éxito!",
        description: "El Descuento se ha creado correctamente",
        variant: "success",
      })
      set_open(false);

      update_data(prev => {
        return [...prev, data_temp];
      })
      
    } catch (err) {
      console.log(err)
      toast({
        title: "Error",
        description: err,
        variant: "destructive",
      })
    }
  }

  return (
    <div>
      <AlertDialog open={open}>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent className="max-w-[80vw] max-h-[90vh] overflow-auto">
          <div className='h-full w-full relative'>
            <p className='text-[20px] font-medium mb-5'>Crear Descuento</p>

            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="descuento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Descuento</FormLabel>
                        <FormControl>
                          <div className='w-full'>
                            <ComboBoxDescuentos form={form} />
                          </div>
                        </FormControl>
                        <FormDescription>
                          El tipo de descuento
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="folio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Folio</FormLabel>
                        <FormControl>
                          <Input placeholder="folio" {...field} />
                        </FormControl>
                        <FormDescription>
                          El Folio del descuento
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vigencia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vigencia</FormLabel>
                        <FormControl>
                          <input {...field} type="date" name="fecha_nacimiento" className=" border border-border  w-full  rounded-md p-[4px] bg-background" />
                        </FormControl>
                        <FormDescription>
                          Vigencia del descuento
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <MyDropzone set={set_archivos} />
                  </div>
                  <div className='w-full flex gap-2 justify-end'>
                    <Button type="submit">Aceptar</Button>
                    <AlertDialogCancel onClick={() => { set_open(false) }}>Cancelar</AlertDialogCancel>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ModalCrearDescuento;

