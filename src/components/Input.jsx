const Input = ({ name, type = 'text', placeholder, value, error, onChange }) => (
  <>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="p-4 rounded border outline-none border-light-blue-500 focus:bg-light-blue-500"
    />
    {error && <strong className="text-red-400 text-xs px-1">{error}</strong>}
  </>
)

export default Input
