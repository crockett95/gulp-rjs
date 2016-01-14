import SubClass = require('./sub-class');

class Main {
  private subClass: SubClass;

  constructor(name: string) {
    this.subClass = new SubClass(name, Math.ceil(Math.random() * 100));
  }

  get name(): string {
    return this.subClass.name;
  }
  set name(val: string) {
    this.subClass.name = val;
  }
}
