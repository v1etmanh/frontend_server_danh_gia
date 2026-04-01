import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCardSets from '../hooks/useCardSets';
import SetCard from '../components/SetCard';
import FilterBar from '../components/FilterBar';

const HomePage = () => {
  const navigate = useNavigate();
  const { cardSets, loading, error, refetch } = useCardSets();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? cardSets
    : cardSets.filter((s) => s.status === filter);

  if (loading) return <div className="p-8 text-center text-gray-500">Đang tải...</div>;
  if (error)   return <div className="p-8 text-center text-red-500">Lỗi: {error}</div>;

  const done  = cardSets.filter((s) => s.status === 'done').length;
  const total = cardSets.length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">🍜 Thẩm định món ăn</h1>
            <p className="text-gray-500 mt-1">{done}/{total} bộ hoàn thành</p>
          </div>
          <button onClick={refetch} disabled={loading}
            className="text-sm px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-40 transition">
            🔄 Tải lại
          </button>
        </div>
      </div>

      <div className="mb-4">
        <FilterBar active={filter} onChange={setFilter} />
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-400 text-center py-12">Không có bộ nào.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filtered.map((set) => (
            <SetCard key={set.id} set={set} onClick={() => navigate(`/set/${set.id}`)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
