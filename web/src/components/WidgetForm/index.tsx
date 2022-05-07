import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import thoughtImageUrl from "../../assets/thought.svg";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";
import { MoonStars, Sun } from "phosphor-react";
import useDarkMode from "../../hook/useDarkMode";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImageUrl,
      alt: "Imagem de um inseto",
    },
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImageUrl,
      alt: "Imagem de uma lâmpada",
    },
  },
  OTHER: {
    title: "Outro",
    image: {
      source: thoughtImageUrl,
      alt: "Imagem de um balão de pensamento",
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [colorTheme, setTheme] = useDarkMode();

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  function handleDarkModeToggle() {
    localStorage.setItem("theme", darkMode ? "light" : "dark");
    setTheme(colorTheme);
  }

  return (
    <motion.div
      initial={{ opacity: 0, transform: "scale(0.5)" }}
      animate={{ opacity: 1, transform: "scale(1)" }}
      transition={{ duration: 0.5 }}
      key="feedback-form"
    >
      <div className="bg-white dark:bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto transition-all duration-200">
        {feedbackSent ? (
          <FeedbackSuccessStep
            onFeedbackRestartRequested={handleRestartFeedback}
          />
        ) : (
          <>
            {!feedbackType ? (
              <>
                <FeedbackTypeStep onFeedbackTypeChange={setFeedbackType} />
                <button
                  type="button"
                  className="p-2 w-32 mb-4 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                >
                  Login
                </button>
              </>
            ) : (
              <FeedbackContentStep
                feedbackType={feedbackType}
                onFeedbackRestartRequested={handleRestartFeedback}
                onFeedbackSent={() => setFeedbackSent(true)}
              />
            )}
          </>
        )}

        <footer className="text-xs text-neutral-400 flex w-full justify-between">
          <div>
            Feito por{" "}
            <a
              href="https://github.com/gustavokenzo1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 transition-colors"
            >
              Gustavo Kenzo
            </a>
          </div>
          {colorTheme === "light" ? (
            <Sun
              size={24}
              className="cursor-pointer"
              onClick={handleDarkModeToggle}
            />
          ) : (
            <MoonStars
              size={24}
              className="cursor-pointer"
              onClick={handleDarkModeToggle}
            />
          )}
        </footer>
      </div>
    </motion.div>
  );
}
