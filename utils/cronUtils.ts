import { CronExpressionParser } from "cron-parser";
import cronstrue from "cronstrue";
import { CronTime } from "cron-time-generator";

export function parseNaturalLanguage(input: string): string {
  const cleanInput = input.trim().toLowerCase().replace(/\s+/g, " ");
  try {
    if (cleanInput === "every minute") {
      return CronTime.every(1).minutes();
    }
    if (cleanInput.startsWith("every")) {
      const intervalMatch = cleanInput.match(
        /^every\s+(\d+)\s*(minute|hour|day)s?(?:\s*at\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)?)?$/i
      );
      if (intervalMatch) {
        const [, value, unit, hour, minute, period] = intervalMatch;
        const numValue = parseInt(value);
        let cronHour = hour ? parseInt(hour) : undefined;
        const cronMinute = minute ? parseInt(minute) : 0;

        if (cronHour !== undefined) {
          if (period === "pm" && cronHour < 12) cronHour += 12;
          if (period === "am" && cronHour === 12) cronHour = 0;
          if (cronHour > 23 || cronMinute > 59) {
            throw new Error("Invalid time: Hour must be 0-23 and minute 0-59");
          }
        }

        if (unit === "minute") {
          if (numValue < 1 || numValue > 59)
            throw new Error("Minute interval must be 1-59");
          return CronTime.every(numValue).minutes();
        }
        if (unit === "hour") {
          if (numValue < 1 || numValue > 23)
            throw new Error("Hour interval must be 1-23");
          return CronTime.every(numValue).hours();
        }
        if (unit === "day") {
          if (numValue < 1 || numValue > 31)
            throw new Error("Day interval must be 1-31");
          return cronHour !== undefined
            ? CronTime.every(numValue).days(cronHour, cronMinute)
            : CronTime.every(numValue).days();
        }
      }

      const dayMatch = cleanInput.match(
        /^every\s*(monday|tuesday|wednesday|thursday|friday|saturday|sunday)(?:\s*at\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)?)?$/i
      );
      if (dayMatch) {
        const [, day, hour, minute, period] = dayMatch;
        const days = {
          monday: 1,
          tuesday: 2,
          wednesday: 3,
          thursday: 4,
          friday: 5,
          saturday: 6,
          sunday: 0,
        };
        type DayKey = keyof typeof days;
        const dayKey = day as DayKey;
        let cronHour = hour ? parseInt(hour) : 0;
        const cronMinute = minute ? parseInt(minute) : 0;

        if (hour && (cronHour > 12 || cronHour < 1)) {
          throw new Error("Invalid hour: Must be 1-12 with AM/PM");
        }
        if (cronMinute > 59) throw new Error("Invalid minute: Must be 0-59");
        if (period === "pm" && cronHour < 12) cronHour += 12;
        if (period === "am" && cronHour === 12) cronHour = 0;

        return CronTime.onSpecificDaysAt([days[dayKey]], cronHour, cronMinute);
      }

      // Match: every day at 3 PM
      const dailyMatch = cleanInput.match(
        /^every\s+day(?:\s*at\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)?)?$/
      );
      if (dailyMatch) {
        const [, hour, minute, period] = dailyMatch;
        let cronHour = hour ? parseInt(hour) : 0;
        const cronMinute = minute ? parseInt(minute) : 0;

        if (hour && (cronHour > 12 || cronHour < 1)) {
          throw new Error("Invalid hour: Must be 1-12 with AM/PM");
        }
        if (cronMinute > 59) throw new Error("Invalid minute: Must be 0-59");
        if (period === "pm" && cronHour < 12) cronHour += 12;
        if (period === "am" && cronHour === 12) cronHour = 0;

        return CronTime.every(1).days(cronHour, cronMinute);
      }
    }

    throw new Error(
      "Unsupported phrase. Try 'Every Monday at 9 AM', 'Every 15 minutes', 'Every 2 hours', or 'Every day at 3 PM'"
    );
  } catch (err) {
    throw new Error(
      `Failed to parse input: ${
        err instanceof Error ? err.message : "Unknown error"
      }`
    );
  }
}

export function validateCron(
  expression: string,
  timezone: string = "UTC"
): boolean {
  try {
    CronExpressionParser.parse(expression, { tz: timezone });
    return true;
  } catch (err) {
    if (err instanceof Error) return false;
    return false;
  }
}

export function getCronDescription(expression: string): string {
  try {
    return cronstrue.toString(expression, {
      throwExceptionOnParseError: false,
    });
  } catch (err) {
    if (err instanceof Error) return "Invalid cron expression";
    return "Invalid cron expression";
  }
}

export function getNextRunTimes(
  expression: string,
  count: number,
  timezone: string = "UTC"
): string[] {
  try {
    const interval = CronExpressionParser.parse(expression, {
      currentDate: new Date(),
      tz: timezone,
    });
    const times: string[] = [];
    for (let i = 0; i < count; i++) {
      const next = interval.next();
      times.push(next.toDate().toLocaleString("en-US", { timeZone: timezone }));
    }
    return times;
  } catch {
    return [];
  }
}
