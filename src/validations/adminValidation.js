//product validation
export const productValidation = (data) => {
  const errors = {};

  if (!data.name) {
    errors.name = "Name is required.";
  }
  if (!data.description) {
    errors.description = "Description is required.";
  }

  if (!data.brand) {
    errors.brand = "Brand is required.";
  }
  if (!data.price) {
    errors.price = "Price is required.";
  }

  if (!data.stock) {
    errors.stock = "Stock is required.";
  }
  if (!data.features) {
    errors.features = "Features are required.";
  }
  if (!data.category) {
    errors.category = "Category is required.";
  }
  if (!data.image) {
    errors.image = "Image is required.";
  }

  return errors;
};
