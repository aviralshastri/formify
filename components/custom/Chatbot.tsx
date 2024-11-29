"use client";

import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "../ui/scroll-area";
import axios from "axios";
import chatbotlogo from "@/public/chatbot.png";
import Image from "next/image";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "bot" }[]
  >([{ text: "Hello! How can I help you bake your form?", sender: "bot" }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // Added new state variable

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleDialog = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 300); // Match this with the transition duration
    } else {
      setIsOpen(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = input;
      setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
      setInput("");
      setIsLoading(true);

      try {
        const response = await axios.post("http://localhost:8000/chat", {
          message: userMessage,
        });
        setMessages((prev) => [
          ...prev,
          { text: response.data.response, sender: "bot" },
        ]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          { text: "Sorry, something went wrong.", sender: "bot" },
        ]);
        console.error("Chat error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        toggleDialog();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, toggleDialog]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <button
        className="fixed right-10 bottom-10 rounded-full p-2 shadow-md transition duration-300 transform hover:scale-105 bg-black dark:bg-white"
        onClick={toggleDialog}
        aria-label="Chatbot"
      >
        <Image src={chatbotlogo} width={60} height={60} alt="chatbotlogo" />
      </button>

      <div
        className={`fixed right-10 bottom-24 w-96 transition-all duration-300 ease-in-out origin-bottom ${
          isOpen
            ? "scale-y-100 opacity-100 max-h-[calc(100vh-6rem)]"
            : isClosing
            ? "scale-y-0 opacity-0 max-h-0"
            : "scale-y-0 opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <Card className="shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              Bake your form using Formitra AI
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={toggleDialog}>
              {" "}
              {/* Updated to use toggleDialog */}
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="space-y-3 py-5 h-96 border rounded-lg">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex mx-4 mt-3 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.sender === "user"
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.text}
                    {isLoading &&
                      message.sender === "bot" &&
                      index === messages.length - 1 && (
                        <span className="ml-2 animate-pulse">...</span>
                      )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSubmit} className="flex w-full space-x-2">
              <Input
                type="text"
                placeholder="Describe the form you want to bake..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send"}
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
