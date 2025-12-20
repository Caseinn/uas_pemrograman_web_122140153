#!/bin/sh
set -e

if [ -z "$DATABASE_URL" ]; then
  echo "DATABASE_URL is not set"
  exit 1
fi

echo "Waiting for database..."
python - <<'PY'
import os
import time
import psycopg2

db_url = os.environ.get("DATABASE_URL")
max_tries = int(os.environ.get("DB_WAIT_RETRIES", "30"))
delay = float(os.environ.get("DB_WAIT_DELAY", "2"))

for attempt in range(1, max_tries + 1):
    try:
        conn = psycopg2.connect(db_url)
        conn.close()
        print("Database is ready.")
        break
    except Exception as exc:
        print(f"Database not ready ({attempt}/{max_tries}): {exc}")
        time.sleep(delay)
else:
    raise SystemExit("Database never became ready")
PY

echo "Running migrations..."
alembic -c "${ALEMBIC_CONFIG:-production.ini}" upgrade head

echo "Seeding database..."
initialize_backend_db "${APP_CONFIG:-production.ini}"

echo "Starting backend..."
exec pserve "${APP_CONFIG:-production.ini}"
