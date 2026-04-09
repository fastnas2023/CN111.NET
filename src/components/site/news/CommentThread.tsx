import type { NewsComment } from "./data";
import Image from "next/image";

function formatDate(dateISO: string) {
  const d = new Date(dateISO);
  // 模板里写死了 “2 days ago”，这里简单保持英文短格式
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function CommentThread({ comments }: { comments: NewsComment[] }) {
  if (comments.length === 0) return null;

  return <ol>{comments.map((c) => <CommentItem key={c.id} comment={c} />)}</ol>;
}

function CommentItem({ comment }: { comment: NewsComment }) {
  return (
    <li>
      <div className="avatar">
        <Image
          src={comment.avatarSrc ?? "/aivent/images/team/1.webp"}
          className="w-70px"
          alt=""
          width={70}
          height={70}
        />
      </div>

      <div className="comment-info">
        <span className="c_name text-light">{comment.author}</span>
        <span className="c_date id-color">{formatDate(comment.dateISO)}</span>
        <span className="c_reply">
          <a href="#">Reply</a>
        </span>
        <div className="clearfix"></div>
      </div>

      <div className="comment">{comment.message}</div>

      {comment.replies && comment.replies.length > 0 ? (
        <ol>
          {comment.replies.map((r) => (
            <CommentItem key={r.id} comment={r} />
          ))}
        </ol>
      ) : null}
    </li>
  );
}
