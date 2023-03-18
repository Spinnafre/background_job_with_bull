export declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      MAIL_PORT: number;
      MAIL_HOST: string;
      MAIL_USER: string;
      MAIL_PASSWORD: string;
      REDIS_HOST: string;
      REDIS_PORT: number;
    }
  }
}
