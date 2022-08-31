export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      PG_DATABASE_URL: string;
    }
  }
}
