/**
 * @class Formatter
 * @description This class is responsible for formatting strings
 */
class Formatter {
  static getCapitalize(name) {
    const toCapitalize = this.getCamelCase(name);
    return toCapitalize.charAt(0).toUpperCase() + toCapitalize.slice(1);
  }

  static decapitalize(name) {
    return name.charAt(0).toLowerCase() + name.slice(1);
  }

  static getCamelCase(name) {
    return this.decapitalize(
      name
        .split(/Module/i)
        .join('')
        .concat('Module')
    );
  }
}

export default Formatter;
