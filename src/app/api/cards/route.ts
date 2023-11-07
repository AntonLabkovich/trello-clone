import { NextResponse } from "next/server";
import { createCardDto } from "./dto";
import { prisma } from "@/core/prisma";

export const POST = async (req: Request) => {
    const bodyRaw = await req.json();
    const validateBody = createCardDto.safeParse(bodyRaw);

    if (!validateBody.success) {
        return NextResponse.json(validateBody.error.issues, { status: 400 });
    }

    const lastCard = await prisma.cards.findFirst({
        where: {
            columnId: validateBody.data.columnId
        },
        orderBy: {
            order: "desc"
        }
    })

    const newCard = await prisma.cards.create({
        data: {
            ...validateBody.data,
            order: lastCard ? lastCard.order + 1 : 0
        }
    })

    return NextResponse.json(newCard)
}


export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url)
    const columnId = searchParams.get("columnId");

    if (!columnId) {
        return NextResponse.json(
            [
                {
                    code: "missing query_param",
                    field: "columnId",
                    message: "Query param columnId is requared",
                }
            ]
        )
    }

    const columns = await prisma.cards.findMany({
        where: {
            columnId
        },
        orderBy: {
            order: "asc"
        }
    })

    return NextResponse.json(columns);
}