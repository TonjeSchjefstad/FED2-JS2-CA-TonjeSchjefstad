# Pulse - Social Media App

![image](https://i.imghippo.com/files/ILd5513zj.png)

## Description

This project is a front-end for a social media application where users can create, read, update, and delete their own posts. In addition to post management, the app includes social features such as following and unfollowing other users.

Live Demo: https://pulse-social-media-app.netlify.app/

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

## Project Structure

```bash
├── public/
│   └── images/
├── src/
│   ├── css/
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
- src/css/ → Stylesheet
- src/js/ → JavaScript modules

## Tech Stack

- HTML5
- Tailwind CSS v4
- JavaScript ( ES6 modules )
- Vite ( Single-Page Application setup )
- Netlify
- Noroff Social API

## User Features

- Register new user
- Login and logout
- Create, edit and delete posts
- View all posts
- View single post by ID → Opens in an overlay
- View own profile
- View other profiles
- Follow and unfollow users

## JSDocs

- loginUser (src/js/api/auth/login.js) → Handles user authentication
- registerUser (src/js/api/auth/register.js) → Creates a new user account
- createPost (src/js/api/post/create.js) → Sends a new post to the API
- showMessage (src\js\utilities\showMessage.js) -> Displays a temporary message on the screen

## Contributing
Feel free to contribute! Create a new branch and open a Pull Request, and I'll take a look!
1. Fork the repository
2. Create a new branch for your feature or fix:
```bash
git checkout -b feature/your-feature-name
```
3. Make your changes and commit them with a clear message.
4. Push your branch and open a Pull Request for review.

Please make sure your code is clean and tested before submitting a PR.

## Contact
### Tonje Schjefstad
Frontend Development Student
Noroff School of Technology and Digital Media

- LinkedIn: https://www.linkedin.com/in/tonjeschjefstad/
- GitHub: https://github.com/TonjeSchjefstad
- Student email: tonsch03841@stud.noroff.no
- Private email: Tonje_schjefen@hotmail.com
