import {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";

const PhotoUploader = forwardRef(
  (
    {
      label,
      posterUrl,
    }: {
      label: string;
      posterUrl?: string;
    },
    ref: React.Ref<{ validate: () => boolean }>
  ) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (file) {
        setPreview(URL.createObjectURL(file));
      } else if (posterUrl) {
        setPreview(posterUrl);
      } else {
        setPreview("/no-image-placeholder.png");
      }
    }, [file, posterUrl]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const uploadedFile = e.target.files?.[0];
      if (uploadedFile) {
        setFile(uploadedFile);
        setError(null);
      }
    };

    const handleButtonClick = () => {
      inputRef.current?.click();
    };

    useImperativeHandle(ref, () => ({
      validate: () => {
        const isValid = !!file || !!posterUrl;
        setError(isValid ? null : "Zdjęcie jest wymagane.");
        return isValid;
      },
    }));

    return (
      <div>
        <label className="block text-sm mb-1">{label}</label>
        <div className="flex items-center gap-4">
          <div className="w-32 h-48 border border-white rounded overflow-hidden bg-gray-900 flex items-center justify-center">
            <img
              src={preview}
              alt="Movie Poster"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <input
              ref={inputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={handleButtonClick}
              className="bg-secondary-gradient text-white px-4 py-2 rounded"
            >
              Dodaj obraz
            </button>
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          </div>
        </div>
      </div>
    );
  }
);

export default PhotoUploader;
