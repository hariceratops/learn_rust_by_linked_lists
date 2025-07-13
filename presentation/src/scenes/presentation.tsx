import {makeScene2D, Txt, Layout} from '@motion-canvas/2d';
import {beginSlide, waitFor} from '@motion-canvas/core';
import {Slide} from '../components/slide';
import { Title } from '../components/title';


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
      <Txt
        text="Learn Rust with a Linked List"
        fontSize={42}
        fontFamily={"Source Code Pro"}
        fill="black"
      />
    ]
  });
  view.add(slide_1);
  yield* beginSlide('slide_1');
  yield* waitFor(1);

  const slide_2 = new Slide({
    slide_heading: 'Memory Layouts',
    slide_number: 1,
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
  yield* beginSlide('slide_2');
  yield* waitFor(1);
});
