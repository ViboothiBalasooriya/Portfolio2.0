export default {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
      description: 'The answer to the FAQ (you can use plain text here)',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Used for tech stack tags if applicable',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
    },
  ],
};
