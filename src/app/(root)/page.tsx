import { redirect } from "next/navigation";

import { DEFAULT_LOCALE } from "@/i18n/locales";

export default function Page() {
  // Next 的 redirect 默认 307。若必须 302，可在后续增加 middleware 控制 status。
  redirect(`/${DEFAULT_LOCALE}`);
}

