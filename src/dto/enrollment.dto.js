class EnrollmentDTO {
  constructor({ id, validated, status, Student, Training }) {
    this.id = id;
    this.validated = validated;
    this.status = status;
    this.student = Student;
    this.training = Training;
  }
}

module.exports = { EnrollmentDTO };
