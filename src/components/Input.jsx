import { useState } from 'react'

const Input = ({ id, name, type = 'text', placeholder, value, error, onChange, accept }) => {
  const [fileName, setFileName] = useState('파일을 선택하세요')

  const handleFileChange = e => {
    const file = e.target.files?.[0]
    setFileName(file ? file.name : '파일을 선택하세요')
    onChange && onChange(e)
  }

  return (
    <>
      {type === 'file' ? (
        <label htmlFor={id} className="block w-full cursor-pointer">
          <div className="w-full p-4 rounded border border-gray-400 bg-violet-100 text-gray-500 hover:bg-violet-200 truncate">
            {fileName}
          </div>
          <input
            id={id}
            name={name}
            type="file"
            onChange={handleFileChange}
            accept={accept}
            className="hidden"
          />
        </label>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full p-4 rounded border border-gray-400 outline-none border-light-blue-500 focus:bg-light-blue-500"
        />
      )}
      {error && <strong className="text-red-400 text-xs px-1 block mt-1">{error}</strong>}
    </>
  )
}

export default Input
