const { Op } = require("sequelize");
const { TeacherDTO } = require("../dto/teacher.dto");
const db = require("../models");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const SUGGEST_CATEGORIES = {
  categories: [
    {
      category_name: "Programming",
      description: "",
    },
  ],
};

const SUGGEST_TRAINING = {
  trainings: [
    {
      category_name: "Python for Beginners",
      description: "",
    },
  ],
};

const JSON_TEMPLATE = {
  categories: [
    {
      category_name: "Programming",
      trainings: [
        {
          training_name: "Python for Beginners",
          description:
            "Learn the fundamentals of Python programming language, including variables, data types, control structures, and basic algorithms.",
        },
        {
          training_name: "Advanced Java Concepts",
          description:
            "Deep dive into advanced Java topics such as multithreading, generics, lambda expressions, and design patterns.",
        },
      ],
    },
  ],
};

const logError = (error) => {
  if (error.response) {
    console.log(error.response.status);
    console.log(error.response.data);
  } else {
    console.log(error.message);
  }
};

/**
 * Service that use A.I. to help generate content.
 * @module service/ai
 * @see {@link https://platform.openai.com/docs/introduction|Test}
 */
const aiService = {
  /**
   * Use the Completion API to suggest a category name.
   * @memberof module:services/ai
   * @returns
   * @throws {Error} - If the operation fails or encounters an error.
   */
  suggestCategoryName: async () => {
    const prompt =
      "Could you give me a category name for a training in I.T. Respond with only the category name.";

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      console.log("Response data", response.data);
      const text = response.data.choices[0].text.trim();
      return {
        suggestion: text,
      };
    } catch (error) {
      logError(error);
    }
  },

  /**
   * Use the Completion API to suggest a description for category name
   * @memberof module:services/ai
   * @returns
   * @throws {Error} - If the operation fails or encounters an error.
   */
  describeCategory: async (terms) => {
    const prompt =
      "Can you describe this information and technology category for trainings : ";

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt + terms,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      console.log(response.data);
      const text = response.data.choices[0].text;
      return {
        description: text,
      };
    } catch (error) {
      logError(error);
    }
  },

  /**
   * Use the Completion API to suggest a training name.
   * @memberof module:services/ai
   * @returns
   * @throws {Error} - If the operation fails or encounters an error.
   */
  suggestTrainingName: async () => {
    const prompt =
      "Could you suggest me a training name for a training in I.T. Respond with only the category name.";

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      console.log(response.data);
      const text = response.data.choices[0].text;
      return {
        description: text,
      };
    } catch (error) {
      logError(error);
    }
  },

  /**
   * Use the Completion API to suggest a description for training name.
   * @memberof module:services/ai
   * @returns
   * @throws {Error} - If the operation fails or encounters an error.
   */
  describeTraining: async (terms) => {
    const prompt =
      "Can you describe this information and technology category for trainings : ";
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt + terms,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const text = response.data.choices[0].text;
      console.log(response.data);
      return {
        description: text,
      };
    } catch (error) {
      logError(error);
    }
  },

  /**
   * Use the Images API to suggest a description for training name.
   * @memberof module:services/ai
   * @returns
   * @throws {Error} - If the operation fails or encounters an error.
   */
  thumbnail: async (terms) => {
    const prompt = "Image about programming";

    console.log(prompt);
    try {
      const response = await openai.createImage({
        prompt: prompt,
        n: 2,
        size: "512x512",
      });
      const images = response.data;
      console.log(response.data);
      return {
        images: images,
      };
    } catch (error) {
      logError(error);
    }
  },
};

module.exports = aiService;
