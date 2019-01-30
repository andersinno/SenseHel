# Browsable API

Please see `/api/schema/` in browser for full documentation of all available endpoints and methods.
In this document login and few methods are described in order to have working examples at hand.

Some development helper scripts can be found from `backend/scripts/api/`.

# Login

URL: /api/login
Method: POST

Authentication is based on Django users.

Example with curl:

```bash
curl -d "username=admin&password=pwd" -X POST http://localhost:8000/api/login
```

Response:

```json
{
  "token": "750ab3c6ecba2ee406a7516799f2449ff5506bf2",
  "first_name": "FirstName",
  "last_name": "LastName",
  "phone": 12345678,
  "email": "email@localhost"
}

```

# Resources

All resources are accessed via GET request and require authentication via token available through login.

## Services

URL: /api/services/
URL: /api/services/<id>

Example with curl:

```bash
curl -H "Authorization: Token 750ab3c6ecba2ee406a7516799f2449ff5506bf2" "http://127.0.0.1:8000/api/service/1/"
```

## Apartment(s)

URL: /api/apartments/
URL: /api/apartments/<id>

Without <id> all apartments user belongs to are returned.

Example with curl:

```bash
curl -H "Authorization: Token 750ab3c6ecba2ee406a7516799f2449ff5506bf2" "http://127.0.0.1:8000/api/apartments/"
curl -H "Authorization: Token 750ab3c6ecba2ee406a7516799f2449ff5506bf2" "http://127.0.0.1:8000/api/apartments/1/"
```

## Available services

Return all available services for apartment. This takes into account following

- What sensor values are available in apartment
- Which sensor values are required by services

URL: /api/available-services/

```bash
curl -sH "Authorization: Token 750ab3c6ecba2ee406a7516799f2449ff5506bf2" "http://127.0.0.1:8000/api/available-services/"
```

## Currently subscribed services

Return all services user is currently subscribed to

URL: /api/subscribed-services/

```bash
curl -sH "Authorization: Token 750ab3c6ecba2ee406a7516799f2449ff5506bf2" "http://127.0.0.1:8000/api/subscribed-services/"
```
