import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ChatInput({ onSend }) {
  const [value, setValue] = useState('')
  const [sending, setSending] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recognitionError, setRecognitionError] = useState(null)
  const textareaRef = useRef(null)
  const recognitionRef = useRef(null)
  const valueRef = useRef('')

  const handleSend = async () => {
    const message = value.trim()
    if (!message || sending) return
    setSending(true)
    setValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = '48px'
    }
    try {
      await onSend(message)
    } finally {
      setSending(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Keep valueRef in sync with value
  useEffect(() => {
    valueRef.current = value
  }, [value])

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = '48px'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`
    }
  }, [value])

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
    if (!SpeechRecognition) {
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    let sessionTranscript = ''

    recognition.onstart = () => {
      setIsRecording(true)
      setRecognitionError(null)
      sessionTranscript = valueRef.current // Start with current value
    }

    recognition.onresult = (event) => {
      let interimTranscript = ''
      let finalTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' '
        } else {
          interimTranscript += transcript
        }
      }

      // Accumulate final transcripts
      if (finalTranscript) {
        sessionTranscript += finalTranscript
      }
      
      // Update input with accumulated final text and current interim text
      setValue(sessionTranscript + interimTranscript)
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsRecording(false)
      
      switch (event.error) {
        case 'no-speech':
          setRecognitionError('No speech detected. Please try again.')
          break
        case 'audio-capture':
          setRecognitionError('No microphone found. Please check your microphone.')
          break
        case 'not-allowed':
          setRecognitionError('Microphone permission denied. Please allow microphone access.')
          break
        default:
          setRecognitionError('Speech recognition error. Please try again.')
      }
      
      // Clear error after 3 seconds
      setTimeout(() => setRecognitionError(null), 3000)
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognitionRef.current = recognition

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      setRecognitionError('Speech recognition not available')
      return
    }

    if (isRecording) {
      recognitionRef.current.stop()
    } else {
      try {
        recognitionRef.current.start()
      } catch (error) {
        console.error('Failed to start recognition:', error)
        setRecognitionError('Failed to start recording. Please try again.')
        setTimeout(() => setRecognitionError(null), 3000)
      }
    }
  }

  const canSend = value.trim() && !sending
  const isSpeechSupported = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/95 to-transparent pt-3 sm:pt-4 md:pt-6 pb-3 sm:pb-4 md:pb-6 lg:pb-8 border-t border-gray-100/50 safe-area-inset-bottom">
      <div className="mx-auto w-full max-w-4xl px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative"
        >
          <div className="flex items-end gap-2 sm:gap-3 bg-white rounded-xl sm:rounded-2xl shadow-soft-lg p-2 sm:p-3 border border-gray-200/60 backdrop-blur-sm">
            {/* Input area */}
            <div className="flex-1 min-w-0 relative">
              <textarea
                ref={textareaRef}
                className={`w-full resize-none outline-none px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base bg-gray-50/50 border transition-all placeholder:text-gray-400 text-gray-900 leading-relaxed touch-manipulation ${
                  isRecording 
                    ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100 bg-red-50/30' 
                    : 'border-gray-200/60 focus:bg-white focus:border-primary-300 focus:ring-2 focus:ring-primary-100'
                }`}
                placeholder={isRecording ? "Listening..." : "Ask about properties..."}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
              {isRecording && (
                <div className="absolute top-2 right-2 flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-red-600 font-medium hidden sm:inline">Recording</span>
                </div>
              )}
            </div>

            {/* Microphone button */}
            {isSpeechSupported && (
              <motion.button
                onClick={toggleRecording}
                disabled={sending}
                whileHover={!sending ? { scale: 1.05 } : {}}
                whileTap={!sending ? { scale: 0.95 } : {}}
                className={`shrink-0 inline-flex items-center justify-center rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-2.5 sm:py-3 min-w-[44px] min-h-[44px] transition-all touch-manipulation ${
                  isRecording
                    ? 'bg-red-500 text-white shadow-md shadow-red-500/30 active:shadow-lg active:shadow-red-500/40'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300'
                } ${sending ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label={isRecording ? 'Stop recording' : 'Start voice recording'}
                title={isRecording ? 'Stop recording' : 'Start voice recording'}
              >
                <AnimatePresence mode="wait">
                  {isRecording ? (
                    <motion.svg
                      key="stop"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M9 9a3 3 0 106 0v6a3 3 0 10-6 0V9z" />
                      <path d="M5 10a1 1 0 011-1h12a1 1 0 110 2H6a1 1 0 01-1-1z" />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="mic"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                      <path d="M19 10v2a7 7 0 01-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                      <line x1="8" y1="23" x2="16" y2="23" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

            {/* Send button */}
            <motion.button
              onClick={handleSend}
              disabled={!canSend}
              whileHover={canSend ? { scale: 1.05 } : {}}
              whileTap={canSend ? { scale: 0.95 } : {}}
              className={`shrink-0 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 min-w-[44px] min-h-[44px] text-sm font-semibold transition-all touch-manipulation ${
                canSend
                  ? 'bg-gradient-primary text-white shadow-md shadow-primary-500/30 active:shadow-lg active:shadow-primary-500/40'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              aria-label="Send message"
            >
              <AnimatePresence mode="wait">
                {sending ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 180 }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                  />
                ) : (
                  <motion.svg
                    key="send"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 5 }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                  </motion.svg>
                )}
              </AnimatePresence>
              <span className="hidden md:inline">Send</span>
            </motion.button>
          </div>
          
          {/* Error message */}
          {recognitionError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
            >
              {recognitionError}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}