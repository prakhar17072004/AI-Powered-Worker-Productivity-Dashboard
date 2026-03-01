export const dynamic = "force-dynamic";

async function getData() {
  const res = await fetch("http://localhost:3000/api/metrics", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
}

export default async function Dashboard() {
  const data = await getData();

  return (
    <div style={{ padding: 20 }}>
      <h1>Factory Metrics</h1>

      {data.map((w: any) => (
        <div key={w.worker_id} style={{ marginBottom: 20 }}>
          <h3>{w.worker_id}</h3>
          <p>Active Time (sec): {w.active_time}</p>
          <p>Idle Time (sec): {w.idle_time}</p>
          <p>Total Units: {w.total_units}</p>
        </div>
      ))}
    </div>
  );
}