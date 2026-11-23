/**
 * Две независимые версии раздела. Скрытая версия получает display:none,
 * поэтому её элементы не попадают в Tab-навигацию и дерево доступности.
 * Desktop — от 1024px, Mobile (и планшет 768–1023px) — до 1023px.
 */
export function Responsive({ desktop, mobile }: { desktop: React.ReactNode; mobile: React.ReactNode }) {
  return (
    <>
      <div className="hidden lg:block">{desktop}</div>
      <div className="lg:hidden">{mobile}</div>
    </>
  );
}
