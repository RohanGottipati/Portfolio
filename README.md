# rohangottipati.com

```
rohan@portfolio:~$ ./launch
  loading portfolio data
  mounting projects, experience, skills
  resolving contact + links
  starting interactive shell
  ready — type / to explore
```

An interactive, terminal-inspired developer portfolio designed to feel like a real shell you explore — not a page you scroll.

Built entirely from scratch to showcase my work, technical skills, and approach to building products.

## About

I'm a developer focused on building fast, scalable, and visually engaging products.  
I enjoy shipping quickly, testing ideas, and turning ideas into real systems.

This portfolio reflects that approach through clean UI, motion, and interactivity.

## Tech Stack

- React + Vite
- TypeScript
- Tailwind CSS
- Framer Motion

## How It Works

The site opens on a landing screen with a quick intro and links. Hit the code button (the bouncing arrow points the way) to drop into the terminal, then use slash commands to navigate:

| Command | Description |
|---|---|
| `/about` | Who I am and what I'm working on |
| `/experience` | Work history and roles |
| `/clubs` | Campus club leadership roles |
| `/projects` | Projects I've built |
| `/project <slug>` | Deep-dive into a specific project |
| `/skills` | Technical skills and tools |
| `/contact` | Email, GitHub, LinkedIn, resume |
| `/resume` | View and download my resume |
| `/help` | All available commands |
| `/clear` | Reset the session |
| `/exit` | End session |

## Features

- Landing screen with a one-tap launch into the terminal
- Full shell prompt with working directory (`rohan@portfolio:~/portfolio/rohan-shell$`)
- Path-style panel headers (`~/portfolio/rohan-shell/experience`)
- Command menu with fuzzy suggestions and keyboard navigation
- Session history with command recall (↑ / ↓)
- Smooth Framer Motion transitions throughout
- Fully responsive

## Philosophy

build fast  
test ideas  
ship constantly

## Run Locally

```bash
npm install
npm run dev
```

## Live

https://rohangottipati.com
