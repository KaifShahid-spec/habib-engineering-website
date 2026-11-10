export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: "admin" | "staff" | "viewer";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role?: "admin" | "staff" | "viewer";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          role?: "admin" | "staff" | "viewer";
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          is_active?: boolean;
        };
      };
      products: {
        Row: {
          id: string;
          category_id: string;
          name: string;
          slug: string;
          description: string | null;
          specs: Json | null;
          images: string[] | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          name: string;
          slug: string;
          description?: string | null;
          specs?: Json | null;
          images?: string[] | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          category_id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          specs?: Json | null;
          images?: string[] | null;
          is_active?: boolean;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          client_name: string;
          sector: string;
          location: string;
          year: number | null;
          description: string | null;
          images: string[] | null;
          is_featured: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          client_name: string;
          sector: string;
          location: string;
          year?: number | null;
          description?: string | null;
          images?: string[] | null;
          is_featured?: boolean;
          created_at?: string;
        };
        Update: {
          title?: string;
          slug?: string;
          client_name?: string;
          sector?: string;
          location?: string;
          year?: number | null;
          description?: string | null;
          images?: string[] | null;
          is_featured?: boolean;
        };
      };
      clients: {
        Row: {
          id: string;
          name: string;
          sector: string | null;
          city: string | null;
          logo_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          sector?: string | null;
          city?: string | null;
          logo_url?: string | null;
          created_at?: string;
        };
        Update: {
          name?: string;
          sector?: string | null;
          city?: string | null;
          logo_url?: string | null;
        };
      };
      certifications: {
        Row: {
          id: string;
          name: string;
          issuer: string;
          issue_date: string | null;
          expiry_date: string | null;
          image_url: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          issuer: string;
          issue_date?: string | null;
          expiry_date?: string | null;
          image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          name?: string;
          issuer?: string;
          issue_date?: string | null;
          expiry_date?: string | null;
          image_url?: string | null;
          is_active?: boolean;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          author_id: string | null;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          cover_image_url: string | null;
          is_published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          author_id?: string | null;
          title: string;
          slug: string;
          excerpt?: string | null;
          content: string;
          cover_image_url?: string | null;
          is_published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          author_id?: string | null;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string;
          cover_image_url?: string | null;
          is_published?: boolean;
          published_at?: string | null;
        };
      };
      settings: {
        Row: {
          key: string;
          value: string;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: string;
          updated_at?: string;
        };
        Update: {
          value?: string;
          updated_at?: string;
        };
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          company: string | null;
          subject: string;
          message: string;
          status: "new" | "read" | "contacted" | "closed";
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          company?: string | null;
          subject: string;
          message: string;
          status?: "new" | "read" | "contacted" | "closed";
          created_at?: string;
        };
        Update: {
          status?: "new" | "read" | "contacted" | "closed";
        };
      };
      quote_requests: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          company: string;
          project_location: string;
          project_type: string | null;
          timeline: string | null;
          items: Json;
          additional_notes: string | null;
          status: "new" | "read" | "contacted" | "closed";
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          company: string;
          project_location: string;
          project_type?: string | null;
          timeline?: string | null;
          items: Json;
          additional_notes?: string | null;
          status?: "new" | "read" | "contacted" | "closed";
          created_at?: string;
        };
        Update: {
          status?: "new" | "read" | "contacted" | "closed";
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          status: "active" | "unsubscribed";
          source: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          status?: "active" | "unsubscribed";
          source?: string | null;
          created_at?: string;
        };
        Update: {
          status?: "active" | "unsubscribed";
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: "admin" | "staff" | "viewer";
      inquiry_status: "new" | "read" | "contacted" | "closed";
      newsletter_status: "active" | "unsubscribed";
    };
  };
}