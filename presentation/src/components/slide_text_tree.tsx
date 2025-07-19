import { NodeProps } from "@motion-canvas/2d";
import { Layout, Txt, Rect, Node } from '@motion-canvas/2d'
import { createRef, debug } from "@motion-canvas/core";


const tab_count: number = 4;

export interface TextTreeNode {
  text: string;
  font_style?: string;
  children?: TextTreeNode[];
}

export function text_node(text: string, font_style?: string, children?: TextTreeNode[]) {
  return {
    text: text!,
    font_style: font_style ?? "normal",
    children: children ?? []
  }
}

export interface TextTreeStyle {
  indent_step?: number;
  font_size?: number;
  font_family?: string;
  text_color?: string;
};


const default_text_tree_style: TextTreeStyle = {
  indent_step: 40,
  font_size: 32,
  font_family: 'Source Code Pro',
  text_color: 'black'
};

export interface SlideTextTreeProps extends NodeProps {
  tree: TextTreeNode;
  text_tree_style?: TextTreeStyle;
}

export function slide_text_props(tree: TextTreeNode, text_tree_style?: TextTreeStyle): SlideTextTreeProps{
  return {
    tree: tree!,
    text_tree_style: text_tree_style ?? default_text_tree_style,
  };
}

export class SlideTextTree extends Layout {
  constructor(text_tree_props: SlideTextTreeProps) {
    let fixed_tree_props = slide_text_props(text_tree_props.tree, text_tree_props.text_tree_style);
    super({
      ...slide_text_props(fixed_tree_props.tree, fixed_tree_props.text_tree_style),
      direction: "column"
    });
    this.build_tree(0, fixed_tree_props.tree, fixed_tree_props.text_tree_style);
  }

  private build_tree(
    depth: number,
    text_tree_root: TextTreeNode,
    text_tree_style: TextTreeStyle
  ) {
    this.add(
      <Layout
        direction={"row"}
      >
        <Layout width={depth * text_tree_style.indent_step}/>
        <Txt 
          text={'- '}
          fontFamily={text_tree_style.font_family}
          fontSize={text_tree_style.font_size}
          fill={text_tree_style.text_color}
          marginRight={10}
        />
        <Txt
          text={text_tree_root.text}
          textWrap={true}
          fontStyle={text_tree_root.font_style}
          fontFamily={text_tree_style.font_family}
          fontSize={text_tree_style.font_size}
          fill={text_tree_style.text_color}
        />
      </Layout>

    );

    text_tree_root.children.forEach((child) =>
      this.build_tree(depth + 1, child, text_tree_style)
    );
  }
}


