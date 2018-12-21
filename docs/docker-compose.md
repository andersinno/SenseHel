# Quickstart for docker-compose

Install docker and docker-compose, note that package managers might have very outdated versions.
Please see each tool homepage for recommended installation.


## 1. Building

```bash
docker-compose build
```

## 2. Start everything

```bash
docker-compose up
```

## 3. Initialize database

### Migrate database

This needs to be done on first run and everytime Django models are changed.

Find the container id which is running the backend with:

```bash
docker ps
```

Example output:

```
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
30dd97616365        sensehel_app        "python manage.py ru…"   45 seconds ago      Up 44 seconds       0.0.0.0:8000->8000/tcp   sensehel_app_1
83ac3fc07afa        sensehel_frontend   "npm start"              2 hours ago         Up 44 seconds       0.0.0.0:3000->3000/tcp   sensehel_frontend_1
a3fb81db5584        postgres:10.3       "docker-entrypoint.s…"   22 hours ago        Up 45 seconds       0.0.0.0:5432->5432/tcp   sensehel_dev-db_1
```

In here id 30dd97616365 is running backend.

Migration can be ran with the command:

```bash
docker exec -ti 30dd97616365 python manage.py migrate --noinput
```

### Create django superuser

```bash
docker exec -ti 30dd97616365 python manage.py createsuperuser
```

This can be used to access admin interface at http://127.0.0.1:8000/admin

### Load test data

Some test data can be loaded from fixtures with command

```bash
docker exec -ti 30dd97616365 python manage.py loaddata test.json
```