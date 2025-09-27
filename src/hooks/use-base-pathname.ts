import {useLocale} from "@/i18n/hooks/use-locale";
import {useChannel} from "@/modules/channel/hooks/use-channel";

export function useBasePathname() {
  return [useLocale(), useChannel()] as const;
}
