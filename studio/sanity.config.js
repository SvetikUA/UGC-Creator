import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'svitlana-yavorska-cms',

  projectId: '59s6zizo',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Portfolio English Folder
            S.listItem()
              .title('Portfolio (EN)')
              .icon(() => '🇬🇧')
              .child(
                S.documentList()
                  .title('English Projects')
                  .filter('_type == "portfolio" && language == "en"')
                  .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
              ),
            // Portfolio Dutch Folder
            S.listItem()
              .title('Portfolio (NL)')
              .icon(() => '🇳🇱')
              .child(
                S.documentList()
                  .title('Dutch Projects')
                  .filter('_type == "portfolio" && language == "nl"')
                  .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
              ),
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
