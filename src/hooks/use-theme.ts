import { create } from "zustand";

const ThemeProps = {
  key: "theme",
  light: "light",
  dark: "dark",
} as const;

export interface IThemeStore {
  theme: typeof ThemeProps.light | typeof ThemeProps.dark;
  setLightTheme: () => void;
  setDarkTheme: () => void;
  toggleTheme: () => void;
}

type Theme = typeof ThemeProps.light | typeof ThemeProps.dark;


const setTheme = (theme: Theme) => {
  localStorage.setItem(ThemeProps.key, theme);
  document.documentElement.classList.remove(ThemeProps.light, ThemeProps.dark);
  document.documentElement.classList.add(theme);
}

const useThemeStore = create<IThemeStore>((set, get) => ({
  theme: localStorage.getItem(ThemeProps.key) as Theme | null ?? ThemeProps.light,
  setTheme: (theme: Theme) => {
    localStorage.setItem(ThemeProps.key, theme);
    document.documentElement.classList.remove(ThemeProps.light, ThemeProps.dark);
    document.documentElement.classList.add(theme);
    set({ theme });
  },
  setDarkTheme: () => {
    setTheme(ThemeProps.dark);
    set({ theme: ThemeProps.dark });
  },
  setLightTheme: () => {
    setTheme(ThemeProps.light);
    set({ theme: ThemeProps.light });
  },
  toggleTheme: () => set(state => {
    state.theme === ThemeProps.dark ? state.setLightTheme() : state.setDarkTheme();
    return { theme: state.theme === ThemeProps.dark ? ThemeProps.light : ThemeProps.dark };
  }),
  isDark: get()?.theme === ThemeProps.dark,
  isLight: localStorage.getItem(ThemeProps.key) !== ThemeProps.dark
}));
export const useTheme = () => {
  const store = useThemeStore(state => state);
  setTheme(store.theme);
  return {
    theme: store.theme,
    isDark: store.theme === ThemeProps.dark,
    isLight: store.theme === ThemeProps.light,
    setLightTheme: store.setLightTheme,
    setDarkTheme: store.setDarkTheme,
    toggleTheme: store.toggleTheme
  };
};
