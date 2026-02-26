interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function CTAButton({ href, children, onClick }: CTAButtonProps) {
  return (
    <a href={href} className="cta-btn" onClick={onClick}>
      {children}
      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M5 12h14m-6-6l6 6-6 6" />
      </svg>
    </a>
  );
}
