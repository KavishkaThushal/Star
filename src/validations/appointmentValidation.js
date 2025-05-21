//form validation
export const appointmentFormValidation = (data) => {
  const errors = {};

  if (!data.firstName) {
    errors.firstName = "First Name is required.";
  }
  if (!data.lastName) {
    errors.lastName = "Last Name is required.";
  }
  if (!data.email) {
    errors.email = "Email is required.";
  }
  if (!data.phoneNumber) {
    errors.phoneNumber = "Phone Number is required.";
  }
  if (!data.issue) {
    errors.issue = "Issue is required.";
  }
  return errors;
};
