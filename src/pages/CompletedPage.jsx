import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useCards from '../hooks/useCards';
import AppraiseButtons from '../components/AppraiseButtons';

const LABEL = {
  familiar:   '✅ Quen thuộc',
  unfamiliar: '❌ Không quen thuộc',
  name_issue: '⚠️ Tên có vấn đề',
};

const CompletedPage = () => {
  const { id: setId } = useParams();
  const navigate = useNavigate();
  const { cards, appraise } = useCards(Number(setId));
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const doneCards    = cards.filter((c) => c.appraise_type !== null);
  const pendingCards = cards.filter((c) => c.appraise_type === null);

  const handleReappraise = async (cardId, value) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await appraise(cardId, value);
      setEditingId(null);
    } catch {
      alert('Lỗi lưu — thử lại');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button onClick={() => navigate(`/set/${setId}`)}
        className="text-blue-500 text-sm hover:underline mb-4 block">← Quay lại bộ thẻ</button>
      <h2 className="text-xl font-bold text-gray-800 mb-1">Kết quả bộ {setId}</h2>
      <p className="text-gray-500 text-sm mb-6">
        {doneCards.length}/{cards.length} đã thẩm định
        {pendingCards.length > 0 && <span className="text-yellow-600"> · {pendingCards.length} còn lại</span>}
      </p>

      <div className="space-y-3">
        {cards.map((card, i) => (
          <div key={card.id} className="border rounded-xl p-4 bg-white">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs text-gray-400">#{i + 1}</p>
                <p className="font-medium text-gray-800">{card.title}</p>
                {card.appraise_type && editingId !== card.id && (
                  <p className="text-sm mt-1">{LABEL[card.appraise_type]}</p>
                )}
              </div>
              <button onClick={() => setEditingId(editingId === card.id ? null : card.id)}
                className="text-xs text-blue-500 hover:underline shrink-0">
                {editingId === card.id ? 'Huỷ' : 'Sửa'}
              </button>
            </div>
            {editingId === card.id && (
              <AppraiseButtons current={card.appraise_type}
                onAppraise={(v) => handleReappraise(card.id, v)} disabled={submitting} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedPage;
