import type { Block } from 'payload'

export const ClientArtifactsSolutionsBlock: Block = {
  slug: 'clientArtifactsSolutions',
  labels: {
    singular: 'Client Artifacts Solutions',
    plural: 'Client Artifacts Solutions blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Что входит в работу',
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
      minRows: 6,
      maxRows: 6,
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
      type: 'text',
      required: true,
    },
  ],
}