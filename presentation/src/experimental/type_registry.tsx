import { RegisterableType } from "./registerable";


export class TypeRegistry<T, R extends RegisterableType<T>> {
  private store = new Map<keyof RegisterableType<T>, Map<string, T>>();

  public add<K extends keyof RegisterableType<T>>(
    type: K, 
    key: string, 
    instance: RegisterableType<T>[K]
  ): void 
  {
    let type_map = this.store.get(type);
    if (!type_map) {
      type_map = new Map();
      this.store.set(type, type_map);
    }
    if (type_map.has(key)) {
      throw new Error(`Duplicate key '${key}' for type '${String(type)}'`);
    }
    type_map.set(key, instance);
  }

  public get<K extends keyof RegisterableType<T>>(
    type: K,
    key: string
  ): Optional<RegisterableType<T>[K]>
  {
    const type_map = this.store.get(type);
    if (!type_map) 
      return Optional.None();
    if (key !== type) 
      throw new Error(`Cannot convert instance of type '${key} to '${type}''`)
    const instance = type_map.get(key);
    return instance ? 
           Optional.Some(instance as RegisterableType<T>[K]) 
           : Optional.None();
  }
}

