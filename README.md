\# Public Infrastructure Reporting System



A web-based system for reporting and managing public infrastructure problems such as potholes, broken streetlights, water leakage, damaged footpaths and open drains.



The system also provides a simple registration and profile management module for women entrepreneurs.



\## Features



\### Citizen



\- Citizen registration and login

\- Report infrastructure issues

\- Select issue category

\- Upload image proof

\- Capture current location

\- View reported issues

\- Track issue status



\### Admin



\- Admin login

\- View reported infrastructure issues

\- View reporter details

\- Update issue status

\- Mark issues as In Progress or Resolved



\### Women Entrepreneur



\- Entrepreneur registration

\- Basic business details

\- Business profile

\- Update business information

\- Automatic login and profile redirect after registration



\## Technology Used



\### Frontend



\- React.js

\- Vite

\- React Router

\- Axios

\- CSS



\### Backend



\- Node.js

\- Express.js

\- MongoDB

\- Mongoose

\- JWT

\- bcryptjs

\- Multer



\## Database



MongoDB is used as the database.



Main collections:



\- users

\- issues

\- entrepreneurs



\## Project Structure



```text

Public-Infrastructure-System

|

|-- Backend

|   |-- middleware

|   |-- models

|   |-- routes

|   |-- uploads

|   |-- .env

|   |-- package.json

|   `-- server.js

|

`-- Frontend

&#x20;   |-- src

&#x20;   |   |-- components

&#x20;   |   |-- pages

&#x20;   |   |-- App.jsx

&#x20;   |   |-- App.css

&#x20;   |   `-- main.jsx

&#x20;   |-- package.json

&#x20;   `-- vite.config.js

```



\## How to Run



\### Backend



Open a terminal inside the Backend folder:



```bash

npm install

npm run dev

```



Backend runs on:



```text

http://localhost:5000

```



\### Frontend



Open another terminal inside the Frontend folder:



```bash

npm install

npm run dev

```



Frontend runs on:



```text

http://localhost:5173

```



\## Main API Endpoints



\### User



```text

POST /api/users/register

POST /api/users/login

```



\### Issues



```text

POST /api/issues

GET /api/issues

PUT /api/issues/:id/status

```



\### Entrepreneurs



```text

POST /api/entrepreneurs

GET /api/entrepreneurs/:userId

PUT /api/entrepreneurs/:userId

```



\## Issue Status



An issue can have the following status:



\- Pending

\- In Progress

\- Resolved



\## Project Purpose



The main purpose of this project is to provide a simple digital platform where citizens can report public infrastructure problems and authorities can monitor and update their status.



The women entrepreneur module allows women entrepreneurs to register and maintain their basic business information.



\## Production Build



To create the production build of the frontend:



```bash

npm run build

```



The production build is generated inside the `dist` folder.

