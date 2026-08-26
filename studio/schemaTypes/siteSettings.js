export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  fieldsets: [
    { name: 'nav', title: '🟢 1. NAVIGATION & LOGO', options: { collapsible: true, collapsed: true } },
    { name: 'hero', title: '🟢 2. HERO SECTION', options: { collapsible: true, collapsed: true } },
    { name: 'about', title: '🟢 3. ABOUT SECTION', options: { collapsible: true, collapsed: true } },
    { name: 'services', title: '🟢 4. SERVICES & NICHE', options: { collapsible: true, collapsed: true } },
    { name: 'portfolio', title: '🟢 5. PORTFOLIO SECTION', options: { collapsible: true, collapsed: true } },
    { name: 'contact', title: '🟢 6. CONTACT SECTION', options: { collapsible: true, collapsed: true } },
    { name: 'seo', title: '🟢 7. SEO & SOCIAL MEDIA', options: { collapsible: true, collapsed: true } }
  ],
  fields: [
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
    // --- Navigation & Logo ---
    {
      name: 'logoTop',
      title: 'Logo Top Text (Serif font)',
      type: 'string',
      fieldset: 'nav',
      initialValue: 'SVITLANA YAVORSKA',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logoBottom',
      title: 'Logo Bottom Text (Sans-serif font)',
      type: 'string',
      fieldset: 'nav',
      initialValue: 'CREATOR',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      fieldset: 'nav',
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
    },
    
    // --- Hero Section ---
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      fieldset: 'hero',
      initialValue: 'Svitlana Yavorska',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      fieldset: 'hero',
      initialValue: 'UGC Creator',
      validation: (Rule) => Rule.required(),
    },

    // --- About Section ---
    {
      name: 'aboutTitle',
      title: 'About Section Title',
      type: 'string',
      fieldset: 'about',
      initialValue: 'About Me',
    },
    {
      name: 'aboutImage',
      title: 'About Section Photo',
      type: 'image',
      fieldset: 'about',
      options: { hotspot: true },
    },
    {
      name: 'aboutText',
      title: 'About Section Text',
      type: 'text',
      fieldset: 'about',
      description: 'Use Enter to create new paragraphs.',
      initialValue: 'I’m a UGC content creator based in the Netherlands, specializing in product video content for brands.\n\nMy focus is on textures, details, lighting, and movement to bring products to life and make them visually irresistible. I enjoy working with light, textures, details, and simple compositions.',
    },
    
    // --- Services & Niche Section ---
    {
      name: 'servicesTitle',
      title: 'Services Title',
      type: 'string',
      fieldset: 'services',
      initialValue: 'What I do',
    },
    {
      name: 'servicesList',
      title: 'Services List',
      type: 'array',
      fieldset: 'services',
      of: [{ type: 'string' }],
      initialValue: [
        'UGC video creation',
        'Product videos & photography',
        'Short-form content for ads',
        'Content for social media',
        'Visual content for brands & cafes'
      ],
    },
    {
      name: 'nicheTitle',
      title: 'Niche Title',
      type: 'string',
      fieldset: 'services',
      initialValue: 'My niche',
    },
    {
      name: 'nicheList',
      title: 'Niche List',
      type: 'array',
      fieldset: 'services',
      of: [{ type: 'string' }],
      initialValue: [
        'Beauty & Skincare',
        'Food & Drinks',
        'Lifestyle'
      ],
    },
    
    // --- Portfolio Section ---
    {
      name: 'portfolioSubtitle',
      title: 'Portfolio Subtitle (e.g. Portfolio)',
      type: 'string',
      fieldset: 'portfolio',
      initialValue: 'Portfolio',
    },
    {
      name: 'portfolioTitle',
      title: 'Portfolio Title (e.g. Selected Work)',
      type: 'string',
      fieldset: 'portfolio',
      initialValue: 'Selected Work',
    },
    {
      name: 'portfolioDescription',
      title: 'Portfolio Description',
      type: 'string',
      fieldset: 'portfolio',
      initialValue: 'A collection of product photos and short-form videos.',
    },
    
    // --- Contact Section ---
    {
      name: 'contactTitle',
      title: 'Contact Title',
      type: 'string',
      fieldset: 'contact',
      initialValue: "Let's Work Together",
    },
    {
      name: 'contactSubtitle',
      title: 'Contact Subtitle',
      type: 'string',
      fieldset: 'contact',
      initialValue: "Have a product you’d like to see in content?",
    },
    {
      name: 'contactButtonText',
      title: 'Button Text',
      type: 'string',
      fieldset: 'contact',
      initialValue: "Get in touch →",
    },
    {
      name: 'contactEmail',
      title: 'Email Address',
      type: 'string',
      fieldset: 'contact',
      initialValue: 'svetaberynda@gmail.com',
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      fieldset: 'contact',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform Label (e.g. Insta:, TikTok:)', type: 'string' },
            { name: 'handle', title: 'Handle / Username (e.g. @LANA_YAVORSKA)', type: 'string' },
            { name: 'url', title: 'URL Link', type: 'url' }
          ]
        }
      ],
      initialValue: [
        { platform: 'Insta:', handle: '@LANA_YAVORSKA', url: 'https://instagram.com/LANA_YAVORSKA' }
      ]
    },
    // --- SEO & Social Media ---
    {
      name: 'seoTitle',
      title: 'SEO Title',
      description: 'The title that appears in search engines and social media previews (e.g. Svitlana Yavorska | UGC Creator)',
      type: 'string',
      fieldset: 'seo',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      description: 'The short description that appears below the title in links.',
      type: 'text',
      rows: 3,
      fieldset: 'seo',
    },
    {
      name: 'ogImage',
      title: 'Preview Image (OG Image)',
      description: 'The image that appears when you share the link in Telegram, Facebook, iMessage, etc. (Recommended size: 1200x630px)',
      type: 'image',
      fieldset: 'seo',
      options: {
        hotspot: true,
      },
    }
  ],
  preview: {
    select: {
      title: 'logoTop',
      language: 'language',
    },
    prepare(selection) {
      const { title, language } = selection
      let flag = '⚙️' // default icon
      if (language === 'en') flag = '🇬🇧'
      if (language === 'nl') flag = '🇳🇱'

      return {
        title: title || 'Site Settings',
        subtitle: language ? `Language: ${language.toUpperCase()}` : 'Language: not set',
        media: () => flag
      }
    }
  }
}
