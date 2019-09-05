#!/bin/bash
until nc -zv "dev-db" 5432
do
    echo "Connecting to database ..."
    sleep 1
done

echo "Applying migrations..."
python /app/manage.py migrate --noinput

echo "Starting development server..."
python /app/manage.py runserver 0.0.0.0:8000