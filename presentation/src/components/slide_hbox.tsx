import { FlexContent, FlexItems, LayoutProps } from "@motion-canvas/2d";
import { Rect, Node, Layout } from "@motion-canvas/2d/lib/components";
import { debug } from "@motion-canvas/core";
import { Scene } from "./scene";
import { View2D } from "@motion-canvas/2d";


class HBoxContent {
  content: Node;
  share: number;
  justification: FlexContent;
  alignment: FlexItems;
  content_max_width: number;

  constructor(
    content: Node,
    share: number,
    justification: FlexContent,
    alignment: FlexItems,
    content_max_width: number
  ) {
    this.content = content;
    this.share = share;
    this.justification = justification;
    this.alignment = alignment;
    this.content_max_width = content_max_width;
  }
};

export class HBoxElement extends HBoxContent  {};

export class HBoxDetachedElement extends HBoxContent {}

export interface SlideHBoxProps extends LayoutProps {
  contents: (HBoxContent)[];
}

export class SlideHBox extends Layout implements Scene {
  private readonly hbox_props: SlideHBoxProps;

  constructor(hbox_props: SlideHBoxProps) {
    super({...hbox_props, direction: "row"});
    this.hbox_props = hbox_props;
    // const display_share = sum_array(hbox_props.contents, c => c.share);

    for (let item of hbox_props.contents) {
      this.add(
        <Rect layout 
          grow={item.share}
          maxWidth={item.content_max_width}
          justifyContent={item.justification}
          alignItems={item.alignment}
        >
          {item.content}
        </Rect>
      )
    }
  }

  public pop_detachable_components(): void {
    const free_content_indices = 
      this.hbox_props
        .contents
        .map((val, index) => (val instanceof HBoxDetachedElement ? index : -1))
        .filter(index => index !== -1);
    this.children()
      .filter((_, index) => free_content_indices.includes(index))
      .map(item => item as Rect)
      .forEach((rect, _) => 
        (() => {
          rect.children().forEach((node, _) => {node.save();});
          rect.save(); 
          rect.children().forEach((node, _) => {node.restore();});
          rect.restore();
          rect.layout(false);
        })()
      )
  }
}
