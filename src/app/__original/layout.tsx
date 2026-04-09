import type { ReactNode } from "react";
import { AiventBodyClass } from "../(site)/AiventBodyClass";
import { AiventScripts } from "../(site)/AiventScripts";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AiventBodyClass />
      {children}
      <AiventScripts />
    </>
  );
}

