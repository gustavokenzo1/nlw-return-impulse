import { motion } from "framer-motion";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";

interface FeedbackTypeStepProps {
  onFeedbackTypeChange: (type: FeedbackType) => void;
}

export function FeedbackTypeStep({
  onFeedbackTypeChange,
}: FeedbackTypeStepProps) {
  return (
    <>
      <header>
        <span className="text-xl leading-6 text-zinc-900 dark:text-zinc-200">Deixe seu feedback</span>
        <CloseButton />
      </header>
      <div className="flex py-5 gap-2 w-full">
        {Object.entries(feedbackTypes).map(([key, value]) => {
          return (
            <button
              key={key}
              className="text-zinc-900 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none transition-all"
              type="button"
              onClick={() => onFeedbackTypeChange(key as FeedbackType)}
            >
              <img src={value.image.source} alt={value.image.alt} />
              <span> {value.title} </span>
            </button>
          );
        })}
      </div>
    </>
  );
}
