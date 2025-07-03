export const tailwindForgeFAQs = [
  {
    id: "basic-1",
    question: "What is TailwindForge Basic Mode?",
    answer: "TailwindForge Basic Mode allows you to create simple Tailwind CSS v4 color palettes with OKLCH support for core colors like background, foreground, and primary. You can customize colors, preview light/dark modes, and export as CSS, JSON, or tailwind.config.ts."
  },
  {
    id: "basic-2",
    question: "How do I export my color palette in Basic Mode?",
    answer: "In Basic Mode, use the Export card to copy your palette as @theme inline CSS, JSON, or tailwind.config.ts. Click the respective button, and a 'Copied' confirmation will appear. You can also download the CSS file."
  },
  {
    id: "basic-3",
    question: "Can I save my palette in Basic Mode?",
    answer: "Yes, TailwindForge Basic Mode saves your palette to LocalStorage automatically. You can load it anytime by returning to the Basic Mode page."
  },
  {
    id: "advanced-1",
    question: "What is TailwindForge Advanced Mode?",
    answer: "Advanced Mode extends Basic Mode by allowing customization of additional colors like chart and sidebar colors. It supports OKLCH, light/dark mode previews, and exports in multiple formats."
  },
  {
    id: "advanced-2",
    question: "How is Advanced Mode different from Basic Mode?",
    answer: "Advanced Mode includes more color options (e.g., chart, sidebar) and finer control over the palette, while Basic Mode focuses on core colors for simpler use cases."
  },
  {
    id: "advanced-3",
    question: "Can I switch between Basic and Advanced Modes?",
    answer: "Yes, use the 'Go to Advanced Mode' button in Basic Mode or 'Go to Basic Mode' in Advanced Mode, available in the Theme Settings card."
  },
  {
    id: "migration-1",
    question: "What does the TailwindForge Migration tool do?",
    answer: "The Migration tool converts Tailwind v3 color configurations (including nested colors like primary.DEFAULT, primary.50) to Tailwind v4 @theme inline CSS with OKLCH support. Paste your v3 tailwind.config.js content, and it generates the equivalent v4 CSS."
  },
  {
    id: "migration-2",
    question: "How do I use the Migration tool?",
    answer: "Navigate to /tailwind-forge/migration, paste your Tailwind v3 config into the input textarea, and click 'Convert'. You can also click 'Load Sample' to test with a sample config. The output CSS can be copied or downloaded."
  },
  {
    id: "migration-3",
    question: "What happens if my v3 config has invalid colors?",
    answer: "If the config is invalid or colors cannot be parsed, the tool will output an error message like '// Could not parse colors'. For non-HEX colors (e.g., hsl()), they are preserved as-is."
  },
  {
    id: "migration-4",
    question: "Does the Migration tool support nested color objects?",
    answer: "Yes, it handles nested colors (e.g., primary: { DEFAULT: '#3b82f6', 50: '#eff6ff' }) and generates flattened CSS variables like --primary-50 for Tailwind v4."
  }
];