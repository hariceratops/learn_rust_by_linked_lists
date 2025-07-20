import { makeScene2D, Circle } from '@motion-canvas/2d';
import { beginSlide, all, createRef } from '@motion-canvas/core';
import { Slide } from '../components/slide';
import { Title } from '../components/title';
import { SlideTextTree } from '../components/slide_text_tree';
import { SlideVBox } from '../components/slide_vbox';
import { SlideHBox } from '../components/slide_hbox';


export default makeScene2D(function* (view) {
  const title = new Title({
    title: "Learn Rust with a couple of Linked Lists",
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

  const myCircle = createRef<Circle>();
  const hbox = createRef<SlideHBox>();
  const slide_2 = new Slide({
    slide_heading: 'Memory Layouts',
    slide_number: 2,
    slide_body: new SlideHBox({
      ref: hbox,
      contents: [
        new SlideTextTree({
          tree: {
            text: ("Ownership"), children: []
          }
        }),
        new SlideTextTree({
          tree: {
            text: ("Fearless Concurrency"), children: []
          }
        }),
        <Circle
          ref={myCircle}
          width={140}
          height={140}
          fill="#e13238"
        />
      ]
    })
  });
  view.add(slide_2);
  // https://slama.dev/motion-canvas/groups-animations-signals-effects/
  yield* beginSlide('slide_2');
  myCircle().parent().save(); 
  myCircle().parent().layout(false);
  yield* all(
    myCircle().position.x(300, 1).to(0, 1),
    myCircle().fill('#e6a700', 1).to('#e13238', 1),
  );
  myCircle().parent().restore(); 
  myCircle().parent().layout(true);
});
