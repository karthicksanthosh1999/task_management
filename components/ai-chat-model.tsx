"use client";

import { useRef, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "lucide-react";

type TProps = {
  aiModelOpen: boolean,
  setAiModelOpen: (open: boolean) => void,
  description: string
}

interface IMessage {
  role: "User" | "AI"
  content: string
}

export default function AiChatDialog({ aiModelOpen, setAiModelOpen, description }: TProps) {
  const [messages, setMessages] = useState<IMessage[] | null>([]);
  const [input, setInput] = useState("");

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    // add user message
    // setMessages((prev) => [...prev, { role: "user", content: input }]);

    // clear input
    setInput("");

    // simulate AI response (replace later with real API)
    setTimeout(() => {
      // setMessages((prev) => [
      //   ...prev,
      //   { role: "assistant", content: "This is an AI response." },
      // ]);
    }, 600);
  };

  return (
    <Dialog open={aiModelOpen} onOpenChange={setAiModelOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>JK-AI</DialogTitle>
          <DialogDescription>{description ?? "N/A"}</DialogDescription>
        </DialogHeader>

        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="h-64 overflow-y-auto p-3 space-y-3 border rounded-md bg-secondary"
        >
          {messages && messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg max-w-[80%] ${msg.role === "User"
                ? "bg-black text-white ml-auto"
                : "bg-gray-200 text-gray-900"
                }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="relative mt-3">
          <Textarea
            placeholder="Enter the task details..."
            className="h-[50px] pr-12 resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute right-2 bottom-2"
            onClick={sendMessage}
          >
            <ArrowUpIcon />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
