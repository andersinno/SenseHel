#!/bin/bash
#until nc -z -w 50 "dev-db" 5432
#do
#    echo "Connecting to database ..."
#    sleep 2
#done
echo "Waiting for database to be ready"
/app/manage.py wait_for_database

echo "Applying migrations..."
python /app/manage.py migrate --noinput

echo "Starting development server..."
python /app/manage.py runserver 0.0.0.0:8000