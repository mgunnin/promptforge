export type LLMModel = 
  | "gpt-4o"
  | "gpt-4-turbo"
  | "gpt-3.5-turbo"
  | "claude-3-opus"
  | "claude-3-sonnet-20241022"
  | "gemini-pro"
  | "mixtral-8x7b"
  | "llama-2-70b"

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
  input: Record<string, string>
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
