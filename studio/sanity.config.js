import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'svitlana-yavorska-cms',

  projectId: 'bmtxz3jd',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items(S.documentTypeListItems().filter(item => item.getId() !== 'translation.metadata'))
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
