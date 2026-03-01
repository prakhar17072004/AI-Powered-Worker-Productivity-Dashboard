export const dynamic = "force-dynamic";

type WorkerMetric = {
  worker_id: string;
  active_time: number;
  idle_time: number;
  total_units: number;
};

async function getData(): Promise<WorkerMetric[]> {
  try {
    const res = await fetch("/api/metrics", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("API failed:", res.status);
      return [];
    }

    return res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}

export default async function Dashboard() {
  const data = await getData();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Factory Metrics
      </h1>

      {data.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No data available
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((w) => (
            <div
              key={w.worker_id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                {w.worker_id}
              </h3>

              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium">Active Time:</span>{" "}
                  {w.active_time} sec
                </p>
                <p>
                  <span className="font-medium">Idle Time:</span>{" "}
                  {w.idle_time} sec
                </p>
                <p>
                  <span className="font-medium">Total Units:</span>{" "}
                  {w.total_units}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}