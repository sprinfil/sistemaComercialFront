import React from 'react'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

export const HoverCardComponent = ({trigger, description}) => {
    return (
        <>
            <HoverCard>
                <HoverCardTrigger>{trigger}</HoverCardTrigger>
                <HoverCardContent>
                    {description}
                </HoverCardContent>
            </HoverCard>
        </>

    )
}
