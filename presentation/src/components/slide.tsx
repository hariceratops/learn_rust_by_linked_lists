import { NodeProps} from "@motion-canvas/2d";
import { Rect, Txt, Node } from "@motion-canvas/2d/lib/components";


export interface SlideProps extends NodeProps {
  title: string;
  slide_number: number;
  children?: Node | Node[];
}

export class Slide extends Node {
  constructor(slide_props?: SlideProps) {
    super({...slide_props,});

    this.add(
      <Rect layout
        direction="column"
        width="100%"
        height="100%"
        padding={40}
        gap={20}
        fill="white"
      >
        <Rect layout direction="column" fill="white" grow={1}/>
        <Rect layout direction="column" fill="white" grow={8}/>
        <Rect layout direction="row" fill="white"
        >
          <Rect grow={20}/>
          <Txt
            text={`${slide_props.slide_number}`}
            fontSize={28}
            fill="black"
            // grow={1}
          />
        </Rect>
      </Rect>
    );
  }
}
