"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerWithRange({
  className,
  setFecha,
  minDate = null
}: React.HTMLAttributes<HTMLDivElement>) {


  const [date, setDate] = React.useState<DateRange | undefined>({

  })

  React.useEffect(() => {
    if (typeof setFecha === 'function') {
      setFecha(date);
    }
  }, [date])

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
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
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "d 'de' MMMM 'de' yyyy", { locale: es })} -{" "}
                  {format(date.to, "d 'de' MMMM 'de' yyyy", { locale: es })}
                </>
              ) : (
                format(date.from, "d 'de' MMMM 'de' yyyy", { locale: es })
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
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={es}
            fromDate={minDate ?? null}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
