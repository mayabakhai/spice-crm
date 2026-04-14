export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gray-200"></div>
            <div className="h-8 w-48 rounded bg-gray-200"></div>
          </div>
          <div className="h-6 w-32 rounded-full bg-gray-200"></div>
        </header>
        <div className="h-12 w-full rounded border-b border-gray-200 bg-gray-50"></div>
        <div className="space-y-6">
          <div className="h-10 w-40 rounded bg-gray-200"></div>
          <div className="h-64 w-full rounded-xl border border-gray-200 bg-white"></div>
        </div>
      </div>
    </div>
  );
}
