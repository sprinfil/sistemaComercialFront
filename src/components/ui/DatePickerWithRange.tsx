"use client"

import * as React from "react"
import { addDays, format } from "date-fns"

import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import dayjs from 'dayjs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerWithRange({
  defaultDate,
  className,
  setFecha,
  minDate = null
}: React.HTMLAttributes<HTMLDivElement>) {

  const [date, setDate] = React.useState(defaultDate)

  // React.useEffect(() => {
  //   if (typeof setFecha === 'function' && date) {
  //     setFecha(date);
  //     console.log(date);
  //   }
  // }, [date]);

  React.useEffect(()=>{
    console.log(defaultDate)
  },[defaultDate])

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover >
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}

          >
            <CalendarIcon className="mr-5 h-4 w-4" />
            {defaultDate?.from ? (
              defaultDate?.to ? (
                <>
                  {format(defaultDate?.from, "d 'de' MMMM 'de' yyyy", { locale: es })} - {" "}
                  {format(defaultDate?.to, "d 'de' MMMM 'de' yyyy", { locale: es })}
                </>
              ) : (
                format(defaultDate?.from, "d 'de' MMMM 'de' yyyy", { locale: es })
              )
            ) : (
              <span>Selecciona una fecha</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={defaultDate}
            onSelect={setFecha}
            numberOfMonths={2}
            locale={es}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
