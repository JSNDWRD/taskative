export default function Footer() {
  return (
    <footer className="w-full py-4 px-6 bg-background border-t border-border text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} Taskative. All rights reserved.
    </footer>
  );
}
