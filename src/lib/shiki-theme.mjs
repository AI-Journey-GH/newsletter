export const aiJourneyCode = {
  name: 'ai-journey',
  type: 'dark',
  colors: {
    'editor.background': '#0e2135',
    'editor.foreground': '#dce5ec',
  },
  tokenColors: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#7f97ae', fontStyle: 'italic' } },
    { scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.operator.new', 'keyword.control'], settings: { foreground: '#7cc8d4' } },
    { scope: ['string', 'string.quoted', 'string.template', 'punctuation.definition.string'], settings: { foreground: '#b4e3ea' } },
    { scope: ['constant.numeric', 'constant.language', 'constant.character', 'support.constant'], settings: { foreground: '#9cc4f0' } },
    { scope: ['entity.name.function', 'support.function', 'meta.function-call.generic', 'variable.function'], settings: { foreground: '#8fb8ff' } },
    { scope: ['entity.name.type', 'entity.name.class', 'support.type', 'support.class', 'entity.other.inherited-class'], settings: { foreground: '#c3d9f5' } },
    { scope: ['variable.parameter', 'meta.parameter'], settings: { foreground: '#d6e6f5', fontStyle: 'italic' } },
    { scope: ['entity.name.tag', 'meta.tag'], settings: { foreground: '#7cc8d4' } },
    { scope: ['entity.other.attribute-name'], settings: { foreground: '#9cc4f0' } },
    { scope: ['keyword.operator', 'punctuation', 'meta.brace'], settings: { foreground: '#a7bacb' } },
    { scope: ['variable.other.property', 'meta.property-name', 'support.type.property-name'], settings: { foreground: '#dce5ec' } },
    { scope: ['markup.heading'], settings: { foreground: '#7cc8d4', fontStyle: 'bold' } },
    { scope: ['markup.inserted'], settings: { foreground: '#7cc8d4' } },
    { scope: ['markup.deleted'], settings: { foreground: '#9cc4f0' } },
  ],
};
