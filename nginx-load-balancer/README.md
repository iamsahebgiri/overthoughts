## Achieving Scalability and High Availability with Nginx Load Balancer and Docker Compose

Project:

```
.
├── README.md
├── compose.yml
├── nginx
│   ├── Dockerfile
│   └── nginx.conf
└── app
    ├── Dockerfile
    ├── package.json
    └── index.js
```

[_compose.yml_](compose.yml)

```
services:
  container1:
    restart: on-failure
    build: ./app
    hostname: container1
    ports:
      - "3001:3000"
    environment:
      - SERVER_NO=1

  container2:
    restart: on-failure
    build: ./app
    hostname: container2
    ports:
      - "3002:3000"
    environment:
      - SERVER_NO=2

  container3:
    restart: on-failure
    build: ./app
    hostname: container3
    ports:
      - "3003:3000"
    environment:
      - SERVER_NO=3

  nginx:
    build: ./nginx
    ports:
      - '80:80'
    depends_on:
      - container1
      - container2
      - container3

```

The compose file defines an application with four services `nginx`, `container1`, `container2` and `container3`.
When deploying the application, docker compose maps port 80 of the nginx service container to port 80 of the host as specified in the file.

## Deploy with docker compose

```sh
docker compose up -d --build
# --build rebuilds the containers to ensure latest code is used
```

## Expected result

Listing containers must show three containers running and the port mapping as below:

```sh
docker-compose ps
```

## Testing the app

After the application starts, navigate to `http://localhost:80` in your web browser or run:

```json
{
    "time": "2023-07-06T07:15:33.499Z",
    "server": "1"
}
```

```json
{
    "time": "2023-07-06T07:18:14.706Z",
    "server": "2"
}
```

## Stop and remove the containers

```sh
docker compose down
```
