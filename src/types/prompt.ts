export type LLMModel = "gpt-4" | "gpt-4o" | "claude-3-5-sonnet-20241022"

export interface Prompt {
  id: string
  name: string
  content: string
  description: string | null
  model: LLMModel
  tags: string[]
  category: string | null
  metrics: PromptMetrics | null
  createdAt: Date
  updatedAt: Date
  userId: string
  teamId: string | null
  versions: PromptVersion[]
}

export interface PromptVersion {
  id: string
  content: string
  description: string | null
  model: LLMModel
  createdAt: Date
  metrics: PromptMetrics | null
  promptId: string
}

export interface PromptMetrics {
  responseTime: number
  tokenUsage: number
  successRate: number
  cost: number
}

export interface PromptTestResult {
  response: string
  metrics: PromptMetrics
}

export interface PromptContextType {
  prompts: Prompt[]
  currentPrompt: Prompt | undefined
  createPrompt: (
    promptData: Omit<
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
    versionData: Omit<PromptVersion, "id" | "createdAt">
  ) => Promise<PromptVersion>
}

export interface AIAnalysis {
  suggestedName: string
  description: string
  category: string
  tags: string[]
  confidence: number
  suggestions: string[]
}

export interface PromptTest {
  id: string
  input: Record<string, any>
  output: string
  metrics: PromptTestMetrics
  createdAt: Date
  promptId: string
}

export interface PromptTestMetrics {
  responseTime: number
  tokenUsage: number
  success: boolean
  error: string | null
  cost: number
}
