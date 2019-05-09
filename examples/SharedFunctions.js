export function setRunnableCode(code) {
  this.runnableCode = code
}

export function setStyleCode(styleCode) {
  this.styleCode = styleCode
}

export function formatterOptions() {
  return {
    printWidth: this.printWidth,
    semi: this.useSemicolons
  }
}
