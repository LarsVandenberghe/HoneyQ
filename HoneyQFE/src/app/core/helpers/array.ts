export function sortStringProperty<T>(prop: keyof T): (a: T, b: T) => number {
    return (a, b) => {
      const nameA = (a[prop] as string).toUpperCase();
      const nameB = (b[prop] as string).toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    }
}