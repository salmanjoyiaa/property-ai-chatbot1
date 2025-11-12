// src/hooks/useChat.js
import { useCallback, useMemo, useState } from 'react'
import { sendToWebhook } from '../utils/api'

let idCounter = 0
const makeId = () => `${Date.now()}_${idCounter++}`

function formatTime(d = new Date()) {
  try {
    return new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(d)
  } catch {
    return d.toLocaleTimeString()
  }
}

export default function useChat() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const greet = useMemo(() => ({
    id: makeId(),
    role: 'bot',
    text: 'Hi! I’m your Property Assistant. Ask me anything about units, amenities, Wi-Fi, check-in, parking, or local tips.',
    timestamp: formatTime()
  }), [])

  const sendMessage = useCallback(async (input, opts = {}) => {
    setError('')

    if (opts.systemGreet) {
      setMessages([greet])
      return
    }

    const userMsg = { id: makeId(), role: 'user', text: input, timestamp: formatTime() }
    setMessages(prev => [...prev, userMsg])

    setIsLoading(true)
    try {
      const reply = await sendToWebhook(input)
      const botMsg = { id: makeId(), role: 'bot', text: reply, timestamp: formatTime() }
      setMessages(prev => [...prev, botMsg])
      setError('') // Clear any previous errors
    } catch (err) {
      console.error('Chat error:', err)
      
      // Extract user-friendly error message
      let errorMessage = 'Something went wrong. Please retry.'
      if (err.message) {
        if (err.message.includes('not found') || err.message.includes('not registered')) {
          errorMessage = 'Webhook not configured. Please set up your n8n webhook endpoint.'
        } else if (err.message.includes('Unable to connect')) {
          errorMessage = 'Cannot connect to server. Please check if n8n is running on localhost:5678'
        } else {
          errorMessage = err.message
        }
      }
      
      setError(errorMessage)
      const fallback = {
        id: makeId(),
        role: 'bot',
        text: "I'm sorry — I couldn't reach the AI service. Please check your webhook configuration or try again later.",
        timestamp: formatTime()
      }
      setMessages(prev => [...prev, fallback])
    } finally {
      setIsLoading(false)
    }
  }, [greet])

  return { messages, sendMessage, isLoading, error }
}
