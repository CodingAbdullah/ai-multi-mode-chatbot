'use client'

import { useState } from 'react'
import { useChat } from 'ai/react'
import { Send } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PROVIDER_MODEL } from './utils/providerModel'

// Custom page component for working with the Chatbot
export default function ChatbotPage() {
  const [isTyping, setIsTyping] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState('openai')
  const [selectedModel, setSelectedModel] = useState('gpt-4o')
  
  // Incorporating the back-end API route for working with input
  const { messages, input, isLoading, stop, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    body: { selectedProvider, selectedModel },
    onResponse: () => {
      setIsTyping(false)
    }
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsTyping(true)
    handleSubmit(e)
  }

  // Custom JSX code for the Chatbot UI
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-2xl">
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
          <div style={{ paddingBottom: '1rem' }} className="flex flex-col items-center mb-4">
            <Button 
              className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 disabled:opacity-50" 
              onClick={stop} 
              disabled={!isLoading}>Stop
            </Button>
          </div>
          
          <div className="flex flex-col items-center mb-4">
            <label className="block mb-2">Select provider</label>
            <select
              value={selectedProvider}
              onChange={(e) => { setSelectedProvider(e.target.value); setSelectedModel('-- Select a model --'); }}
              className="mb-4 p-2 border rounded"
            >
              <option value="">-- Select Provider --</option>
              {Object.keys(PROVIDER_MODEL).map((provider) => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-center mb-4">
            <label className="block mb-2">Select Model</label>
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
          </div>
        </CardContent>
      </Card>
    </div>
  )
}