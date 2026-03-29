import type { Block } from 'payload'

import { PAGE_KEY_OPTIONS } from '../../lib/routes'

export const ConceptsHomeBlock: Block = {
  slug: 'conceptsHome',
  labels: {
    singular: 'Concepts Home',
    plural: 'Concepts Home blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Portfolio',
    },
    {
      name: 'title',
      type: 'textarea',
      required: true,
      defaultValue: 'Концепты студии',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'challengeLabel',
          type: 'text',
          required: true,
          defaultValue: 'Задача',
        },
        {
          name: 'structuredLabel',
          type: 'text',
          required: true,
          defaultValue: 'Что структурировали',
        },
        {
          name: 'deliveredLabel',
          type: 'text',
          required: true,
          defaultValue: 'Что подготовили',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'viewConceptsLabel',
          type: 'text',
          required: true,
          defaultValue: 'Посмотреть концепты',
        },
        {
          name: 'conceptsPageKey',
          type: 'select',
          required: true,
          options: PAGE_KEY_OPTIONS,
          defaultValue: 'concepts',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'previousAriaLabel',
          type: 'text',
          required: true,
          defaultValue: 'Previous concept',
        },
        {
          name: 'nextAriaLabel',
          type: 'text',
          required: true,
          defaultValue: 'Next concept',
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 3,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'badge',
          type: 'text',
          required: true,
        },
        {
          name: 'challenge',
          type: 'textarea',
          required: true,
        },
        {
          name: 'structured',
          type: 'textarea',
          required: true,
        },
        {
          name: 'delivered',
          type: 'textarea',
          required: true,
        },
        {
          name: 'imageUrl',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}