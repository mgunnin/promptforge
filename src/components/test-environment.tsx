"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Play, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
    prompt: z.string().min(1, "Prompt is required"),
    model: z.string().min(1, "Model is required"),
    temperature: z.coerce
        .number()
        .min(0, "Temperature must be between 0 and 2")
        .max(2, "Temperature must be between 0 and 2"),
    maxTokens: z.coerce
        .number()
        .min(1, "Max tokens must be at least 1")
        .max(4096, "Max tokens cannot exceed 4096"),
    input: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

const defaultValues: Partial<FormValues> = {
    model: "gpt-4o",
    temperature: 0.7,
    maxTokens: 1024,
}

interface TestEnvironmentProps {
    userId: string
}

export function TestEnvironment({ userId }: TestEnvironmentProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<string>("")
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    async function onSubmit(data: FormValues) {
        setIsLoading(true)
        try {
            const response = await fetch("/api/v1/prompts/test", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error("Failed to test prompt")
            }

            const result = await response.json()
            setResult(result.output)
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to test prompt",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    async function onSave() {
        const values = form.getValues()
        try {
            const response = await fetch("/api/v1/prompts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: values.prompt,
                    model: values.model,
                    userId,
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to save prompt")
            }

            const prompt = await response.json()
            toast({
                title: "Success",
                description: "Prompt saved successfully",
            })

            router.push(`/prompts/${prompt.id}`)
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to save prompt",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Prompt Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Prompt</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter your prompt here..."
                                                className="h-32"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="model"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Model</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a model" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                                                <SelectItem value="claude-3-5-sonnet-20241022">
                                                    Claude 3.5 Sonnet
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <div className="grid gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="temperature"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Temperature</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.1" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Controls randomness (0-2)
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="maxTokens"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Max Tokens</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Maximum response length
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="input"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Input Variables (Optional)</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter any input variables as JSON..."
                                                className="h-20"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            JSON object with variables referenced in your prompt
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-4">
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Play className="mr-2 h-4 w-4" />
                                    )}
                                    Test Prompt
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onSave}
                                    disabled={isLoading}
                                >
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Prompt
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Result</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative">
                        <Textarea
                            value={result}
                            readOnly
                            className="h-[500px] font-mono"
                            placeholder="Result will appear here..."
                        />
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                                <Loader2 className="h-8 w-8 animate-spin" />
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 