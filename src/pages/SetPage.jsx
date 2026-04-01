import { useParams, useNavigate } from 'react-router-dom';
import useCards from '../hooks/useCards';
import useAppStore from '../store/useAppStore';
import ProgressBar from '../components/ProgressBar';
import MiniCard from '../components/MiniCard';
import { exportSetCSV } from '../services/api';

const SetPage = () => {
  const { id } = useParams();
  const setId = Number(id);
  const navigate = useNavigate();
  const { cards, loading, error } = useCards(setId);
  const cardSet = useAppStore((s) => s.cardSets.find((cs) => cs.id === setId));

  const handleExport = async () => {
    try {
      const blob = await exportSetCSV(setId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `set_${setId}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Export thất bại: ' + err.message);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Đang tải thẻ...</div>;
  if (error)   return <div className="p-8 text-center text-red-500">Lỗi: {error}</div>;

  const done  = cards.filter((c) => c.appraise_type !== null).length;
  const isDone = done === cards.length && cards.length > 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        <div>
          <button onClick={() => navigate('/')} className="text-blue-500 text-sm hover:underline">← Trang chủ</button>
          <h2 className="text-xl font-bold text-gray-800 mt-1">{cardSet?.name ?? `Bộ ${id}`}</h2>
        </div>
        <button onClick={handleExport} className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg border">
          ⬇ Export CSV
        </button>
      </div>

      <div className="mb-6">
        <ProgressBar done={done} total={cards.length} />
        {isDone && (
          <div className="mt-3 flex items-center justify-between bg-green-50 border border-green-300 rounded-xl px-4 py-3">
            <span className="text-green-700 text-sm font-medium">🎉 Bộ này đã hoàn thành!</span>
            <button onClick={() => navigate(`/set/${setId}/completed`)}
              className="text-sm text-green-700 font-semibold hover:underline">
              Xem kết quả →
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {cards.map((card, i) => (
          <MiniCard key={card.id} card={card} index={i} onClick={() => navigate(`/set/${setId}/card/${card.id}`)} />
        ))}
      </div>
    </div>
  );
};

export default SetPage;
