# Pulse - Social Media App
![image](link)

## Description
This project is a front-end for a social media application where users can create, read, update, and delete their own posts. In addition to post management, the app includes social features such as following and unfollowing other users.

Live Demo: https://pulse-social-media-app.netlify.app/

## Tech Stack
- HTML5
- CSS
- JavaScript ( ES6 modules )
- Vite ( Single-Page Application setup )
- Noroff Social API

## User Features
- Register new user
- Login and logout
- Create, edit and delete posts
- View all posts
- View single post by ID
- View own profile
- View other profiles
- Follow and unfollow users

## Project Structure
```bash
├── public/
│   └── images/
├── src/
│   ├── css/
│   │  ├── base/ 
│   │  ├── components/
│   │  ├── pages/
│   │  └── style.css
│   └── js/
│      ├── api/
│      ├── components/
│      ├── router/
│      ├── ui/
│      ├── utilities/
│      └── app.js
├── README.md
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

## Folder highlights
- public/images/ → Assets
- src/css/ → Stylesheets
- src/js/ → JavaScript modules

## Getting Started
### Installing
1. Clone the repository:

```bash
git clone https://github.com/TonjeSchjefstad/FED2-JS2-CA-TonjeSchjefstad.git
```

2. Install dependencies:

```
npm install
```

### Running

Start the development server with:

```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## JSDocs
- loginUser (src/js/api/auth/login.js) → Handles user authentication
- registerUser (src/js/api/auth/register.js) → Creates a new user account
- createPost (src/js/api/post/create.js) → Sends a new post to the API

## Contact
- My LinkedIn page: https://www.linkedin.com/in/tonjeschjefstad/
- My GitHub Profile: https://github.com/TonjeSchjefstad
- Email: Tonje_schjefen@hotmail.com
  
  
