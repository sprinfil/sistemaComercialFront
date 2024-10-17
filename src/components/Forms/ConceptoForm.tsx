import { useState, useRef } from "react";
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
import { conceptoSchema } from './validaciones.ts';
import { ModeToggle } from '../../components/ui/mode-toggle.tsx';
import axiosClient from '../../axios-client.ts';
import Loader from "../../components/ui/Loader.tsx";
import Error from "../../components/ui/Error.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { useStateContext } from "../../contexts/ContextConcepto.tsx";
import { useEffect } from "react";
import { TrashIcon, Pencil2Icon, PlusCircledIcon, ColorWheelIcon } from '@radix-ui/react-icons';
import IconButton from "../ui/IconButton.tsx";
import { ComboBoxActivoInactivo } from "../ui/ComboBox.tsx";
import Modal from "../ui/Modal.tsx";
import ModalReactivacion from "../ui/ModalReactivación.tsx";
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import { Concepto } from "../Tables/Columns/ConceptosColumns.tsx";
import MarcoForm from "../ui/MarcoForm.tsx";
import { Switch } from "../ui/switch.tsx";
import { ComboBoxCeroUno } from "../ui/ComboBoxCeroUno.tsx";
import { SelectConceptosAbonable } from "../ui/SelectConceptos.tsx";
import { SelectTarifaFija } from "../ui/SelectTarifaFija.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { OrdenDeTrabajoComboBox } from "../ui/OrdenDeTrabajoComboBox.tsx";
import { OrdenesDeTrabajoComboBox } from "../ui/OrdenesDeTrabajoComboBox.tsx";
import { ConceptoRezagoComboBox } from "../ui/ConceptoRezagoComboBox.tsx";



