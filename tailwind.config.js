/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // Primary - Warm Gold
                "primary": {
                    DEFAULT: "#C9A55A",
                    50: "#FBF8F2",
                    100: "#F5EFE0",
                    200: "#EBDDC1",
                    300: "#DCCB9F",
                    400: "#C9A55A",
                    500: "#B8924D",
                    600: "#A17D3F",
                    700: "#7D6030",
                    800: "#5A4422",
                    900: "#3A2B15",
                },
                // Accent - Deep Mocha
                "mocha": {
                    DEFAULT: "#6B4423",
                    50: "#F5F1ED",
                    100: "#E8DDD3",
                    200: "#D4BCA7",
                    300: "#B89776",
                    400: "#8E6B4C",
                    500: "#6B4423",
                    600: "#5A391C",
                    700: "#482D16",
                    800: "#362211",
                    900: "#24170B",
                },
                // Neutral - Cream & Charcoal
                "cream": {
                    DEFAULT: "#FBF8F2",
                    50: "#FFFFFF",
                    100: "#FBF8F2",
                    200: "#F7F0E6",
                    300: "#F0E5D3",
                    400: "#E8D9BF",
                    500: "#DECCAB",
                },
                "charcoal": {
                    DEFAULT: "#3A2B22",
                    50: "#F0EBE8",
                    100: "#D9CEC5",
                    200: "#B8A08E",
                    300: "#967157",
                    400: "#68493A",
                    500: "#3A2B22",
                    600: "#2F231B",
                    700: "#241B15",
                    800: "#19130E",
                    900: "#0E0A07",
                },
                // System colors with bakery theme
                "background-light": "#FBF8F2",
                "background-dark": "#1A1412",
                "text-light": "#3A2B22",
                "text-dark": "#FBF8F2",
                "text-secondary-light": "#6B4423",
                "text-secondary-dark": "#D4BCA7",
                "surface-light": "#FFFFFF",
                "surface-dark": "#2A1F1A",
                "border-light": "#E8D9BF",
                "border-dark": "#3A2B22",
            },
            fontFamily: {
                "display": ["Playfair Display", "serif"],
                "body": ["Inter", "sans-serif"],
                "accent": ["Cormorant Garamond", "serif"],
            },
            fontSize: {
                'display-lg': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
                'display': ['3.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
                'display-sm': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
            },
            borderRadius: {
                "DEFAULT": "0.75rem",
                "lg": "1rem",
                "xl": "1.5rem",
                "2xl": "2rem",
                "full": "9999px"
            },
            boxShadow: {
                'soft': '0 2px 15px -3px rgba(106, 68, 35, 0.1), 0 2px 6px -2px rgba(106, 68, 35, 0.05)',
                'soft-lg': '0 10px 40px -10px rgba(106, 68, 35, 0.15), 0 2px 10px -2px rgba(106, 68, 35, 0.05)',
                'glow': '0 0 20px rgba(201, 165, 90, 0.3)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
}
