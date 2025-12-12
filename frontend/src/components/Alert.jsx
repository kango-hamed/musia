export const Alert = ({ type = 'error', message, onClose }) => {
  const styles = {
    error: 'bg-red-50 border-red-500 text-red-800',
    success: 'bg-green-50 border-green-500 text-green-800'
  };

  return (
    <div className={`border-l-4 p-4 mb-4 rounded ${styles[type]}`}>
      <div className="flex justify-between items-start">
        <p className="text-sm">{message}</p>
        {onClose && (
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        )}
      </div>
    </div>
  );
};
