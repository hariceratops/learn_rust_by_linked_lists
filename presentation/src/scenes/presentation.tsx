import { makeScene2D, Txt, Circle } from '@motion-canvas/2d';
import { beginSlide, waitFor, all, createRef } from '@motion-canvas/core';
import { Slide } from '../components/slide';
import { Title } from '../components/title';
import { SlideTextTree, TextTreeNode, text_node } from '../components/slide_text_tree';


export default makeScene2D(function* (view) {
  const title = new Title({
    title: "Learn Rust with a couple of Linked Lists",
    presenter: "Hari Prasad Manoharan"
  });
  view.add(title);
  yield* beginSlide('title');
  yield* waitFor(1);

  const slide_1 = new Slide({
    slide_heading: 'who_am_i',
    slide_number: 1,
    contents: [
      <SlideTextTree
        tree={text_node("Hari Prasad", "normal", [text_node("Mbition")])}
      />,
      // new SlideTextTree({
      //   tree: new TextTreeNode({
      //     text: "Hari Prasad",
      //     children: [
      //       new TextTreeNode({
      //         text: "Mbition"
      //       })
      //     ]
      //   }),
      // }),
    ]
  });
  view.add(slide_1);
  yield* beginSlide('slide_1');
  yield* waitFor(1);

  const myCircle = createRef<Circle>();
  const slide_2 = new Slide({
    slide_heading: 'Memory Layouts',
    slide_number: 2,
    contents: [
      <Txt
        text="Learn Rust with a Linked List"
        fontSize={42}
        fontFamily={"Source Code Pro"}
        fill="black"
      />
    ]
  });
  view.add(slide_2);

  view.add(
    <Circle
      ref={myCircle}
      // try changing these properties:
      x={-300}
      width={140}
      height={140}
      fill="#e13238"
    />,
  );

  yield* beginSlide('slide_2');
  // yield* waitFor(1);
  yield* all(
    myCircle().position.x(300, 1).to(-300, 1),
    myCircle().fill('#e6a700', 1).to('#e13238', 1),
  );
});
