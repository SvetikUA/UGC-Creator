import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'svitlana-yavorska-cms',

  projectId: '59s6zizo',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            // Portfolio English Folder
            orderableDocumentListDeskItem({
              type: 'portfolio',
              id: 'portfolio-en',
              title: 'Portfolio (EN)',
              icon: () => '🇬🇧',
              filter: `language == $lang`,
              params: {lang: 'en'},
              S,
              context
            }),
            // Portfolio Dutch Folder
            orderableDocumentListDeskItem({
              type: 'portfolio',
              id: 'portfolio-nl',
              title: 'Portfolio (NL)',
              icon: () => '🇳🇱',
              filter: `language == $lang`,
              params: {lang: 'nl'},
              S,
              context
            }),
            S.divider(),
            // All other types (Site Settings)
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== 'translation.metadata' && item.getId() !== 'portfolio'
            ),
          ]),
    }),
    visionTool(),
    documentInternationalization({
      supportedLanguages: [
        {id: 'nl', title: 'Dutch (NL)'},
        {id: 'en', title: 'English (EN)'}
      ],
      schemaTypes: ['siteSettings', 'portfolio'],
    })
  ],

  schema: {
    types: schemaTypes,
  },
})
