import type { Block } from 'payload'

import { PAGE_KEY_OPTIONS } from '../../lib/routes'

export const VideoWalkthroughHomeBlock: Block = {
  slug: 'videoWalkthroughHome',
  labels: {
    singular: 'Video Walkthrough Home',
    plural: 'Video Walkthrough Home blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Walkthrough',
    },
    {
      name: 'title',
      type: 'textarea',
      required: true,
      defaultValue: 'От задачи до готового прототипа',
    },
    {
      name: 'subheadline',
      type: 'textarea',
      required: true,
    },
    {
      name: 'metaBadges',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      required: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'videoLabel',
      type: 'text',
      defaultValue: 'Видео',
    },
    {
      name: 'durationLabel',
      type: 'text',
      defaultValue: '4:32',
    },
    {
      name: 'timeline',
      type: 'array',
      minRows: 5,
      maxRows: 5,
      required: true,
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'highlightsTitle',
      type: 'text',
      required: true,
      defaultValue: 'Что вы увидите в ролике',
    },
    {
      name: 'highlights',
      type: 'array',
      required: true,
      minRows: 4,
      maxRows: 6,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'ctaTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'ctaSubtext',
      type: 'textarea',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'primaryButtonLabel',
          type: 'text',
          required: true,
          defaultValue: 'Получить предложение',
        },
        {
          name: 'primaryPageKey',
          type: 'select',
          required: true,
          options: PAGE_KEY_OPTIONS,
          defaultValue: 'get-proposal',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'secondaryButtonLabel',
          type: 'text',
          required: true,
          defaultValue: 'Посмотреть цены',
        },
        {
          name: 'secondaryPageKey',
          type: 'select',
          required: true,
          options: PAGE_KEY_OPTIONS,
          defaultValue: 'pricing',
        },
      ],
    },
  ],
}