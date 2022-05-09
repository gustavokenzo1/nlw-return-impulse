import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import Warning from "./components/Warning";
import { Widget } from "./components/Widget";
import AuthProvider, { useAuth } from "./context/auth";

export function App() {
  const [modal, setModal] = useState(false);

  return (
    <AuthProvider>
      <div className="flex justify-center items-center h-screen">
        <Warning />
        <AnimatePresence exitBeforeEnter>
          {modal && <Modal setModal={setModal} modal={modal} />}
        </AnimatePresence>

        <Widget setModal={setModal} modal={modal} />
      </div>
    </AuthProvider>
  );
}
