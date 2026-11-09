import { createContext, useCallback, useContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { dishById } from '../data/dishes';

// Общее состояние сайта, хранится в localStorage:
// cart — [{ id, qty }], favorites — [id], history — [id] (последние просмотренные),
// lastOrder — { number, slot, items: [{ id, qty }], date }, promo — применённый промокод
const StoreContext = createContext(null);

const HISTORY_LIMIT = 8;

export function StoreProvider({ children }) {
  const [cart, setCart] = useLocalStorage('food:cart', []);
  const [favorites, setFavorites] = useLocalStorage('food:favorites', []);
  const [history, setHistory] = useLocalStorage('food:history', []);
  const [lastOrder, setLastOrder] = useLocalStorage('food:last-order', null);
  const [promo, setPromo] = useLocalStorage('food:promo', '');

  const getQty = useCallback((id) => cart.find((line) => line.id === id)?.qty || 0, [cart]);

  const setQty = useCallback(
    (id, qty) => {
      setCart((prev) => {
        if (qty <= 0) return prev.filter((line) => line.id !== id);
        if (prev.some((line) => line.id === id)) {
          return prev.map((line) => (line.id === id ? { ...line, qty } : line));
        }
        return [...prev, { id, qty }];
      });
    },
    [setCart],
  );

  const addToCart = useCallback((id, qty = 1) => setQty(id, getQty(id) + qty), [getQty, setQty]);

  const clearCart = useCallback(() => {
    setCart([]);
    setPromo('');
  }, [setCart, setPromo]);

  const toggleFavorite = useCallback(
    (id) => setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    [setFavorites],
  );

  const addToHistory = useCallback(
    (id) => setHistory((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, HISTORY_LIMIT)),
    [setHistory],
  );

  // Кладёт позиции прошлого заказа в корзину (к тому, что уже есть)
  const repeatLastOrder = useCallback(() => {
    if (!lastOrder) return;
    setCart((prev) => {
      const next = [...prev];
      lastOrder.items.forEach(({ id, qty }) => {
        if (!dishById[id]) return;
        const index = next.findIndex((line) => line.id === id);
        if (index >= 0) next[index] = { ...next[index], qty: next[index].qty + qty };
        else next.push({ id, qty });
      });
      return next;
    });
  }, [lastOrder, setCart]);

  const value = useMemo(
    () => ({
      cart,
      favorites,
      history,
      lastOrder,
      promo,
      getQty,
      setQty,
      addToCart,
      clearCart,
      toggleFavorite,
      addToHistory,
      setLastOrder,
      setPromo,
      repeatLastOrder,
    }),
    [cart, favorites, history, lastOrder, promo, getQty, setQty, addToCart, clearCart, toggleFavorite, addToHistory, setLastOrder, setPromo, repeatLastOrder],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
