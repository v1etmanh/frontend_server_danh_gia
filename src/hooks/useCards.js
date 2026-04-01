import { useEffect, useState } from 'react';
import { fetchCardsInSet, appraiseCard } from '../services/api';
import useAppStore from '../store/useAppStore';

/**
 * Fetch cards for a specific set, with optimistic appraise update.
 * NOTE: dish.id is TEXT in Supabase — do NOT cast to Number.
 * Returns { cards, loading, error, appraise }
 */
const useCards = (setId) => {
  const { cardsBySet, setCardsForSet, updateCardAppraisal, updateCardSetProgress } = useAppStore();
  const cached = cardsBySet[setId];
  const [loading, setLoading] = useState(!cached);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (cached) return;
    let cancelled = false;
    setLoading(true);

    fetchCardsInSet(setId)
      .then((data) => { if (!cancelled) { setCardsForSet(setId, data); setLoading(false); } })
      .catch((err) => { if (!cancelled) { setError(err.message); setLoading(false); } });

    return () => { cancelled = true; };
  }, [setId]);

  // cardId is TEXT — pass as-is, no Number() cast
  const appraise = async (cardId, appraiseType) => {
    updateCardAppraisal(setId, cardId, appraiseType);   // optimistic
    try {
      const updated = await appraiseCard(cardId, appraiseType);
      updateCardSetProgress(setId, updated.done_count, updated.status);
    } catch (err) {
      updateCardAppraisal(setId, cardId, null);          // rollback
      throw err;
    }
  };

  return { cards: cached ?? [], loading, error, appraise };
};

export default useCards;
