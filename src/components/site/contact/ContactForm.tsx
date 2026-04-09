"use client";

import React from "react";

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
    >
      <div className="row g-4">
        <div className="col-lg-12">
          <h3>Get In Touch</h3>
          <p>
            Have a question, suggestion, or just want to say hi? Fill out the form
            below and we’ll get back to you soon.
          </p>

          <div className="field-set">
            <input
              type="text"
              name="name"
              id="name"
              className="form-underline"
              placeholder="Your Name"
              required
              value={values.name}
              onChange={(e) => setValues((p) => ({ ...p, name: e.currentTarget.value }))}
            />
          </div>

          <div className="field-set">
            <input
              type="text"
              name="email"
              id="email"
              className="form-underline"
              placeholder="Your Email"
              required
              value={values.email}
              onChange={(e) => setValues((p) => ({ ...p, email: e.currentTarget.value }))}
            />
          </div>

          <div className="field-set">
            <input
              type="text"
              name="phone"
              id="phone"
              className="form-underline"
              placeholder="Your Phone"
              required
              value={values.phone}
              onChange={(e) => setValues((p) => ({ ...p, phone: e.currentTarget.value }))}
            />
          </div>

          <div className="field-set">
            <textarea
              name="message"
              id="message"
              className="form-underline h-100px"
              placeholder="Your Message"
              required
              value={values.message}
              onChange={(e) => setValues((p) => ({ ...p, message: e.currentTarget.value }))}
            ></textarea>
          </div>
        </div>
      </div>

      {/* reCAPTCHA 占位块：保留 g-recaptcha class */}
      <div className="g-recaptcha" data-sitekey="demo-site-key" aria-hidden="true"></div>
      <div id="submit" className="mt-3">
        <input
          type="submit"
          id="send_message"
          value={submitting ? "Sending..." : "Send Message"}
          className="btn-main"
          disabled={submitting}
        />
      </div>

      <div
        id="success_message"
        className="success"
        style={{ display: status.type === "ok" ? "block" : "none" }}
      >
        {status.type === "ok" ? status.message : null}
      </div>
      <div
        id="error_message"
        className="error"
        style={{ display: status.type === "error" ? "block" : "none" }}
      >
        {status.type === "error" ? status.message : null}
      </div>
    </form>
  );
}
