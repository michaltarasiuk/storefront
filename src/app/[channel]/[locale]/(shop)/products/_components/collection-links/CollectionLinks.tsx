import {getBasePath} from '@/i18n/context/get-base-path';
import {FormattedMessage} from '@/i18n/react-intl';
import {localeToLangCode} from '@/i18n/tools/locale-to-lang-code';

import type {ProductsPageSearchParams} from '../../types';
import {NavLinks} from '../nav-links/NavLinks';
import {NavLinksTitle} from '../nav-links/NavLinksTitle';
import {getNavCollections} from './tools/get-nav-collections/get-nav-collections';

interface Props {
  readonly searchParams: ProductsPageSearchParams;
}

export async function CollectionLinks({searchParams}: Props) {
  const [channel, locale] = getBasePath();

  const navCollections = await getNavCollections({
    channel,
    languageCode: localeToLangCode(locale),
  });

  return (
    <>
      <NavLinksTitle
        title={<FormattedMessage defaultMessage="Collections" id="ulh3kf" />}
      />
      <NavLinks
        items={navCollections}
        searchParamName="collection"
        searchParams={searchParams}
      />
    </>
  );
}
