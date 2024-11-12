'use client'

import React, { useState, useEffect } from "react"
import { useForm, Controller, Resolver } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import BroadcastOnHomeIcon from "@mui/icons-material/BroadcastOnHome";
import Button from "@mui/joy/Button"
import Input from '@mui/joy/Input'
import { IPostClient } from "@/app/(main)/core/application/dto/clients/clients-response.dto"


const postClientSchema = yup.object().shape({
    firstName: yup.string().required("The first name is required"),
    lastName: yup.string().required("The last name is required"),
    phone: yup
        .string()
        .required("The phone number is required")
        .min(10, "The phone number must be at least 10 characters"),
    email: yup.string().email("The email is invalid"),
})

interface PostServiceModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: IPostClient) => Promise<void>
    initialData?: IPostClient | null
}

export const PostClientModal: React.FC<PostServiceModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [isLoading, setIsLoading] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IPostClient>({
        mode: "onChange",
        resolver: yupResolver(postClientSchema) as Resolver<IPostClient>

    })

    useEffect(() => {
        if (initialData) {
            reset(initialData)
        }
    }, [initialData, reset])

    const handlePostService = async (data: IPostClient) => {
        setIsLoading(true)
        try {
            await onSubmit(data)
            reset()
            onClose()
        } catch (error) {
            console.error("Submission error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="flex justify-between items-center p-4 border-b border-gray-300">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {initialData ? "Edit Service" : "Add Service"}
                    </h2>
                    <Button
                        color="danger"
                        variant="outlined"
                        onClick={onClose}
                        className="transition-colors p-1"
                        aria-label="Close modal"
                    >
                        <BroadcastOnHomeIcon className="w-6 h-6" />
                    </Button>
                </div>
                <form onSubmit={handleSubmit(handlePostService)} className="p-4 space-y-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                        </label>
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    color="primary"
                                    type="text"
                                    id="firstName"
                                    className="w-full"
                                    placeholder="Enter the first name"
                                />
                            )}
                        />
                        {errors.firstName && (
                            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                        </label>
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    color="primary"
                                    type="text"
                                    id="lastName"
                                    className="w-full"
                                    placeholder="Enter the last name"
                                />
                            )}
                        />
                        {errors.lastName && (
                            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    color="primary"
                                    type="tel"
                                    id="phone"
                                    className="w-full"
                                    placeholder="Enter the phone number"
                                />
                            )}
                        />
                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    color="primary"
                                    type="email"
                                    id="email"
                                    className="w-full"
                                    placeholder="Enter the email"
                                />
                            )}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                    </div>
                    <Button
                        color="primary"
                        variant="solid"
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
                            isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                        }`}
                    >
                        {isLoading ? "Saving..." : initialData ? "Save Changes" : "Add Service"}
                    </Button>
                </form>
            </div>
        </div>
    )
}
