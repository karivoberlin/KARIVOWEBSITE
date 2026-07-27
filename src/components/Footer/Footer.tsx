export default function Footer() {
  return (
    <footer className="relative border-t border-black/[0.06] py-10">
      <div className="container-px relative z-10 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <span className="text-[1.05rem] font-semibold tracking-tight text-ink">Karivo</span>
        <div className="flex flex-col items-center gap-1 sm:items-end">
          <p className="text-sm text-muted">Premium Websites für Unternehmen, die online überzeugen wollen.</p>
          <a
            href="mailto:kontakt@karivo.website"
            className="text-sm text-muted transition-colors hover:text-ink"
          >
            kontakt@karivo.website
          </a>
        </div>
      </div>
    </footer>
  );
}
