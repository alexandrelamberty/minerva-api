const { CourseDateDTO } = require("../dto/course-date.dto");
const { OrderDTO } = require("../dto/order.dto");
const db = require("../models");

const courseDate = {
  getAll: async (offset, limit) => {
    const { rows, count } = await db.CourseDate.findAndCountAll({
      distinct: true,
      offset,
      limit,
      include: [
        {
          model: db.Course,
        },
        {
          model: db.Teacher,
        },
        {
          model: db.MM_CourseDate_Student,
          include: [db.Student],
        },
      ],
    });
    return {
      courseDates: rows.map((order) => new CourseDateDTO(order)),
      count,
    };
  },

  getById: async (id) => {
    const order = await db.CourseDate.findByPk(id, {
      include: [
        {
          model: db.Teacher,
        },
        {
          model: db.MM_CourseDate_Student,
          include: [db.Course, db.Student],
        },
      ],
    });
    return order ? new OrderDTO(order) : null;
  },

  create: async (courseId, courseDateToAdd) => {
    const transaction = await db.sequelize.transaction();
    try {
      let courseDate = await db.CourseDate.create({ CourseId: courseId });

      // Add the books and quantity to the order
      for (const student of courseDateToAdd.students) {
        await courseDate.addStudent(student.id, {
          through: { attendance: student.attendance },
          transaction,
        });
      }
      await transaction.commit();

      const addedCourseDate = await db.CourseDate.findByPk(order.id, {
        include: [
          db.Course,
          {
            model: db.MM_CourseDate_Student,
            include: [db.Student],
          },
        ],
      });

      return addedCourseDate ? new CourseDateDTO(addedCourseDate) : null;
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      return null;
    }
  },

  update: async (id, updateCourseDate) => {
    const transaction = await db.sequelize.transaction();

    try {
      // Retrieve the order
      let courseDate = await db.CourseDate.findByPk(id, {
        include: [db.Student],
      });
      courseDate.setStudents([]);

      // Update the Book association
      for (const student of updateCourseDate.students) {
        await courseDate.addStudent(student.id, {
          through: { attendance: student.attendance },
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
    const nbDeletedRow = await db.CourseDate.destroy({
      where: { id },
    });

    return nbDeletedRow === 1;
  },
};

module.exports = courseDate;
