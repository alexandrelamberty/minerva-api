const { Op } = require("sequelize");
const { CourseDTO } = require("../dto/course.dto");
const db = require("../models");

const courseService = {
  search: async (terms) => {
    console.log("Search terms", terms);
    const { rows, count } = await db.Course.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${terms}%`,
        },
      },
      distinct: true,
    });
    return {
      courses: rows.map((course) => new CourseDTO(course)),
      count,
    };
  },

  getAll: async (offset, limit) => {
    const { rows, count } = await db.Course.findAndCountAll({
      distinct: true,
      offset,
      limit,
      include: [
        {
          association: "dates",
          include: [
            {
              model: db.Teacher,
              attributes: ["UserId"],
              include: [
                { model: db.User, attributes: ["firstName", "lastName"] },
              ],
            },
          ],
        },
        db.Training,
      ],
    });
    return {
      courses: rows.map((course) => new CourseDTO(course)),
      count,
    };
  },

  getById: async (id) => {
    const course = await db.Course.findByPk(id, {
      include: [
        {
          association: "dates",
          include: [
            {
              model: db.Teacher,
              attributes: ["UserId"],
              include: [
                { model: db.User, attributes: ["firstName", "lastName"] },
              ],
            },
          ],
        },
      ],
    });
    return course ? new CourseDTO(course) : null;
  },

  create: async (courseToAdd) => {
    console.log("Create course: ", courseToAdd);

    const course = await db.Course.create(courseToAdd, {
      include: [
        {
          association: "dates",
          as: "dates",
          include: [
            {
              model: db.Teacher,
              attributes: ["UserId"],
              include: [
                { model: db.User, attributes: ["firstName", "lastName"] },
              ],
            },
            {
              model: db.CourseDateAttendance,
            },
          ],
        },
      ],
    });
    console.log("COURSE", course);

    // console.log("Created course:", course);

    // Creating with loop
    // for (const courseDate of courseToAdd.dates) {
    //   console.log(courseDate);
    //   await course.addCourseDate({
    //     TeacherId: courseDate.TeacherId,
    //     // CourseId: course.id,
    //     date: courseDate.date,
    //   });
    // }

    // course.addCourseDates(courseToAdd.dates);

    // Creating directly the CourseDate ! Bad
    // const courseDate = await db.CourseDate.create({
    //   TeacherId: 1,
    //   CourseId: course.id,
    //   date: "2023-05-05",
    // });
    // course.addCourseDate(courseDate);
    //

    // console.log(await course.countDates());
    return course ? new CourseDTO(course) : null;
  },

  update: async (id, courseDTO) => {
    const transaction = await db.sequelize.transaction();
    console.log("ID: ", id);
    console.log("DTO: ", courseDTO);

    const course = await db.Course.findByPk(id, {
      include: [{ association: "dates", as: "dates" }],
    });

    console.log("TO UPDATE: ", course);

    try {
      // course.setCoursDates([])
      course.setDates([]);

      // for (const dates of courseDTO.dates) {
      //   await course.addDates(
      //     { TeacherId: dates.TeacherId, date: dates.date },
      //     { transaction }
      //   );
      // }

      const updatedRow = await db.Course.update(
        course,
        {
          where: { id },
        },
        {
          include: [{ association: "dates", as: "dates" }],
        }
      );
      await transaction.commit();
      return updatedRow[0] === 1;
    } catch (err) {
      await transaction.rollback();
      return null;
    }
  },

  delete: async (id) => {
    const nbDeletedRow = await db.Course.destroy({
      where: { id },
    });
    return nbDeletedRow === 1;
  },

  getDates: async (id) => {
    const course = await db.Course.findByPk(id, {
      include: [{ association: "dates", as: "dates" }],
    });
    console.log(course);
    return course.dates;
  },

  getMaterials: async (id) => {
    const course = await db.Course.findByPk(id, {
      include: [db.CourseMaterial],
    });
    console.log(course);
    return course.dates;
  },
};

module.exports = courseService;
