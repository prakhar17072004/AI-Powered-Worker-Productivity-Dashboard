CREATE TABLE workers (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL
);

CREATE TABLE workstations (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  timestamp TIMESTAMP NOT NULL,
  worker_id VARCHAR REFERENCES workers(id),
  workstation_id VARCHAR REFERENCES workstations(id),
  event_type VARCHAR NOT NULL CHECK (
    event_type IN ('working','idle','absent','product_count')
  ),
  confidence FLOAT,
  count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(timestamp, worker_id, workstation_id, event_type)
);

CREATE INDEX idx_events_worker ON events(worker_id);
CREATE INDEX idx_events_station ON events(workstation_id);
CREATE INDEX idx_events_time ON events(timestamp);