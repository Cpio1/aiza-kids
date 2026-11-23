/** Плавный переход к началу секции с учётом фиксированной шапки (scroll-margin-top). */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  if (id === "home") history.replaceState(null, "", window.location.pathname);
  else history.replaceState(null, "", `#${id}`);
}
