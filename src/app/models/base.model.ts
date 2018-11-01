export class Model {
  constructor(model: object) {
    Object.keys(model).forEach(key => {
      this[key] = model[key];
    });
  }
}
