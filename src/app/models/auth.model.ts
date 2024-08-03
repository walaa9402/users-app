export interface LoginRequest {
  email: string | null;
  password: string | null;
}

export interface LoginResponse {
  token: string;
}
