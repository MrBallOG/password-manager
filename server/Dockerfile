FROM python:3.8.12-slim-buster

RUN apt update && \
    apt install -y wait-for-it && \
    apt-get -y autoremove && \
    apt-get -y clean && \
    apt install gcc libpq-dev -y

RUN pip install pip==20.0.2
COPY requirements.txt .
RUN pip install --no-cache -r requirements.txt

WORKDIR /app

COPY ./src ./src/
COPY .env .
COPY settings.py .
COPY main.py .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]