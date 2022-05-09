import Backdrop from "../Backdrop";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { api } from "../../libs/api";
import { useAuth } from "../../context/auth";
import { Checks, Clock, MagnifyingGlassPlus, Square } from "phosphor-react";

export interface ModalProps {
  setModal: (modal: boolean) => void;
  modal: boolean;
}

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

interface UserProps {
  id: string;
}

interface FeedbackProps {
  id: string;
  type: string;
  comment: string;
  createdAt: string;
  userId: string;
  screenshot: string;
  wasReviewed: boolean;
}

export default function Modal({ setModal }: ModalProps) {
  const [feedbacks, setFeedbacks] = useState<FeedbackProps[]>([]);
  const [screenshot, setScreenshot] = useState<string>("");
  const { user, logout } = useAuth();

  useEffect(() => {
    async function getFeedbacks() {
      if (user) {
        const response = await api.get(`/feedbacks/${(user as UserProps).id}`);

        setFeedbacks(await response.data);
      }
    }

    getFeedbacks();
  }, []);

  function showScreenshot(screenshot: string) {
    setScreenshot(screenshot);
  }

  return (
    <Backdrop>
      <AnimatePresence exitBeforeEnter>
        {screenshot && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute z-10 w-3/4 h-auto border-brand-300 border-2 rounded-xl cursor-pointer flex items-center justify-center bg-zinc-900"
            onClick={() => setScreenshot("")}
          >
            <img
              src={screenshot}
              alt="screenshot"
              className="w-full h-auto rounded-xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-4/5 md:w-3/4 h-3/4 absolute bg-zinc-900 p-6 rounded-lg flex flex-col items-center justify-between"
      >
        <h1>Seus feedbacks</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin">
          {feedbacks ? (
            <table className="mt-2 w-full text-sm text-left text-zinc-800 dark:text-zinc-200">
              <thead className="text-xs uppercase bg-brand-500 text-zinc-100 text-center">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Tipo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Feedback
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Screenshot
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Data
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white border-b dark:bg-zinc-800 dark:border-zinc-700">
                {feedbacks.map((feedback) => (
                  <tr
                    key={feedback.id}
                    className="border-b hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-all"
                  >
                    <td className="text-center px-6 py-3">{feedback.type}</td>
                    <td className="text-center px-6 py-3">
                      {feedback.comment}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {feedback.screenshot ? (
                        <div
                          className="flex justify-center items-center cursor-pointer"
                          onClick={() => showScreenshot(feedback.screenshot)}
                        >
                          <img
                            src={feedback.screenshot}
                            alt="screenshot"
                            className="opacity-50 w-1/2"
                          />
                          <div className="absolute">
                            <MagnifyingGlassPlus size={18} />
                          </div>
                        </div>
                      ) : (
                        "Nenhuma foto"
                      )}
                    </td>
                    <td className="text-center px-6 py-3">
                      {new Date(feedback.createdAt).toLocaleDateString(
                        "pt-BR",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </td>
                    <td className="px-6 py-3 flex justify-center items-center">
                      {feedback.wasReviewed === true ? (
                        <Checks size={24} />
                      ) : (
                        <Clock size={24} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>
              <h1>Você ainda não deixou nenhum feedback :/</h1>
            </div>
          )}
        </div>
        <div className="w-full flex gap-4">
          <button
            className="self-center p-2 w-1/2 mt-4 bg-brand-500 rounded-md border-transparent flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
            onClick={() => setModal(false)}
          >
            Fechar
          </button>
          <button
            className="self-center p-2 w-1/2 mt-4 bg-brand-500 rounded-md border-transparent flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
            onClick={() => {
              logout();
              setModal(false);
            }}
          >
            Logout
          </button>
        </div>
      </motion.div>
    </Backdrop>
  );
}
