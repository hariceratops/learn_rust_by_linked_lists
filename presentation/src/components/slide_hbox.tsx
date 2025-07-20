import { LayoutProps } from "@motion-canvas/2d";
import { Rect, Node, Layout } from "@motion-canvas/2d/lib/components";
import { createRef } from "@motion-canvas/core";
import { theme } from "../theme";


export interface HBoxElement {
  content: Node | Layout
  share: number
}

export interface SlideHBoxProps extends LayoutProps {
  contents: (Node | Layout)[];
}

export class SlideHBox extends Layout {
  private contents: (Node | Layout)[] = []

  constructor(hbox_props: SlideHBoxProps) {
    super({...hbox_props, direction: "row"});

    for (let item of hbox_props.contents) {
      this.add(
        <Rect layout grow={1}>
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
