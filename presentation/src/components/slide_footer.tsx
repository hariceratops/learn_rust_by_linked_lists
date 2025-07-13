import { LayoutProps } from "@motion-canvas/2d";
import { Rect, Txt, Layout } from "@motion-canvas/2d/lib/components";
import { theme } from "../theme";
import '../global.css';


export interface SlideFooterProps extends LayoutProps {
  slide_number: number;
}

export class SlideFooter extends Layout {
  private readonly slide_number_font_size: number = 40;

  constructor(footer_props: SlideFooterProps) {
    super({...footer_props, direction: "column"});

    this.add(
      <Rect layout direction="row" fill={theme.colors.background}>
        <Rect grow={20}/>
        <Txt 
          text={`${footer_props.slide_number}`} 
          fontSize={this.slide_number_font_size} 
          fill={theme.colors.text}
          fontFamily={theme.font}
        />
      </Rect>
    );
  }
}
