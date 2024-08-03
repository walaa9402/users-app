export const USER_API = {
  LIST: "users",
  CREATE: "users",
  UPDATE: (id: number) => `users/${id}`,
  DELETE: (id: number) => `users/${id}`,
  GET_BY_ID: (id: number) => `users/${id}`
}
