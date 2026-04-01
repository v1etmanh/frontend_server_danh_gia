import { create } from 'zustand';

/**
 * Global app state — giữ cardSets + activeSet để tránh re-fetch không cần thiết.
 * Cards được lưu per-set để navigation qua lại không mất trạng thái.
 */
const useAppStore = create((set) => ({
  // CardSets list
  cardSets: [],
  setCardSets: (cardSets) => set({ cardSets }),

  updateCardSetProgress: (setId, doneCount, status) =>
    set((state) => ({
      cardSets: state.cardSets.map((s) =>
        s.id === setId ? { ...s, done_count: doneCount, status } : s
      ),
    })),

  // Cards per set — keyed by setId
  cardsBySet: {},
  setCardsForSet: (setId, cards) =>
    set((state) => ({ cardsBySet: { ...state.cardsBySet, [setId]: cards } })),

  updateCardAppraisal: (setId, cardId, appraiseType) =>
    set((state) => {
      const cards = state.cardsBySet[setId] ?? [];
      return {
        cardsBySet: {
          ...state.cardsBySet,
          [setId]: cards.map((c) => (c.id === cardId ? { ...c, appraise_type: appraiseType } : c)),
        },
      };
    }),
}));

export default useAppStore;
