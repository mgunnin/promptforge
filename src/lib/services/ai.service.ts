import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const PROMPT_CATEGORIES = [
  "Business",
  "Code Generation",
  "Content Creation",
  "Creative Writing",
  "Data Analysis",
  "Debugging",
  "Documentation",
  "Education",
  "General",
  "Question Answering",
  "Research",
  "Roleplay",
  "Summarization",
  "System Design",
  "Task Planning",
  "Testing",
  "Translation",
] as const

export type PromptCategory = (typeof PROMPT_CATEGORIES)[number]

interface AIAnalysis {
  category: PromptCategory
  tags: string[]
  suggestedName: string
  description: string
}

interface Suggestion {
  text: string
  description: string
}

export class AIService {
  static async analyzePrompt(content: string): Promise<AIAnalysis> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an AI assistant that analyzes prompts and provides structured information about them.
              Available categories: ${PROMPT_CATEGORIES.join(", ")}
              
              Rules for analysis:
              1. Choose exactly ONE category from the available list
              2. Generate 3-5 relevant tags
              3. Tags should be single words or short phrases
              4. Tags should cover key aspects, use cases, and techniques
              5. Suggest a clear, concise name
              6. Provide a brief but informative description`,
          },
          {
            role: "user",
            content: `Analyze this prompt and provide:
              1. Category (choose one): ${PROMPT_CATEGORIES.join(", ")}
              2. Tags (3-5 relevant tags)
              3. Suggested name
              4. Brief description
              
              Prompt: ${content}
              
              Respond in this exact format:
              Category: [category]
              Tags: [tag1], [tag2], [tag3]
              Name: [name]
              Description: [description]`,
          },
        ],
        temperature: 0.3, // Lower temperature for more consistent categorization
      })

      const analysis = response.choices[0]?.message?.content
      if (!analysis) throw new Error("No analysis generated")

      // Parse the analysis into structured data
      const lines = analysis.split("\n")
      const category =
        (lines
          .find((l) => l.startsWith("Category:"))
          ?.split(":")[1]
          ?.trim() as PromptCategory) || "General"
      const tags =
        lines
          .find((l) => l.startsWith("Tags:"))
          ?.split(":")[1]
          ?.split(",")
          .map((t) => t.trim()) || []
      const name =
        lines
          .find((l) => l.startsWith("Name:"))
          ?.split(":")[1]
          ?.trim() || "Untitled Prompt"
      const description =
        lines
          .find((l) => l.startsWith("Description:"))
          ?.split(":")[1]
          ?.trim() || ""

      return {
        category,
        tags,
        suggestedName: name,
        description,
      }
    } catch (error) {
      console.error("Error analyzing prompt:", error)
      throw new Error("Failed to analyze prompt")
    }
  }

  static async suggestImprovements(
    content: string,
    model: string = "gpt-4o"
  ): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model,
        messages: [
          {
            role: "system",
            content:
              "You are an AI assistant that optimizes prompts for better results. Return ONLY the optimized prompt without any explanations.",
          },
          {
            role: "user",
            content: `Optimize this prompt by:
              1. Improving clarity and specificity
              2. Adding necessary context and constraints
              3. Specifying desired output format
              4. Adding error handling instructions
              5. Making it more concise and effective
              
              Original Prompt: ${content}
              
              Return ONLY the optimized prompt, no explanations.`,
          },
        ],
        temperature: 0.7,
      })

      const optimizedContent = response.choices[0]?.message?.content
      if (!optimizedContent) throw new Error("No optimization generated")
      return optimizedContent
    } catch (error) {
      console.error("Error suggesting improvements:", error)
      throw new Error("Failed to optimize prompt")
    }
  }

  static async generateTestCases(content: string): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are an AI assistant that generates test cases for prompts.",
          },
          {
            role: "user",
            content: `Generate test cases for this prompt, including:
              1. Happy path scenarios
              2. Edge cases
              3. Error cases
              4. Expected outputs
              
              Prompt: ${content}`,
          },
        ],
      })

      return response.choices[0]?.message?.content || "No test cases generated"
    } catch (error) {
      console.error("Error generating test cases:", error)
      throw new Error("Failed to generate test cases")
    }
  }

  static async getSuggestions(context: string): Promise<Suggestion[]> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are an AI assistant that suggests variables and templates for prompts.",
          },
          {
            role: "user",
            content: `Based on this prompt context, suggest relevant variables or templates:

              Context: ${context}
              
              Provide suggestions in this format:
              - text: The variable or template text
              - description: A brief description of what it does`,
          },
        ],
      })

      const content = response.choices[0]?.message?.content
      if (!content) return []

      // Parse the suggestions into structured data
      const suggestions: Suggestion[] = content
        .split("\n")
        .filter((line) => line.includes("text:"))
        .map((line) => {
          const [text, description] = line.split(" - description: ")
          return {
            text: text.replace("- text: ", "").trim(),
            description: description?.trim() || "",
          }
        })

      return suggestions
    } catch (error) {
      console.error("Error getting suggestions:", error)
      return []
    }
  }
}
