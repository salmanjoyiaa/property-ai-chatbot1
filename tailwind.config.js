/** @type {import('tailwindcss').Config} */
export default {
content: [
'./index.html',
'./src/**/*.{js,jsx}'
],
theme: {
screens: {
'xs': '475px',
'sm': '640px',
'md': '768px',
'lg': '1024px',
'xl': '1280px',
'2xl': '1536px',
},
extend: {
colors: {
primary: {
50: '#f1f7ff',
100: '#e3effe',
200: '#c0dbfd',
300: '#9ec7fc',
400: '#5a9ff9',
500: '#1d72f3',
600: '#165ac1',
700: '#11479a',
800: '#0d3777',
900: '#0a2a5b'
},
gray: {
50: '#f8fafc',
100: '#f1f5f9',
200: '#e2e8f0',
300: '#cbd5e1',
400: '#94a3b8',
500: '#64748b',
600: '#475569',
700: '#334155',
800: '#1e293b',
900: '#0f172a'
}
},
boxShadow: {
soft: '0 8px 30px rgba(0,0,0,0.08)',
'soft-lg': '0 10px 40px rgba(0,0,0,0.12)',
'inner-soft': 'inset 0 2px 4px rgba(0,0,0,0.06)',
glow: '0 0 20px rgba(29, 114, 243, 0.15)',
'glow-lg': '0 0 30px rgba(29, 114, 243, 0.2)'
},
backgroundImage: {
'gradient-soft': 'radial-gradient(1200px 600px at 10% 0%, rgba(93, 173, 236, 0.25) 0%, rgba(255,255,255,0) 60%), radial-gradient(1200px 600px at 90% 0%, rgba(214, 188, 250, 0.25) 0%, rgba(255,255,255,0) 60%)',
'gradient-primary': 'linear-gradient(135deg, #1d72f3 0%, #5a9ff9 100%)',
'gradient-mesh': 'radial-gradient(at 0% 0%, rgba(29, 114, 243, 0.1) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(214, 188, 250, 0.1) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(93, 173, 236, 0.1) 0px, transparent 50%)'
},
animation: {
'fade-in': 'fadeIn 0.3s ease-in-out',
'slide-up': 'slideUp 0.3s ease-out',
'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
'bounce-slow': 'bounce 2s infinite'
},
keyframes: {
fadeIn: {
'0%': { opacity: '0' },
'100%': { opacity: '1' }
},
slideUp: {
'0%': { transform: 'translateY(10px)', opacity: '0' },
'100%': { transform: 'translateY(0)', opacity: '1' }
}
},
fontFamily: {
sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
},
borderRadius: {
'4xl': '2rem',
'5xl': '2.5rem'
},
backdropBlur: {
xs: '2px'
}
}
},
plugins: [],
}