const { Op } = require("sequelize");
const { PublisherDTO: PublisherDTO } = require("../dto/publisher.dto");
const db = require("../models");

const publisherService = {
  search: async (terms) => {
    console.log("Search terms", terms);
    const { rows, count } = await db.Publisher.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${terms}%`,
        },
      },
      distinct: true,
    });
    return {
      publishers: rows.map((publisher) => new PublisherDTO(publisher)),
      count,
    };
  },

  getAll: async (offset, limit) => {
    const { rows, count } = await db.Publisher.findAndCountAll({
      distinct: true,
      offset,
      limit,
      // include: [db.Book],
    });
    return {
      publishers: rows.map((publisher) => new PublisherDTO(publisher)),
      count,
    };
  },

  getById: async (id) => {
    const publisher = await db.Publisher.findByPk(id, {
      include: [db.Book],
    });
    return publisher ? new PublisherDTO(publisher) : null;
  },

  create: async (publisherDto) => {
    const publisher = await db.Publisher.create(publisherDto);
    return publisher ? new PublisherDTO(publisher) : null;
  },

  update: async (id, publisherDto) => {
    const updatedRow = await db.Publisher.update(publisherDto, {
      where: { id },
    });
    return updatedRow[0] === 1;
  },

  delete: async (id) => {
    const nbDeletedRow = await db.Publisher.destroy({
      where: { id },
    });
    return nbDeletedRow === 1;
  },
};

module.exports = publisherService;
