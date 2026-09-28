import { API_BASE } from "../config";
import type { Produto } from "../types/produto";

const PRODUTOS_URL = `${API_BASE}/api/produtos?populate[imagem]=true`;

/**
 * Extrai URL relativa da mídia em respostas Strapi v4 (attributes) ou formato mais plano.
 */
function extrairUrlImagem(imagem: unknown): string | null {
  if (!imagem || typeof imagem !== "object") return null;
  const img = imagem as Record<string, unknown>;
  if (typeof img.url === "string") return img.url;
  const data = img.data;
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  const inner = d.attributes as Record<string, unknown> | undefined;
  if (inner && typeof inner.url === "string") return inner.url;
  return null;
}

/**
/**
 * Converte descrição richtext (string ou blocos Strapi) em string exibível.
 */
function extrairDescricao(desc: unknown): string {
  if (typeof desc === "string") return desc;
  if (Array.isArray(desc)) {
    const partes: string[] = [];
    for (const bloco of desc) {
      if (bloco && typeof bloco === "object" && "children" in bloco) {
        const ch = (bloco as { children?: unknown[] }).children;
        if (Array.isArray(ch)) {
          for (const c of ch) {
            if (c && typeof c === "object" && "text" in c) {
              partes.push(String((c as { text?: string }).text ?? ""));
            }
          }
        }
      }
    }
    return partes.join(" ").trim();
  }
  return "";
}

/**
 * Normaliza um item da API (Strapi v4/v5 ou formato plano) para {@link Produto}.
 */
export function normalizarProduto(raw: unknown): Produto | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const idNum = Number(r.id);
  if (Number.isNaN(idNum)) return null;

  const attrs = r.attributes as Record<string, unknown> | undefined;
  const src = attrs ?? r;

  const nome = String(src.nome ?? "");
  const slug = String(src.slug ?? idNum);
  const descricao = extrairDescricao(src.descricao);
  const preco = Number(src.preco ?? 0);
  const estoque = Number(src.estoque ?? 0);
  const imagemUrl = extrairUrlImagem(src.imagem);
  const categoria = typeof src.categoria === "string" ? src.categoria : null;
  const ativo = src.ativo !== false;

  return {
    id: idNum,
    slug,
    nome,
    descricao,
    preco,
    estoque,
    imagemUrl,
    categoria,
    ativo,
  };
}

/**
 * Busca a lista de produtos publicados no Strapi.
 */
export async function fetchProdutos(): Promise<Produto[]> {
  const res = await fetch(PRODUTOS_URL);
  if (!res.ok) {
    throw new Error(`Falha ao carregar produtos (${res.status})`);
  }
  const json: unknown = await res.json();
  const data =
    json && typeof json === "object" && "data" in json
      ? (json as { data: unknown }).data
      : null;
  if (!Array.isArray(data)) return [];

  const lista: Produto[] = [];
  for (const item of data) {
    const p = normalizarProduto(item);
    if (p) lista.push(p);
  }
  return lista;
}

export async function fetchProduto(slug: string): Promise<Produto | null> {
  const res = await fetch(
    `${API_BASE}/api/produtos?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[imagem]=true`,
  );
  if (!res.ok) throw new Error(`Falha ao carregar produto (${res.status})`);
  const json: unknown = await res.json();
  const data =
    json && typeof json === "object" && "data" in json
      ? (json as { data: unknown }).data
      : null;
  const item = Array.isArray(data) ? data[0] : data;
  return normalizarProduto(item);
}

export function urlImagemAbsoluta(relativa: string | null): string | null {
  if (!relativa) return null;
  if (relativa.startsWith("http")) return relativa;
  return `${API_BASE}${relativa}`;
}
