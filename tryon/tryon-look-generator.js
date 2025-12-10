export class LookGenerator {
  constructor(itemsDB) {
    this.items = itemsDB;
  }

  generate(userPrefs) {
    return this.items
      .filter(i => userPrefs.colors.includes(i.color))
      .slice(0, 3);
  }
}
