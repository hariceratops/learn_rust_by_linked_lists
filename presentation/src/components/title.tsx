import { SignalValue, createRef } from "@motion-canvas/core";
import { FlexDirection, LayoutProps } from "@motion-canvas/2d";
import { Rect, Txt, Layout } from "@motion-canvas/2d/lib/components";
import { theme } from "../theme"
import '../global.css';


export interface TitleProps extends LayoutProps {
  title: string;
  presenter: string;
}

export class Title extends Layout {
  private readonly pre_title_quota: number = 40;
  private readonly title_quota: number = 20;
  private readonly post_title_quota: number = 40;
  private readonly slide_content_direction: SignalValue<FlexDirection> = "column";
  private readonly container = createRef<Rect>();

  private readonly title_font_size = 100;
  private readonly presenter_font_size = this.title_font_size / 2;

  constructor(title_props: TitleProps) {
    super({
      ...title_props,
    });

    this.add(
      <Rect layout
        direction={this.slide_content_direction}
        width="100%"
        height="100%"
        padding={40}
        gap={20}
        fill={theme.colors.background}
        ref={this.container}
      >
        <Rect
          grow={this.pre_title_quota}
        />
        <Txt layout
          grow={this.title_quota}
          text={title_props.title}
          fontSize={this.title_font_size}
          fontStyle={"bold"}
          fontFamily={theme.font}
          textWrap={true}
        />
        <Txt layout
          grow={this.title_quota}
          text={title_props.presenter}
          fontSize={this.presenter_font_size}
          fontStyle={"bold"}
          fontFamily={theme.font}
          textWrap={true}
        /> 
        <Rect 
          grow={this.post_title_quota}
        />
      </Rect>
    );
  }
}
