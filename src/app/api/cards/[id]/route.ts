import { NextResponse } from "next/server";
import { prisma } from "@/app/core/prisma";
import { updateCardDto } from "../dto";

interface CardRouteConext {
    params: {
        id: string
    }
}

export const PUTCH = async (req: Request, { params }: CardRouteConext) => {
    const {id} = params
    const bodyRaw = await req.json();
    const validateBody = updateCardDto.safeParse(bodyRaw);

    if(!validateBody.success) {
        return NextResponse.json(validateBody.error.issues, {
            status: 400,
        })
    }

    const findCard = await prisma.cards.findUnique({
        where:{
            id
        }
    })

    if(!findCard){
        return NextResponse.json([
            {
                code: "not_found",
                message: "card not found"
            }
        ])
    }

    const card = await prisma.cards.update({
        where:{
            id
        },
        data: validateBody.data
    })

    return NextResponse.json(card); 
}

export const DELETE = async (req: Request, { params }: CardRouteConext) => {
    const {id} = params

    const findCard = await prisma.cards.findUnique({
        where:{
            id
        }
    })

    if(!findCard){
        return NextResponse.json([
            {
                code: "not_found",
                message: "cards not found"
            }
        ])
    }

    await prisma.cards.delete({
        where: {
            id,
        }
    })

    return NextResponse.json({}, {status: 200})
}