import OpenAI from "openai"
import { AIAnalysis, LLMModel } from "@/types/prompt"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export class AIService {
  static async generateCompletion(
    prompt: string,
    model: LLMModel = "gpt-3.5-turbo"
  ) {
    try {
      if (model.startsWith("gpt")) {
        const response = await openai.chat.completions.create({
          model,
          messages: [{ role: "user", content: prompt }],
        })
        return response.choices[0]?.message?.content || ""
      } else if (model.startsWith("claude")) {
        // TODO: Implement Claude integration when needed
        throw new Error("Claude integration not implemented yet")
      }
      throw new Error(`Unsupported model: ${model}`)
    } catch (error) {
      console.error("Error generating completion:", error)
      throw error
    }
  }

  static async analyzePrompt(content: string): Promise<AIAnalysis> {
    const prompt = `
      Analyze this prompt and provide insights in JSON format:
      ---
      ${content}
      ---
      Return a JSON object with:
      - suggestedName: A concise name for the prompt
      - description: A clear description of what the prompt does
      - category: The primary category this prompt belongs to
      - tags: An array of relevant tags (max 5)
      - confidence: A number between 0 and 1 indicating analysis confidence
      - suggestions: An array of improvement suggestions
    `
    const response = await this.generateCompletion(prompt, "gpt-4")
    try {
      return JSON.parse(response) as AIAnalysis
    } catch (error) {
      console.error("Error parsing AI analysis:", error)
      return {
        suggestedName: "Untitled Prompt",
        description: "No description available",
        category: "Uncategorized",
        tags: [],
        confidence: 0,
        suggestions: ["Could not analyze prompt"],
      }
    }
  }

  static async suggestImprovements(content: string): Promise<string> {
    const prompt = `
      Analyze this prompt and suggest improvements:
      ---
      ${content}
      ---
      Consider:
      1. Clarity and specificity
      2. Context and background information
      3. Constraints and requirements
      4. Examples or references
      5. Potential ambiguities or edge cases

      Format your response as a bulleted list with clear, actionable suggestions.
    `
    const response = await this.generateCompletion(prompt, "gpt-4")
    return response || "Could not generate improvements"
  }

  static async generateTestCases(content: string): Promise<string> {
    const prompt = `
      Generate test cases for this prompt:
      ---
      ${content}
      ---
      Include:
      1. Happy path scenarios
      2. Edge cases
      3. Error cases
      4. Different input variations
      5. Expected outputs

      Format your response as a numbered list with clear test scenarios and expected outcomes.
    `
    const response = await this.generateCompletion(prompt, "gpt-4")
    return response || "Could not generate test cases"
  }

  static async analyzePromptMetrics(metrics: any): Promise<string> {
    const prompt = `
      Analyze these prompt metrics and provide insights:
      ---
      ${JSON.stringify(metrics, null, 2)}
      ---
      Consider:
      1. Performance trends
      2. Success rate patterns
      3. Cost efficiency
      4. Areas for optimization
      5. Recommendations for improvement

      Format your response as a clear analysis with sections for each consideration.
    `
    const response = await this.generateCompletion(prompt, "gpt-4")
    return response || "Could not analyze metrics"
  }

  static async categorizePrompt(content: string): Promise<{
    category: string
    tags: string[]
    confidence: number
  }> {
    const prompt = `
      Analyze this prompt and suggest appropriate categories and tags:
      ---
      ${content}
      ---
      Return a JSON object with:
      - category: The primary category
      - tags: An array of relevant tags (max 5)
      - confidence: A number between 0 and 1 indicating confidence
    `
    const response = await this.generateCompletion(prompt, "gpt-4")
    try {
      return JSON.parse(response) as {
        category: string
        tags: string[]
        confidence: number
      }
    } catch (error) {
      console.error("Error parsing categorization:", error)
      return {
        category: "Uncategorized",
        tags: [],
        confidence: 0,
      }
    }
  }
}
