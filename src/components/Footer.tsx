const Footer = () => (
  <footer className="border-t border-border py-8 px-4">
    <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Yogesh Vadivel. All rights reserved.
      </p>
      <p className="text-xs text-muted-foreground font-mono">
        Built with React & Tailwind
      </p>
    </div>
  </footer>
);

export default Footer;
