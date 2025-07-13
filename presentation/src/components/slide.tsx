import { SignalValue } from "@motion-canvas/core";
import { FlexDirection, LayoutProps } from "@motion-canvas/2d";
import { Rect, Layout } from "@motion-canvas/2d/lib/components";
import { SlideHeader } from "./slide_header";
import { SlideFooter } from "./slide_footer";
import { SlideBody } from "./slide_body";
import { theme } from "../theme"
import '../global.css';


export interface SlideProps extends LayoutProps {
  slide_heading: string;
  slide_number: number;
  contents?: Layout[];
}

export class Slide extends Layout {
  private readonly slide_title_quota: number = 1;
  private readonly slide_body_quota: number = 8;
  private readonly slide_footer_quota: number = 0;
  private readonly slide_content_direction: SignalValue<FlexDirection> = "column";

  constructor(slide_props?: SlideProps) {
    super({...slide_props,});

    this.add(
      <Rect layout
        direction={this.slide_content_direction}
        width="100%"
        height="100%"
        padding={40}
        gap={20}
        fill={theme.colors.background}
      >
        <SlideHeader slide_heading={slide_props.slide_heading} grow={this.slide_title_quota}/>
        <SlideBody contents={slide_props.contents} grow={this.slide_body_quota} /> 
        <SlideFooter slide_number={slide_props.slide_number} grow={this.slide_footer_quota}/>
      </Rect>
    );
  }
}
