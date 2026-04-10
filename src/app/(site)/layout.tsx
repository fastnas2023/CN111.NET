import { AiventScriptsServer } from "./AiventScriptsServer";
import { AiventBodyClass } from "./AiventBodyClass";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AiventBodyClass />
      {children}
      <AiventScriptsServer />
    </>
  );
}
