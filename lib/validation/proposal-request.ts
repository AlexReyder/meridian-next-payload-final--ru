import { z } from 'zod'

export const MAX_PROPOSAL_FILE_SIZE = 50 * 1024 * 1024
export const MAX_PROPOSAL_FILES = 5

export const ALLOWED_PROPOSAL_FILE_TYPES = [
  'application/pdf',
  'application/zip',
  'application/x-zip-compressed',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'image/jpeg',
  'image/png',
  'image/webp',
] as const

function isFile(value: unknown): value is File {
  return typeof globalThis.File !== 'undefined' && value instanceof globalThis.File
}

export function validateProposalFile(file: File) {
  if (file.size > MAX_PROPOSAL_FILE_SIZE) {
    return 'File is too large'
  }

  if (
    !ALLOWED_PROPOSAL_FILE_TYPES.includes(
      file.type as (typeof ALLOWED_PROPOSAL_FILE_TYPES)[number],
    )
  ) {
    return 'Unsupported file type'
  }

  return null
}

export const proposalFilesSchema = z
  .array(
    z.custom<File>((value) => isFile(value), {
      message: 'Invalid file',
    }),
  )
  .max(MAX_PROPOSAL_FILES, `Maximum ${MAX_PROPOSAL_FILES} files allowed`)
  .superRefine((files, ctx) => {
    files.forEach((file, index) => {
      const error = validateProposalFile(file)

      if (error) {
        ctx.addIssue({
          code: 'custom',
          message: `${file.name}: ${error}`,
          path: [index],
        })
      }
    })
  })

export const proposalWizardSchema = z.object({
  mode: z.literal('wizard'),
  locale: z.enum(['ru', 'en', 'ar']),

  projectType: z.string().min(1, 'Project type is required'),
  projectGoal: z.string().min(1, 'Project goal is required'),
  teamType: z.string().min(1, 'Team type is required'),

  companyName: z.string().optional(),
  website: z.string().trim().optional().or(z.literal('')),
  teamSize: z.string().optional(),
  rolesCount: z.string().optional(),
  screenCount: z.string().optional(),

  complexityFlags: z.array(z.string()).default([]),
  materials: z.array(z.string()).default([]),

  timeline: z.string().optional(),
  budget: z.string().optional(),
  briefNotes: z.string().optional(),

  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  company: z.string().optional(),
  role: z.string().optional(),
  region: z.string().optional(),
  phone: z.string().optional(),
  comment: z.string().optional(),

  noCallFirst: z.boolean().optional(),
  expertReview: z.boolean().optional(),
  nda: z.boolean().optional(),
})

export const proposalUploadSchema = z.object({
  mode: z.literal('upload'),
  locale: z.enum(['ru', 'en', 'ar']),

  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  description: z.string().min(1, 'Description is required'),
  links: z.array(z.string().url('Each link must be a valid URL')).default([]),
})

export function getFirstZodError(error: z.ZodError) {
  const flattened = error.flatten()

  const fieldError = Object.values(flattened.fieldErrors).find(
    (messages: any) => messages && messages.length,
  ) as any

  if (fieldError?.[0]) return fieldError[0]
  if (flattened.formErrors[0]) return flattened.formErrors[0]

  return 'Validation failed'
}