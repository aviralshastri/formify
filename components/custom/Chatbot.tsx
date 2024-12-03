"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    { text: string; sender: "user" | "bot"; id: number }[]
  >([{ text: "Hello! How can I help you bake your form?", sender: "bot", id: 0 }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleDialog = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 300);
    } else {
      setIsOpen(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = input;
      const newMessageId = messages.length;
      setMessages((prev) => [
        ...prev, 
        { text: userMessage, sender: "user", id: newMessageId }
      ]);
      setInput("");
      setIsLoading(true);

      try {
        const response = await axios.post("http://192.168.1.8:8000/chat", {
          message: userMessage,
        });
        setMessages((prev) => [
          ...prev,
          { 
            text: response.data.response, 
            sender: "bot", 
            id: newMessageId + 1 
          },
        ]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          { 
            text: "Sorry, something went wrong.", 
            sender: "bot", 
            id: newMessageId + 1 
          },
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
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Animation variants
  const chatbotButtonVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300 
      }
    },
    hover: { 
      scale: 1.1,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const chatbotContainerVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.9,
      y: 20
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 20,
      transition: { 
        duration: 0.3 
      }
    }
  };

  const messageVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300 
      }
    }
  };

  return (
    <>
      <motion.button
        variants={chatbotButtonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        className="fixed right-10 bottom-10 rounded-full p-2 shadow-md transition duration-300 transform bg-black dark:bg-white"
        onClick={toggleDialog}
        aria-label="Chatbot"
      >
        <Image src={chatbotlogo} width={60} height={60} alt="chatbotlogo" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbot-container"
            variants={chatbotContainerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`fixed right-10 bottom-24 w-96 transition-all duration-300 ease-in-out origin-bottom`}
          >
            <Card className="shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  Bake your form using Formitra AI
                </CardTitle>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="sm" onClick={toggleDialog}>
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="space-y-3 py-5 h-96 border rounded-lg">
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        variants={messageVariants}
                        initial="initial"
                        animate="animate"
                        className={`flex mx-4 mt-3 ${
                          message.sender === "user" 
                            ? "justify-end" 
                            : "justify-start"
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
                              <motion.span 
                                animate={{ 
                                  opacity: [1, 0.5, 1],
                                  transition: { 
                                    repeat: Infinity, 
                                    duration: 1 
                                  } 
                                }}
                                className="ml-2"
                              >
                                ...
                              </motion.span>
                            )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <form onSubmit={handleSubmit} className="flex w-full space-x-2">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex-grow"
                  >
                    <Input
                      type="text"
                      placeholder="Describe the form you want to bake..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={isLoading}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Sending..." : "Send"}
                    </Button>
                  </motion.div>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}