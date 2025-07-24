import { World } from './world';
import { Position, Velocity } from './components';
import { MovementSystem } from './systems';

const world = new World();

const player = world.create_entity();
world.add_component(player, new Position(0, 0));
world.add_component(player, new Velocity(1, 1));

const enemy = world.create_entity();
world.add_component(enemy, new Position(5, 5));
world.add_component(enemy, new Velocity(-1, 0));

world.register_system(new MovementSystem());

world.update();
