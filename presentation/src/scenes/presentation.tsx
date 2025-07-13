import {makeScene2D, Txt, Layout} from '@motion-canvas/2d';
import {beginSlide, waitFor} from '@motion-canvas/core';
import {Slide} from '../components/slide';


export default makeScene2D(function* (view) {
  const slide = new Slide({
    slide_heading: 'who_am_i',
    slide_number: 1,
    contents: (
      <Layout>
        <Txt
          text="Learn Rust with a Linked List"
          fontSize={42}
          fontFamily={"Source Code Pro"}
          fill="black"
        />
      </Layout>
    ),
  });
  view.add(slide);

  yield* beginSlide('first slide');
  yield* waitFor(1);

  // const another_slide = new Slide({
  //   slide_heading: 'Memory Layouts',
  //   slide_number: 1,
  //   contents: (
  //     <Txt
  //       text="Learn Rust with a Linked List"
  //       fontSize={42}
  //       fontFamily={"Source Code Pro"}
  //       fill="black"
  //     />
  //   ),
  // });
  // view.add(another_slide);
  //
  // yield* beginSlide('first slide');
  // yield* waitFor(1);
});
