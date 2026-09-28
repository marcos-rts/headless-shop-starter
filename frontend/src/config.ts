export const storeConfig = {
  name: import.meta.env.VITE_STORE_NAME ?? "Minha Loja",
  description:
    import.meta.env.VITE_STORE_DESCRIPTION ??
    "Uma vitrine simples e personalizável para seus produtos.",
  currency: import.meta.env.VITE_STORE_CURRENCY ?? "BRL",
  locale: import.meta.env.VITE_STORE_LOCALE ?? "pt-BR",
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER ?? "",
};

export const API_BASE =
  import.meta.env.VITE_API_URL ?? "http://localhost:1337";

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat(storeConfig.locale, {
    style: "currency",
    currency: storeConfig.currency,
  }).format(value);
