import { NextResponse } from "next/server";
import { prisma } from "@/app/core/prisma";
import { updateColumnDto } from "../dto";

interface ColumnRouteConext {
    params: {
        id: string
    }
}

export const PUT = async (req: Request, { params }: ColumnRouteConext) => {
    const {id} = params
    const bodyRaw = await req.json();
    const validateBody = updateColumnDto.safeParse(bodyRaw);

    if(!validateBody.success) {
        return NextResponse.json(validateBody.error.issues, {
            status: 400,
        })
    }

    const column = await prisma.columns.update({
        where:{
            id
        },
        data: validateBody.data
    })

    return NextResponse.json(column); 
}

export const DELETE = async (req: Request, { params }: ColumnRouteConext) => {
    const {id} = params

    const findColumn = await prisma.columns.findUnique({
        where:{
            id
        }
    })

    if(!findColumn){
        return NextResponse.json([
            {
                code: "not_found",
                message: "column not found"
            }
        ])
    }

    await prisma.columns.delete({
        where: {
            id,
        }
    })

    return NextResponse.json({}, {status: 200})
}