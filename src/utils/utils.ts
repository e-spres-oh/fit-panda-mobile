import { RequestMethod } from '../types';

export function createRequestOptions(
  method: RequestMethod,
  accessToken?: string,
  body?: { [key: string]: string | number }
): {
  method: string;
  headers: { [key: string]: string };
  body?: string;
} {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  };
}

export function objToQueryString(obj: any) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValuePairs.join('&');
}

export function classifyDateRelativeToToday(date: Date): string {
  const today = new Date();
  const yesterday = new Date();

  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toDateString();
  }
}

export function getNextDay(date: Date): Date {
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + 1);
  return nextDay;
}

export function getPrevDay(date: Date): Date {
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() - 1);
  return nextDay;
}
