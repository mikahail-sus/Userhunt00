 src/components/PhotoSearch.tsx (原始)


+ src/components/PhotoSearch.tsx (修改后)
import { useState, useRef, useCallback } from "react";
import { reverseSearchEngines, reverseSearchCategories, ReverseSearchEngine } from "../data/reverseSearch";

export default function PhotoSearch() {
  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setImageName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clearImage = () => {
    setImage(null);
    setImageName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const filteredEngines = reverseSearchEngines.filter(
    (engine) => selectedCategory === "all" || engine.category === selectedCategory
  );

  return (
    <section className="max-w-7xl mx-auto px-4 pb-16">
      {/* Upload Area */}
      <div className="max-w-3xl mx-auto mb-10">
        {!image ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`relative cursor-pointer border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
              isDragging
                ? "border-emerald-400 bg-emerald-500/10 scale-[1.02]"
                : "border-gray-700 bg-gray-900/50 hover:border-gray-500 hover:bg-gray-800/50"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
              <i className="fa-solid fa-cloud-arrow-up text-3xl text-emerald-400"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">Drop an image here</h3>
            <p className="text-gray-400 mb-4">or click to browse files</p>
            <p className="text-xs text-gray-500">
              Supports JPG, PNG, GIF, WebP • Max 10MB recommended
            </p>
          </div>
        ) : (
          <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
            <div className="relative">
              <img
                src={image}
                alt="Uploaded preview"
                className="w-full max-h-80 object-contain bg-gray-950"
              />
              <button
                onClick={clearImage}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center transition-colors"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-image text-emerald-400"></i>
                <span className="text-sm text-gray-300 truncate max-w-xs">{imageName}</span>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <i className="fa-solid fa-arrows-rotate mr-1"></i>
                Change image
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          </div>
        )}
      </div>

      {/* Info Banner */}
      <div className="max-w-3xl mx-auto mb-8 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
        <p className="text-sm text-blue-400/80 flex items-start gap-2">
          <i className="fa-solid fa-circle-info mt-0.5"></i>
          <span>
            <strong>How it works:</strong> Upload a photo, then click any search engine below to open it.
            Upload the same image there to find where it appears online. Each engine specializes in different types of searches.
          </span>
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {reverseSearchCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              selectedCategory === cat.id
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600"
            }`}
          >
            <i className={`${cat.icon} text-xs`}></i>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search Engines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEngines.map((engine) => (
          <EngineCard key={engine.name} engine={engine} hasImage={!!image} />
        ))}
      </div>
    </section>
  );
}

function EngineCard({ engine, hasImage }: { engine: ReverseSearchEngine; hasImage: boolean }) {
  const categoryLabels: Record<string, string> = {
    general: "General",
    face: "Face Search",
    art: "Art & Anime",
    product: "Products",
  };

  const categoryColors: Record<string, string> = {
    general: "text-blue-400 bg-blue-500/10",
    face: "text-purple-400 bg-purple-500/10",
    art: "text-pink-400 bg-pink-500/10",
    product: "text-amber-400 bg-amber-500/10",
  };

  return (
    <a
      href={engine.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-5 bg-gray-900 rounded-xl border border-gray-800 hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-200 group hover:scale-[1.02]"
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${engine.color}15` }}
        >
          <i className={`${engine.icon} text-xl`} style={{ color: engine.color }}></i>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors">
              {engine.name}
            </h4>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${categoryColors[engine.category]}`}>
              {categoryLabels[engine.category]}
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">{engine.description}</p>
          <div className="mt-3 flex items-center gap-1 text-xs text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Open {engine.name}</span>
            <i className="fa-solid fa-arrow-right text-[10px]"></i>
          </div>
        </div>
      </div>
      {!hasImage && (
        <div className="mt-3 pt-3 border-t border-gray-800">
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <i className="fa-solid fa-upload"></i>
            Upload your image on their website
          </p>
        </div>
      )}
    </a>
  );
}
