import { FlexContent, FlexItems, LayoutProps } from "@motion-canvas/2d";
import { Rect, Node, Layout } from "@motion-canvas/2d/lib/components";
import { sum_array } from "../utils/sum";


export interface HBoxElement {
  content: Node | Layout;
  share: number;
  justification: FlexContent;
  alignment: FlexItems;
  content_max_width: number;
}

export interface SlideHBoxProps extends LayoutProps {
  contents: HBoxElement[];
}

export class SlideHBox extends Layout {
  constructor(hbox_props: SlideHBoxProps) {
    super({...hbox_props, direction: "row"});
    const display_share = sum_array(hbox_props.contents, c => c.share);

    for (let item of hbox_props.contents) {
      this.add(
        <Rect 
          grow={item.share}
          maxWidth={item.content_max_width}
          justifyContent={item.justification}
          alignItems={item.alignment}
        >
          {item.content}
        </Rect>
      )
    }
  }

  public suppress_layout() {
    this.children().forEach(ref => ref.save());
    this.layout(false);
    this.children().forEach(ref => ref.restore());
  }

  public enable_layout() {
    this.layout(true);
  }
}
