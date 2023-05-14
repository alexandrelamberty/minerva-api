const { CourseMaterialDTO } = require("./course-material.dto");

class CourseDetailsDTO {
  constructor({ id, name, description, Training, dates, CourseMaterials }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.training = Training;
    this.dates = dates
      ? dates.map((courseDate) => {
          console.log(courseDate);
          return new CourseDateDTO(courseDate);
        })
      : [];
    this.materials = CourseMaterials
      ? CourseMaterials.map((courseMaterial) => new CourseMaterialDTO(author))
      : [];
  }
}

class CourseDTO {
  constructor({ id, name, description, Training, dates, CourseMaterials }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.training = Training;
    this.dates = dates
      ? dates.map((courseDate) => {
          console.log(courseDate);
          return new CourseDateDTO(courseDate);
        })
      : [];
    this.materials = CourseMaterials
      ? CourseMaterials.map((courseMaterial) => new CourseMaterialDTO(author))
      : [];
  }
}

class CourseDateDTO {
  constructor({ id, date, Teacher, MM_Course_Date_Student_Attendance }) {
    console.log(Teacher);
    this.id = id;
    this.date = date;
    this.teacher = Teacher ? Teacher.User.firstName : null;
    this.attendances = MM_Course_Date_Student_Attendance
      ? MM_Course_Date_Student_Attendance.map(
          (courseAttendance) => new CourseDateStudentDTO(courseAttendance)
        )
      : [];
  }
}

module.exports = { CourseDTO };
