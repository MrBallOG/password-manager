FROM python:3.8.12-slim-buster

RUN apt update && \
    apt upgrade -y && \
    apt install -y gcc libpq-dev

COPY requirements.txt .

RUN pip install pip==20.0.2
RUN pip install --no-cache -r requirements.txt

WORKDIR /app

COPY ./src ./src/
COPY [".env", "settings.py", "main.py", "./"]

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]