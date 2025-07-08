export const cronmateFAQs = [
  {
    id: "cronmate-1",
    question: "What is a cron expression?",
    answer:
      "A cron expression is a string of five or six fields (second, minute, hour, day of month, month, day of week) that specifies when a task should run. For example, '0 9 * * 1' means 'Every Monday at 9:00 AM'.",
  },
  {
    id: "cronmate-2",
    question: "What phrases can I use?",
    answer:
      "CronMate supports phrases like 'Every Monday at 9 AM', 'Every 15 minutes', 'Every 2 hours', 'Every day at 3 PM', or 'Every Sunday at 10:30 PM'. Use simple schedules with minutes, hours, days, or specific weekdays and times.",
  },
  {
    id: "cronmate-3",
    question: "How are recent expressions saved?",
    answer:
      "Up to 5 recent valid cron expressions are saved in your browser's LocalStorage, along with their descriptions and timestamps. They appear in the 'Recent Expressions' table.",
  },
  {
    id: "cronmate-4",
    question: "What happens if my input is invalid?",
    answer:
      "CronMate validates the generated cron expression and displays an error message if it's invalid or if the input can't be parsed. Try rephrasing your schedule, e.g., 'Every Monday at 9 AM' or 'Every 15 minutes'.",
  },
];