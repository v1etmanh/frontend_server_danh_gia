const APPRAISE_OPTIONS = [
  { value: 'familiar',   label: '✅ Quen thuộc',              style: 'bg-green-100 border-green-500 text-green-800 hover:bg-green-200' },
  { value: 'unfamiliar', label: '❌ Không quen thuộc',         style: 'bg-red-100 border-red-500 text-red-800 hover:bg-red-200' },
  { value: 'name_issue', label: '⚠️ Món ăn hoặc nguyên liệu có vấn đề', style: 'bg-yellow-100 border-yellow-500 text-yellow-800 hover:bg-yellow-200' },
];

/**
 * Three appraise action buttons.
 * Props: { current: string|null, onAppraise: (value) => void, disabled: boolean }
 */
const AppraiseButtons = ({ current, onAppraise, disabled = false }) => (
  <div className="flex flex-col gap-3 mt-4">
    {APPRAISE_OPTIONS.map(({ value, label, style }) => (
      <button
        key={value}
        onClick={() => onAppraise(value)}
        disabled={disabled}
        className={`
          border-2 rounded-xl px-5 py-3 font-medium text-sm transition
          ${style}
          ${current === value ? 'ring-2 ring-offset-1 ring-blue-400 font-bold' : ''}
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {label}
        {current === value && ' ← đã chọn'}
      </button>
    ))}
  </div>
);

export default AppraiseButtons;
