class Path {
  #REACT="/src/templates/react"
  #VANILLA="/src/templates/vanilla"

  static get REACT() {
    return this.#REACT;
  }
  static get VANILLA() {
    return this.#VANILLA;
  }
}

export default Path;