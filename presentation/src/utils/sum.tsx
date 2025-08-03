export function sum_array<T>(arr: T[], selector: (item: T) => number) : number {
  return arr.reduce((acc, item) => {
    const value = selector ? selector(item) : (item as unknown as number);
    return acc + value;
  }, 0)
}