const ConceptoForm = () => {
  const formTarifa = useRef(null);
  const { toast } = useToast()
  const { concepto, setConcepto, loadingTable, setLoadingTable, setConceptos, setAccion, accion } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [loadingTipoTomas, setLoadingTipoTomas] = useState(false);
  const [errors, setErrors] = useState({});
  const [abrirInput, setAbrirInput] = useState(false);
  const [conceptoIdParaRestaurar, setConceptoIdParaRestaurar] = useState(null);
  const [ModalReactivacionOpen, setModalReactivacionOpen] = useState(false);
  const [tipoTomas, setTipoDeTomas] = useState([])
  const [tarifas, setTarifas] = useState([]);
  const [estado, setEstado] = useState('Inactivo');
  const [control, setcontrol] = useState(false);
  const [seleccionarAbono, setseleccionarAbono] = useState('');
  const [valorConversionBool, setValorConversionBool] = useState(false);
  const [isAbonable, setIsAbonable] = useState(false);
  const [isTarifaFija, setIsTarifaFija] = useState(false);
  const [deshabilitat, setDeshabilitar] = useState(false);
  const [ordenDeTrabajoSeleccionada, setOrdenDeTrabajoSeleccionada] = useState<string | null>(null);
  const [conceptoRezago, setConceptoRezago] = useState<string | null>(null);

  const handleChange = (checked) => {
    const nuevoEstado = checked ? 'Activo' : 'Inactivo';
    setEstado(nuevoEstado);
  };

  useEffect((() => {
    getTipoTomas();
  }), [])

  useEffect((() => {
    getTipoTomas();
  }), [concepto])

  //con este metodo obtienes las anomalias de la bd
  const getTipoTomas = async () => {
    setLoadingTipoTomas(true);
    try {
      const response = await axiosClient.get("/TipoToma");
      setLoadingTipoTomas(false);
      setTipoDeTomas(response.data.data);
    } catch (error) {
      setLoadingTipoTomas(false);
      errorToast();
      console.error("Failed to fetch anomalias:", error);
    }
  };

  //#region SUCCESSTOAST
  function successToastCreado() {
    toast({
      title: "¡Éxito!",
      description: "El concepto se ha creado correctamente",
      variant: "success",

    })
  }
  function successToastEditado() {
    toast({
      title: "¡Éxito!",
      description: "El concepto se ha editado correctamente",
      variant: "success",

    })
  }
  function successToastEliminado() {
    toast({
      title: "¡Éxito!",
      description: "El concepto se ha eliminado correctamente",
      variant: "success",

    })
  }
  function successToastRestaurado() {
    toast({
      title: "¡Éxito!",
      description: "El concepto se ha restaurado correctamente",
      variant: "success",

    })
  }
  //#endregion


  //Funcion de errores para el Toast
  function errorToast() {

    toast({
      variant: "destructive",
      title: "Oh, no. Error",
      description: "Algo salió mal.",
      action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
    })
  }

  function errorYaExisteToast() {

    toast({
      variant: "destructive",
      title: "Oh, no. Error",
      description: "El concepto ya existe.",
      action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
    })
  }

  const form = useForm<z.infer<typeof conceptoSchema>>({
    resolver: zodResolver(conceptoSchema),
    defaultValues: {
      id: concepto.id,
      nombre: "",
      descripcion: "",
      prioridad_abono: "1",
      abonable: concepto.abonable === 1 ? 1 : 0,
      tarifa_fija: concepto.tarifa_fija === 1 ? 1 : 0,
      cargo_directo: concepto.cargo_directo === 1 ? 1 : 0,
      genera_orden: concepto.genera_orden === 1 ? 1 : 0,
      genera_orden_data: concepto.genera_orden_data === 1 ? 1 : 0,
      genera_recargo: concepto.genera_recargo === 1 ? 1 : 0,
      concepto_rezago: concepto.concepto_rezago === 1 ? 1 : 0,
      pide_monto: concepto.pide_monto === 1 ? 1 : 0,
      bonificable: concepto.bonificable === 1 ? 1 : 0,
      recargo: concepto.recargo === "1" ? "1" : "0",
      genera_iva: "inactivo",
      estado: false
    },
  })



  function onSubmit(values) {
    const estadoConvertido = values.estado ? 'activo' : 'inactivo';

    // Verifica los valores antes de la conversión
    console.log("Estado actual:", estado);
    console.log("Estado convertido:", estadoConvertido);
    let values2 = { ...values, estado: estadoConvertido, tarifas };


    console.log("estos vaslores se insertaron ", values2);
    console.log(tarifas);
    setLoading(true);
    if (accion == "crear") {
      axiosClient.post(`/Concepto/create`, values2)
        .then((response) => {
          const data = response.data;
          if (data.restore) {
            setConceptoIdParaRestaurar(data.concepto_id);
            setModalReactivacionOpen(true);

          }
          else if (data.restore == false) {
            errorYaExisteToast();
            setLoading(false);
          }
          else {
            setModalReactivacionOpen(false);
            setLoading(false);
            setConcepto({
              id: 0,
              nombre: "",
              descripcion: "ninguna",
              prioridad_abono: "1",
              genera_iva: "0",
              recargo: "1",

            });
            form.reset({
              id: 0,
              nombre: "",
              descripcion: "ninguna",
              prioridad_abono: "1",
              genera_iva: "0",
              recargo: "1",

            });
            setAccion("creado")
            getConcepto();
            successToastCreado();
          }
        })
        .catch((err) => {
          const response = err.response;
          errorToast(); //errorToast
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
          setLoading(false);
        })
    }
    if (accion == "editar") {
      console.log(values2);
      axiosClient.put(`/Concepto/update/${concepto.id}`, values2)
        .then((data) => {
          console.log("entro al metodo para editar")
          setLoading(false);
          //alert("anomalia creada");
          setAbrirInput(false);
          setAccion("");
          getConcepto();
          setConcepto(data.data);
          successToastEditado(); //toast editado
        })
        .catch((err) => {
          const response = err.response;
          errorToast(); //AQUI ESTA EL TOAST DE ERROR
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
          setLoading(false);
        })
    }
  }

  function onSubmitTarifa() {
    const formData = new FormData(formTarifa.current);
    let values = {};
    for (let [name, value] of formData.entries()) {
      values[name] = value;
    }
    let tarifas_temp = []
    let ctr = 0;
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        tarifas_temp[ctr] = {
          id_tipo_toma: key,
          monto: values[key]
        }
        ctr = ctr + 1;
      }
    }
    setTarifas(tarifas_temp);
  }
  useEffect(() => { if (accion == "editar" || accion == "crear") { handleFormSubmit() } }, [tarifas])

  //Metodo para estaurar el dato que se encuentra eliminado(soft-delete)
  const restaurarDato = (concepto_id: any) => {
    axiosClient.put(`/Concepto/restaurar/${concepto_id}`)
      .then(() => {
        setLoading(false);
        setAbrirInput(false);
        setAccion("crear");
        setConcepto({
          id: 0,
          nombre: "",
          descripcion: "ninguna",
          prioridad_abono: "1",
          genera_iva: "0",
          recargo: "1",
        });
        getConcepto();
        successToastRestaurado();
        setAccion("creado");
        setModalReactivacionOpen(false);
      })
      .catch((err) => {
        errorToast();
        setLoading(false);
      });
  };

  //obtener conceptos
  const getConcepto = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/Concepto");
      setLoadingTable(false);
      setConceptos(response.data);
      console.log(response.data);
    } catch (error) {
      setLoadingTable(false);
      console.error("Fallo la consulta del concepto:", error);
    }
  };

  //elimianar conceptos
  const onDelete = async () => {
    try {
      await axiosClient.put(`/Concepto/log_delete/${concepto.id}`, {
        data: { id: concepto.id }
      });
      getConcepto();
      setAccion("eliminar");
      successToastEliminado(); //toast eliminado
    } catch (error) {
      console.error("Fallo la eliminación:", error);
    }
  };






  //Actualizar el formulario
  useEffect(() => {
    setcontrol(false);
    if (accion == "eliminar") {
      form.reset({
        id: 0,
        nombre: "",
        descripcion: "ninguna",
        prioridad_abono: "1",
        abonable: 0,
        tarifa_fija: 0,
        cargo_directo: 0,
        genera_orden: 0,
        genera_recargo: 0,
        concepto_rezago: 0,
        pide_monto: 0,
        bonificable: 0,
        recargo: "1",
        estado: false,
      });
      setConcepto({});
      setAbrirInput(false);
      setcontrol(false);

    }
    if (accion == "crear") {
      console.log("creando");
      setAbrirInput(true);
      setErrors({});
      form.reset({
        id: 0,
        nombre: "",
        descripcion: "ninguna",
        prioridad_abono: "1",
        genera_iva: "0",
        abonable: 0,
        tarifa_fija: 0,
        cargo_directo: 0,
        genera_orden: 0,
        genera_recargo: 0,
        concepto_rezago: 0,
        pide_monto: 0,
        bonificable: 0,
        recargo: "1",
        estado: false,

      });
      setConcepto({
        id: 0,
        nombre: "",
        descripcion: "ninguna",
        prioridad_abono: "1",
        genera_iva: "0",
        abonable: 0,
        tarifa_fija: 0,
        cargo_directo: 0,
        genera_orden: 0,
        genera_recargo: 0,
        concepto_rezago: 0,
        pide_monto: 0,
        bonificable: 0,
        recargo: "1",
        estado: false
      });
      setcontrol(true);
    }
    if (accion == "creado") {
      form.reset({
        id: 0,
        nombre: "",
        descripcion: "ninguna",
        prioridad_abono: "1",
        genera_iva: "0",
        abonable: 0,
        tarifa_fija: 0,
        cargo_directo: 0,
        genera_orden: 0,
        genera_recargo: 0,
        concepto_rezago: 0,
        pide_monto: 0,
        bonificable: 0,
        recargo: "1",
        estado: false,
      });
      setConcepto({});
      setAbrirInput(false);
    }
    if (accion == "ver") {
      setAbrirInput(false);
      setErrors({});
      setAccion("");

      //#region CONVERCIONES
      // VER QUE LLEGA DE LA BASE DE DATOS
      console.log("Este es el estado recibido desde la base de datos:", concepto.estado);

      // CONVERTIR STRING A BOOLEANO
      const valorDesdeBaseDeDatos: string = concepto.estado as unknown as string;
      const valorBooleano: boolean = valorDesdeBaseDeDatos === 'activo';

      //COMPROBAR LA CONVERCIÓN
      console.log("Este es el valor booleano convertido:", valorBooleano);

      // OBTENER LA CONVERCIÓN
      setValorConversionBool(valorBooleano);

      //console.log("este es la conversion booleana", valorConversionBool);


      //SEGUNDA CONVERCION

      // CONVERTIR EL NUMERO A STRING(ESO RECIBE EL SELECT)

      // Valor recibido de la base de datos
      //VALOR ABONABLE
      const valorAbonableConsultado: number = concepto.abonable;
      // Convertir número a cadena
      const valorAbonableConvertido: string = valorAbonableConsultado === 1 ? '1' : '0';
      console.log("Esto es lo que llega de la BD:", valorAbonableConsultado);
      console.log("Esto es lo que llega de la BD valorAbonableConvertido:", valorAbonableConvertido);
      //VALOR tarifa_fija 
      const valorTarifaFijaConsultado: number = concepto.tarifa_fija;
      // Convertir número a cadena
      const valorvalorTarifaFijaConvertido: string = valorTarifaFijaConsultado === 1 ? '1' : '0';
      console.log("Esto es lo que llega de la BD:", valorTarifaFijaConsultado);
      console.log("Esto es lo que llega de la BD valorvalorTarifaFijaConvertido:", valorvalorTarifaFijaConvertido);

      //VALOR tarifa_fija 
      const valorCargoDirecto: number = concepto.cargo_directo;
      // Convertir número a cadena
      const valorCargoDirectoConvertido: string = valorCargoDirecto === 1 ? '1' : '0';
      console.log("Esto es lo que llega de la BD:", valorCargoDirecto);
      console.log("Esto es lo que llega de la BD valorCargoDirectoConvertido:", valorCargoDirectoConvertido);


      //VALOR genera orden 
      const valorGeneraOrden: number = concepto.genera_orden;
      // Convertir número a cadena
      const valorGeneraOrdenConvertido: string = valorGeneraOrden === 1 ? '1' : '0';
      console.log("Esto es lo que llega de la BD:", valorGeneraOrden);
      console.log("Esto es lo que llega de la BD valorCargoDirectoConvertido:", valorGeneraOrdenConvertido);

      //VALOR genera RECARGO 
      const valorGeneraRecargo: number = concepto.genera_recargo;
      // Convertir número a cadena
      const valorGeneraRecargoConvertido: string = valorGeneraRecargo === 1 ? '1' : '0';
      console.log("Esto es lo que llega de la BD:", valorGeneraRecargo);
      console.log("Esto es lo que llega de la BD valorCargoDirectoConvertido:", valorGeneraRecargoConvertido);


      //VALOR genera RECARGO 
      const valorConceptoRezago: number = concepto.concepto_rezago;
      // Convertir número a cadena
      const valorConceptoRezagoConvertido: string = valorConceptoRezago === 1 ? '1' : '0';
      console.log("Esto es lo que llega de la BD:", valorConceptoRezago);
      console.log("Esto es lo que llega de la BD valorCargoDirectoConvertido:", valorConceptoRezagoConvertido);
      //#endregion


      console.log(concepto);

      form.reset({
        id: concepto.id,
        nombre: concepto.nombre,
        descripcion: concepto.descripcion,
        prioridad_abono: concepto.prioridad_abono,
        genera_iva: String(concepto.genera_iva),
        abonable: valorAbonableConvertido,
        tarifa_fija: valorvalorTarifaFijaConvertido,
        cargo_directo: valorCargoDirectoConvertido,
        genera_orden: Number(concepto.genera_orden),
        genera_recargo: valorGeneraRecargoConvertido,
        concepto_rezago: Number(concepto.concepto_rezago),
        pide_monto: concepto.pide_monto,
        bonificable: concepto.bonificable,
        recargo: concepto.recargo,
        estado: valorConversionBool

      });
      setcontrol(false);
      console.log(concepto);

    }
    if (accion == "editar") {
      setAbrirInput(true);
      setErrors({});
      form.reset({
        id: concepto.id,
        nombre: concepto.nombre,
        descripcion: concepto.descripcion,
        prioridad_abono: String(concepto.prioridad_abono),
        genera_iva: String(concepto.genera_iva),
        abonable: Number(concepto.abonable),
        tarifa_fija: Number(concepto.tarifa_fija),
        cargo_directo: Number(concepto.cargo_directo),
        genera_orden: Number(concepto.genera_orden),
        genera_recargo: Number(concepto.genera_recargo),
        concepto_rezago: Number(concepto.concepto_rezago),
        pide_monto: concepto.pide_monto,
        bonificable: concepto.bonificable,
        recargo: concepto.recargo,
        estado: valorConversionBool
      });
      setcontrol(true);
      console.log("este es el concepto al editar", concepto);

    }
  }, [accion, form.reset, concepto.estado, valorConversionBool]);

  const handleFormSubmit = () => {
    console.log(form.getValues());
    form.handleSubmit(onSubmit)();
  };

  const handleTarifaFormSubmit = () => {


    onSubmitTarifa();
  };


  useEffect(() => {

    form.reset({
      id: concepto.id,
      nombre: concepto.nombre,
      descripcion: concepto.descripcion,
      prioridad_abono: String(concepto.prioridad_abono),
      genera_iva: String(concepto.genera_iva),
      abonable: Number(concepto.abonable),
      tarifa_fija: Number(concepto.tarifa_fija),
      cargo_directo: Number(concepto.cargo_directo),
      genera_orden: Number(concepto.genera_orden),
      genera_recargo: Number(concepto.genera_recargo),
      concepto_rezago: Number(concepto.concepto_rezago),
      pide_monto: concepto.pide_monto,
      bonificable: concepto.bonificable,
      recargo: concepto.recargo,
      estado: valorConversionBool
    });


  }, [valorConversionBool]);




  return (

    <div className="overflow-auto">

      <div className='flex h-[40px] items-center mb-[10px] bg-muted rounded-sm'>
        <div className='h-[20px] w-full flex items-center justify-end'>
          <div className="mb-[10px] h-full w-full mx-4">
            {accion == "crear" && <p className="text-muted-foreground text-[20px]">Creando nuevo concepto</p>}
            {concepto.nombre != "" && <p className="text-muted-foreground text-[20px]">{concepto.nombre}</p>}
          </div>
          {(concepto.nombre != null && concepto.nombre != "") &&
            <>
              <Modal
                method={onDelete}
                button={
                  <a title="Eliminar">
                    <IconButton>
                      <TrashIcon className="w-[20px] h-[20px]" />
                    </IconButton></a>}
              />
              <div onClick={() => setAccion("editar")}>
                <a title="Editar">
                  <IconButton>
                    <Pencil2Icon className="w-[20px] h-[20px]" />
                  </IconButton>
                </a>
              </div>
            </>
          }
          {// ESTE ES EL MODAL DE REACTIVACIÓN
            //ES UNA VALIDACIÓN POR SI LO QUE ESTA ELIMINADO(SOFT DELETE) LO ENCUENTRA
            //SE ABRE EL MODAL Y SE RESTAURA EL DATO.
          }
          {ModalReactivacionOpen &&
            <ModalReactivacion
              isOpen={ModalReactivacionOpen}
              setIsOpen={setModalReactivacionOpen}
              method={() => restaurarDato(conceptoIdParaRestaurar)}
            />
          }
        </div>
      </div>
      {errors && <Error errors={errors} />}
      <div className="py-[20px] px-[10px] ">

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <MarcoForm title={"Información del concepto"}>
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input readOnly={!abrirInput} placeholder="Escribe el nombre del concepto" {...field} />
                    </FormControl>
                    <FormDescription>
                      El nombre del concepto.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prioridad_abono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prioridad</FormLabel>
                    <FormControl>
                      <Input
                        id="string"
                        type="number"
                        min={1}
                        max={10}
                        readOnly={!abrirInput}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      El 1 es mínimo y el 10 es máximo prioridad
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="descripcion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        readOnly={!abrirInput}
                        placeholder="Descripcion del concepto"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Agrega una breve descripción.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="genera_iva"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genera IVA</FormLabel>
                    <FormControl>
                      <ComboBoxCeroUno currentValue={String(concepto.genera_iva)} placeholder={"IVA"} form={form} name={"genera_iva"} readOnly={!abrirInput} />
                    </FormControl>
                    <FormDescription>

                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="abonable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Abonable</FormLabel>
                    {control ? <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="¿Es abonable?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Si</SelectItem>
                        <SelectItem value="0">No</SelectItem>
                      </SelectContent>
                    </Select>
                      :
                      <Select
                        disabled
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="¿Es abonable?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Si</SelectItem>
                          <SelectItem value="0">No</SelectItem>
                        </SelectContent>
                      </Select>}
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tarifa_fija"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tarifa fija</FormLabel>
                    {control ?
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="¿Tiene tarifa fija?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Si</SelectItem>
                          <SelectItem value="0">No</SelectItem>
                        </SelectContent>
                      </Select>
                      :
                      <Select
                        disabled
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="¿Tiene tarifa fija?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Si</SelectItem>
                          <SelectItem value="0">No</SelectItem>
                        </SelectContent>
                      </Select>}
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cargo_directo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo directo</FormLabel>
                    {/*SE UTILIZO UNA VARIABLE DE CONTROL PARA MANEJAR EL ESTADO DEPENDIENDO LA ACCION QUE
                                        SE SELECCIONE*/ }
                    {
                      control ?
                        <Select
                          onValueChange={(value) => field.onChange(Number(value))}
                          value={String(field.value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="¿Tiene cargo directo?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Si</SelectItem>
                            <SelectItem value="0">No</SelectItem>
                          </SelectContent>
                        </Select>
                        :
                        <Select
                          disabled
                          onValueChange={(value) => field.onChange(Number(value))}
                          value={String(field.value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="¿Tiene cargo directo?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Si</SelectItem>
                            <SelectItem value="0">No</SelectItem>
                          </SelectContent>
                        </Select>

                    }

                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="genera_orden"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>¿Genera orden?</FormLabel>
                    <FormControl>
                      <OrdenesDeTrabajoComboBox form={form} field={field} name="genera_orden" setCargoSeleccionado={setOrdenDeTrabajoSeleccionada} disabled={!abrirInput} />
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genera_recargo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genera recargo</FormLabel>
                    {/*SE UTILIZO UNA VARIABLE DE CONTROL PARA MANEJAR EL ESTADO DEPENDIENDO LA ACCION QUE
                                        SE SELECCIONE*/ }
                    {
                      control ?
                        <Select
                          onValueChange={(value) => field.onChange(Number(value))}
                          value={String(field.value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="¿Genera recargo?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Si</SelectItem>
                            <SelectItem value="0">No</SelectItem>
                          </SelectContent>
                        </Select>
                        :
                        <Select
                          disabled
                          onValueChange={(value) => field.onChange(Number(value))}
                          value={String(field.value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="¿Genera recargo?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Si</SelectItem>
                            <SelectItem value="0">No</SelectItem>
                          </SelectContent>
                        </Select>

                    }

                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="concepto_rezago"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>¿Concepto rezago?</FormLabel>
                    <FormControl>
                      <ConceptoRezagoComboBox form={form} field={field} name="concepto_rezago" setCargoSeleccionado={setConceptoRezago} disabled={!abrirInput} />
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pide_monto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pide monto</FormLabel>
                    {/*SE UTILIZO UNA VARIABLE DE CONTROL PARA MANEJAR EL ESTADO DEPENDIENDO LA ACCION QUE
                                        SE SELECCIONE*/ }
                    {
                      control ?
                        <Select
                          onValueChange={(value) => field.onChange(Number(value))}
                          value={String(field.value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="¿Pide monto?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Si</SelectItem>
                            <SelectItem value="0">No</SelectItem>
                          </SelectContent>
                        </Select>
                        :
                        <Select
                          disabled
                          onValueChange={(value) => field.onChange(Number(value))}
                          value={String(field.value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="¿Pide monto?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Si</SelectItem>
                            <SelectItem value="0">No</SelectItem>
                          </SelectContent>
                        </Select>

                    }

                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bonificable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bonificable</FormLabel>
                    {/*SE UTILIZO UNA VARIABLE DE CONTROL PARA MANEJAR EL ESTADO DEPENDIENDO LA ACCION QUE
                                        SE SELECCIONE*/ }
                    {
                      control ?
                        <Select
                          onValueChange={(value) => field.onChange(Number(value))}
                          value={String(field.value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="¿Es bonificable?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Si</SelectItem>
                            <SelectItem value="0">No</SelectItem>
                          </SelectContent>
                        </Select>
                        :
                        <Select
                          disabled
                          onValueChange={(value) => field.onChange(Number(value))}
                          value={String(field.value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="¿Es bonificable?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Si</SelectItem>
                            <SelectItem value="0">No</SelectItem>
                          </SelectContent>
                        </Select>

                    }

                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recargo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recargo</FormLabel>
                    <FormControl>
                      <Input
                        id="string"
                        step="0.01" // Permite decimales con dos dígitos
                        type="text"
                        min={1}
                        max={100}
                        readOnly={!abrirInput}
                        {...field} // Asegúrate de pasar el valor actual
                      />
                    </FormControl>
                    <FormDescription>
                      Escribe el porcentaje del recargo
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="ml-10 mt-5 w-[50vh]">
                <FormField
                  control={form.control}
                  name="estado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="items-center">Estado</FormLabel>
                      <FormControl className="ml-4">
                        {
                          control ? <Switch
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(checked)
                            }

                          />
                            :
                            <Switch
                              checked={field.value}
                              onCheckedChange={(checked) => field.onChange(checked)
                              }
                              disabled
                            />
                        }


                      </FormControl>
                      <FormDescription>
                        Aquí puedes cambiar el estado del concepto.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>


            </MarcoForm>

          </form>
        </Form>

        {
          loadingTipoTomas &&
          <Loader />
        }
        {
          !loadingTipoTomas &&
          <>
            <form ref={formTarifa} onSubmit={onSubmitTarifa}>
              <MarcoForm title={"Tarifa"}>
                <>
                  {
                    tipoTomas.map((tipoToma, index) => {
                      return (
                        <div>
                          <p className="mb-[10px]">{tipoToma.nombre}</p>
                          <input defaultValue={concepto.tarifas != null ? concepto.tarifas[index]?.monto : 0} readOnly={!abrirInput} type="number" placeholder={`Tarifa ${tipoToma.nombre}`} name={tipoToma.id} className="w-full bg-background border border-border p-2 rounded-md" />
                        </div>
                      )
                    })
                  }
                </>
              </MarcoForm>
            </form>
          </>
        }

        {loading && <Loader />}

        {abrirInput &&
          <Button onClick={() => { handleTarifaFormSubmit(); }}>Guardar</Button>
        }
      </div>
    </div>
  )
}

export default ConceptoForm
