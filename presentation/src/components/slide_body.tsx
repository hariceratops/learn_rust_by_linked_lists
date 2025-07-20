import { LayoutProps } from "@motion-canvas/2d";
import { Rect, Node, Layout } from "@motion-canvas/2d/lib/components";
import { createRef } from "@motion-canvas/core";
import { theme } from "../theme";
import { SlideHBox } from "./slide_hbox";
import { SlideVBox } from "./slide_vbox";


export interface SlideBodyProps extends LayoutProps {
  slide_body: SlideHBox | SlideVBox;
}

export class SlideBody extends Layout {
  private readonly container = createRef<Rect>();

  constructor(body_props: SlideBodyProps) {
    super({...body_props, direction: "column"});

    this.add(
      <Rect layout
        direction="column"
        fill={theme.colors.background}
        ref={this.container}
      >
        {body_props.slide_body}
      </Rect>
    );
  }
}
