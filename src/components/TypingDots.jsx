import { motion } from 'framer-motion'

export default function TypingDots() {
  const dots = [0, 1, 2]

  return (
    <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
      {/* Avatar */}
      <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 border border-primary-200">
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>

      {/* Typing indicator */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200/60 px-3 py-2 sm:px-4 sm:py-3 shadow-sm">
        <span className="sr-only">AI is typing</span>
        <div className="flex gap-1.5 items-center">
          {dots.map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full bg-gray-400"
              animate={{
                y: [0, -8, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}