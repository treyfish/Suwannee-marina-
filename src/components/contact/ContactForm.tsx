'use client'

import { useState, FormEvent } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { EMAIL } from '@/lib/constants'
import { cn } from '@/lib/utils'

const SUBJECTS = [
  'General Inquiry',
  'Boat Sales',
  'Mercury Service & Repair',
  'Boat Storage',
  'Fuel & Supplies',
  'Other',
]

interface FormState {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const initial: FormState = { name: '', email: '', phone: '', subject: '', message: '' }

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initial)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [submitted, setSubmitted] = useState(false)

  function validate(): boolean {
    const e: Partial<FormState> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.subject) e.subject = 'Please select a subject'
    if (!form.message.trim()) e.message = 'Message is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validate()) return

    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone || 'N/A'}\n\n${form.message}`
    )
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(form.subject)}&body=${body}`
    setSubmitted(true)
    setForm(initial)
  }

  const field = (name: keyof FormState) => ({
    value: form[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [name]: e.target.value })),
  })

  const inputClass = (name: keyof FormState) =>
    cn(
      'w-full px-4 py-3 rounded-md border text-marina-slate bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-marina-teal',
      errors[name] ? 'border-red-400' : 'border-gray-200 hover:border-marina-teal/50'
    )

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckCircle size={56} className="text-marina-teal mb-4" />
        <h3 className="font-serif text-2xl font-bold text-marina-navy mb-2">Message Sent!</h3>
        <p className="text-marina-slate/70">Your email client should open. We&apos;ll get back to you as soon as possible.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-marina-teal hover:underline text-sm font-medium"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-marina-navy mb-1">
            Name <span className="text-red-400">*</span>
          </label>
          <input type="text" placeholder="Your name" className={inputClass('name')} {...field('name')} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-marina-navy mb-1">
            Email <span className="text-red-400">*</span>
          </label>
          <input type="email" placeholder="your@email.com" className={inputClass('email')} {...field('email')} />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-marina-navy mb-1">Phone (optional)</label>
          <input type="tel" placeholder="(352) 555-0000" className={inputClass('phone')} {...field('phone')} />
        </div>
        <div>
          <label className="block text-sm font-medium text-marina-navy mb-1">
            Subject <span className="text-red-400">*</span>
          </label>
          <select className={inputClass('subject')} {...field('subject')}>
            <option value="">Select a subject</option>
            {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-marina-navy mb-1">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          rows={5}
          placeholder="Tell us how we can help..."
          className={cn(inputClass('message'), 'resize-none')}
          {...field('message')}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-marina-amber hover:bg-amber-600 text-white py-3.5 rounded-md font-semibold text-base transition-colors"
      >
        <Send size={18} />
        Send Message
      </button>
    </form>
  )
}
