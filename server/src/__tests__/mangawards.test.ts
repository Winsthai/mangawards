/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import supertest from "supertest";
import { cleanData, connect, disconnect } from "./testHelper";
import createServer from "../utils/server";

const app = createServer();

const api = supertest(app);

const testAward = {
  award: "Test Award",
  description: "test",
  country: "France",
  sponsor: "Eiffel Tower",
};

const testAward2 = {
  award: "Test Award 2",
  description: "test2",
  country: "France 2",
  sponsor: "Eiffel Tower 2",
};

const testManga = {
  title: "The Promised Neverland",
  author: "Shirai Kaiu",
  artist: "Demizu Posuka",
  coverArt:
    "https://uploads.mangadex.org/covers/46e9cae5-4407-4576-9b9e-4c517ae9298e/a5677919-ce8c-438e-8eb8-cabcb4d906a1.jpg",
  description:
    'At Grace Field House, life couldn\'t be better for the orphans! Though they have no parents, together with the other kids and a kind "Mama" who cares for them, they form one big, happy family. No child is ever overlooked, especially since they are all adopted by the age of 12. Their daily lives involve rigorous tests, but afterwards, they are allowed to play outside. There is only one rule they must obey: do not leave the orphanage. But one day, two top-scoring orphans, Emma and Norman, venture past the gate and unearth the horrifying reality behind their entire existence: they are all livestock, and their orphanage is a farm to cultivate food for a mysterious race of demons. With only a few months left to pull off an escape plan, the children must somehow change their predetermined fate.',
  originalLanguage: "ja",
  volumes: 20,
  chapters: 181,
  demographic: "shounen",
  status: "completed",
  year: 2016,
  tags: [
    "Thriller",
    "Action",
    "Psychological",
    "Comedy",
    "Adventure",
    "Drama",
    "Horror",
    "Slice of Life",
    "Mystery",
    "Tragedy",
  ],
};

const testManga2 = {
  title: "The Promised Neverland 2",
  author: "Shirai Kaiu",
  artist: "Demizu Posuka",
  coverArt:
    "https://uploads.mangadex.org/covers/46e9cae5-4407-4576-9b9e-4c517ae9298e/a5677919-ce8c-438e-8eb8-cabcb4d906a1.jpg",
  description:
    'At Grace Field House, life couldn\'t be better for the orphans! Though they have no parents, together with the other kids and a kind "Mama" who cares for them, they form one big, happy family. No child is ever overlooked, especially since they are all adopted by the age of 12. Their daily lives involve rigorous tests, but afterwards, they are allowed to play outside. There is only one rule they must obey: do not leave the orphanage. But one day, two top-scoring orphans, Emma and Norman, venture past the gate and unearth the horrifying reality behind their entire existence: they are all livestock, and their orphanage is a farm to cultivate food for a mysterious race of demons. With only a few months left to pull off an escape plan, the children must somehow change their predetermined fate.',
  originalLanguage: "ja",
  volumes: 20,
  chapters: 181,
  demographic: "shounen",
  status: "completed",
  year: 2016,
  tags: [
    "Thriller",
    "Action",
    "Psychological",
    "Comedy",
    "Adventure",
    "Drama",
    "Horror",
    "Slice of Life",
    "Mystery",
    "Tragedy",
  ],
};

