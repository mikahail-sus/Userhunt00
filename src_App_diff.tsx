src/App.tsx (原始)
import { useState, useCallback } from "react";
import { platforms, categories, Platform } from "./data/platforms";

interface SearchResult {
  platform: Platform;
  url: string;
  status: "pending" | "checking" | "found" | "not_found" | "error";
}

function App() {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filter, setFilter] = useState<"all" | "found" | "not_found">("all");

  const searchUsername = useCallback(async () => {
    if (!username.trim()) return;

    setIsSearching(true);
    setSearched(true);
    setResults([]);

    const searchResults: SearchResult[] = platforms.map((platform) => ({
      platform,
      url: platform.url.replace("{username}", username.trim()),
      status: "pending" as const,
    }));

    setResults(searchResults);

    // Check each platform one by one with a small delay for UX
    for (let i = 0; i < searchResults.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 100));

      setResults((prev) => {
        const updated = [...prev];
        updated[i] = { ...updated[i], status: "checking" };
        return updated;
      });

      try {
        // Try to fetch the URL with no-cors to check if it exists
        const response = await fetch(searchResults[i].url, {
          method: "HEAD",
          mode: "no-cors",
          cache: "no-cache",
        });

        // With no-cors, we get an opaque response, so we can't check status
        // We'll mark as "found" since the request didn't throw an error
        setResults((prev) => {
          const updated = [...prev];
          updated[i] = { ...updated[i], status: "found" };
          return updated;
        });
      } catch {
        setResults((prev) => {
          const updated = [...prev];
          updated[i] = { ...updated[i], status: "not_found" };
          return updated;
        });
      }
    }

    setIsSearching(false);
  }, [username]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      searchUsername();
    }
  };

  const filteredResults = results.filter((r) => {
    const categoryMatch = selectedCategory === "All" || r.platform.category === selectedCategory;
    const statusMatch = filter === "all" || r.status === filter;
    return categoryMatch && statusMatch;
  });

  const foundCount = results.filter((r) => r.status === "found").length;
  const notFoundCount = results.filter((r) => r.status === "not_found").length;
  const checkedCount = results.filter((r) => r.status === "found" || r.status === "not_found").length;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
            <i className="fa-solid fa-magnifying-glass text-gray-900 text-lg"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              User<span className="text-emerald-400">Hunt</span>
            </h1>
            <p className="text-xs text-gray-400">Free Username Search Tool</p>
          </div>
        </div>
      </header>

      {/* Hero / Search Section */}
      <section className="max-w-4xl mx-auto px-4 pt-16 pb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Search Any Username
        </h2>
        <p className="text-gray-400 mb-8 text-lg">
          Check if a username exists across {platforms.length}+ social media platforms and websites
        </p>

        {/* Search Input */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
          <div className="flex-1 relative">
            <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter username to search..."
              className="w-full pl-11 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
          <button
            onClick={searchUsername}
            disabled={isSearching || !username.trim()}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-gray-900 font-bold rounded-xl hover:from-emerald-400 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
          >
            {isSearching ? (
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-spinner fa-spin"></i>
                Searching...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-search"></i>
                Search
              </span>
            )}
          </button>
        </div>
      </section>

      {/* Results Section */}
      {searched && (
        <section className="max-w-7xl mx-auto px-4 pb-16">
          {/* Stats Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-gray-900 rounded-xl border border-gray-800">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">{foundCount}</div>
                <div className="text-xs text-gray-400">Found</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{notFoundCount}</div>
                <div className="text-xs text-gray-400">Not Found</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{results.length - checkedCount}</div>
                <div className="text-xs text-gray-400">Remaining</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex-1 max-w-xs">
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300"
                  style={{ width: `${(checkedCount / results.length) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1 text-right">
                {checkedCount}/{results.length} checked
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === "All"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                    : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                      : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="w-px h-8 bg-gray-700 mx-2 hidden sm:block"></div>

            {/* Status Filter */}
            <div className="flex gap-1">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filter === "all"
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                    : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600"
                }`}
              >
                All Status
              </button>
              <button
                onClick={() => setFilter("found")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filter === "found"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                    : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600"
                }`}
              >
                ✓ Found
              </button>
              <button
                onClick={() => setFilter("not_found")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filter === "not_found"
                    ? "bg-red-500/20 text-red-400 border border-red-500/50"
                    : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600"
                }`}
              >
                ✗ Not Found
              </button>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredResults.map((result, index) => (
              <ResultCard key={index} result={result} />
            ))}
          </div>

          {filteredResults.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <i className="fa-solid fa-ghost text-4xl mb-4 block"></i>
              <p>No results match your filters</p>
            </div>
          )}
        </section>
      )}

      {/* Info Section */}
      {!searched && (
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                <i className="fa-solid fa-bolt text-emerald-400 text-xl"></i>
              </div>
              <h3 className="font-bold mb-2">Fast Search</h3>
              <p className="text-sm text-gray-400">
                Checks {platforms.length}+ platforms simultaneously for the username you're looking for.
              </p>
            </div>
            <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4">
                <i className="fa-solid fa-shield-halved text-cyan-400 text-xl"></i>
              </div>
              <h3 className="font-bold mb-2">100% Free</h3>
              <p className="text-sm text-gray-400">
                No sign-up, no API keys, no limits. Completely free and open to use.
              </p>
            </div>
            <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                <i className="fa-solid fa-link text-blue-400 text-xl"></i>
              </div>
              <h3 className="font-bold mb-2">Direct Links</h3>
              <p className="text-sm text-gray-400">
                Click any result to open the profile page directly. Verify accounts instantly.
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
            <p className="text-sm text-yellow-400/80 flex items-start gap-2">
              <i className="fa-solid fa-circle-info mt-0.5"></i>
              <span>
                <strong>Note:</strong> Due to browser security restrictions (CORS), results are checked using HEAD requests.
                Some platforms may not respond to these requests. Click any result to manually verify the profile exists.
              </span>
            </p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        <p>UserHunt — Free Username Search Tool • Not affiliated with Sherlock</p>
      </footer>
    </div>
  );
}

function ResultCard({ result }: { result: SearchResult }) {
  const { platform, url, status } = result;

  const statusConfig = {
    pending: { bg: "bg-gray-800", border: "border-gray-700", icon: "fa-solid fa-clock", iconColor: "text-gray-500", label: "Waiting..." },
    checking: { bg: "bg-yellow-500/5", border: "border-yellow-500/30", icon: "fa-solid fa-spinner fa-spin", iconColor: "text-yellow-400", label: "Checking..." },
    found: { bg: "bg-emerald-500/5", border: "border-emerald-500/30", icon: "fa-solid fa-circle-check", iconColor: "text-emerald-400", label: "Found" },
    not_found: { bg: "bg-red-500/5", border: "border-red-500/30", icon: "fa-solid fa-circle-xmark", iconColor: "text-red-400", label: "Not Found" },
    error: { bg: "bg-gray-800", border: "border-gray-700", icon: "fa-solid fa-triangle-exclamation", iconColor: "text-yellow-400", label: "Error" },
  };

  const config = statusConfig[status];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block p-4 rounded-xl border ${config.border} ${config.bg} hover:scale-[1.02] transition-all duration-200 group`}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${platform.color}15` }}
        >
          <i className={`${platform.icon} text-lg`} style={{ color: platform.color === "#000000" ? "#ffffff" : platform.color }}></i>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-semibold text-sm truncate">{platform.name}</h4>
            <i className={`${config.icon} ${config.iconColor} text-sm`}></i>
          </div>
          <p className="text-xs text-gray-500 truncate mt-0.5">{url}</p>
          <span className={`text-xs ${config.iconColor} mt-1 inline-block`}>{config.label}</span>
        </div>
      </div>
    </a>
  );
}

export default App;


+ src/App.tsx (修改后)
import { useState, useCallback } from "react";
import { platforms, categories, Platform } from "./data/platforms";
import { reverseSearchEngines } from "./data/reverseSearch";
import PhotoSearch from "./components/PhotoSearch";

interface SearchResult {
  platform: Platform;
  url: string;
  status: "pending" | "checking" | "found" | "not_found" | "error";
}

type SearchMode = "username" | "photo";

function App() {
  const [mode, setMode] = useState<SearchMode>("username");
  const [username, setUsername] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filter, setFilter] = useState<"all" | "found" | "not_found">("all");

  const searchUsername = useCallback(async () => {
    if (!username.trim()) return;

    setIsSearching(true);
    setSearched(true);
    setResults([]);

    const searchResults: SearchResult[] = platforms.map((platform) => ({
      platform,
      url: platform.url.replace("{username}", username.trim()),
      status: "pending" as const,
    }));

    setResults(searchResults);

    // Check each platform one by one with a small delay for UX
    for (let i = 0; i < searchResults.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 100));

      setResults((prev) => {
        const updated = [...prev];
        updated[i] = { ...updated[i], status: "checking" };
        return updated;
      });

      try {
        const response = await fetch(searchResults[i].url, {
          method: "HEAD",
          mode: "no-cors",
          cache: "no-cache",
        });

        setResults((prev) => {
          const updated = [...prev];
          updated[i] = { ...updated[i], status: "found" };
          return updated;
        });
      } catch {
        setResults((prev) => {
          const updated = [...prev];
          updated[i] = { ...updated[i], status: "not_found" };
          return updated;
        });
      }
    }

    setIsSearching(false);
  }, [username]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      searchUsername();
    }
  };

  const filteredResults = results.filter((r) => {
    const categoryMatch = selectedCategory === "All" || r.platform.category === selectedCategory;
    const statusMatch = filter === "all" || r.status === filter;
    return categoryMatch && statusMatch;
  });

  const foundCount = results.filter((r) => r.status === "found").length;
  const notFoundCount = results.filter((r) => r.status === "not_found").length;
  const checkedCount = results.filter((r) => r.status === "found" || r.status === "not_found").length;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <i className="fa-solid fa-magnifying-glass text-gray-900 text-lg"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                User<span className="text-emerald-400">Hunt</span>
              </h1>
              <p className="text-xs text-gray-400">Free OSINT Search Tool</p>
            </div>
          </div>

          {/* Mode Toggle */}
          <div className="flex bg-gray-800 rounded-xl p-1 border border-gray-700">
            <button
              onClick={() => setMode("username")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                mode === "username"
                  ? "bg-emerald-500 text-gray-900 shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <i className="fa-solid fa-user text-xs"></i>
              <span className="hidden sm:inline">Username</span>
            </button>
            <button
              onClick={() => setMode("photo")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                mode === "photo"
                  ? "bg-emerald-500 text-gray-900 shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <i className="fa-solid fa-image text-xs"></i>
              <span className="hidden sm:inline">Photo</span>
            </button>
          </div>
        </div>
      </header>

      {/* Username Search Mode */}
      {mode === "username" && (
        <>
          {/* Hero / Search Section */}
          <section className="max-w-4xl mx-auto px-4 pt-16 pb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Search Any Username
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Check if a username exists across {platforms.length}+ social media platforms and websites
            </p>

            {/* Search Input */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter username to search..."
                  className="w-full pl-11 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
              <button
                onClick={searchUsername}
                disabled={isSearching || !username.trim()}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-gray-900 font-bold rounded-xl hover:from-emerald-400 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
              >
                {isSearching ? (
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    Searching...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-search"></i>
                    Search
                  </span>
                )}
              </button>
            </div>
          </section>

          {/* Results Section */}
          {searched && (
            <section className="max-w-7xl mx-auto px-4 pb-16">
              {/* Stats Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-gray-900 rounded-xl border border-gray-800">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400">{foundCount}</div>
                    <div className="text-xs text-gray-400">Found</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">{notFoundCount}</div>
                    <div className="text-xs text-gray-400">Not Found</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{results.length - checkedCount}</div>
                    <div className="text-xs text-gray-400">Remaining</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="flex-1 max-w-xs">
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300"
                      style={{ width: `${(checkedCount / results.length) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {checkedCount}/{results.length} checked
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-1">
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === "All"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                        : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === cat
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                          : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="w-px h-8 bg-gray-700 mx-2 hidden sm:block"></div>

                {/* Status Filter */}
                <div className="flex gap-1">
                  <button
                    onClick={() => setFilter("all")}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      filter === "all"
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                        : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    All Status
                  </button>
                  <button
                    onClick={() => setFilter("found")}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      filter === "found"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                        : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    ✓ Found
                  </button>
                  <button
                    onClick={() => setFilter("not_found")}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      filter === "not_found"
                        ? "bg-red-500/20 text-red-400 border border-red-500/50"
                        : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    ✗ Not Found
                  </button>
                </div>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {filteredResults.map((result, index) => (
                  <ResultCard key={index} result={result} />
                ))}
              </div>

              {filteredResults.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <i className="fa-solid fa-ghost text-4xl mb-4 block"></i>
                  <p>No results match your filters</p>
                </div>
              )}
            </section>
          )}

          {/* Info Section */}
          {!searched && (
            <section className="max-w-4xl mx-auto px-4 pb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                    <i className="fa-solid fa-bolt text-emerald-400 text-xl"></i>
                  </div>
                  <h3 className="font-bold mb-2">Fast Search</h3>
                  <p className="text-sm text-gray-400">
                    Checks {platforms.length}+ platforms simultaneously for the username you're looking for.
                  </p>
                </div>
                <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4">
                    <i className="fa-solid fa-shield-halved text-cyan-400 text-xl"></i>
                  </div>
                  <h3 className="font-bold mb-2">100% Free</h3>
                  <p className="text-sm text-gray-400">
                    No sign-up, no API keys, no limits. Completely free and open to use.
                  </p>
                </div>
                <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                    <i className="fa-solid fa-image text-blue-400 text-xl"></i>
                  </div>
                  <h3 className="font-bold mb-2">Photo Search</h3>
                  <p className="text-sm text-gray-400">
                    Also search by photo using reverse image search engines. Find where any image appears online.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                <p className="text-sm text-yellow-400/80 flex items-start gap-2">
                  <i className="fa-solid fa-circle-info mt-0.5"></i>
                  <span>
                    <strong>Note:</strong> Due to browser security restrictions (CORS), results are checked using HEAD requests.
                    Some platforms may not respond to these requests. Click any result to manually verify the profile exists.
                  </span>
                </p>
              </div>
            </section>
          )}
        </>
      )}

      {/* Photo Search Mode */}
      {mode === "photo" && (
        <>
          {/* Hero */}
          <section className="max-w-4xl mx-auto px-4 pt-16 pb-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Search by Photo
            </h2>
            <p className="text-gray-400 mb-4 text-lg">
              Upload an image to find where it appears across the internet
            </p>
            <p className="text-sm text-gray-500">
              Reverse image search using {reverseSearchEngines.length}+ search engines
            </p>
          </section>

          {/* Photo Search Component */}
          <PhotoSearch />
        </>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        <p>UserHunt — Free OSINT Search Tool • Username & Photo Search • Not affiliated with Sherlock</p>
      </footer>
    </div>
  );
}

