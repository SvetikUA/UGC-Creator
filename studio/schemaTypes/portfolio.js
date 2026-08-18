export default {
  name: 'portfolio',
  title: 'Portfolio Project',
  type: 'document',
  fields: [
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
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'video',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ document }) => document?.mediaType !== 'image',
    },
    {
      name: 'videoUrl',
      title: 'Video File URL (or direct link)',
      type: 'url',
      description: 'Upload video to a service (or use Sanity mux plugin later). For now, you can paste an mp4 link.',
      hidden: ({ document }) => document?.mediaType !== 'video',
    },
    {
      name: 'videoFile',
      title: 'Video File Upload',
      type: 'file',
      options: {
        accept: 'video/*'
      },
      hidden: ({ document }) => document?.mediaType !== 'video',
    }
  ],
}
