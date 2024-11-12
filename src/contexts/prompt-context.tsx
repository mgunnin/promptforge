"use client"

import React, { createContext, useContext, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import {
    Prompt,
    PromptContextType,
    PromptTestResult,
    PromptVersion,
    LLMModel,
} from "@/types/prompt"

const PromptContext = createContext<PromptContextType | undefined>(undefined)

export function PromptProvider({ children }: { children: React.ReactNode }) {
    const [prompts, setPrompts] = useState<Prompt[]>([])
    const [currentPrompt, setCurrentPrompt] = useState<Prompt>()

    const createPrompt = async (
        promptData: Omit<
            Prompt,
            "id" | "createdAt" | "updatedAt" | "versions" | "metrics"
        >
    ): Promise<Prompt> => {
        const now = new Date()
        const newPrompt: Prompt = {
            id: uuidv4(),
            ...promptData,
            createdAt: now,
            updatedAt: now,
            versions: [],
            metrics: {
                responseTime: 0,
                tokenUsage: 0,
                successRate: 0,
                cost: 0,
            },
        }

        setPrompts((prev) => [...prev, newPrompt])
        return newPrompt
    }

    const updatePrompt = async (
        id: string,
        updates: Partial<Prompt>
    ): Promise<Prompt> => {
        const updatedPrompts = prompts.map((prompt) => {
            if (prompt.id === id) {
                const updatedPrompt = {
                    ...prompt,
                    ...updates,
                    updatedAt: new Date(),
                }
                if (currentPrompt?.id === id) {
                    setCurrentPrompt(updatedPrompt)
                }
                return updatedPrompt
            }
            return prompt
        })

        setPrompts(updatedPrompts)
        const updatedPrompt = updatedPrompts.find((p) => p.id === id)
        if (!updatedPrompt) throw new Error("Prompt not found")
        return updatedPrompt
    }

    const deletePrompt = async (id: string): Promise<void> => {
        setPrompts((prev) => prev.filter((prompt) => prompt.id !== id))
        if (currentPrompt?.id === id) {
            setCurrentPrompt(undefined)
        }
    }

    const testPrompt = async (
        content: string,
        model: LLMModel,
        variables?: Record<string, string>
    ): Promise<PromptTestResult> => {
        // TODO: Implement actual API call to test prompt
        // This is a mock implementation
        const startTime = Date.now()
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

        // Use the parameters to simulate different responses
        const processedContent = variables
            ? Object.entries(variables).reduce(
                (text, [key, value]) => text.replace(`{${key}}`, value),
                content
            )
            : content

        const metrics = {
            responseTime: (Date.now() - startTime) / 1000,
            tokenUsage: Math.floor(processedContent.length / 4),
            successRate: 1,
            cost: (processedContent.length / 1000) * 0.02,
            lastTested: new Date(),
        }

        return {
            response: `Response for model ${model}: ${processedContent.substring(0, 100)}...`,
            metrics,
        }
    }

    const createVersion = async (
        promptId: string,
        versionData: Omit<PromptVersion, "id" | "createdAt">
    ): Promise<PromptVersion> => {
        const newVersion: PromptVersion = {
            id: uuidv4(),
            ...versionData,
            createdAt: new Date(),
        }

        const updatedPrompts = prompts.map((prompt) => {
            if (prompt.id === promptId) {
                const updatedPrompt = {
                    ...prompt,
                    versions: [...prompt.versions, newVersion],
                    updatedAt: new Date(),
                }
                if (currentPrompt?.id === promptId) {
                    setCurrentPrompt(updatedPrompt)
                }
                return updatedPrompt
            }
            return prompt
        })

        setPrompts(updatedPrompts)
        return newVersion
    }

    return (
        <PromptContext.Provider
            value={{
                prompts,
                currentPrompt,
                createPrompt,
                updatePrompt,
                deletePrompt,
                testPrompt,
                createVersion,
            }}
        >
            {children}
        </PromptContext.Provider>
    )
}

export function usePrompt() {
    const context = useContext(PromptContext)
    if (context === undefined) {
        throw new Error("usePrompt must be used within a PromptProvider")
    }
    return context
}
