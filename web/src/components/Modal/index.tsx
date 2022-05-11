import Backdrop from "../Backdrop";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { api } from "../../libs/api";
import { useAuth } from "../../context/auth";
import {
  Checks,
  Clock,
  MagnifyingGlassPlus,
  MoonStars,
  Square,
  Sun,
  ThumbsDown,
  ThumbsUp,
  Trash,
  X,
} from "phosphor-react";
import useDarkMode from "../../hook/useDarkMode";

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

export interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean | null;
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
  const [colorTheme, setTheme] = useDarkMode();
  const [feedbacks, setFeedbacks] = useState<FeedbackProps[]>([]);
  const [showFeedbacks, setShowFeedbacks] = useState<FeedbackProps[]>([]);
  const [screenshot, setScreenshot] = useState<string>("");
  const [feedbackType, setFeedbackType] = useState<string>("");
  const [users, setUsers] = useState<UserProps[]>([]);

  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(user as UserProps);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }

    async function getFeedbacks() {
      if (userData) {
        let response;

        if (userData.isAdmin) {
          response = await api.get("/feedbacks", {
            headers: {
              userId: userData.id,
            },
          });
        } else {
          response = await api.get(`/feedbacks/${userData.id}`);
        }
        setShowFeedbacks(await response.data);
        setFeedbacks(await response.data);
      }
    }

    getFeedbacks();
  }, []);

  function showScreenshot(screenshot: string) {
    setScreenshot(screenshot);
  }

  function handleDarkModeToggle() {
    localStorage.setItem("theme", colorTheme === "dark" ? "light" : "dark");
    setTheme(colorTheme);
  }

  function handleSelect(e: any) {
    setUsers([]);
    setFeedbackType(e.target.value);
    if (e.target.value !== "ALL") {
      setShowFeedbacks(
        feedbacks.filter((feedback) => {
          return feedback.type === e.target.value;
        })
      );
    } else {
      setShowFeedbacks(feedbacks);
    }
  }

  async function handleWasReviewed(id: string) {
    await api.patch(`/feedbacks/${id}`, {
      wasReviewed: true,
      user_id: userData.id,
    });
    setShowFeedbacks(
      showFeedbacks.map((feedback) => {
        if (feedback.id === id) {
          feedback.wasReviewed = true;
        }
        return feedback;
      })
    );
  }

  async function handleGetUsers() {
    try {
      const response = await api.get("/users", {
        headers: {
          userId: userData.id,
        },
      });
      setUsers(await response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUserPrivilege(id: string, isAdmin: boolean) {
    try {
      await api.patch(`/users/${id}`, {
        isAdmin: !isAdmin,
      });

      setUsers(
        users.map((user) => {
          if (user.id === id) {
            user.isAdmin = !user.isAdmin;
          }
          return user;
        })
      );
    } catch (error) {
      throw error;
    }
  }

  async function handleDeleteFeedback(id: string) {
    try {
      await api.delete(`/feedbacks/${id}`);

      setShowFeedbacks(
        showFeedbacks.filter((feedback) => {
          return feedback.id !== id;
        })
      );
    } catch (error) {
      throw error;
    }
  }

  return (
    <Backdrop>
      <AnimatePresence exitBeforeEnter>
        {screenshot && (
          <div
            className="w-screen h-screen absolute z-10 flex items-center justify-center bg-opacity-75 bg-black"
            onClick={() => setScreenshot("")}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute z-10 h-almost-fuller border-brand-300 border-2 rounded-xl cursor-pointer flex items-center justify-center bg-zinc-900"
            >
              <img
                src={screenshot}
                alt="screenshot"
                className="h-almost-full rounded-xl"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-4/5 md:w-3/4 h-3/4 absolute dark:bg-zinc-900 bg-white p-6 rounded-lg flex flex-col items-center justify-betwee transition-colors"
      >
        <div className="flex w-full justify-between items-center mb-4">
          {colorTheme === "light" ? (
            <Sun
              size={24}
              className="cursor-pointer text-neutral-400"
              onClick={handleDarkModeToggle}
            />
          ) : (
            <MoonStars
              size={24}
              className="cursor-pointer text-neutral-400"
              onClick={handleDarkModeToggle}
            />
          )}
          <h1 className="text-zinc-800 dark:text-zinc-100">
            {userData.isAdmin ? "Painel de Administrador" : "Seus feedbacks"}
          </h1>
          <X
            weight="bold"
            className="w-4 h-4 cursor-pointer text-neutral-400"
            onClick={() => setModal(false)}
          />
        </div>
        {userData.isAdmin && (
          <div className="mb-4 flex w-full justify-between">
            <select
              onChange={(e) => handleSelect(e)}
              className="text-zinc-800 rounded-md bg-white dark:bg-zinc-800 dark:text-zinc-100"
            >
              <option value="" disabled selected>
                Selecione um tipo de feedback
              </option>
              <option value="ALL">Todos</option>
              <option value="BUG">Bug</option>
              <option value="IDEA">Ideia</option>
              <option value="OTHER">Outro</option>
            </select>
            <button
              onClick={handleGetUsers}
              className="p-2 w-1/5 mt-4 bg-brand-500 rounded-md border-transparent flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
            >
              Ver usuários
            </button>
          </div>
        )}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin">
          {users.length > 0 ? (
            <table className="mt-2 w-full text-sm text-left text-zinc-800 dark:text-zinc-200">
              <thead className="text-xs uppercase bg-brand-500 text-zinc-100 text-center">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nome
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Administrador
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white border-b dark:bg-zinc-800 dark:border-zinc-700">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-all"
                  >
                    <td className="px-6 py-3 text-center">{user.name}</td>
                    <td className="px-6 py-3 text-center">{user.email}</td>
                    <td className="px-6 py-5 flex justify-center items-center">
                      {user.isAdmin ? (
                        <ThumbsUp
                          size={20}
                          onClick={() => handleUserPrivilege(user.id, true)}
                          className="cursor-pointer text-green-500"
                          weight="bold"
                        />
                      ) : (
                        <ThumbsDown
                          size={20}
                          onClick={() => handleUserPrivilege(user.id, false)}
                          className="cursor-pointer text-red-500"
                          weight="bold"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <>
              {showFeedbacks.length > 0 ? (
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
                    {showFeedbacks.map((feedback) => (
                      <tr
                        key={feedback.id}
                        className="border-b hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-all"
                      >
                        <td className="text-center px-6 py-3">
                          {feedback.type}
                        </td>
                        <td className="text-center px-6 py-3">
                          {feedback.comment}
                        </td>
                        <td className="px-6 py-3 text-center">
                          {feedback.screenshot ? (
                            <div
                              className="flex justify-center items-center cursor-pointer"
                              onClick={() =>
                                showScreenshot(feedback.screenshot)
                              }
                            >
                              <img
                                src={feedback.screenshot}
                                alt="screenshot"
                                className="hover:opacity-50 opacity-75 w-1/2 max-h-20 transition-all"
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
                        {!userData.isAdmin ? (
                          <td className="px-6 py-3 flex justify-center items-center">
                            {feedback.wasReviewed === true ? (
                              <Checks size={24} color="#8257e6" />
                            ) : (
                              <Clock size={24} />
                            )}
                          </td>
                        ) : (
                          <td className="px-6 py-3 flex justify-center items-center flex-col">
                            {feedback.wasReviewed === true ? (
                              <ThumbsUp
                                size={24}
                                weight="fill"
                                color="#8257e6"
                                className="cursor-pointer"
                              />
                            ) : (
                              <ThumbsUp
                                size={24}
                                className="cursor-pointer"
                                color="#8257e6"
                                onClick={() => handleWasReviewed(feedback.id)}
                              />
                            )}
                            <Trash
                              size={24}
                              className="cursor-pointer text-red-500 mt-4"
                              onClick={() => handleDeleteFeedback(feedback.id)}
                            />
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <h1 className="text-zinc-800 dark:text-zinc-100 text-center">
                  {userData.isAdmin
                    ? "Nenhum feedback encontrado"
                    : "Você ainda não deixou nenhum feedback :/"}
                </h1>
              )}
            </>
          )}
        </div>
        <div className="w-full flex justify-center">
          <button
            className="p-2 w-1/2 mt-4 bg-brand-500 rounded-md border-transparent flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
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
