# GUVI - DAY 42

## URL Shortener TASK.

### How to run the project on your machine:

1. clone the repository to your local machine.

```
git clone
```

2. To install all the dependencies:

```
npm i express
npm i nodemon --save-dev
npm i cookie-parser
npm i jsonwebtoken
npm i bcrypt
npm i cors
npm i dotenv
npm i mongoose
npm i nodemailer
```

3. Once everything is installed successfully, now it's time to run the server.

```
npm run dev
```

### Dependencies used

1. express

```
    npm i express
```

2. nodemon

```
    npm i nodemon --save-dev
```

3. bcrypt

```
    npm i bcrypt
```

4. cors

```
    npm i cors
```

5. dotenv

```
    npm i dotenv
```

6. mongoose

```
    npm i mongoose
```

7. nodemailer

```
    npm i nodemailer
```

8. cookie-parser

```
    npm i cookie-parser
```

9. jsonwebtoken

```
    npm i jsonwebtoken
```

### Setup.

1. Run the following command to create a new project.

```
    npm init -y
    npm i express
    npm i cookie-parser
    npm i jsonwebtoken
    npm i nodemon --save-dev
    npm i bcrypt
    npm i cors
    npm i dotenv
    npm i mongoose
    npm i nodemailer
```

2. We create a javascript file named `index.js` which is the root of the project.

3. We change the `package.json` file to include start and dev parameter to make the script run from the command `npm run dev`.

## users data structure

```
{
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
}
```

## url data structure

```
{
  url: {
    type: String,
    required: true,
  },
  endpoint: {
    type: String,
    required: true,
  },
  views: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
}
```

# API endpoints

- Explain in postman document

# Deployed URL

- https://urlshortener-backend-j9ix.onrender.com

# POSTMAN DOCUMENT URL

- https://documenter.getpostman.com/view/34880027/2sA3e48Tcs
