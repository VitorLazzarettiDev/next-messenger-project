import { getServerSession } from "next-auth";
import { Message } from "../typings";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import Providers from "./providers";

async function HomePage() {
  const data = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/get_messages/`).then((res) => res.json());

  const messages: Message[] = data.messages;
  const session = await getServerSession();

  return (
    <main>
      <Providers session={session}>
        <MessageList initialMessages={messages} />
        <ChatInput />
      </Providers>
    </main>
  )
}

export default HomePage;