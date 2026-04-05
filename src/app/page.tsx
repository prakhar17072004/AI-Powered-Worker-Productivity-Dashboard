export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-brfrom-blue-600 to-gray-700 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-500 mb-7">
          AI Productivity Dashboard
        </h1>

        <p className="text-gray-500 mb-12">
          Monitor worker efficiency, activity time, and production metrics in real time.
        </p>

        <a
          href="/dashboard"
          className="inline-block bg-blue-700 hover:bg-blue-900 text-white font-medium px-6 py-4 rounded-lg transition duration-300"
        >
          Go to Dashboard →
        </a>
      </div>
    </div>
  );
}