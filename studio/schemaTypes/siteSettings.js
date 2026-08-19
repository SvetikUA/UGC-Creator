export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'logoTop',
      title: 'Logo Top Text (Serif font)',
      type: 'string',
      initialValue: 'SVITLANA YAVORSKA',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logoBottom',
      title: 'Logo Bottom Text (Sans-serif font)',
      type: 'string',
      initialValue: 'CREATOR',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Link Title', type: 'string' },
            { name: 'url', title: 'Link URL (e.g., #about)', type: 'string' },
          ]
        }
      ],
      initialValue: [
        { title: 'About', url: '#about' },
        { title: 'Services', url: '#services' },
        { title: 'Portfolio', url: '#portfolio' },
        { title: 'Contact', url: '#contact' },
      ]
    }
  ]
}
