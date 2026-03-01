export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          AI Productivity Dashboard
        </h1>

        <p className="text-gray-500 mb-8">
          Monitor worker efficiency, activity time, and production metrics in real time.
        </p>

        <a
          href="/dashboard"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition duration-300"
        >
          Go to Dashboard →
        </a>
      </div>
    </div>
  );
}