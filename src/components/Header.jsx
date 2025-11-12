import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 border-b border-gray-200/50 shadow-sm safe-area-inset-top">
      <div className="mx-auto w-full max-w-4xl px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2.5 sm:py-3 md:py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0"
          >
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full"></div>
              <img 
                src="/logo.svg" 
                alt="Property AI Chatbot" 
                className="relative h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 drop-shadow-sm" 
              />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-gray-900 font-semibold text-base sm:text-lg md:text-xl leading-tight tracking-tight truncate">
                Property AI Assistant
              </h1>
              <p className="text-xs text-gray-500 font-medium mt-0.5 hidden sm:block">
                Your intelligent property guide
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="hidden sm:flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-primary-50 rounded-full border border-primary-100 flex-shrink-0 ml-2"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-primary-700">Online</span>
          </motion.div>
        </div>
      </div>
    </header>
  )
}