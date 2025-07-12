import {makeScene2D, Txt} from '@motion-canvas/2d';
import {beginSlide, waitFor} from '@motion-canvas/core';
import {Slide} from '../components/slide';


export default makeScene2D(function* (view) {
  const slide = new Slide({
    title: 'who_am_i',
    slide_number: 1,
    children: (
      <Txt
        text="Learn Rust with a Linked List"
        fontSize={42}
        fontFamily={"Source Code Pro"}
        fill="black"
      />
    )
  });
  view.add(slide);

  yield* beginSlide('first slide');
  yield* waitFor(1);
});
