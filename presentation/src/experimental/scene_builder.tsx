import { View2D } from "@motion-canvas/2d";
import { Node, Circle, Rect } from "@motion-canvas/2d";
import { beginSlide, all, createRef, debug } from '@motion-canvas/core';
import { TypeRegistry } from './type_registry'
import { RegisterableType } from "./registerable";


interface RegisterableNodes extends RegisterableType<Node> {
  Node: Node;
  Circle: Circle;
  Rect: Rect;
}

export class SceneBuilder {
  private scene_layout: Node;
  private view: View2D;
  private ref_map: TypeRegistry<Node, RegisterableNodes> = new TypeRegistry();

  constructor(view: View2D, scene_layout: Node) {
    this.scene_layout = scene_layout;
    this.view = view;
    this.build_ref_map(view);
  }

  private build_ref_map<T extends Node>(scene_root: T) {
    const node_key = scene_root.key;
    this.ref_map.add(T, node_key, scene_root);
  }

  public build_view(): View2D {
    this.view.add(this.scene_layout);
    return this.view;
  }

};
