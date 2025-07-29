import { View2D } from "@motion-canvas/2d";
import { Node } from "@motion-canvas/2d";
import { beginSlide, all, createRef, debug } from '@motion-canvas/core';

type ReferenceMap = Map<string, () => Node>;

export class SceneBuilder {
  private scene_layout: Node;
  private ref_map: ReferenceMap = new Map();

  constructor(view: View2D, scene_layout: Node) {
    this.scene_layout = scene_layout;
    this.build_ref_map(view);
    view.add(scene_layout); 
  }

  public get_ref_map(): ReferenceMap { return this.ref_map; } 

  private build_ref_map<T extends Node>(scene_root: T) {
    const node_key = scene_root.key;
    const node_ref = createRef<T>();
    this.ref_map.set(node_key, node_ref);
  }

};
