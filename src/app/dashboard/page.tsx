async function getData() {
    const res = await fetch("http://localhost:3000/api/metrics", { cache: "no-store" });
    return res.json();
  }
  
  export default async function Dashboard() {
    const data = await getData();
  
    return (
      <div style={{ padding: 20 }}>
        <h1>Factory Dashboard</h1>
        {data.map((worker: any) => (
          <div key={worker.worker_id}>
            <h3>{worker.worker_id}</h3>
            <p>Total Units: {worker.total_units}</p>
            <p>Working Events: {worker.working_events}</p>
            <p>Idle Events: {worker.idle_events}</p>
          </div>
        ))}
      </div>
    );
  }