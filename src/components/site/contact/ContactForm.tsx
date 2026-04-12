"use client";

import React from "react";
import { Button, Input, Textarea } from "banli-ui";

type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export function ContactForm() {
  const [values, setValues] = React.useState<ContactFormValues>({
    name: "",
    email: "",
    phone: "",
    message: "",
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

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok?: boolean };

      if (!res.ok || !data.ok) {
        throw new Error("api_not_ok");
      }

      setStatus({
        type: "ok",
        message:
          "Your message has been sent successfully. Refresh this page if you want to send more messages.",
      });
      setValues({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus({ type: "error", message: "Sorry there was an error sending your form." });
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
        <h3 className="text-2xl text-white font-semibold mb-4">Get In Touch</h3>
        <p className="text-white/70 mb-6">
          Have a question, suggestion, or just want to say hi? Fill out the form
          below and we’ll get back to you soon.
        </p>

        <div className="flex flex-col gap-4">
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Your Name"
            required
            value={values.name}
            onChange={(e) => setValues((p) => ({ ...p, name: e.currentTarget.value }))}
            className="bg-transparent border-t-0 border-x-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white text-white"
          />

          <Input
            type="text"
            name="email"
            id="email"
            placeholder="Your Email"
            required
            value={values.email}
            onChange={(e) => setValues((p) => ({ ...p, email: e.currentTarget.value }))}
            className="bg-transparent border-t-0 border-x-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white text-white"
          />

          <Input
            type="text"
            name="phone"
            id="phone"
            placeholder="Your Phone"
            required
            value={values.phone}
            onChange={(e) => setValues((p) => ({ ...p, phone: e.currentTarget.value }))}
            className="bg-transparent border-t-0 border-x-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white text-white"
          />

          <Textarea
            name="message"
            id="message"
            placeholder="Your Message"
            required
            value={values.message}
            onChange={(e) => setValues((p) => ({ ...p, message: e.currentTarget.value }))}
            className="bg-transparent border-t-0 border-x-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white text-white min-h-[100px] resize-none"
          />
        </div>
      </div>

      <div className="mt-2">
        <Button
          type="submit"
          disabled={submitting}
          variant="primary"
        >
          {submitting ? "Sending..." : "SEND MESSAGE"}
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
