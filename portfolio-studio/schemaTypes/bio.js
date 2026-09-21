export default {
  name: 'bio',
  title: 'Bio Details',
  type: 'document',
  fields: [
    {
      name: 'heroText',
      title: 'Hero Typewriter Text',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'value', type: 'string', title: 'Value' },
            { name: 'sub', type: 'string', title: 'Sub Label' },
          ],
        },
      ],
    },
  ],
};
