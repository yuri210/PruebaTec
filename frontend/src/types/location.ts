export interface Location {
  id: number;
  code: string;
  name: string;
  image?: string;
  created_at: string;
  updated_at: string;
}

export interface LocationFormData {
  code: string;
  name: string;
  image?: string;
}

export interface LocationsResponse {
  data: Location[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
}

export interface ApiError {
  error: {
    message: string;
    code: string;
    details?: Record<string, string[]>;
  };
}