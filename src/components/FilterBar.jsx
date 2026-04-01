const FILTERS = [
  { value: 'all',         label: 'Tất cả' },
  { value: 'pending',     label: 'Chưa làm' },
  { value: 'in_progress', label: 'Đang làm' },
  { value: 'done',        label: 'Xong' },
];

/**
 * Filter bar for HomePage.
 * Props: { active: string, onChange: (value) => void }
 */
const FilterBar = ({ active, onChange }) => (
  <div className="flex gap-2 flex-wrap">
    {FILTERS.map(({ value, label }) => (
      <button
        key={value}
        onClick={() => onChange(value)}
        className={`
          px-4 py-1.5 rounded-full text-sm font-medium border transition
          ${active === value
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'}
        `}
      >
        {label}
      </button>
    ))}
  </div>
);

export default FilterBar;
