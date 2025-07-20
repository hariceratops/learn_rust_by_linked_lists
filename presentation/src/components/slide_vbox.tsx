import { LayoutProps } from "@motion-canvas/2d";
import { Rect, Node, Layout } from "@motion-canvas/2d/lib/components";
import { createRef } from "@motion-canvas/core";
import { theme } from "../theme";


export interface SlideVBoxProps extends LayoutProps {
  contents: (Node | Layout)[];
}

export class SlideVBox extends Layout {
  private contents: (Node | Layout)[] = []
  private readonly container = createRef<Rect>();

  constructor(vbox_props: SlideVBoxProps) {
    super({...vbox_props, direction: "column"});

    for (let item of vbox_props.contents) {
      this.contents.push(
        <Rect layout grow={1}>{item}</Rect>
      )
    }

    // todo: use an arrow function instead of raw loop
    this.add(
      <Rect layout
        direction="column"
        width="100%"
        height="100%"
        fill={theme.colors.background}
        ref={this.container}
      >
        {this.contents}
      </Rect>
    );
  }
}
