import { convertToModelMessages, streamText, type UIMessage } from "ai"

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const prompt = convertToModelMessages(messages)

  const result = streamText({
    model: "openai/gpt-4o-mini",
    messages: prompt,
    system: "You are a helpful assistant.",
  })

  return result.toUIMessageStreamResponse()
}
