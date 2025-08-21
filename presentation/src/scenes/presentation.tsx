import { makeScene2D, Circle } from '@motion-canvas/2d';
import { beginSlide, all, createRef, debug } from '@motion-canvas/core';
import { Slide } from '../components/slide';
import { Title } from '../components/title';
import { SlideTextTree } from '../components/slide_text_tree';
import { MemoryLayout } from '../components/memory_layout';
import { SlideVBox } from '../components/slide_vbox';
import { SlideHBox, HBoxElement, HBoxDetachedElement } from '../components/slide_hbox';

import { Rect, Txt } from '@motion-canvas/2d';
import { Node } from '@motion-canvas/2d';
import { makeRef } from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const title = new Title({
    title: "Learn Rust with a couple of Linked Lists",
    key: "title",
    presenter: "Hari Prasad Manoharan"
  });
  view.add(title);
  yield* beginSlide('title');


  const slide_1 = new Slide({
    slide_heading: 'whoami',
    slide_number: 1,
    slide_body: new SlideVBox({
      contents: [
        new SlideTextTree({
          tree: {
            text: ("Hari Prasad"),
            children: [
              { text: ("Mbition"), children: [] },
              { text: ("Berlin"), font_style: "italic", children: [] },
              { text: ("But I must explain to you how all this mistaken idea of denouncing pleasure. But I must explain to you how all this mistaken idea of denouncing pleasure"), children: [] }
            ]
          }
        })
      ]
    })
  });
  view.add(slide_1);
  yield* beginSlide('slide_1');

  const slide_2_hbox = 
    new SlideHBox({
      contents: [
        new HBoxElement(
          new SlideTextTree({
            tree: {
              text: ("Ownership"), 
              children: [
                {text: "No more than one mutable reference", children: []}
              ]
            }
          }),
          30,
          "start",
          "start",
          500,
        ),
        new HBoxElement(
          new SlideTextTree({
            tree: {
              text: ("Fearless Concurrency. But I must explain to you how all this mistaken idea of denouncing pleasure."), 
              children: []
            }
          }),
          30,
          "start",
          "start",
          500,
        ),
        new HBoxDetachedElement(
          new Circle({
            key: "circle_1",
            width: 140,
            height: 140,
            fill: "#e13238"
          }),
          40,
          "center",
          "center",
          500
        )
      ]
    })


  const slide_2 = new Slide({
    slide_heading: 'Memory Layouts',
    slide_number: 2,
    slide_body: slide_2_hbox
  });
  
  view.add(slide_2);
  slide_2_hbox.pop_detachable_components();
  yield* beginSlide('slide_2_1');

  const circle = view.findFirst(node => node.key === "circle_1") as Circle;

  let x = circle.position().x;
  yield* all(
    circle.position.x(x + 100, 1).to(x, 1),
    circle.fill('#e6a700', 1).to('#e13238', 1),
  );
  yield* beginSlide('slide_2_2');

  const slide_3 = new Slide({
    slide_heading: 'Memory Layouts',
    slide_number: 3,
    slide_body: new SlideHBox({
      contents: [
        new HBoxElement(<MemoryLayout/>, 100, "center", "center", 4000)
      ]
    })
  });
  view.add(slide_3);
  yield* beginSlide('slide_3');


  type Constructor<T> = new (...args: any[]) => T;

  type RefRecord<T extends Record<string, Constructor<any>>> = {
    [K in keyof T]: InstanceType<T[K]> | null;
  };

  function create_refs<T extends Record<string, new (...args: any[]) => Node>>(
    schema: T
  ): RefRecord<T> {
    const result: any = {};
    Object.keys(schema).forEach(key => {
      result[key] = null;
    });
    return result;
  }


  function build_tree_with_refs<T extends Record<string, new (...args: any[]) => Node>>(
    schema: T,
    builder: (refs: RefRecord<T>) => Node
  ) {
    const refs = create_refs(schema);
    const tree = builder(refs);
    return { tree, refs };
  }

  const ref_schema = {
    box: Rect,
    label: Txt,
  };

  // const { tree, refs } = build_tree_with_refs(ref_schema, refs => (
  //   <Node>
  //     <Rect key="box" ref={makeRef(refs, 'box')} />
  //     <Txt key="label" ref={makeRef(refs, 'label')} />
  //   </Node>
  // ));
  //
  // yield* refs.box?.position.x(300, 1);
  // yield* refs.box?.fill('#e6a700', 1).to('#e13238', 1),
  // yield* refs.label?.position.x(90);

  // Recursively walk Node tree to collect refs
  function collectRefs(node: Node, refs: Record<string, Node | null>): void {
    if (node.key in refs) {
      refs[node.key] = node;
    }
    node.children().forEach(child => collectRefs(child, refs))
  }

  // Main function
  function build_refs<S extends Record<string, new (...args: any) => Node>>
    (component: { layout: Node }, schema: S) 
  {
    const root = component.layout;
    // Initialize refs with null
    const refs = Object.fromEntries(Object.keys(schema).map(k => [k, null])) as RefRecord<S>;
    collectRefs(root, refs);
    return { tree: root, refs };
  }

  class MyScene {
    static layout = (
      <Node>
        <Rect key="box" width={300} height={300}/>
        <Txt key="label" />
      </Node>
    ) as Node;
  }

  const { tree, refs } = build_refs(MyScene, {
    box: Rect,
    label: Txt,
  });
  view.add(tree);
  yield* beginSlide('slide_4_1');

  // yield* refs.box?.position.x(300, 1);
  yield* refs.box?.fill('#e6a700', 1).to('#e13238', 1);
  yield* beginSlide('slide_4_2');
  // yield* refs.label.fontSize(89);
});
