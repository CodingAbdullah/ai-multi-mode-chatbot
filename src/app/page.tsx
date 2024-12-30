'use client'

import { useState } from 'react'
import { useChat } from 'ai/react'
import { Send } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PROVIDER_MODEL } from './utils/providerModel'

// Custom Chatbot UI interface
export default function ChatbotLanding() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const [isTyping, setIsTyping] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState('openai')
  const [selectedModel, setSelectedModel] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsTyping(true)
    Promise.resolve(handleSubmit(e)).finally(() => setIsTyping(false))
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Interactive Chatbot</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] pr-4">
            {messages.map(m => (
              <div key={m.id} className={`mb-4 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                  {m.content}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className="text-left">
                <span className="inline-block p-2 rounded-lg bg-gray-200 text-black">
                  Chatbot is typing...
                </span>
              </div>
            )}
          </ScrollArea>
          <form onSubmit={onSubmit} className="flex w-full space-x-2 mb-4">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow"
            />
            <Button type="submit" disabled={isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </form>

          {/* Dropdown for selecting provider */}
          <label className="block mb-2">Select provider</label>
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="mb-4 p-2 border rounded"
          >
            <option value="">-- Select a provider --</option>
            {Object.keys(PROVIDER_MODEL).map((provider) => (
              <option key={provider} value={provider}>
                {provider}
              </option>
            ))}
          </select>

          {/* Dropdown for selecting model */}
          <label className="block mb-2">Select model</label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="mb-4 p-2 border rounded"
          >
            <option value="">-- Select a model --</option>
            {PROVIDER_MODEL[selectedProvider].map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>
    </div>
  )
}