// helpers/skema.js

const { z } = require("zod");

const postSchema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }),
  authorName: z.string(),
  content: z.string(),
  published: z.boolean(),
});

module.exports = {
  postSchema,
};