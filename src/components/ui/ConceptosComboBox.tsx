"use client"

import * as React from "react"
import {
    ArrowUpCircle,
    CheckCircle2,
    Circle,
    HelpCircle,
    LucideIcon,
    XCircle,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import axiosClient from "../../axios-client"
import Loader from "./Loader"

type Status = {
    value: string
    label: string

}

export function ConceptosComboBox({setValue}) {


    const [loading, setLoading] = React.useState<boolean>(false);
    const [statuses, setStatuses] = React.useState<Status[]>([]);


    React.useEffect(() => {
        getConcepto();
    }, []);

    const getConcepto = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get("/Concepto");


            let ctr = 0;
            response.data.forEach(concepto => {
                statuses[ctr] = { value: concepto.id, label: concepto.nombre };
                ctr = ctr + 1;
            });

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Failed to fetch concepto:", error);
        }
    };



    const [open, setOpen] = React.useState(false)
    const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
        null
    )

    return (
        <>


            <div className="flex items-center space-x-4 overflow-auto">

                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-muted-foreground"
                        >
                            {selectedStatus ? (
                                <>

                                    {selectedStatus.label}
                                </>
                            ) : (
                                <div className="">Selecciona un concepto</div>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-2 h-[300px]" side="bottom" align="start">
                    <Command className="mb-[90vh]">
                            <CommandInput placeholder="Buscar concepto..." />
                            <CommandList>
                                <CommandEmpty>Conceptos no encontrados.</CommandEmpty>
                                <CommandGroup className="">
                                    {
                                        loading &&
                                        <Loader />
                                    }
                                    {
                                        !loading &&
                                        statuses.map((status) => (
                                            <CommandItem
                                                key={status.value}
                                                value={status.value}
                                                onSelect={(value) => {
                                                    setSelectedStatus(
                                                        status
                                                    )
                                                    setOpen(false)
                                                    setValue(status.value)
                                                }}
                                                
                                            >
                                                <span className="">{status.label}</span>
                                            </CommandItem>
                                        ))
                                    }
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>


        </>

    )
}
