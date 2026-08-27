import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default {
  name: 'portfolio',
  title: 'Portfolio Project',
  type: 'document',
  icon: () => '🎬',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'portfolio' }),
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Beauty & Skincare', value: 'Beauty & Skincare' },
          { title: 'Food & Drinks', value: 'Food & Drinks' },
          { title: 'Lifestyle', value: 'Lifestyle' },
          { title: 'Home & Decor', value: 'Home & Decor' },
          { title: 'Wellness & Self-care', value: 'Wellness & Self-care' },
          { title: 'E-commerce brands', value: 'E-commerce brands' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'coverImage',
      title: 'Video Cover Image (Thumbnail)',
      type: 'image',
      description: 'This image will be shown before the user clicks Play.',
      options: { hotspot: true },
      hidden: false,
    },
    {
      name: 'videoFile',
      title: 'Video File Upload',
      type: 'file',
      options: {
        accept: 'video/*'
      },
      hidden: false,
    }
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
    },
    prepare(selection) {
      const { title, language } = selection
      let flag = '🎬' // default icon
      if (language === 'en') flag = '🇬🇧'
      if (language === 'nl') flag = '🇳🇱'

      return {
        title: title || 'Untitled Project',
        subtitle: language ? `Language: ${language.toUpperCase()}` : 'Language: not set',
        media: () => flag
      }
    }
  }
}
