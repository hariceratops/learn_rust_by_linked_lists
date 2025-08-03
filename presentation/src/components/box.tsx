import { LayoutProps } from "@motion-canvas/2d";
import { Rect, Node, Layout } from "@motion-canvas/2d/lib/components";
import { createRef } from "@motion-canvas/core";
import { theme } from "../theme";


export interface HBoxElement {
  content: Node | Layout;
  share: number;
  alignment: string;
}

export interface SlideHBoxProps extends LayoutProps {
  contents: (Node | Layout)[];
  content_max_width: number;
}

export class SlideHBox extends Layout {
  constructor(hbox_props: SlideHBoxProps) {
    super({...hbox_props, direction: "row"});

    for (let item of hbox_props.contents) {
      this.add(
        <Rect grow={1} maxWidth={500}>
          {item}
        </Rect>
      )
    }
  }

  public suppress_layout() {
    this.children().forEach(ref => ref.save());
    this.layout(false);
    this.children().forEach(ref => ref.restore());
  }

  public enable_layout() {
    this.layout(true);
  }
}
