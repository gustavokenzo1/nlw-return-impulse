import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Landing from "./components/Landing";
import Modal from "./components/Modal";
import { FeedGet } from "./FeedGet";

export function App() {
  return (
    <>
      <Landing />
      <FeedGet />
    </>
  );
}
