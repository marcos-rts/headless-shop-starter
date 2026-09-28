/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_STORE_NAME?: string;
  readonly VITE_STORE_DESCRIPTION?: string;
  readonly VITE_STORE_CURRENCY?: string;
  readonly VITE_STORE_LOCALE?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
