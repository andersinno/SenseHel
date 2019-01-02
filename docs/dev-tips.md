# Access postgresql database

```bash
psql -h localhost -p 5432 -U postgres
```

# Clear database

In case you need to clear data:

```
postgres=# drop database forum;
DROP DATABASE
postgres=# create database forum;
CREATE DATABASE
```

and after that in `./backend/`

```bash
python manage.py migrate
python manage.py createsuperuser
```
