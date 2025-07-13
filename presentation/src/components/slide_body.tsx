import { LayoutProps } from "@motion-canvas/2d";
import { Rect, Layout } from "@motion-canvas/2d/lib/components";


export interface SlideBodyProps extends LayoutProps {
  contents?: Layout[];
}

export class SlideBody extends Layout {
  constructor(body_props?: SlideBodyProps) {
    super({...body_props, direction: "column"});

    this.add(
      <Rect layout
        direction="column"
        width="100%"
        height="100%"
        fill="white"
      >
      </Rect>
    );
  }
}
