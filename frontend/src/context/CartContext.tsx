import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { formatCurrency, storeConfig } from "../config";
import type { Produto } from "../types/produto";
import { urlImagemAbsoluta } from "../lib/api";

const STORAGE_KEY = "shop_starter_cart";

export type ItemCarrinho = {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  imagemUrl: string | null;
};

type CartContextValue = {
  itens: ItemCarrinho[];
  totalItens: number;
  totalPreco: number;
  adicionar: (produto: Produto) => void;
  atualizarQuantidade: (id: number, delta: number) => void;
  remover: (id: number) => void;
  limpar: () => void;
  abrirWhatsAppPedido: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function carregarInicial(): ItemCarrinho[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x): x is ItemCarrinho =>
        x &&
        typeof x === "object" &&
        typeof (x as ItemCarrinho).id === "number" &&
        typeof (x as ItemCarrinho).quantidade === "number",
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>(carregarInicial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
  }, [itens]);

  const adicionar = useCallback((produto: Produto) => {
    setItens((prev) => {
      const existente = prev.find((p) => p.id === produto.id);
      const img = urlImagemAbsoluta(produto.imagemUrl);
      if (existente) {
        return prev.map((p) =>
          p.id === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p,
        );
      }
      return [
        ...prev,
        {
          id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          quantidade: 1,
          imagemUrl: img,
        },
      ];
    });
  }, []);

  const atualizarQuantidade = useCallback((id: number, delta: number) => {
    setItens((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantidade: item.quantidade + delta }
            : item,
        )
        .filter((item) => item.quantidade > 0),
    );
  }, []);

  const remover = useCallback((id: number) => {
    setItens((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const limpar = useCallback(() => setItens([]), []);

  const totalItens = useMemo(
    () => itens.reduce((acc, i) => acc + i.quantidade, 0),
    [itens],
  );

  const totalPreco = useMemo(
    () => itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0),
    [itens],
  );

  const abrirWhatsAppPedido = useCallback(() => {
    if (itens.length === 0) {
      window.alert("Seu carrinho está vazio.");
      return;
    }
    if (!storeConfig.whatsapp) {
      window.alert("Configure VITE_WHATSAPP_NUMBER antes de finalizar o pedido.");
      return;
    }
    let msg = `Olá! Gostaria de realizar um pedido na ${storeConfig.name}.\n\n`;
    for (const item of itens) {
      msg += `• ${item.nome} (${item.quantidade}x) — ${formatCurrency(item.preco)} cada\n`;
    }
    msg += `\nTotal: ${formatCurrency(totalPreco)}\n`;
    const url = `https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [itens, totalPreco]);

  const value = useMemo(
    (): CartContextValue => ({
      itens,
      totalItens,
      totalPreco,
      adicionar,
      atualizarQuantidade,
      remover,
      limpar,
      abrirWhatsAppPedido,
    }),
    [
      itens,
      totalItens,
      totalPreco,
      adicionar,
      atualizarQuantidade,
      remover,
      limpar,
      abrirWhatsAppPedido,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de CartProvider");
  return ctx;
}
