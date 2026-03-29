import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

import {
  getFirstZodError,
  proposalFilesSchema,
  proposalUploadSchema,
  proposalWizardSchema,
} from '@/lib/validation/proposal-request'

function getString(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === 'string' ? value : ''
}

function getBoolean(formData: FormData, key: string) {
  return getString(formData, key) === 'true'
}

function getJsonStringArray(formData: FormData, key: string): string[] {
  const value = formData.get(key)

  if (typeof value !== 'string' || !value.trim()) return []

  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === 'string')
      : []
  } catch {
    return []
  }
}

function getFiles(formData: FormData, key: string): File[] {
  return formData
    .getAll(key)
    .filter(
      (item): item is File =>
        typeof File !== 'undefined' && item instanceof File,
    )
    .filter((file) => file.size > 0)
}

type PayloadUploadFile = {
  data: Buffer
  mimetype: string
  name: string
  size: number
}

type EmailAttachment = {
  filename: string
  content: Buffer
  contentType: string
}

async function toPayloadUploadFile(file: File): Promise<PayloadUploadFile> {
  const arrayBuffer = await file.arrayBuffer()

  return {
    data: Buffer.from(arrayBuffer),
    mimetype: file.type || 'application/octet-stream',
    name: file.name,
    size: file.size,
  }
}

function buildWizardEmailText(
  requestId: string | number,
  data: Record<string, unknown>,
) {
  return [
    'New proposal request',
    `Request ID: ${requestId}`,
    '',
    'Mode: wizard',
    `Locale: ${String(data.locale ?? '')}`,
    '',
    `Name: ${String(data.name ?? '')}`,
    `Email: ${String(data.email ?? '')}`,
    `Company: ${String(data.company ?? '')}`,
    `Role: ${String(data.role ?? '')}`,
    `Region: ${String(data.region ?? '')}`,
    `Phone: ${String(data.phone ?? '')}`,
    '',
    `Project type: ${String(data.projectType ?? '')}`,
    `Project goal: ${String(data.projectGoal ?? '')}`,
    `Team type: ${String(data.teamType ?? '')}`,
    `Company name: ${String(data.companyName ?? '')}`,
    `Website: ${String(data.website ?? '')}`,
    `Team size: ${String(data.teamSize ?? '')}`,
    `Roles count: ${String(data.rolesCount ?? '')}`,
    `Screen count: ${String(data.screenCount ?? '')}`,
    `Timeline: ${String(data.timeline ?? '')}`,
    `Budget: ${String(data.budget ?? '')}`,
    '',
    `Complexity flags: ${
      Array.isArray(data.complexityFlags) ? data.complexityFlags.join(', ') : ''
    }`,
    `Materials: ${
      Array.isArray(data.materials) ? data.materials.join(', ') : ''
    }`,
    '',
    `Brief notes: ${String(data.briefNotes ?? '')}`,
    `Comment: ${String(data.comment ?? '')}`,
    '',
    `No-call-first: ${String(Boolean(data.noCallFirst))}`,
    `Expert review: ${String(Boolean(data.expertReview))}`,
    `NDA: ${String(Boolean(data.nda))}`,
  ].join('\n')
}

