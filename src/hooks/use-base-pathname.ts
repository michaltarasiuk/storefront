import {useLocale} from "#app/i18n/hooks/use-locale";
import {useChannel} from "#app/modules/channel/hooks/use-channel";

export function usePathnameParams() {
  return [useLocale(), useChannel()] as const;
}
