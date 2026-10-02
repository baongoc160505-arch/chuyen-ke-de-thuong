import { useEffect, useState } from "react";
import { Lamp } from "lucide-react";

export const themeInitScript = `(function(){try{if(localStorage.getItem('ttdt-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`;

export function ThemeToggle({ withLabel = false }: { withLabel?: boolean }) {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("ttdt-theme", next ? "dark" : "light"); } catch { /* ignore */ }
  };
  const label = dark ? "Bật đèn" : "Tắt đèn";
  return (
    <button type="button" onClick={toggle} className={withLabel ? "theme-toggle theme-toggle-wide" : "theme-toggle"} aria-label={label} title={label} aria-pressed={dark}>
      <Lamp />
      {withLabel && <span>{label}</span>}
    </button>
  );
}