function buildUploadEmailText(
  requestId: string | number,
  data: {
    locale: string
    name: string
    email: string
    description: string
    links: string[]
    files: Array<{ filename?: string | null; url?: string | null }>
  },
) {
  return [
    'New proposal upload',
    `Request ID: ${requestId}`,
    '',
    'Mode: upload',
    `Locale: ${data.locale}`,
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    '',
    'Description:',
    data.description,
    '',
    'Links:',
    ...(data.links.length ? data.links : ['—']),
    '',
    'Files:',
    ...(data.files.length
      ? data.files.map((file) => `${file.filename ?? 'file'} — ${file.url ?? ''}`)
      : ['—']),
  ].join('\n')
}

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config })
    const formData = await req.formData()
    const mode = getString(formData, 'mode')

    const files = getFiles(formData, 'files')
    const filesValidation = proposalFilesSchema.safeParse(files)

    if (!filesValidation.success) {
      return NextResponse.json(
        { ok: false, error: getFirstZodError(filesValidation.error) },
        { status: 400 },
      )
    }

    if (mode === 'wizard') {
      const parsed = proposalWizardSchema.safeParse({
        mode: 'wizard',
        locale: getString(formData, 'locale'),

        projectType: getString(formData, 'projectType'),
        projectGoal: getString(formData, 'projectGoal'),
        teamType: getString(formData, 'teamType'),

        companyName: getString(formData, 'companyName'),
        website: getString(formData, 'website'),
        teamSize: getString(formData, 'teamSize'),
        rolesCount: getString(formData, 'rolesCount'),
        screenCount: getString(formData, 'screenCount'),

        complexityFlags: getJsonStringArray(formData, 'complexityFlags'),
        materials: getJsonStringArray(formData, 'materials'),

        timeline: getString(formData, 'timeline'),
        budget: getString(formData, 'budget'),
        briefNotes: getString(formData, 'briefNotes'),

        name: getString(formData, 'name'),
        email: getString(formData, 'email'),
        company: getString(formData, 'company'),
        role: getString(formData, 'role'),
        region: getString(formData, 'region'),
        phone: getString(formData, 'phone'),
        comment: getString(formData, 'comment'),

        noCallFirst: getBoolean(formData, 'noCallFirst'),
        expertReview: getBoolean(formData, 'expertReview'),
        nda: getBoolean(formData, 'nda'),
      })

      if (!parsed.success) {
        return NextResponse.json(
          { ok: false, error: getFirstZodError(parsed.error) },
          { status: 400 },
        )
      }

      const requestDoc = await payload.create({
        collection: 'proposal-requests',
        data: {
          mode: 'wizard',
          locale: parsed.data.locale,
          name: parsed.data.name,
          email: parsed.data.email,
          company: parsed.data.company,
          role: parsed.data.role,
          region: parsed.data.region,
          phone: parsed.data.phone,
          payload: parsed.data,
          links: [],
          files: [],
        },
      })

      const uploadedFileDocs = []
      const emailAttachments: EmailAttachment[] = []

      for (const file of files) {
        const payloadFile = await toPayloadUploadFile(file)

        emailAttachments.push({
          filename: payloadFile.name,
          content: payloadFile.data,
          contentType: payloadFile.mimetype,
        })

        const fileDoc = await payload.create({
          collection: 'proposal-files',
          data: {
            alt: file.name,
            sourceType: 'proposal-upload',
            request: requestDoc.id,
          },
          file: payloadFile,
        })

        uploadedFileDocs.push(fileDoc)
      }

      if (uploadedFileDocs.length) {
        await payload.update({
          collection: 'proposal-requests',
          id: requestDoc.id,
          data: {
            files: uploadedFileDocs.map((fileDoc) => fileDoc.id),
          },
        })
      }

      try {
        await payload.sendEmail({
          to:
            process.env.PROPOSAL_NOTIFICATION_EMAIL ||
            process.env.SMTP_USER ||
            'hello@atelier-meridian.com',
          subject: `[Proposal][Wizard][${parsed.data.locale.toUpperCase()}] ${parsed.data.name}`,
          text: buildWizardEmailText(requestDoc.id, parsed.data),
          attachments: emailAttachments,
        })
      } catch (emailError) {
        console.error('Proposal wizard email error:', emailError)
      }

      return NextResponse.json({
        ok: true,
        requestId: requestDoc.id,
      })
    }

    if (mode === 'upload') {
      const links = getJsonStringArray(formData, 'links')

      const parsed = proposalUploadSchema.safeParse({
        mode: 'upload',
        locale: getString(formData, 'locale'),
        name: getString(formData, 'name'),
        email: getString(formData, 'email'),
        description: getString(formData, 'description'),
        links,
      })

      if (!parsed.success) {
        return NextResponse.json(
          { ok: false, error: getFirstZodError(parsed.error) },
          { status: 400 },
        )
      }

      const requestDoc = await payload.create({
        collection: 'proposal-requests',
        data: {
          mode: 'upload',
          locale: parsed.data.locale,
          name: parsed.data.name,
          email: parsed.data.email,
          payload: {
            description: parsed.data.description,
          },
          links: parsed.data.links.map((url) => ({ url })),
          files: [],
        },
      })

      const uploadedFileDocs = []
      const emailAttachments: EmailAttachment[] = []

      for (const file of files) {
        const payloadFile = await toPayloadUploadFile(file)

        emailAttachments.push({
          filename: payloadFile.name,
          content: payloadFile.data,
          contentType: payloadFile.mimetype,
        })

        const fileDoc = await payload.create({
          collection: 'proposal-files',
          data: {
            alt: file.name,
            sourceType: 'proposal-upload',
            request: requestDoc.id,
          },
          file: payloadFile,
        })

        uploadedFileDocs.push(fileDoc)
      }

      if (uploadedFileDocs.length) {
        await payload.update({
          collection: 'proposal-requests',
          id: requestDoc.id,
          data: {
            files: uploadedFileDocs.map((fileDoc) => fileDoc.id),
          },
        })
      }

      try {
        await payload.sendEmail({
          to:
            process.env.PROPOSAL_NOTIFICATION_EMAIL ||
            process.env.SMTP_USER ||
            'hello@atelier-meridian.com',
          subject: `[Proposal][Upload][${parsed.data.locale.toUpperCase()}] ${parsed.data.name}`,
          text: buildUploadEmailText(requestDoc.id, {
            locale: parsed.data.locale,
            name: parsed.data.name,
            email: parsed.data.email,
            description: parsed.data.description,
            links: parsed.data.links,
            files: uploadedFileDocs.map((fileDoc) => ({
              filename: fileDoc.filename,
              url: fileDoc.url,
            })),
          }),
          attachments: emailAttachments,
        })
      } catch (emailError) {
        console.error('Proposal upload email error:', emailError)
      }

      return NextResponse.json({
        ok: true,
        requestId: requestDoc.id,
      })
    }

    return NextResponse.json(
      { ok: false, error: 'Unsupported mode' },
      { status: 400 },
    )
  } catch (error) {
    console.error('Proposal request route error:', error)

    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}