export type DocumentCategory =
  | 'correspondence'
  | 'treaties'
  | 'proclamations'
  | 'cherokee-sources'
  | 'territorial'

export type DocumentBadge =
  | 'Presidential'
  | 'Cabinet'
  | 'Treaty'
  | 'Proclamation'
  | 'Cherokee Source'
  | 'Territorial'

export interface DocumentSource {
  name: string
  url: string
}

export interface RelatedDocument {
  slug: string
  title: string
}

export interface ChiefBiography {
  cherokeeName: string
  englishName: string
  alternateNames?: string
  birthDeath?: string
  role: string
  biography: string
}

export interface TreatySignatory {
  number: number
  cherokeeName: string
  englishName?: string
}

export interface DocumentExcerpt {
  text: string
  context: string
}

export interface HistoricalDocument {
  slug: string
  title: string
  date: string
  dateDisplay: string
  category: DocumentCategory
  badge: DocumentBadge
  author?: string
  authorTitle?: string
  recipient?: string
  recipientLocation?: string
  location?: string
  keyQuote?: string
  keyQuoteAttribution?: string
  excerpts?: DocumentExcerpt[]
  whyThisMatters: string
  content: string // Full document text as HTML or markdown
  sources: DocumentSource[]
  citation: string
  relatedDocuments?: RelatedDocument[]
  peopleMentioned?: string[]
  interpretiveNotes?: string
  // For Cherokee signatories document
  chiefBiographies?: ChiefBiography[]
  signatories?: TreatySignatory[]
}
