import type { GlobalConfig } from 'payload'

import { PAGE_KEY_OPTIONS } from '@/lib/routes'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Globals',
  },
  fields: [
    {
      name: 'brandName',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'brandTagline',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'navigation',
      type: 'array',
      localized: true,
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'pageKey',
          type: 'select',
          required: true,
          options: PAGE_KEY_OPTIONS,
        },
      ],
    },
    {
      name: 'proposalButtonLabel',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'mobileLanguageLabel',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'menuAriaLabel',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'Toggle menu',
    },
  ],
}