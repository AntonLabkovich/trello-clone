import { useForm } from "react-hook-form"
import { Input } from "./input.components"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCreateBoardMutation } from "@/hooks/use-create-board";

const createBoardSchema = z.object({
    title: z.string().min(1).max(20)
})

type CreateBoardValues = z.infer<typeof createBoardSchema>

export const CreateBoard = () => {
    const [isFormOpened, setFormOpened] = useState(false)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateBoardValues>({
        resolver: zodResolver(createBoardSchema)
    });

    const { mutateAsync } = useCreateBoardMutation();

    const onSubmit = handleSubmit(async (values) => {
        await mutateAsync(values)
        setFormOpened(true)
    })

    const openForm = () => setFormOpened(true)

    return (
        <div className="block w-full  p-6 bg-white border border-gray-200 cursor-pointer  rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

            {isFormOpened ?
                <form onSubmit={onSubmit}>
                    <Input disabled={isSubmitting} {...register('title')} error={errors.title?.message} placeholder="Enter your board title"/>
                </form> :
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" onClick={openForm}>
                    + Create a new board
                </h5>}
        </div>
    )
}