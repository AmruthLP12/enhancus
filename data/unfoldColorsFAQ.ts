import { FAQItem } from "@/types/types";
import { PaintBucket } from "lucide-react";

export const unfoldColorsFAQs: FAQItem[] = [
  {
    question: "What is the Unfold Colors tool?",
    answer: "Unfold Colors generates and customizes color schemes for Django Unfold. The main page allows selecting base colors with auto-generated shades, while the advanced page offers individual shade customization.",
    icon: PaintBucket,
  },
  {
    question: "How do I use the generated colors in Django Unfold?",
    answer: "Copy the Python dictionary from the preview textarea and paste it into your Django settings file under `UNFOLD['COLORS']`. Ensure RGB values are formatted as 'R G B'.",
  },
  {
    question: "What’s the difference between the main and advanced pages?",
    answer: "The main page (/unfold-colors) lets you pick one base color per category, with shades (50 to 950) generated automatically. The advanced page (/unfold-colors/advanced) allows editing each shade individually for precise control.",
  },
  {
    question: "How are shades generated from a base color?",
    answer: "Shades are created by adjusting the lightness of the base color in HSL space, keeping hue and saturation constant. '50' is the lightest, and '950' is the darkest.",
  },
  {
    question: "What does 'I'm Feeling Lucky' do?",
    answer: "It generates random base colors for all categories, with corresponding shades created automatically.",
  },
];