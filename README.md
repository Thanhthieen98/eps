## Run with docker

### Development

1. Build Image

```
docker build -t recbook/landing-page-builder .
```

2. Run Image

```
docker run -it -p 3000:3000 recbook/landing-page-builder
```

### Production
1. Build Image

```
docker build -f Dockerfile.prod -t recbook/landing-page-builder .
```

2. Run Image

```
docker run --rm -d -p 9090:80 --name "recbook-builder" recbook/landing-page-builder
```