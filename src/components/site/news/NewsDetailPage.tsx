import Image from "next/image";
import Link from "next/link";
import { getNewsCommentsBySlug } from "./data";
import { CommentThread } from "./CommentThread";
import { routes } from "@/lib/routes";

export function NewsDetailPage({ slug }: { slug?: string }) {
  // 结构来自 public/aivent/news-single.html（仅移植主体 section）
  const comments = getNewsCommentsBySlug(slug);
  return (
    <>
      <section
        id="section-hero"
        className="section-dark no-top no-bottom text-light jarallax relative mh-500 jarallax"
      >
        <Image
          src="/aivent/images/background/3.webp"
          alt=""
          fill
          priority
          className="jarallax-img"
          style={{ objectFit: "cover" }}
        />
        <div className="gradient-edge-bottom h-50"></div>
        <div className="sw-overlay op-5"></div>
        <div className="abs bottom-10 z-2 w-100">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-lg-8">
                <h1 className="text-start fs-48 fs-sm-10vw wow fadeIn" data-wow-delay=".6s">
                  Global Design Minds to Converge at 2025 Design Expo Conference
                </h1>
              </div>

              <div className="col-lg-2">
                <div className="relative text-lg-end">
                  <div
                    className="d-inline-block z-2 bg-color rounded-1 text-white p-4 text-center fw-600 wow fadeIn"
                    data-wow-delay="1s"
                  >
                    <h4 className="fs-60 mb-0 lh-1">28</h4>
                    <span className="fs-20 fw-60">May</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-lg-10">
              <div className="blog-read">
                <div className="post-text">
                  <Image
                    src="/aivent/images/misc/sd1.webp"
                    alt=""
                    width={1200}
                    height={800}
                    className="w-100 rounded-1 mb-4"
                    style={{ width: "100%", height: "auto" }}
                  />

                  <p>
                    The 2025 Design Expo Conference is set to become the epicenter of
                    global design innovation, as top creatives, technologists, and
                    thought leaders gather to explore the future of design across
                    industries. Scheduled for October 1–5, 2025 in San Francisco, the
                    event promises to showcase cutting-edge design practices,
                    technological integrations, and visionary ideas that are shaping
                    the next generation of user experience, product development, and
                    visual storytelling.
                  </p>

                  <p>
                    Bringing together architects, UX/UI designers, product innovators,
                    AI enthusiasts, and creative directors from over 50 countries, the
                    conference serves as a collaborative platform to exchange
                    knowledge, trends, and tools transforming the design ecosystem.
                    Key themes for this year include AI-driven creativity,
                    sustainability in design, spatial computing, and inclusive design
                    methodologies.
                  </p>

                  <h5>Highlights of the 2025 Design Expo include:</h5>

                  <ul className="ul-check">
                    <li>Keynote addresses by global design icons and industry disruptors</li>
                    <li>Hands-on workshops covering tools like Figma, Adobe Firefly, Midjourney, and more</li>
                    <li>Panel discussions on the ethical impact of generative AI in design</li>
                    <li>Startup design showcases and prototype exhibitions</li>
                    <li>Networking zones connecting talent with top design-led companies</li>
                  </ul>

                  <p>
                    In addition to in-person attendance, the event will feature a
                    hybrid format with virtual access to all keynotes and live panels,
                    allowing participants from around the world to engage and
                    collaborate.
                  </p>

                  <p>
                    Whether you&#39;re a seasoned professional or a rising designer, the
                    2025 Design Expo Conference is the ultimate opportunity to stay
                    ahead of the curve and shape what&#39;s next in the world of design.
                  </p>
                </div>
              </div>

              <div className="spacer-single"></div>

              <div id="blog-comment">
                <h4>Comments (5)</h4>

                <div className="spacer-half"></div>

                <CommentThread comments={comments} />

                <div className="spacer-single"></div>

                <div id="comment-form-wrapper">
                  <h4>Leave a Comment</h4>
                  <div className="comment_form_holder">
                    <form id="contact_form" name="form1" className="form-border" method="post" action="#">
                      <label>Name</label>
                      <input type="text" name="name" id="name" className="form-control mb-4" />

                      <label>
                        Email <span className="req">*</span>
                      </label>
                      <input type="text" name="email" id="email" className="form-control mb-4" />
                      <div id="error_email" className="error">
                        Please check your email
                      </div>

                      <label>
                        Message <span className="req">*</span>
                      </label>
                      <textarea cols={10} rows={10} name="message" id="message" className="form-control mb-4"></textarea>
                      <div id="error_message" className="error">
                        Please check your message
                      </div>
                      <div id="mail_success" className="success">
                        Thank you. Your message has been sent.
                      </div>
                      <div id="mail_failed" className="error">
                        Error, email not sent
                      </div>
                      <a className="btn-main fx-slide" href="#">
                        <span>Submit</span>
                      </a>
                    </form>
                  </div>
                </div>

                <div className="spacer-single"></div>
                <Link href={routes.news} className="btn-main fx-slide">
                  <span>Back to News</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
