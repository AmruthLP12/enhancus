import { FAQItem } from "@/types/django_key_gen";
import { HelpCircle } from "lucide-react";

export const djangoFAQs: FAQItem[] = [
  {
    question: "What is a Django secret key?",
    answer:
      "A Django secret key is a cryptographic key used for hashing and signing data in your Django application, such as cookies and sessions. It must be kept confidential to prevent security vulnerabilities.",
    icon: HelpCircle,
  },
  {
    question: "How long should my secret key be?",
    answer:
      "Django recommends a secret key of at least 50 characters for optimal security. This generator defaults to 50 characters but allows customization up to 100 characters.",
    icon: HelpCircle,
  },
  {
    question: "Should I include special characters?",
    answer:
      "Including special characters (!@#$%^&*(-_=+)) increases the key's entropy, making it harder to guess. It's recommended unless your environment has specific restrictions.",
    icon: HelpCircle,
  },
  {
    question: "How do I safely store my secret key?",
    answer:
      "Store your secret key in environment variables or a secure configuration file. Never commit it to version control (e.g., Git). Use tools like python-decouple to load it in your Django settings.",
    icon: HelpCircle,
  },
];
