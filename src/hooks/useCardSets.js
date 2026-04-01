import { useEffect, useState } from 'react';
import { fetchCardSets } from '../services/api';
import useAppStore from '../store/useAppStore';

/**
 * Fetch card sets, cache in global store.
 * Returns { cardSets, loading, error, refetch }
 */
const useCardSets = () => {
  const { cardSets, setCardSets } = useAppStore();
  const [loading, setLoading] = useState(cardSets.length === 0);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);
    fetchCardSets()
      .then((data) => { setCardSets(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  };

  useEffect(() => {
    if (cardSets.length > 0) return; // already cached
    load();
  }, []);

  return { cardSets, loading, error, refetch: load };
};

export default useCardSets;
