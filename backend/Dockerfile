FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app
COPY . /app

RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir .

RUN chmod +x /app/docker/entrypoint.sh

EXPOSE 6543

ENV APP_CONFIG=production.ini \
    ALEMBIC_CONFIG=production.ini

ENTRYPOINT ["/app/docker/entrypoint.sh"]
