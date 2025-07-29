import { System } from './types';
import { WorldLike } from './types';
import { Position, Velocity } from './components';

export class MovementSystem implements System {
  update(world: WorldLike): void {
    const entities = world.get_entities_with(Position, Velocity);
    for(const entity of entities) {
      const pos = world.get_component(entity, Position);
      const vel = world.get_component(entity, Velocity);
      pos.x += vel.dx;
      pos.y= vel.dy;
      console.log(`Entities ${entity} moved to (${pos.x}, ${pos.y})`);
    }
  }
}
