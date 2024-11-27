import { PromptCategory } from "@prisma/client"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const PROMPT_CATEGORIES = [
  "Business",
  "CodeGeneration",
  "ContentCreation",
  "CreativeWriting",
  "CustomerSupport",
  "DataAnalysis",
  "Debugging",
  "Design",
  "Documentation",
  "Education",
  "Entertainment",
  "EthicsAndPhilosophy",
  "General",
  "KnowledgeManagement",
  "Legal",
  "Marketing",
  "MediaProduction",
  "NetworkingAndOutreach",
  "Optimization",
  "PersonalDevelopment",
  "Presentation",
  "Productivity",
  "ProjectManagement",
  "QuestionAnswering",
  "Research",
  "Roleplay",
  "Sales",
  "ScienceExploration",
  "SocialMedia",
  "Summarization",
  "SystemDesign",
  "TaskPlanning",
  "Testing",
  "Translation",
  "UserInterfaceDesign",
  "UXResearch",
  "Visualization",
] as const

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
            content: `You are an advanced AI assistant specializing in prompt analysis. Your task is to analyze prompts, infer their intent and context, and provide structured metadata about them.
      
            Available categories: ${PROMPT_CATEGORIES.join(", ")}

            Your analysis should follow these rules:
            1. **Category Selection**: Choose exactly ONE category from the available list that best aligns with the primary purpose of the prompt. Use the exact category name.
            2. **Tag Generation**: Generate 3-5 concise, relevant tags that highlight key aspects, use cases, or techniques of the prompt. Tags must be single words or short phrases.
            3. **Name Suggestion**: Suggest a clear and concise name for the prompt that reflects its purpose or goal.
            4. **Description Creation**: Provide a brief but informative description that explains the intent, use case, and expected output of the prompt.
            5. **Contextual Enrichment**: Use reasoning to infer implicit goals or missing details if the prompt lacks clarity, and include them in your analysis where applicable.
            6. **Consistency**: Ensure your analysis is concise, precise, and uses consistent terminology aligned with the categories and tags.`,
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
            Tags: [tag1], [tag2], [tag3], [tag4], [tag5]
            Name: [name]
            Description: [description]`,
          },
        ],
        temperature: 0.3,
      })

      const analysis = response.choices[0]?.message?.content
      if (!analysis) throw new Error("No analysis generated")

      // Parse the analysis into structured data
      const lines = analysis.split("\n")

      // Extract and validate category
      const categoryLine = lines.find((l) => l.startsWith("Category:"))
      const categoryText = categoryLine?.split(":")[1]?.trim()
      const category = PROMPT_CATEGORIES.includes(
        categoryText as PromptCategory
      )
        ? (categoryText as PromptCategory)
        : "General"

      // Extract and clean tags
      const tagsLine = lines.find((l) => l.startsWith("Tags:"))
      const tags =
        tagsLine
          ?.split(":")[1]
          ?.split(",")
          .map((t) => t.trim())
          .filter(Boolean) || []

      // Extract name and description
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
              "You are the most advanced AI assistant specialized in optimizing prompts for exceptional results. Your optimizations must leverage deep reasoning, contextual understanding, and advanced analysis. Your goal is to ensure the prompt is not only clear and specific but also highly effective, actionable, and aligned with its intended purpose.",
          },
          {
            role: "system",
            content: `Rules for optimization: \n\
            1. **Deep Analysis**: Analyze the intent and context of the prompt to infer implicit goals or missing details.\n\
            2. **Clarity and Specificity**: Rewrite the prompt to be clear, precise, and unambiguous while ensuring it remains concise.\n\
            3. **Context and Constraints**: Add any necessary background, contextual details, or constraints to guide the response generation effectively.\n\
            4. **Desired Output**: Clearly specify the desired format, structure, or style of the output.\n\
            5. **Error Handling**: Incorporate error handling instructions to account for ambiguities, incomplete data, or failure scenarios.\n\
            6. **Iterative Refinement**: Continuously refine phrasing to remove redundancies, improve flow, and enhance usability.\n\
            7. **Dynamic Adaptability**: Adjust the optimization style to the complexity, tone, or domain of the original prompt, ensuring alignment with the user's goals.`,
          },
          {
            role: "user",
            content: `Optimize this prompt: \n\
            Original Prompt: ${content}\n\n\
            Your task is to:\n\
            1. Enhance clarity and specificity.\n\
            2. Add necessary context, background, and constraints.\n\
            3. Define the desired output format, including structure and style.\n\
            4. Provide error-handling instructions if relevant.\n\n\
            Return ONLY the optimized prompt. The optimized prompt must be clear, actionable, and better than the original in every way.`,
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
