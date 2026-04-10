import type { ReactNode } from "react";
import { AiventBodyClass } from "../(site)/AiventBodyClass";
import { AiventScriptsServer } from "../(site)/AiventScriptsServer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AiventBodyClass />
      {children}
      <AiventScriptsServer />
    </>
  );
}
