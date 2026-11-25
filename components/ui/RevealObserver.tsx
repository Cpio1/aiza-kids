"use client";

import { useEffect } from "react";

/** Плавное появление блоков с атрибутом data-reveal при прокрутке (включая добавленные позже). */
export function RevealObserver() {
  useEffect(() => {
    const show = (el: Element) => el.classList.add("is-in");
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach(show);
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            show(e.target);
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
    );
    const watch = (root: ParentNode) => root.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
    watch(document);
    const mo = new MutationObserver((muts) =>
      muts.forEach((m) =>
        m.addedNodes.forEach((n) => {
          if (!(n instanceof Element)) return;
          if (n.matches("[data-reveal]:not(.is-in)")) io.observe(n);
          watch(n);
        })
      )
    );
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
