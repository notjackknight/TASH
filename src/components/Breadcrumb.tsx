import { Link } from 'react-router';

type Crumb = { label: string; to?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-anchor/30">/</span>}
            {item.to ? (
              <Link to={item.to} className="text-anchor/50 hover:text-action transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-anchor">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
