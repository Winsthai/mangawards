# Mangawards

Mangawards is a website which displays and allows users to browse all manga that have won an award.

It includes the ability to search, sort, and filter through award winning manga, authors, and all of the manga awards themselves. Users can also sign up for an account and login to save manga that they may be interested in.

[Live Link](https://mangawards-frontend.onrender.com/)

## API

## Running locally:
### Prerequisites
- Node.js

1. Clone the repository:
```
git clone https://github.com/Winsthai/mangawards.git
```
2. Install backend dependencies:
```
cd server
npm install
```
3. Create a .env file in the server directory and supply it with the following attributes:
```
MONGODB_URI=<insert mongodb uri here>
PORT=<port number>
SECRET=<secret string to use when creating/verifying JWTs>
```
4. Run the backend:
```
npm run dev
```
5. Install frontend dependencies:
```
cd client
npm install
```
6. Create a .env file in the client directory and supply it with the following attribute:
```
VITE_REACT_BACKEND_URL=<backend url here>/api
```
- By default when developing, the backend url should be ```http://localhost:<port number assigned to backend>/api```
7. Run the frontend:
```
npm run dev
```

## Special Thanks:

- [Mangadex API](https://api.mangadex.org/docs/) for providing the majority of data for each manga, such as the description, cover art, etc.
- The [wikitable2json API](https://github.com/atye/wikitable2json) and [sheet2api API](https://sheet2api.com/tools/wiki-api/), which were used to scrape data from Wikipedia in order to populate the database
