import { NodeProps } from "@motion-canvas/2d";
import { Layout, Txt } from '@motion-canvas/2d'

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

export function slide_text_tree(tree: TextTreeNode, text_tree_style: TextTreeStyle): SlideTextTreeProps{
  return {
    tree: tree!,
    text_tree_style: text_tree_style ?? default_text_tree_style,
  };
}

export class SlideTextTree extends Layout {
  constructor(text_tree_props: SlideTextTreeProps) {
    super({
      ...text_tree_props,
      direction: "column"
    });

    this.build_tree(0, text_tree_props.tree, text_tree_props.text_tree_style);
  }

  private build_tree(
    depth: number,
    text_tree_root: TextTreeNode,
    text_tree_style: TextTreeStyle
  ) {
    this.add(
      <Txt
        layout
        textWrap={true}
        text={text_tree_root.text}
        fontStyle={text_tree_root.font_style}
        x={depth * text_tree_style.indent_step}
        fontFamily={text_tree_style.font_family}
        fontSize={text_tree_style.font_size}
        fill={text_tree_style.text_color}
      />
    );

    text_tree_root.children.forEach((child) =>
      this.build_tree(depth + 1, child, text_tree_style)
    );
  }
}


