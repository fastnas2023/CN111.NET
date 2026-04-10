import type { ReactNode } from "react";
import { AiventBodyClass } from "../[locale]/(site)/AiventBodyClass";
import { AiventScriptsServer } from "../[locale]/(site)/AiventScriptsServer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AiventBodyClass />
      {children}
      <AiventScriptsServer />
    </>
  );
}
