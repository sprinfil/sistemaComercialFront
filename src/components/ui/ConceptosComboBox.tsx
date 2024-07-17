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

export function ConceptosComboBox() {


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
            response.data.data.forEach(concepto => {
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
                            className="w-full justify-start"
                        >
                            {selectedStatus ? (
                                <>

                                    {selectedStatus.label}
                                </>
                            ) : (
                                <>Concepto</>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" side="right" align="start">
                        <Command>
                            <CommandInput placeholder="Change status..." />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
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
    
                                                }}
                                            >
                                                <span>{status.label}</span>
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
