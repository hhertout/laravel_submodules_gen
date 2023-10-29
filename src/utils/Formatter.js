class Formatter {
  static getCapitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  static decapitalize(name) {
    return name.charAt(0).toLowerCase() + name.slice(1);
  }

  static getCamelCase(name) {
    return this.decapitalize(name.split(/Module/i).join('').concat('Module'));
  }
}

export default Formatter;