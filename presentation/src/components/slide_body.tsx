import { LayoutProps } from "@motion-canvas/2d";
import { Rect, Node, Layout } from "@motion-canvas/2d/lib/components";


export interface SlideBodyProps extends LayoutProps {
  contents: Layout[];
}

export class SlideBody extends Layout {
  private contents: Layout[] = []

  constructor(body_props: SlideBodyProps) {
    super({...body_props, direction: "column"});

    for (let item of body_props.contents) {
      this.contents.push(new Rect({layout: true, grow:1, children: item}));
    }

    this.add(
      <Rect layout
        direction="column"
        width="100%"
        height="100%"
        fill="white"
      >
        {this.contents}
      </Rect>
    );
  }
}
