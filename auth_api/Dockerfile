FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONUNBUFFERED=1

CMD ["/usr/local/bin/gunicorn", "--bind", "0.0.0.0:8000", "auth_api.wsgi:application"]
