"use client";

import React from "react";
import {
  Button,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "banli-ui";
import { useI18n } from "@/i18n/client";

type ContactFormValues = {
  projectType: string;
  goal: string;
  budgetRange: string;
  timeline: string;
  contactEmail: string;
  contactPhone: string;
  additionalNotes: string;
};

export function ContactForm() {
  const { t } = useI18n();

  const [values, setValues] = React.useState<ContactFormValues>({
    projectType: "",
    goal: "",
    budgetRange: "",
    timeline: "",
    contactEmail: "",
    contactPhone: "",
    additionalNotes: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<
    | { type: "idle" }
    | { type: "ok"; message: string }
    | { type: "error"; message: string }
  >({ type: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ type: "idle" });

    if (!values.contactEmail.trim() && !values.contactPhone.trim()) {
      setStatus({ type: "error", message: t("contact.form.validation.contactRequired") });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok?: boolean; data?: ContactFormValues };

      if (!res.ok || !data.ok) {
        throw new Error("api_not_ok");
      }

      setStatus({
        type: "ok",
        message: t("contact.form.status.ok"),
      });
      setValues({
        projectType: "",
        goal: "",
        budgetRange: "",
        timeline: "",
        contactEmail: "",
        contactPhone: "",
        additionalNotes: "",
      });
    } catch {
      setStatus({ type: "error", message: t("contact.form.status.error") });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      name="contactForm"
      id="contact_form"
      method="post"
      action="#"
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-6"
    >
      <div>
        <h3 className="text-2xl text-white font-semibold mb-4">
          {t("contact.form.title")}
        </h3>
        <p className="text-white/70 mb-6">
          {t("contact.form.lede")}
        </p>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="projectType" className="text-sm text-white/80">
              {t("contact.form.fields.projectType.label")}
            </label>
            <SelectRoot
              value={values.projectType || undefined}
              onValueChange={(v) => setValues((p) => ({ ...p, projectType: v }))}
              className="w-full"
            >
              <SelectTrigger
                id="projectType"
                aria-label={t("contact.form.fields.projectType.label")}
                className="w-full bg-transparent border-t-0 border-x-0 border-b border-white/20 rounded-none px-0 text-white hover:bg-transparent focus-visible:ring-0"
              >
                <SelectValue placeholder={t("contact.form.fields.projectType.placeholder")} />
                <span aria-hidden="true" className="text-white/60">
                  ▾
                </span>
              </SelectTrigger>
              <SelectContent aria-label={t("contact.form.fields.projectType.label")}>
                <SelectItem value="web">
                  {t("contact.form.fields.projectType.options.web")}
                </SelectItem>
                <SelectItem value="seo">
                  {t("contact.form.fields.projectType.options.seo")}
                </SelectItem>
                <SelectItem value="aiMvp">
                  {t("contact.form.fields.projectType.options.aiMvp")}
                </SelectItem>
                <SelectItem value="aiAutomation">
                  {t("contact.form.fields.projectType.options.aiAutomation")}
                </SelectItem>
                <SelectItem value="other">
                  {t("contact.form.fields.projectType.options.other")}
                </SelectItem>
              </SelectContent>
            </SelectRoot>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="goal" className="text-sm text-white/80">
              {t("contact.form.fields.goal.label")}
            </label>
            <Textarea
              name="goal"
              id="goal"
              placeholder={t("contact.form.fields.goal.placeholder")}
              required
              value={values.goal}
              onChange={(e) => setValues((p) => ({ ...p, goal: e.currentTarget.value }))}
              className="bg-transparent border-t-0 border-x-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white text-white min-h-[90px] resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="budgetRange" className="text-sm text-white/80">
              {t("contact.form.fields.budgetRange.label")}
            </label>
            <SelectRoot
              value={values.budgetRange || undefined}
              onValueChange={(v) => setValues((p) => ({ ...p, budgetRange: v }))}
              className="w-full"
            >
              <SelectTrigger
                id="budgetRange"
                aria-label={t("contact.form.fields.budgetRange.label")}
                className="w-full bg-transparent border-t-0 border-x-0 border-b border-white/20 rounded-none px-0 text-white hover:bg-transparent focus-visible:ring-0"
              >
                <SelectValue placeholder={t("contact.form.fields.budgetRange.placeholder")} />
                <span aria-hidden="true" className="text-white/60">
                  ▾
                </span>
              </SelectTrigger>
              <SelectContent aria-label={t("contact.form.fields.budgetRange.label")}>
                <SelectItem value="lt3">{t("contact.form.fields.budgetRange.options.lt3")}</SelectItem>
                <SelectItem value="3to6">{t("contact.form.fields.budgetRange.options.3to6")}</SelectItem>
                <SelectItem value="6to12">{t("contact.form.fields.budgetRange.options.6to12")}</SelectItem>
                <SelectItem value="12to30">{t("contact.form.fields.budgetRange.options.12to30")}</SelectItem>
                <SelectItem value="gt30">{t("contact.form.fields.budgetRange.options.gt30")}</SelectItem>
                <SelectItem value="unknown">{t("contact.form.fields.budgetRange.options.unknown")}</SelectItem>
              </SelectContent>
            </SelectRoot>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="timeline" className="text-sm text-white/80">
              {t("contact.form.fields.timeline.label")}
            </label>
            <SelectRoot
              value={values.timeline || undefined}
              onValueChange={(v) => setValues((p) => ({ ...p, timeline: v }))}
              className="w-full"
            >
              <SelectTrigger
                id="timeline"
                aria-label={t("contact.form.fields.timeline.label")}
                className="w-full bg-transparent border-t-0 border-x-0 border-b border-white/20 rounded-none px-0 text-white hover:bg-transparent focus-visible:ring-0"
              >
                <SelectValue placeholder={t("contact.form.fields.timeline.placeholder")} />
                <span aria-hidden="true" className="text-white/60">
                  ▾
                </span>
              </SelectTrigger>
              <SelectContent aria-label={t("contact.form.fields.timeline.label")}>
                <SelectItem value="1to2w">{t("contact.form.fields.timeline.options.1to2w")}</SelectItem>
                <SelectItem value="3to4w">{t("contact.form.fields.timeline.options.3to4w")}</SelectItem>
                <SelectItem value="4to8w">{t("contact.form.fields.timeline.options.4to8w")}</SelectItem>
                <SelectItem value="2to3m">{t("contact.form.fields.timeline.options.2to3m")}</SelectItem>
                <SelectItem value="gt3m">{t("contact.form.fields.timeline.options.gt3m")}</SelectItem>
                <SelectItem value="unknown">{t("contact.form.fields.timeline.options.unknown")}</SelectItem>
              </SelectContent>
            </SelectRoot>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contactEmail" className="text-sm text-white/80">
              {t("contact.form.fields.contactEmail.label")}
            </label>
            <Input
              type="email"
              name="contactEmail"
              id="contactEmail"
              placeholder={t("contact.form.fields.contactEmail.placeholder")}
              value={values.contactEmail}
              onChange={(e) => setValues((p) => ({ ...p, contactEmail: e.currentTarget.value }))}
              className="bg-transparent border-t-0 border-x-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white text-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contactPhone" className="text-sm text-white/80">
              {t("contact.form.fields.contactPhone.label")}
            </label>
            <Input
              type="tel"
              name="contactPhone"
              id="contactPhone"
              placeholder={t("contact.form.fields.contactPhone.placeholder")}
              value={values.contactPhone}
              onChange={(e) => setValues((p) => ({ ...p, contactPhone: e.currentTarget.value }))}
              className="bg-transparent border-t-0 border-x-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white text-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="additionalNotes" className="text-sm text-white/80">
              {t("contact.form.fields.additionalNotes.label")}
            </label>
            <Textarea
              name="additionalNotes"
              id="additionalNotes"
              placeholder={t("contact.form.fields.additionalNotes.placeholder")}
              value={values.additionalNotes}
              onChange={(e) =>
                setValues((p) => ({ ...p, additionalNotes: e.currentTarget.value }))
              }
              className="bg-transparent border-t-0 border-x-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white text-white min-h-[90px] resize-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-2">
        <Button
          type="submit"
          disabled={submitting}
          variant="primary"
        >
          {submitting ? t("contact.form.submit.submitting") : t("contact.form.submit.default")}
        </Button>
      </div>

      {status.type === "ok" && (
        <div className="text-green-500 text-sm mt-2">{status.message}</div>
      )}
      {status.type === "error" && (
        <div className="text-red-500 text-sm mt-2">{status.message}</div>
      )}
    </form>
  );
}
