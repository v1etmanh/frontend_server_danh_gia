const STATUS_STYLES = {
  done: 'bg-green-100 border-green-400 text-green-800',
  in_progress: 'bg-yellow-50 border-yellow-400 text-yellow-800',
  pending: 'bg-white border-gray-200 text-gray-700',
};

const STATUS_LABEL = {
  done: 'Xong',
  in_progress: 'Đang làm',
  pending: 'Chưa làm',
};

/**
 * Single card set tile shown on HomePage grid.
 * Props: { set: { id, name, total_cards, done_count, status }, onClick }
 */
const SetCard = ({ set, onClick }) => {
  const { name, total_cards, done_count, status } = set;
  const percent = Math.round((done_count / total_cards) * 100);
  const styleClass = STATUS_STYLES[status] ?? STATUS_STYLES.pending;

  return (
    <button
      onClick={onClick}
      className={`border-2 rounded-xl p-4 text-left transition hover:shadow-md ${styleClass}`}
    >
      <p className="font-semibold text-sm">{name}</p>
      <p className="text-xs mt-1">{done_count}/{total_cards} món</p>
      <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-green-500 rounded-full" style={{ width: `${percent}%` }} />
      </div>
      <span className="text-xs mt-1 inline-block">{STATUS_LABEL[status]}</span>
    </button>
  );
};

export default SetCard;
