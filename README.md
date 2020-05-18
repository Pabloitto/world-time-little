# World Time Lite

A Simple DEMO App to compare time zones between countries https://world-time-lite.herokuapp.com/

[![Coverage Status](https://coveralls.io/repos/github/Pabloitto/samurainject/badge.svg?branch=master)](https://github.com/Pabloitto/world-time-little?branch=master)
![JavaScript Style Guide](https://img.shields.io/static/v1?label=code%20style&message=typescript&color=blue)
[![npm](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Pabloitto/world-time-little/blob/master/LICENSE)
![Build Status](https://img.shields.io/static/v1?label=build%20status&message=unknown&color=gray)

**Clone the repo**
```
git clone https://github.com/Pabloitto/world-time-little.git 
```

**Install dependencies**

```
npm install
```

**Add your env variables**

This repo use google apis to obtain places and time zones for those places, so you should add your own google api keys to make it works, add a .env.local file to the root of the repo
with this content:
```
REACT_APP_GOOGLE_API_URL=https://maps.googleapis.com
REACT_APP_GOOGLE_API_KEY=[YOUR_GOOGLE_API_KEY]
```


**Run project in dev mode**

```
npm run dev
```

**Run project in prod mode**

```
npm start
```

**Run tests**

```
npm run test
```

**Run tests with coverage**

```
npm run test:coverage
```