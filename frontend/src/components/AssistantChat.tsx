import { useState } from "react";
import { Bot, Send, X } from "lucide-react";
import api from "../api/client";
import {sendAssistantMessage} from "../services/assistantApi";

type AssistantChatProps = {
    onFlagOperation: () => Promise<void>;
};
type Message = { 
  role: "user" | "assistant"; 
  content: string; 
};

export function AssistantChat( {onFlagOperation}: AssistantChatProps ) {
      console.log("AssistantChat rendered");

  const [open, setOpen] = useState(false);

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I can help you manage feature flags."
    }
  ]);


  async function sendMessage() {

    if (!input.trim()) return;


    const userMessage = { role: "user" as const, content: input };
    setMessages(prev => [ ...prev, userMessage ]);
    setInput("");


    const response =
      await sendAssistantMessage(input);
    setMessages(prev => [ ...prev, { role: "assistant", content: response.response } ]);
    await onFlagOperation();
  }


  return (
    <>
      {/* Floating Button */}

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="
            fixed bottom-6 right-6
            bg-blue-600 text-white
            p-4 rounded-full shadow-lg
          "
        >
<Bot 
  size={32}
  className="text-white"
/>      </button>
      )}


      {/* Chat Window */}

      {open && (
        <div
          className="
            fixed bottom-6 right-6
            w-96 h-[500px]
            bg-white
            border rounded-xl
            shadow-xl
            flex flex-col
          "
        >

          {/* Header */}

          <div
            className="
              flex justify-between
              items-center
              p-4
              border-b
            "
          >
            <div className="flex gap-2">
              <Bot />
              <span className="font-semibold">
                AI Assistant
              </span>
            </div>

            <button
              onClick={() => setOpen(false)}
            >
              <X size={18}/>
            </button>

          </div>


          {/* Messages */}

          <div
            className="
              flex-1
              overflow-y-auto
              p-4
              space-y-3
            "
          >

            {messages.map((msg,index)=>(
              <div
                key={index}
                className={
                  msg.role === "user"
                  ?
                  "text-right"
                  :
                  "text-left"
                }
              >

                <span
                  className={
                    msg.role === "user"
                    ?
                    "inline-block bg-blue-600 text-white p-2 rounded-lg"
                    :
                    "inline-block bg-gray-100 p-2 rounded-lg"
                  }
                >
                  {msg.content}
                </span>

              </div>
            ))}

          </div>


          {/* Input */}

          <div
            className="
              p-3
              border-t
              flex gap-2
            "
          >

            <input
              className="
                flex-1
                border
                rounded-lg
                px-3
              "
              value={input}
              onChange={
                e => setInput(e.target.value)
              }
              onKeyDown={
                e => {
                  if(e.key === "Enter")
                    sendMessage();
                }
              }
              placeholder="Ask about feature flags..."
            />


            <button
              onClick={sendMessage}
              className="
                bg-blue-600
                text-white
                p-2
                rounded-lg
              "
            >
              <Send size={18}/>
            </button>

          </div>

        </div>
      )}

    </>
  );
}