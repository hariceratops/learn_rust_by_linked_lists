import { LayoutProps } from "@motion-canvas/2d";
import { Rect, Txt, Layout } from "@motion-canvas/2d/lib/components";
import { theme } from "../theme";
import '../global.css';
import { createRef } from "@motion-canvas/core";


export interface SlideHeaderProps extends LayoutProps {
  slide_heading: string;
}

export class SlideHeader extends Layout {
  private readonly title_font_size: number = 80;
  private readonly container = createRef<Rect>();

  constructor(header_props: SlideHeaderProps) {
    super({...header_props,});

    this.add(
      <Rect 
        layout direction="column" 
        fill={theme.colors.background}
        grow={1}
        ref={this.container}
      >
        <Txt 
          text={`${header_props.slide_heading}`}
          fontSize={this.title_font_size}
          fill={theme.colors.text}
          fontFamily={theme.font}
        />
      </Rect>
    );
  }
}
