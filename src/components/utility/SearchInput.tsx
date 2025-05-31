import { ChangeEvent, useState } from "react";

const SearchInput: React.FC<{
  setValue: (val: string) => void;
  placeholder?: string;
}> = ({ setValue, placeholder = "Szukaj filmów..." }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setValue(val);
  };

  const clearInput = () => {
    setInputValue("");
    setValue("");
  };

  return (
    <div className="w-full relative">
      {/* Search icon */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <i className="fi fi-br-search leading-none text-gray-500"></i>
      </div>

      {/* Clear (X) button */}
      {inputValue && (
        <button
          onClick={clearInput}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          <i className="fi fi-br-cross-small"></i>
        </button>
      )}

      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        className="w-full pl-10 pr-10 py-2 rounded-md bg-zinc-900 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-zinc-700"
      />
    </div>
  );
};

export default SearchInput;
