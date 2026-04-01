/**
 * Progress bar for SetPage.
 * Props: { done: number, total: number }
 */
const ProgressBar = ({ done, total }) => {
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>{done}/{total} món đã thẩm định</span>
        <span className="font-semibold">{percent}%</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
