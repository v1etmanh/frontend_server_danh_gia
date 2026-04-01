import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCards from '../hooks/useCards';
import AppraiseButtons from '../components/AppraiseButtons';

const CardView = () => {
  const { id: setId, cardId } = useParams();
  const navigate = useNavigate();
  const { cards, appraise } = useCards(Number(setId));
  const [submitting, setSubmitting] = useState(false);
  const [flashMsg, setFlashMsg] = useState('');

  const card         = cards.find((c) => c.id === cardId);
  const currentIndex = cards.findIndex((c) => c.id === cardId);
  const prevCard     = cards[currentIndex - 1];
  const nextCard     = cards[currentIndex + 1];

  if (!card) return <div className="p-8 text-center text-gray-400">Không tìm thấy thẻ.</div>;

  const handleAppraise = async (value) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await appraise(cardId, value);
      setFlashMsg('✅ Đã lưu');
      if (nextCard) setTimeout(() => navigate(`/set/${setId}/card/${nextCard.id}`), 600);
    } catch {
      setFlashMsg('❌ Lỗi lưu — thử lại');
    } finally {
      setSubmitting(false);
      setTimeout(() => setFlashMsg(''), 1500);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
        <button onClick={() => navigate(`/set/${setId}`)} className="hover:underline text-blue-500">
          ← Bộ thẻ
        </button>
        <span>{currentIndex + 1} / {cards.length}</span>
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h2>

        <div className="flex gap-3 flex-wrap text-xs text-gray-500 mb-3">
          {card.is_vegan      && <span className="bg-green-100 px-2 py-0.5 rounded-full">🌿 Vegan</span>}
          {card.is_vegetarian && <span className="bg-lime-100 px-2 py-0.5 rounded-full">🥗 Chay</span>}
          {card.cook_time_minutes && <span className="bg-gray-100 px-2 py-0.5 rounded-full">⏱ {card.cook_time_minutes} phút</span>}
        </div>

        {card.description
          ? <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
          : <p className="text-sm text-gray-400 italic">Không có mô tả.</p>}

        {card.ingredient_names?.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-semibold text-gray-500 mb-1.5">🧂 Nguyên liệu</p>
            <div className="flex flex-wrap gap-1.5">
              {card.ingredient_names.map((name) => (
                <span key={name} className="text-xs bg-gray-100 text-gray-700 rounded-full px-2 py-0.5">
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}

        {card.allergen_summary && (
          <p className="mt-3 text-xs text-orange-600 bg-orange-50 rounded-lg px-3 py-2">
            ⚠ Dị ứng: {card.allergen_summary}
          </p>
        )}
      </div>

      {flashMsg && <p className="text-center mt-3 font-medium text-sm">{flashMsg}</p>}

      <AppraiseButtons current={card.appraise_type} onAppraise={handleAppraise} disabled={submitting} />

      <div className="flex justify-between mt-6 text-sm">
        <button onClick={() => prevCard && navigate(`/set/${setId}/card/${prevCard.id}`)}
          disabled={!prevCard} className="text-blue-500 disabled:text-gray-300 hover:underline">← Trước</button>
        <button onClick={() => nextCard && navigate(`/set/${setId}/card/${nextCard.id}`)}
          disabled={!nextCard} className="text-blue-500 disabled:text-gray-300 hover:underline">Tiếp →</button>
      </div>
    </div>
  );
};

export default CardView;
