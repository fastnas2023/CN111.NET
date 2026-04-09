"use client";

import * as React from "react";

import { useReducedMotion } from "../useReducedMotion";

export type SmoothAnchorProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick"
> & {
  href: string;
  /**
   * 顶部偏移（px），用于固定导航栏场景。
   */
  offset?: number;
  /**
   * 将 onClick 与内部 smooth-scroll 逻辑组合。
   */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  /**
   * 为了兼容 Next <Link>，可以通过 asChild 将行为注入到子元素（例如 Link）。
   *
   * 用法：
   * <SmoothAnchor href="#pricing" asChild>
   *   <Link href="#pricing">Pricing</Link>
   * </SmoothAnchor>
   */
  asChild?: boolean;
  children: React.ReactNode;
};

function isModifiedEvent(event: React.MouseEvent) {
  return (
    event.metaKey ||
    event.altKey ||
    event.ctrlKey ||
    event.shiftKey ||
    // Only left click.
    event.button !== 0
  );
}

function getUrl(href: string): URL | null {
  if (typeof window === "undefined") return null;
  try {
    return new URL(href, window.location.href);
  } catch {
    return null;
  }
}

function scrollToHash(hash: string, offset: number, behavior: ScrollBehavior): boolean {
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  const id = decodeURIComponent(raw);
  if (!id) return false;

  const el =
    document.getElementById(id) ??
    document.querySelector<HTMLElement>(`[name="${CSS.escape(id)}"]`);
  if (!el) return false;

  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior });
  return true;
}

export function SmoothAnchor({
  href,
  offset = 0,
  onClick,
  asChild = false,
  children,
  target,
  ...rest
}: SmoothAnchorProps) {
  const reducedMotion = useReducedMotion();

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;

      if (target && target !== "_self") return;
      if (isModifiedEvent(event)) return;

      const url = getUrl(href);
      if (!url?.hash) return;

      // Only smooth-scroll for same-page anchors.
      const current = getUrl(window.location.href);
      if (!current) return;
      if (url.pathname !== current.pathname || url.search !== current.search) return;

      const behavior: ScrollBehavior = reducedMotion ? "auto" : "smooth";
      const ok = scrollToHash(url.hash, offset, behavior);
      if (!ok) return;

      event.preventDefault();
      window.history.pushState(null, "", url.hash);
    },
    [href, offset, onClick, reducedMotion, target],
  );

  if (asChild) {
    if (!React.isValidElement(children)) {
      return null;
    }

    type AsChildAnchorProps = {
      href?: string;
      target?: string;
      onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    } & Record<string, unknown>;

    const child = children as React.ReactElement<AsChildAnchorProps>;
    const childProps = child.props;
    const mergedOnClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
      // 如果子元素本身也有 onClick（例如 Next Link 透传到 <a>），优先执行。
      childProps.onClick?.(e);
      // 再执行 SmoothAnchor 行为。
      handleClick(e);
    };

    return React.cloneElement(child, {
      ...rest,
      href,
      target,
      onClick: mergedOnClick,
    } satisfies Partial<AsChildAnchorProps>);
  }

  return (
    <a href={href} target={target} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
