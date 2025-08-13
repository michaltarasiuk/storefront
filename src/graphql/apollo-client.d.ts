import "@apollo/client";

declare module "@apollo/client" {
  interface DataMasking {
    mode: "preserveTypes";
  }
}
