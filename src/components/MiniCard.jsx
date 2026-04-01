const APPRAISE_COLOR = {
  familiar:   'bg-green-100 border-green-400',
  name_issue: 'bg-yellow-100 border-yellow-400',
  unfamiliar: 'bg-red-100 border-red-400',
};

/**
 * Small card tile inside SetPage grid.
 * Props: { card: { id, title, appraise_type }, index: number, onClick }
 */
const MiniCard = ({ card, index, onClick }) => {
  const { title, appraise_type } = card;
  const colorClass = appraise_type ? APPRAISE_COLOR[appraise_type] : 'bg-white border-gray-200';

  return (
    <button
      onClick={onClick}
      className={`border-2 rounded-lg p-3 text-left text-xs transition hover:shadow-md ${colorClass}`}
    >
      <span className="text-gray-400 block mb-0.5">#{index + 1}</span>
      <span className="font-medium line-clamp-2">{title}</span>
      {appraise_type && (
        <span className="block mt-1 text-gray-500 capitalize">{appraise_type.replace('_', ' ')}</span>
      )}
    </button>
  );
};

export default MiniCard;
