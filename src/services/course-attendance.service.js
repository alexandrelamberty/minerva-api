const { OrderDTO } = require("../dto/order.dto");
const db = require("../models");

const orderService = {
  getAll: async (offset, limit) => {
    const { rows, count } = await db.Order.findAndCountAll({
      distinct: true,
      offset,
      limit,
      include: [
        {
          model: db.User,
        },
        {
          model: db.MM_Order_Book,
          // Fixme: Remove order as we are in an order
          include: [db.Book, db.Order],
        },
      ],
    });
    return {
      orders: rows.map((order) => new OrderDTO(order)),
      count,
    };
  },

  getById: async (id) => {
    const order = await db.Order.findByPk(id, {
      include: [
        {
          model: db.User,
        },
        {
          model: db.MM_Order_Book,
          // FIXME: Remove order as we are in an order
          include: [db.Book, db.Order],
        },
      ],
    });
    return order ? new OrderDTO(order) : null;
  },

  create: async (userId, orderToAdd) => {
    const transaction = await db.sequelize.transaction();
    try {
      // Create the order
      let order = await db.Order.create({ UserId: userId });

      // Add the books and quantity to the order
      for (const book of orderToAdd.books) {
        await order.addBook(book.id, {
          through: { quantity: book.quantity },
          transaction,
        });
      }
      await transaction.commit();

      const addedOrder = await db.Order.findByPk(order.id, {
        include: [
          db.User,
          {
            model: db.MM_Order_Book,
            // FIXME: Remove order as we are in an order
            include: [db.Book, db.Order],
          },
        ],
      });

      return addedOrder ? new OrderDTO(addedOrder) : null;
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      return null;
    }
  },

  update: async (id, updateOrder) => {
    const transaction = await db.sequelize.transaction();

    try {
      // Retrieve the order
      let order = await db.Order.findByPk(id, {
        include: [db.Book],
      });
      //console.log("update order: ", await order.getBooks());

      // Remove the Book association
      order.setBooks([]);

      // Update the Book association
      for (const book of updateOrder.books) {
        await order.addBook(book.id, {
          through: { quantity: book.quantity },
          transaction,
        });
      }
      // Update the book details
      // const updatedRow = await db.Order.update(order, {
      //   where: { id },
      // });

      await transaction.commit();
      return true;
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      return null;
    }
  },

  delete: async (id) => {
    const nbDeletedRow = await db.Order.destroy({
      where: { id },
    });

    return nbDeletedRow === 1;
  },
};

module.exports = orderService;
