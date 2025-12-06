import "@/styles/globals.css";

import type {Preview} from "@storybook/nextjs-vite";

import {DefaultLocale} from "#app/i18n/consts";
import {IntlProvider} from "#app/i18n/react-intl";
import {DefaultChannel} from "#app/modules/channel/consts";

const preview: Preview = {
  decorators: [
    (Story) => (
      <IntlProvider locale={DefaultLocale}>
        <Story />
      </IntlProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: [
          ["locale", DefaultLocale],
          ["channel", DefaultChannel],
        ],
      },
    },
  },
};
export default preview;
