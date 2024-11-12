export interface Prompt {
  id: string
  name: string
  content: string
  description: string
  tags: string[]
  model: LLMModel
  createdAt: Date
  updatedAt: Date
  versions: PromptVersion[]
  metrics: PromptMetrics
}

export interface PromptVersion {
  id: string
  content: string
  description: string
  createdAt: Date
  metrics?: PromptMetrics
}

export interface PromptMetrics {
  responseTime: number
  tokenUsage: number
  successRate: number
  cost: number
  lastTested?: Date
}

export type LLMModel = "gpt-4" | "gpt-3.5-turbo" | "claude-2" | "claude-instant"

export interface PromptTestResult {
  response: string
  metrics: PromptMetrics
  error?: string
}

export interface PromptContextType {
  prompts: Prompt[]
  currentPrompt?: Prompt
  createPrompt: (
    prompt: Omit<
      Prompt,
      "id" | "createdAt" | "updatedAt" | "versions" | "metrics"
    >
  ) => Promise<Prompt>
  updatePrompt: (id: string, updates: Partial<Prompt>) => Promise<Prompt>
  deletePrompt: (id: string) => Promise<void>
  testPrompt: (
    content: string,
    model: LLMModel,
    variables?: Record<string, string>
  ) => Promise<PromptTestResult>
  createVersion: (
    promptId: string,
    version: Omit<PromptVersion, "id" | "createdAt">
  ) => Promise<PromptVersion>
}
