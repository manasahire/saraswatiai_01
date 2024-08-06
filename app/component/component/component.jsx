'use client';

import { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { ResetIcon } from "@radix-ui/react-icons"


export function Component() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')

  const sendMessage = async () => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const newUserMessage= {
      text: inputMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prevMessages => [...prevMessages, newUserMessage])
    setInputMessage('')

    try {
      const response = await fetch('https://fastapiserver-7zl6.onrender.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()

      const newAIMessage = {
        text: data.reply,
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      setMessages(prevMessages => [...prevMessages, newAIMessage])
    } catch (error) {
      console.error('Error:', error)
      // Handle error (e.g., show an error message to the user)
    }
  }

  return (
    <div className="flex h-[600px] w-full max-w-2xl flex-col rounded-lg border bg-background">
      <div className="flex items-center justify-between border-b bg-muted/20 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src="/placeholder-user.jpg" alt="Contact Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <ResetIcon className="h-5 w-5" />
            <span className="sr-only">More</span>
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="grid gap-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground ml-auto'
                  : 'bg-muted'
              }`}
            >
              <p>{message.text}</p>
              <p className={`text-xs ${message.sender === 'user' ? '' : 'text-muted-foreground'}`}>
                {message.time}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <form className="flex items-center gap-2" onSubmit={sendMessage}>
          <Input
            id="message"
            placeholder="Type your message..."
            className="flex-1"
            autoComplete="off"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <Button type="submit" size="icon">
            <SendIcon className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  )
}

function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}