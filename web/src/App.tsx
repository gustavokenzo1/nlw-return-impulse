import Warning from "./components/Warning";
import { Widget } from "./components/Widget";
import AuthProvider from "./context/auth";

export function App() {
  return (
    <AuthProvider>
      <div className="flex justify-center items-center h-screen">
        <Warning />
        <Widget />
      </div>
    </AuthProvider>
  );
}
