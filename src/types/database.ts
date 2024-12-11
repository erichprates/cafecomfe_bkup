export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      interactions: {
        Row: {
          id: number
          devotional_day: number
          likes: number
          shares: number
          created_at: string | null
        }
        Insert: {
          id?: number
          devotional_day: number
          likes?: number
          shares?: number
          created_at?: string | null
        }
        Update: {
          id?: number
          devotional_day?: number
          likes?: number
          shares?: number
          created_at?: string | null
        }
        Relationships: []
      }
      devotionals: {
        Row: {
          id: number
          day: number
          title: string
          verse_text: string
          verse_reference: string
          verse_book: string
          verse_chapter: string
          verse_number: string
          devotional_text: string
          practical_text: string
          created_at: string
        }
        Insert: {
          id?: number
          day: number
          title: string
          verse_text: string
          verse_reference: string
          verse_book: string
          verse_chapter: string
          verse_number: string
          devotional_text: string
          practical_text: string
          created_at?: string
        }
        Update: {
          id?: number
          day?: number
          title?: string
          verse_text?: string
          verse_reference?: string
          verse_book?: string
          verse_chapter?: string
          verse_number?: string
          devotional_text?: string
          practical_text?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}