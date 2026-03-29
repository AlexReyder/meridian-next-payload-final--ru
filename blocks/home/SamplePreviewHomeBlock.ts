import type { Block } from 'payload'

export const SamplePreviewHomeBlock: Block = {
  slug: 'samplePreviewHome',
  labels: {
    singular: 'Sample Preview Home',
    plural: 'Sample Preview Home blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Материалы первого этапа',
    },
    {
      name: 'title',
      type: 'textarea',
      required: true,
      defaultValue: 'Что вы получаете на первом этапе',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 4,
      maxRows: 4,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
        },
        {
          name: 'imageUrl',
          type: 'text',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'bottomNote',
      type: 'textarea',
      required: true,
    },
  ],
}