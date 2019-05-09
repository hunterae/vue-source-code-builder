export function setRunnableCode(code) {
  this.runnableCode = code
}

export function formatterOptions() {
  return {
    printWidth: this.printWidth,
    semi: this.useSemicolons
  }
}
