import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Modal from "./components/Modal";
import { Widget } from "./components/Widget";
import AuthProvider from "./context/auth";

export function FeedGet() {
  const [modal, setModal] = useState(false);

  return (
    <AuthProvider>
      <div className="flex justify-center items-center h-screen">
        <AnimatePresence exitBeforeEnter>
          {modal && <Modal setModal={setModal} modal={modal} />}
        </AnimatePresence>

        <Widget setModal={setModal} modal={modal} />
      </div>
    </AuthProvider>
  );
}
