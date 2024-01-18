export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DATABASE_URL: string;
      // add more environment variables and their types here
    }
  }
}
