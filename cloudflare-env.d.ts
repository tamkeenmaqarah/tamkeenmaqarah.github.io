declare namespace Cloudflare {
  interface Env {
    QURAN_CLIENT_ID?: string;
    QURAN_CLIENT_SECRET?: string;
    DB?: D1Database;
    BUCKET?: R2Bucket;
  }
}
