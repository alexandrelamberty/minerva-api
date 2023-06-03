/**
 * Data Transfer Object (DTO) for representing enrollment details.
 */
class EnrollmentDTO {
  /**
   * Create a new instance of EnrollmentDTO.
   * @param {Object} params - The parameters for initializing the DTO.
   * @param {number} params.id - The ID of the enrollment.
   * @param {boolean} params.validated - Flag indicating if the enrollment is validated.
   * @param {string} params.status - The status of the enrollment.
   * @param {Object} params.Student - The student associated with the enrollment.
   * @param {Object} params.Training - The training associated with the enrollment.
   */
  constructor({ id, validated, status, Student, Training }) {
    this.id = id;
    this.validated = validated;
    this.status = status;
    this.student = Student;
    this.training = Training;
  }
}

module.exports = { EnrollmentDTO };
