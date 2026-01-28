import { create } from "zustand";
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";

import {
  AUTO_IMAGE_CROP_ALPHA_THRESHOLD,
  DEFAULT_APP_PREFERENCES,
} from "@/config";
import { type Theme } from "@/theme";
import type { AppPreferences } from "@/types";
import { cropTransparentAny } from "@/utils/crop";

import { indexedDBStorage } from "./storage";

interface AppPreferencesState {
  preferences: AppPreferences;
}

interface AppPreferencesActions {
  setTheme: (theme: Theme) => void;
  setWheelImage: (file: File) => Promise<void>;
  resetWheelImage: () => void;
  replacePreferences: (preferences: AppPreferences) => void;
}

type AppPreferencesStore = AppPreferencesState & AppPreferencesActions;

export const useAppPreferencesStore = create<AppPreferencesStore>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        preferences: DEFAULT_APP_PREFERENCES,

        setTheme: (theme) => {
          applyThemeToDOM(theme);
          set((state) => ({
            preferences: { ...state.preferences, theme },
          }));
        },

        setWheelImage: async (file) => {
          if (!file.type.startsWith("image/"))
            throw new Error("Provided file is not an image.");

          const canvas = await cropTransparentAny(
            file,
            AUTO_IMAGE_CROP_ALPHA_THRESHOLD,
          );
          if (!canvas) throw new Error("Failed to process the image.");

          set((state) => ({
            preferences: {
              ...state.preferences,
              wheelImageUrl: canvas.toDataURL("image/png"),
            },
          }));
        },

        resetWheelImage: () => {
          set((state) => ({
            preferences: {
              ...state.preferences,
              wheelImageUrl: DEFAULT_APP_PREFERENCES.wheelImageUrl,
            },
          }));
        },

        replacePreferences: (preferences) => {
          applyThemeToDOM(preferences.theme);
          set({ preferences: preferences });
        },
      }),
      {
        name: "app-preferences-storage",
        storage: createJSONStorage(() => indexedDBStorage),
        onRehydrateStorage: () => (state) => {
          if (!state) return;
          console.log("Rehydrating App Preferences Store...");
          applyThemeToDOM(state.preferences.theme);
        },
      },
    ),
  ),
);

const applyThemeToDOM = (theme: Theme) => {
  if (document.documentElement.getAttribute("data-theme") !== theme)
    document.documentElement.setAttribute("data-theme", theme);
};
