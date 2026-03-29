import type { Field, GlobalConfig } from 'payload'

import { PAGE_KEY_OPTIONS } from '@/lib/routes'

const linkFields = [
  {
    name: 'label',
    type: 'text',
    required: true,
  },
  {
    name: 'pageKey',
    type: 'select',
    required: false,
    options: PAGE_KEY_OPTIONS,
  },
  {
    name: 'href',
    type: 'text',
    required: false,
  },
  {
    name: 'anchor',
    type: 'text',
    required: false,
  },
]

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Globals',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      localized: true,
      required: true,
      defaultValue: 'dark',
      options: [
        { label: 'Dark / RU style', value: 'dark' },
        { label: 'Light / EN-AR style', value: 'light' },
      ],
    },
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
      name: 'description',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'brandEmail',
      type: 'email',
      localized: true,
      required: false,
    },
    {
      name: 'columns',
      type: 'array',
      localized: true,
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'links',
          options: [
            { label: 'Links', value: 'links' },
            { label: 'CTA', value: 'cta' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'links',
          },
          fields: linkFields as Field[],
        },
        {
          name: 'body',
          type: 'textarea',
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'cta',
          },
        },
        {
          name: 'buttonLabel',
          type: 'text',
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'cta',
          },
        },
        {
          name: 'buttonPageKey',
          type: 'select',
          required: false,
          options: PAGE_KEY_OPTIONS,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'cta',
          },
        },
        {
          name: 'buttonHref',
          type: 'text',
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'cta',
          },
        },
      ],
    },
    {
      name: 'bottomTextTemplate',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'bottomLinks',
      type: 'array',
      localized: true,
      required: false,
      fields: linkFields as Field[],
    },
  ],
}