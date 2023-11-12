import app from "../../app";
import request from "supertest";
import { UserType } from '../../interfaces/response.interfaces';

import connectDB from "../../Database/connection";
import seed from "../../Database/seed/seed";
import testData from "../../Database/data/test-data";
import mongoose, { Types } from "mongoose";
import User from "../../Database/models/user";

let userId: Types.ObjectId;

beforeAll(async () => {
  await connectDB();
});
beforeEach(async () => {
  await seed(testData);
  const users = await User.find({});
  userId = users[0]._id;
});
afterAll(async () => {
  await mongoose.disconnect();
});

describe("GET fetchUserById", () => {
  test("200: should return a user object with the correct properties /api/users/:user_id", () => {
    return request(app)
      .get(`/api/users/${userId}`)
      .expect(200)
      .then(({ body }) => {
        const user: UserType = body.user;
        expect(typeof user._id).toBe("string");
        expect(typeof user.forename).toBe("string");
        expect(typeof user.surname).toBe("string");
        expect(typeof user.username).toBe("string");
        expect(typeof user.avatar_url).toBe("string");
        expect(Array.isArray(user.visited_locations)).toBe(true);
        expect(Array.isArray(user.wishlist)).toBe(true);
        expect(typeof user.__v).toBe("number");
      });
  });
  test("404: can't fetch a non-existent user", () => {
    return request(app).get("/api/users/non_existent_id").expect(404);
  });
});

describe("POST createUser", () => {
  test("201: should create a new user /api/users", () => {
    const newUser = {
      username: "newUser",
      forename: "Bob",
      surname: "Davis",
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .then(({ body }) => {
        const user: UserType = body.user;
        expect(user).toHaveProperty("forename", newUser.forename);
        expect(user).toHaveProperty("surname", newUser.surname);
        expect(user).toHaveProperty("username", newUser.username);
        expect(user).toHaveProperty("avatar_url");
        expect(user).toHaveProperty("visited_locations");
        expect(user).toHaveProperty("wishlist");
        expect(user).toHaveProperty("_id");
        expect(user).toHaveProperty("albums");
        expect(user).toHaveProperty("__v");
      });
  });
});

describe("DELETE removeUserById", () => {
  test("204: should delete a user by ID /api/users/:user_id", () => {
    return request(app).delete(`/api/users/${userId}`).expect(204);
  });
  test("404: can't delete a non-existent user", () => {
    return request(app).delete("/api/users/non_existent_id").expect(404);
  });
});

describe("PATCH updateUserById", () => {
  test("200: should update a user by ID /api/users/:user_id", () => {
    const updatedUser = {
      forename: "UpdatedForename",
      surname: "UpdatedSurname",
      username: "UpdatedUsername",
      avatar_url: "https://updated-avatar.com",
      visited_locations: ["newCountry", "newCountry2"],
      wishlist: ["anotherCountry", "anotherCountry2"],
      albums: [{ country: "England", url: "https://england.com" }],
      __v: 1,
    };

    return request(app)
      .patch(`/api/users/${userId}`)
      .send(updatedUser)
      .expect(200)
      .then(({ body }) => {
        const returnedUser: UserType = body.user;
        const expectedUser = {
          _id: expect.any(String),
          forename: expect.any(String),
          surname: expect.any(String),
          username: expect.any(String),
          avatar_url: expect.any(String),
          visited_locations: expect.any(Array),
          wishlist: expect.any(Array),
          albums: expect.any(Array),
        };
        expect(returnedUser).toEqual(expect.objectContaining(expectedUser));
      });
  });
  test("404: should handle errors for a non-existent user ID", () => {
    return request(app).patch("/api/users/non_existent_id").send({}).expect(404);
  });
  test("400: should handle invalid request body", () => {
    const invalidBody = {
      forename: true,
      surname: [],
    };
    return request(app).patch(`/api/users/${userId}`).send(invalidBody).expect(400);
  });
});
