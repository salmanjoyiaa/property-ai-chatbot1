import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import ChatMessage from './components/ChatMessage'
import ChatInput from './components/ChatInput'
import TypingDots from './components/TypingDots'
import useChat from './hooks/useChat'
import useAutoScroll from './hooks/useAutoScroll'

export default function App() {
  const { messages, sendMessage, isLoading, error } = useChat()
  const listRef = useRef(null)
  useAutoScroll(listRef, [messages, isLoading])

  useEffect(() => {
    // On first load, greet the user if there are no messages
    if (!messages.length) {
      sendMessage('', {
        systemGreet: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-mesh safe-area-inset">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-4xl px-3 sm:px-4 md:px-6 lg:px-8 pb-24 sm:pb-32 md:pb-36">
        <div
          ref={listRef}
          className="mt-3 sm:mt-6 md:mt-8 bg-white/70 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-soft-lg p-3 sm:p-4 md:p-6 lg:p-8 min-h-[calc(100vh-200px)] max-h-[calc(100vh-200px)] sm:min-h-[calc(100vh-280px)] sm:max-h-[calc(100vh-280px)] md:min-h-[calc(100vh-300px)] md:max-h-[calc(100vh-300px)] overflow-y-auto border border-gray-200/40"
        >

          {/* Messages */}
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <ChatMessage role={m.role} text={m.text} timestamp={m.timestamp} />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <TypingDots />
            </motion.div>
          )}

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-3 sm:mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4 shadow-sm"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-red-900 mb-1 text-xs sm:text-sm">Connection Error</p>
                    <p className="text-red-700 text-xs sm:text-sm break-words">{error}</p>
                    {error.includes('webhook') && (
                      <div className="mt-2 text-xs text-red-600">
                        <p className="font-medium mb-1">To fix this:</p>
                        <ol className="list-decimal list-inside space-y-0.5 ml-2">
                          <li>Make sure n8n is running on localhost:5678</li>
                          <li>Create a webhook node in n8n</li>
                          <li>Set the webhook path (default: "webhook")</li>
                          <li>Or set VITE_N8N_WEBHOOK_URL in .env file</li>
                        </ol>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <ChatInput onSend={sendMessage} />
    </div>
  )
}