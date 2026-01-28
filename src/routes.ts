import { ControllerSettings, EffectSettings, License, Settings } from "@pages";
import type { ComponentType } from "react";

export interface RouteConfig {
  path: string;
  title: string;
  icon?: string;
  component: ComponentType;
  fullWidth?: boolean;
}

export const ROUTES: Record<string, RouteConfig> = {
  effects: {
    path: "/",
    title: "Effects",
    icon: "icon fi fi-sr-dial",
    component: EffectSettings,
  },
  controller: {
    path: "/controller",
    title: "Controller",
    icon: "icon fi fi-sr-gamepad",
    component: ControllerSettings,
  },
  license: {
    path: "/license",
    title: "License",
    icon: "icon fi fi-sr-key",
    component: License,
  },
  settings: {
    path: "/settings",
    title: "Settings",
    icon: "icon fi fi-rr-settings",
    component: Settings,
    fullWidth: true,
  },
} as const;

export type RouteKey = keyof typeof ROUTES;
