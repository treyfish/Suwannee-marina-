export interface NavLink {
  label: string
  href: string
}

export interface ServiceCard {
  title: string
  description: string
  href: string
  iconName: string
}

export interface StorageOption {
  type: string
  description: string
  features: string[]
}

export interface Testimonial {
  quote: string
  author: string
  location: string
}

export interface HistoryMilestone {
  year: number
  title: string
  description: string
}

export interface BusinessHours {
  day: string
  open?: string
  close?: string
  closed: boolean
}
