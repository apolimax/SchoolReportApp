import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:4000/api/reports", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          _id: "6330c95a7299dd07f5f0ea1a",
          subject: "Math",
          grade: 9,
          user_id: "632e41c988bd20ff2a9542c4",
          createdAt: "2022-09-25T21:34:18.144Z",
          updatedAt: "2022-09-26T16:16:03.691Z",
          __v: 0,
        },
        {
          _id: "6330c9557299dd07f5f0ea17",
          subject: "Geography",
          grade: 8,
          user_id: "632e41c988bd20ff2a9542c4",
          createdAt: "2022-09-25T21:34:13.372Z",
          updatedAt: "2022-09-26T16:16:19.742Z",
          __v: 0,
        },
      ])
    );
  }),
  rest.post("http://localhost/api/user/login", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        email: "mateus@hotmail.com",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJlNDFjOTg4YmQyMGZmMmE5NTQyYzQiLCJpYXQiOjE2NjQ0OTE2MDUsImV4cCI6MTY2NDU3ODAwNX0.LSdVFg8jkdweGZxXysbH3sj3773nsidNVAaJmwjVGEI",
      })
    );
  }),
];
