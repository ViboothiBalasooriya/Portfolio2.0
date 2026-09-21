export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Used for text-only bento grid items, or as alt text',
    },
    {
      name: 'isTextOnly',
      title: 'Is Text Only?',
      type: 'boolean',
      description: 'Check this if this block should only display text (no image)',
      initialValue: false,
    },
    {
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ document }) => document?.isTextOnly,
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order in the bento grid (1-8)',
    },
  ],
  orderings: [
    {
      title: 'Grid Order',
      name: 'gridOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
};
