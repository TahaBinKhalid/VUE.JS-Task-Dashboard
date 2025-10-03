import { TaskPriority } from "./task";

// src/types/settings.ts
export interface AppSettings {
  theme: ThemeMode;
  language: string;
  notifications: NotificationSettings;
  taskDefaults: TaskDefaultSettings;
}

export type ThemeMode = 'light' | 'dark' | 'auto';

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sound: boolean;
  weeklySummary: boolean;
}

export interface TaskDefaultSettings {
  priority: TaskPriority;
  defaultDueDays: number;
  autoArchive: boolean;
}