/* Re-mounts on every navigation → gives each route a soft cross-fade in.
   Only opacity is animated here so it never becomes a containing block for
   the fixed-position page panels. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade-in">{children}</div>;
}
