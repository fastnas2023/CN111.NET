import { ContactForm } from "./ContactForm";
import Image from "next/image";

export function ContactPage() {
  return (
    <>
      {/* 结构来自 public/aivent/contact.html（仅移植主体 section） */}
      <section
        id="section-hero"
        className="section-dark no-top no-bottom text-light jarallax relative mh-500 jarallax"
      >
        <Image
          src="/aivent/images/background/4.webp"
          alt=""
          fill
          priority
          className="jarallax-img"
          style={{ objectFit: "cover" }}
        />
        <div className="gradient-edge-bottom h-50"></div>
        <div className="sw-overlay op-5"></div>
        <div className="abs w-80 bottom-10 z-2 w-100">
          <div className="container">
            <div className="row align-items-center justify-content-between gx-5">
              <div className="col-lg-6">
                <div className="relative wow mask-right">
                  <div className="text-start">
                    <h1 className="fs-96 text-uppercase fs-sm-10vw mb-0 lh-1">
                      Contact
                    </h1>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 wow fadeInRight" data-wow-delay=".3s">
                <p className="mb-0">
                  Join thought leaders, developers, researchers, and founders as we
                  explore how artificial intelligence is reshaping industries,
                  creativity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark relative">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6">
              <div className="subtitle">Get In Touch</div>
              <h2 className="wow fadeInUp">We’re here to answer your questions.</h2>

              <p className="col-lg-8">
                Have a question, suggestion, or just want to say hi? We’re here and
                happy to hear from you!
              </p>

              <div className="spacer-single"></div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="relative mb-4">
                    <i className="abs fs-28 p-3 bg-color text-light rounded-1 icofont-location-pin"></i>
                    <div className="ms-80px">
                      <h4 className="mb-0">Event Location</h4>
                      121 AI Blvd, San Francisco, BCA 94107
                    </div>
                  </div>

                  <div className="relative mb-4">
                    <i className="abs fs-28 p-3 bg-color text-light rounded-1 icofont-envelope"></i>
                    <div className="ms-80px">
                      <h4 className="mb-0">Send a Message</h4>
                      contact@aivent-support.com
                    </div>
                  </div>

                  <div className="relative mb-4">
                    <i className="abs fs-28 p-3 bg-color text-light rounded-1 icofont-phone"></i>
                    <div className="ms-80px">
                      <h4 className="mb-0">Call Us Directly</h4>
                      +1 123 456 789
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="bg-dark-2 rounded-1 p-60 relative">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
