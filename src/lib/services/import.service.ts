import { prisma } from "@/lib/prisma"
import { AIService } from "./ai.service"

interface ImportedPrompt {
  content: string
  name?: string
  description?: string
  model?: string
  tags?: string[]
  category?: string
}

export class ImportService {
  static async parseFile(file: File): Promise<ImportedPrompt[]> {
    const text = await file.text()
    const extension = file.name.split(".").pop()?.toLowerCase()

    try {
      switch (extension) {
        case "json":
          return this.parseJSON(text)
        case "csv":
          return this.parseCSV(text)
        case "txt":
          return this.parseTXT(text)
        default:
          throw new Error("Unsupported file format")
      }
    } catch (error) {
      console.error("Error parsing file:", error)
      throw new Error("Failed to parse file")
    }
  }

  private static parseJSON(text: string): ImportedPrompt[] {
    const data = JSON.parse(text)
    if (Array.isArray(data)) {
      return data.map((item) => ({
        content: typeof item === "string" ? item : item.content,
        name: typeof item === "object" ? item.name : undefined,
        description: typeof item === "object" ? item.description : undefined,
        model: typeof item === "object" ? item.model : undefined,
        tags: typeof item === "object" ? item.tags : undefined,
        category: typeof item === "object" ? item.category : undefined,
      }))
    }
    throw new Error("Invalid JSON format")
  }

  private static parseCSV(text: string): ImportedPrompt[] {
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase())
    const prompts: ImportedPrompt[] = []

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim())
      const prompt: ImportedPrompt = {
        content: "",
      }

      headers.forEach((header, index) => {
        const value = values[index]
        if (!value) return

        switch (header) {
          case "content":
          case "prompt":
          case "text":
            prompt.content = value
            break
          case "name":
          case "title":
            prompt.name = value
            break
          case "description":
            prompt.description = value
            break
          case "model":
            prompt.model = value
            break
          case "tags":
            prompt.tags = value.split(";").map((t) => t.trim())
            break
          case "category":
            prompt.category = value
            break
        }
      })

      if (prompt.content) {
        prompts.push(prompt)
      }
    }

    return prompts
  }

  private static parseTXT(text: string): ImportedPrompt[] {
    return text
      .split("\n\n")
      .map((block) => block.trim())
      .filter(Boolean)
      .map((block) => ({
        content: block,
      }))
  }

  static async processPrompts(prompts: ImportedPrompt[], userId: string) {
    const results = []

    for (const prompt of prompts) {
      try {
        // If name/description/tags/category not provided, analyze the prompt
        if (
          !prompt.name ||
          !prompt.description ||
          !prompt.tags ||
          !prompt.category
        ) {
          const analysis = await AIService.analyzePrompt(prompt.content)

          results.push(
            await prisma.prompt.create({
              data: {
                content: prompt.content,
                name:
                  prompt.name || analysis.suggestedName || "Untitled Prompt",
                description: prompt.description || analysis.description || "",
                model: prompt.model || "gpt-4o",
                tags: prompt.tags || analysis.tags || [],
                category:
                  prompt.category || analysis.category || "Uncategorized",
                userId,
              },
            })
          )
        } else {
          // Use provided metadata
          results.push(
            await prisma.prompt.create({
              data: {
                content: prompt.content,
                name: prompt.name,
                description: prompt.description || "",
                model: prompt.model || "gpt-4o",
                tags: prompt.tags,
                category: prompt.category,
                userId,
              },
            })
          )
        }
      } catch (error) {
        console.error("Error processing prompt:", error)
        // Continue with other prompts even if one fails
      }
    }

    return results
  }
}
