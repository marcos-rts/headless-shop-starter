/**
 * Modelo normalizado usado nas telas (independente do formato bruto do Strapi).
 */
export type Produto = {
  id: number;
  slug: string;
  nome: string;
  /** Pode vir como HTML (richtext) ou texto simples. */
  descricao: string;
  preco: number;
  estoque: number;
  imagemUrl: string | null;
  categoria: string | null;
  ativo: boolean;
};
