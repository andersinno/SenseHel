FROM python:3.7-slim

ENV PYTHONUNBUFFERED 1

RUN mkdir /entrypoint

WORKDIR /app

RUN apt-get update && apt-get install -y \
    netcat

COPY requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY ./django-entry.sh /entrypoint/django-entry.sh

ENTRYPOINT /entrypoint/django-entry.sh

COPY . /app
