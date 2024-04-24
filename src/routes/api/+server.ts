import type { RequestHandler } from "@sveltejs/kit";
import { ReadableStream } from "web-streams-polyfill";
const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))

export const GET: RequestHandler = () => {
  const stream: ReadableStream<string> = ReadableStream.from(async function*() {
    while (true) {
      console.log(`yielding ${new Date().toLocaleTimeString()}`);
      yield 'wa'
      await delay(1_000)
    }
  }())
  return new Response(stream);
}
