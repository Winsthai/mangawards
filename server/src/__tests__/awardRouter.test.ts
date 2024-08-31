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

describe("Award Router", () => {
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
