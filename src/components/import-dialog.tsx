"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

export function ImportDialog() {
    const [isOpen, setIsOpen] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return

        setIsUploading(true)
        const formData = new FormData()
        formData.append("file", acceptedFiles[0])

        try {
            const response = await fetch("/api/v1/prompts/import", {
                method: "POST",
                body: formData,
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Failed to import prompts")
            }

            toast({
                title: "Success",
                description: data.message,
            })

            setIsOpen(false)
            router.refresh()
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to import prompts",
                variant: "destructive",
            })
        } finally {
            setIsUploading(false)
        }
    }, [toast, router])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/json": [".json"],
            "text/csv": [".csv"],
            "text/plain": [".txt"],
        },
        maxFiles: 1,
    })

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Import Prompts
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Import Prompts</DialogTitle>
                    <DialogDescription>
                        Upload a file containing prompts to import. Supported formats: JSON, CSV, TXT
                    </DialogDescription>
                </DialogHeader>

                <div
                    {...getRootProps()}
                    className={`
            mt-4 rounded-lg border-2 border-dashed p-6 text-center
            ${isDragActive ? "border-primary bg-primary/10" : "border-muted"}
            ${isUploading ? "opacity-50" : ""}
          `}
                >
                    <input {...getInputProps()} />
                    {isUploading ? (
                        <p className="text-sm text-muted-foreground">Uploading...</p>
                    ) : isDragActive ? (
                        <p className="text-sm text-muted-foreground">Drop the file here</p>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            Drag and drop a file here, or click to select
                        </p>
                    )}
                </div>

                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 