## ProgAssist Web App

This project was generated with NextJS 14 for [lablab.ai Stable LM 3B challenge](https://lablab.ai/event/stable-lm-3b-24-hours-hackathon/maverick/prog-assist)

## Project Details

- login, logout
- assessment category menu and history
- asessment test page
- assessment result page

## Directory
use tree or tree /F command to generate\
├───app\
│   ├───(auth)\
│   │   ├───assessment\
│   │   ├───dashboard\
│   │   └───result\
│   │       └───[id]\
│   ├───(guest)\
│   │   ├───404\
│   │   ├───login\
│   │   └───register\
│   └───api\
│       ├───assessment\
│       │   ├───history\
│       │   └───[id]\
│       └───auth\
│           ├───login\
│           └───register\
├───components\
│   ├───layout\
│   ├───pages\
│   └───ui\
├───config\
├───lib\
│   └───models\
├───log\
└───public\

## Get started

Run `npm install`

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:3000/`. The application will automatically reload if you change any of the source files.

## Database

run db statement located in config/db.sql