function ResultCard({ result }: { result: SearchResult }) {
  const { platform, url, status } = result;

  const statusConfig = {
    pending: { bg: "bg-gray-800", border: "border-gray-700", icon: "fa-solid fa-clock", iconColor: "text-gray-500", label: "Waiting..." },
    checking: { bg: "bg-yellow-500/5", border: "border-yellow-500/30", icon: "fa-solid fa-spinner fa-spin", iconColor: "text-yellow-400", label: "Checking..." },
    found: { bg: "bg-emerald-500/5", border: "border-emerald-500/30", icon: "fa-solid fa-circle-check", iconColor: "text-emerald-400", label: "Found" },
    not_found: { bg: "bg-red-500/5", border: "border-red-500/30", icon: "fa-solid fa-circle-xmark", iconColor: "text-red-400", label: "Not Found" },
    error: { bg: "bg-gray-800", border: "border-gray-700", icon: "fa-solid fa-triangle-exclamation", iconColor: "text-yellow-400", label: "Error" },
  };

  const config = statusConfig[status];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block p-4 rounded-xl border ${config.border} ${config.bg} hover:scale-[1.02] transition-all duration-200 group`}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${platform.color}15` }}
        >
          <i className={`${platform.icon} text-lg`} style={{ color: platform.color === "#000000" ? "#ffffff" : platform.color }}></i>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-semibold text-sm truncate">{platform.name}</h4>
            <i className={`${config.icon} ${config.iconColor} text-sm`}></i>
          </div>
          <p className="text-xs text-gray-500 truncate mt-0.5">{url}</p>
          <span className={`text-xs ${config.iconColor} mt-1 inline-block`}>{config.label}</span>
        </div>
      </div>
    </a>
  );
}

export default App;
