export function raise(...params: Parameters<ErrorConstructor>): never {
  throw new Error(...params);
}
