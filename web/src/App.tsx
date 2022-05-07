import Warning from "./components/Warning";
import { Widget } from "./components/Widget";

export function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Warning />
      <Widget />
    </div>
  );
}
