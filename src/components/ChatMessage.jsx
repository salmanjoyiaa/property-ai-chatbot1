import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function ChatMessage({ role = 'bot', text = '', timestamp }) {
  const isUser = role === 'user'

  return (
    <div className={`flex items-start gap-2 sm:gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-3 sm:mb-4`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-gradient-primary shadow-glow' 
          : 'bg-gradient-to-br from-primary-100 to-primary-200 border border-primary-200'
      }`}>
        {isUser ? (
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )}
      </div>

      {/* Message Bubble */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
        className={`relative flex-1 min-w-0 ${isUser ? 'items-end' : 'items-start'} flex flex-col max-w-[88%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%]`}
      >
        <div className={`rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-sm ${
          isUser
            ? 'bg-gradient-primary text-white shadow-glow'
            : 'bg-white text-gray-800 border border-gray-200/60'
        }`}>
          {/* Markdown-rendered message */}
          <div className="prose-custom">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              skipHtml
              components={{
                p: ({ node, ...props }) => (
                  <p className={`whitespace-pre-wrap leading-relaxed m-0 first:mt-0 last:mb-0 ${
                    isUser ? 'text-white/95' : 'text-gray-800'
                  }`} {...props} />
                ),
                a: ({ node, ...props }) => (
                  <a 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={isUser 
                      ? 'text-white/90 hover:text-white underline underline-offset-2' 
                      : 'text-primary-600 hover:text-primary-700 underline underline-offset-2'
                   }
                    {...props} 
                  />
                ),
                code: ({ node, inline, ...props }) => {
                  if (inline) {
                    return (
                      <code className={`px-1.5 py-0.5 rounded text-xs font-mono ${
                        isUser 
                          ? 'bg-white/20 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`} {...props} />
                    )
                  }
                  return <code {...props} />
                },
                strong: ({ node, ...props }) => (
                  <strong className={isUser ? 'text-white font-semibold' : 'text-gray-900 font-semibold'} {...props} />
                ),
                table: ({ node, ...props }) => (
                  <div className={`overflow-x-auto my-3 -mx-2 sm:mx-0 ${isUser ? 'table-user' : 'table-bot'}`}>
                    <table className={`min-w-full border-collapse text-sm ${
                      isUser ? 'text-white/95' : 'text-gray-800'
                    }`} {...props} />
                  </div>
                ),
                thead: ({ node, ...props }) => (
                  <thead className={isUser ? 'bg-white/15' : 'bg-gray-100'} {...props} />
                ),
                tbody: ({ node, ...props }) => (
                  <tbody className={isUser ? 'table-tbody-user' : ''} {...props} />
                ),
                tr: ({ node, ...props }) => (
                  <tr className={`border-b ${
                    isUser ? 'border-white/25' : 'border-gray-200'
                  }`} {...props} />
                ),
                th: ({ node, ...props }) => (
                  <th className={`px-3 py-2 text-left font-semibold text-xs uppercase tracking-wider ${
                    isUser ? 'text-white' : 'text-gray-700'
                  }`} {...props} />
                ),
                td: ({ node, ...props }) => (
                  <td className={`px-3 py-2 ${
                    isUser ? 'text-white/95' : 'text-gray-800'
                  }`} {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className={`list-disc list-outside ml-4 my-2 space-y-1 ${
                    isUser ? 'text-white/95' : 'text-gray-800'
                  }`} {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className={`list-decimal list-outside ml-4 my-2 space-y-1 ${
                    isUser ? 'text-white/95' : 'text-gray-800'
                  }`} {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className={`leading-relaxed ${
                    isUser ? 'text-white/95' : 'text-gray-800'
                  }`} {...props} />
                ),
                h1: ({ node, ...props }) => (
                  <h1 className={`text-xl font-bold mt-4 mb-2 first:mt-0 ${
                    isUser ? 'text-white' : 'text-gray-900'
                  }`} {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className={`text-lg font-bold mt-3 mb-2 first:mt-0 ${
                    isUser ? 'text-white' : 'text-gray-900'
                  }`} {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className={`text-base font-semibold mt-3 mb-1.5 first:mt-0 ${
                    isUser ? 'text-white' : 'text-gray-900'
                  }`} {...props} />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote className={`border-l-4 pl-3 my-3 italic ${
                    isUser ? 'border-white/30 text-white/80' : 'border-gray-300 text-gray-600'
                  }`} {...props} />
                ),
              }}
            >
              {text || ''}
            </ReactMarkdown>
          </div>
        </div>

        {/* Timestamp */}
        {timestamp && (
          <div className={`mt-1 sm:mt-1.5 text-[10px] sm:text-xs font-medium px-1 ${
            isUser ? 'text-gray-500 text-right' : 'text-gray-400'
          }`}>
            {timestamp}
          </div>
        )}
      </motion.div>
    </div>
  )
}
