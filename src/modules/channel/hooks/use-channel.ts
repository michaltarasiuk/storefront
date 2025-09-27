import {useParams} from "next/navigation";

export function useChannel() {
  return useParams<{channel: string}>().channel;
}
