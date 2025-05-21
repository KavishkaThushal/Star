import validator from "validator";

//register validation
export const registerValidation = (data) => {
  const errors = {};

  if (!data.userName) {
    errors.userName = "User Name is required.";
  }
  if (!data.email || !validator.isEmail(data.email)) {
    errors.email = "A valid email is required.";
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if (!data.password) {
    errors.password = "Password is required";
  } else if (!validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password must be at least 6 characters long";
  } else if (!passwordRegex.test(data.password)) {
    errors.password =
      "Password must contain at least one uppercase, one lowercase, one number, and one special character";
  }

  return errors;
};

//login validation
export const loginValidation = (data) => {
  const errors = {};

  if (!data.email || !validator.isEmail(data.email)) {
    errors.email = "A valid email is required.";
  }
  if (!data.password) {
    errors.email = "Password is required.";
  }
  return errors;
};
