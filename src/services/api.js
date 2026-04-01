import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Card Sets ─────────────────────────────────────────────
export const fetchCardSets = () =>
  apiClient.get('/api/card-sets').then((r) => r.data);

export const fetchCardsInSet = (setId) =>
  apiClient.get(`/api/card-sets/${setId}/cards`).then((r) => r.data);

export const exportSetCSV = (setId) =>
  apiClient.get(`/api/card-sets/${setId}/export`, { responseType: 'blob' }).then((r) => r.data);

// ── Cards ─────────────────────────────────────────────────
export const appraiseCard = (cardId, appraiseType) =>
  apiClient.patch(`/api/cards/${cardId}/appraise`, { appraise_type: appraiseType }).then((r) => r.data);

export const fetchStats = () =>
  apiClient.get('/api/cards/stats').then((r) => r.data);
