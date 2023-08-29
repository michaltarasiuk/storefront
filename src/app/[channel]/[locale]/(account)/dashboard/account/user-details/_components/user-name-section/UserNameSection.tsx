import {getLocale} from '@/i18n/context/get-locale';
import {getIntl} from '@/i18n/get-intl';

import {Section} from '../Section';
import {UserNameForm} from './UserNameForm';

export async function UserNameSection() {
  const intl = await getIntl(getLocale());

  return (
    <Section
      name={intl.formatMessage({
        defaultMessage: 'User name',
        id: 'o7nzDs',
      })}>
      <UserNameForm />
    </Section>
  );
}
