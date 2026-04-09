import { newsPosts } from "./data";
import { NewsCard } from "./NewsCard";
import Image from "next/image";

export function NewsListPage() {
  return (
    <>
      {/* 结构来自 public/aivent/news.html（仅移植主体 section） */}
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
        <div className="abs w-80 bottom-10 z-2 w-100">
          <div className="container">
            <div className="row align-items-center justify-content-between gx-5">
              <div className="col-lg-6">
                <div className="relative wow mask-right">
                  <div className="text-start">
                    <h1 className="fs-96 text-uppercase fs-sm-10vw mb-0 lh-1">
                      News
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

      <section>
        <div className="container">
          <div className="row g-4">
            {newsPosts.map((p) => (
              <NewsCard key={p.slug} post={p} />
            ))}

            {/* pagination begin */}
            <div className="col-lg-12 pt-4 text-center">
              <div className="d-inline-block">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">
                          <i className="fa fa-chevron-left"></i>
                        </span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item active" aria-current="page">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">
                          <i className="fa fa-chevron-right"></i>
                        </span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            {/* pagination end */}
          </div>
        </div>
      </section>
    </>
  );
}
