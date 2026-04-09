import type { NewsPost } from "./data";

import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";

function getDayAndMonth(dateISO: string) {
  const d = new Date(dateISO);
  const day = d.getDate().toString().padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "short" });
  return { day, month };
}

export function NewsCard({ post }: { post: NewsPost }) {
  const { day, month } = getDayAndMonth(post.dateISO);
  return (
    <div className="col-lg-4">
      <Link
        href={routes.newsSingle}
        className="d-block hover relative rounded-20 overflow-hidden text-light"
      >
        <div className="abs z-2 bg-color rounded-2 text-white p-3 pb-2 m-4 text-center fw-600">
          <h4 className="fs-36 mb-0 lh-1">{day}</h4>
          <span>{month}</span>
        </div>

        <Image
          src={post.imageSrc}
          alt=""
          width={960}
          height={720}
          className="w-100 hover-scale-1-1"
          style={{ width: "100%", height: "auto" }}
        />

        <div className="absolute start-0 bottom-0 p-4 z-2">
          <h4>{post.title}</h4>
        </div>

        <div className="gradient-edge-bottom h-70"></div>
      </Link>
    </div>
  );
}
