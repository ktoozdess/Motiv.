# motivapp

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

1
rules_version = '2';
2
service firebase.storage {
3
  match /b/{bucket}/o {
4
    match /{allPaths=**} {
5
      allow read, write: if
6
          request.time < timestamp.date(2022, 12, 12);
7
    }
8
  }
9
}
