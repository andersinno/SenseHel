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
{ "token": "750ab3c6ecba2ee406a7516799f2449ff5506bf2" }
```

# Resources

All resources are accessed via GET request and require authentication via token available through login.

## Services

URL: /api/service/<id>

Example with curl:

```bash
curl -H "Authorization: Token 750ab3c6ecba2ee406a7516799f2449ff5506bf2" "http://127.0.0.1:8000/api/service/1/"
```

## Apartment

URL: /api/service/<id>

Example with curl:

```bash
curl -H "Authorization: Token 750ab3c6ecba2ee406a7516799f2449ff5506bf2" "http://127.0.0.1:8000/api/apartment/1/"
```
