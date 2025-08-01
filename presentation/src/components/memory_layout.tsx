import { LayoutProps } from "@motion-canvas/2d";
import { Rect, Txt, Node, Layout } from "@motion-canvas/2d/lib/components";
import { createRef } from "@motion-canvas/core";
import { theme } from "../theme";


export interface MemoryLayoutProps extends LayoutProps {
}

export class MemoryLayout extends Layout {
  private readonly slide_number_font_size: number = 40;
  private readonly container = createRef<Rect>();
  private readonly component_width = 400;
  private readonly component_height = 800;

  constructor(footer_props: MemoryLayoutProps) {
    super({...footer_props, direction: "column"});

    // todo use for loop
    // todo use one more reusable component called box
    this.add(
      <Rect 
        layout 
        direction="column" 
        fill={theme.colors.background}
        ref={this.container}
        width={this.component_width}
        height={this.component_height}
      >
        <Rect 
            grow={1}
            fill={"cyan"}
            justifyContent={"center"}
            alignItems={"center"}
        >
          <Txt 
            text={`code`} 
            fontSize={this.slide_number_font_size} 
            fill={theme.colors.text}
            fontFamily={theme.font}
          />
        </Rect>
        <Rect grow={1} fill={"#75f1c1"}/>
        <Rect grow={1} fill={"#75c1f1"}/>
        <Rect grow={1} fill={"#f9e358"}/>
      </Rect>
    );
  }
  // malibu, spray
}
