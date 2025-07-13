import { LayoutProps } from "@motion-canvas/2d";
import { Rect, Node, Layout } from "@motion-canvas/2d/lib/components";
import { createRef } from "@motion-canvas/core";
import { theme } from "../theme";


export interface SlideBodyProps extends LayoutProps {
  contents: Node[];
}

export class SlideBody extends Layout {
  private contents: Node[] = []
  private readonly container = createRef<Rect>();

  constructor(body_props: SlideBodyProps) {
    super({...body_props, direction: "column"});
    console.log(body_props.contents.length)

    for (let item of body_props.contents) {
      this.contents.push(
        <Rect layout grow={1}>{item}</Rect>
      )
    }

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
