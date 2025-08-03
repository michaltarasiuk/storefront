export function joinPathSegments(...segments: string[]) {
  function trimLeadingSlash(s: string) {
    return s.startsWith("/") ? s.slice(1) : s;
  }
  return "/" + segments.map(trimLeadingSlash).join("/");
}

export function splitPathSegments(pathname: string) {
  return pathname.split("/").filter((segment) => segment.length > 0);
}
