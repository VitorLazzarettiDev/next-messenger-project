"use client"

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Message } from "../typings";
import TimeAgo from 'react-timeago';

type Props = {
  message: Message;
};

function MessageComponent({ message }: Props) {
  const [createAt, setCreateAt] = useState<String | undefined>();

  useEffect(() => {

    setCreateAt(new Date(message.created_at).toLocaleString());


  });

  const { data: session } = useSession();
  const isUser = session?.user?.email === message.email;

  return (
    <div className={`flex w-fit ${isUser && 'ml-auto'}`}>
      <div className={`flex-shrink-0 ${isUser && 'order-2'}`}>
        <Image
          className="rounded-full mx-2"
          alt={`${message.username}'s Profile Picture`}
          src={message.profilePic}
          height={10}
          width={50}
        />
      </div>
      <div>
        <p className={`text-[0.65rem] px-[2px] pb-[2px] ${isUser ? 'text-blue-400 text-right' : 'text-red-400 text-left'}`}
        >
          {message.username}
        </p>

        <div className="flex items-end">
          <div className={`px-3 py-2 rounded-lg w-fit text-white ${isUser ? 'bg-blue-400 ml-auto order-2' : 'bg-red-400'}`}>
            <p>{message.message}</p>
          </div>

          <TimeAgo
            className={`text-[0.65rem] italic px-2 text-gray-300 ${isUser && 'text-right'}`}
            date={new Date(message.created_at)}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;