describe("Mangawards", () => {
  let token: string;

  beforeAll(connect);
  beforeAll(async () => {
    const account = {
      name: "Jim",
      username: "Jimbo",
      password: "password123",
    };

    const loginInfo = {
      username: "Jimbo",
      password: "password123",
    };

    await api.post("/api/admin").send(account);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { body } = await api.post("/api/login/admin").send(loginInfo);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    token = body.token;
  });
  beforeEach(cleanData);
  afterAll(disconnect);

  describe("Awards Router", () => {
    describe("when no awards exist", () => {
      it("should fetch an empty list of awards", async () => {
        const awards = await api.get("/api/awards");

        expect(awards.body.length).toEqual(0);
      });

      it("should add exactly one award if all parameters are correctly given", async () => {
        const result = await api
          .post(`/api/awards`)
          .set("Authorization", `Bearer ${token}`)
          .send(testAward)
          .expect(201)
          .expect("Content-Type", /application\/json/);

        expect(result.body.award).toEqual("Test Award");
        expect(result.body.description).toEqual("test");
        expect(result.body.country).toEqual("France");
        expect(result.body.sponsor).toEqual("Eiffel Tower");

        const awards = await api.get("/api/awards");

        expect(awards.body.length).toEqual(1);
        expect(awards.body[0].award).toEqual("Test Award");
      });
    });
  });

  describe("Manga Router", () => {
    describe("when manga, awards, and authors exist", () => {
      it("deleting a manga removes it from the database completely; also removing any awards it may have had from its authors", async () => {
        // Add two awards to the database
        const award1 = await api
          .post(`/api/awards`)
          .set("Authorization", `Bearer ${token}`)
          .send(testAward);

        await api
          .post(`/api/awards`)
          .set("Authorization", `Bearer ${token}`)
          .send(testAward2);

        // Add two manga to the database with the same author
        const result1 = await api
          .post("/api/manga")
          .set("Authorization", `Bearer ${token}`)
          .send(testManga);

        const result2 = await api
          .post("/api/manga")
          .set("Authorization", `Bearer ${token}`)
          .send(testManga2);

        // Give awards to both manga; give first manga two awards
        await api
          .post(`/api/manga/${result1.body.id}`)
          .set("Authorization", `Bearer ${token}`)
          .send({ award: testAward.award });

        await api
          .post(`/api/manga/${result1.body.id}`)
          .set("Authorization", `Bearer ${token}`)
          .send({ award: testAward2.award });

        await api
          .post(`/api/manga/${result2.body.id}`)
          .set("Authorization", `Bearer ${token}`)
          .send({ award: testAward.award });

        // Check that first manga exists with two awards and second manga has one
        const manga = await api.get("/api/manga");
        expect(manga.body.length).toEqual(2);
        expect(manga.body[0].awards.length).toEqual(2);
        expect(manga.body[1].awards.length).toEqual(1);

        // First check that author has two manga and three awards
        const initialAuthor = await api.get("/api/authors");
        expect(initialAuthor.body[0].manga.length).toEqual(2);
        expect(initialAuthor.body[0].awards.length).toEqual(3);

        // Delete one of the manga from the database
        await api
          .delete(`/api/manga/${result1.body.id}`)
          .set("Authorization", `Bearer ${token}`);

        // Check that the manga has been deleted
        const finalManga = await api.get("/api/manga");
        expect(finalManga.body.length).toEqual(1);
        expect(finalManga.body[0].id).not.toEqual(result1.body.id);

        // Check that the author has one less manga and no longer has the removed manga
        const authors = await api.get("/api/authors");
        expect(authors.body[0].manga.length).toEqual(1);
        expect(authors.body[0].manga[0].id).toEqual(result2.body.id);
        expect(authors.body[1].manga.length).toEqual(1);
        expect(authors.body[1].manga[0].id).toEqual(result2.body.id);

        // Check that the author (and artist) has one less award, which is the one which was in the manga
        expect(authors.body[0].awards.length).toEqual(1);
        expect(authors.body[0].awards[0].id).toEqual(award1.body.id);
        expect(authors.body[1].awards.length).toEqual(1);
        expect(authors.body[1].awards[0].id).toEqual(award1.body.id);
      });

      it("deleting a manga should also remove its author if that is the author's only manga/awards", async () => {
        // Add awards to the database
        await api
          .post(`/api/awards`)
          .set("Authorization", `Bearer ${token}`)
          .send(testAward);

        await api
          .post(`/api/awards`)
          .set("Authorization", `Bearer ${token}`)
          .send(testAward2);

        // Add manga to the database
        const result1 = await api
          .post("/api/manga")
          .set("Authorization", `Bearer ${token}`)
          .send(testManga);

        // Give awards two awards to manga
        await api
          .post(`/api/manga/${result1.body.id}`)
          .set("Authorization", `Bearer ${token}`)
          .send({ award: testAward.award });

        await api
          .post(`/api/manga/${result1.body.id}`)
          .set("Authorization", `Bearer ${token}`)
          .send({ award: testAward2.award });

        // Check that manga exists with two awards
        const manga = await api.get("/api/manga");
        expect(manga.body.length).toEqual(1);
        expect(manga.body[0].awards.length).toEqual(2);

        // First check that author has one manga and two awards
        const initialAuthor = await api.get("/api/authors");
        expect(initialAuthor.body.length).toEqual(2);
        expect(initialAuthor.body[0].manga.length).toEqual(1);
        expect(initialAuthor.body[0].awards.length).toEqual(2);

        // Delete the manga from the database
        await api
          .delete(`/api/manga/${result1.body.id}`)
          .set("Authorization", `Bearer ${token}`);

        // Check that the manga has been deleted
        const finalManga = await api.get("/api/manga");
        expect(finalManga.body.length).toEqual(0);

        // Check that awards no longer have any manga
        const finalAwards = await api.get("/api/awards");
        expect(finalAwards.body[0].manga).toEqual([]);
        expect(finalAwards.body[1].manga).toEqual([]);

        // Check that the author(s) has been deleted, since that was their only manga/awards
        const finalAuthors = await api.get("/api/authors");
        expect(finalAuthors.body.length).toEqual(0);
      });
    });
  });
});
