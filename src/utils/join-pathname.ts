export function joinPathname(...segments: string[]) {
  function trimLeadingSlash(s: string) {
    return s.startsWith("/") ? s.slice(1) : s;
  }
  return "/" + segments.map(trimLeadingSlash).join("/");
}
