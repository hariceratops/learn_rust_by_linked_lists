import { makeScene2D, Circle } from '@motion-canvas/2d';
import { beginSlide, all, createRef, debug } from '@motion-canvas/core';
import { Slide } from '../components/slide';
import { Title } from '../components/title';
import { SlideTextTree } from '../components/slide_text_tree';
import { MemoryLayout } from '../components/memory_layout';
import { SlideVBox } from '../components/slide_vbox';
import { SlideHBox } from '../components/slide_hbox';


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


  const slide_2 = new Slide({
    slide_heading: 'Memory Layouts',
    slide_number: 2,
    slide_body: new SlideHBox({
      contents: [
        ({
          content: new SlideTextTree({
            tree: {
              text: ("Ownership"), children: [{text: "No more than one mutable reference", children: []}]
            }
          }),
          share: 30,
          alignment: "start",
          justification: "start",
          content_max_width: 500,
        }),
        ({
          content: new SlideTextTree({
            tree: {
              text: ("Fearless Concurrency. But I must explain to you how all this mistaken idea of denouncing pleasure."), children: []
            }
          }),
          share: 30,
          alignment: "start",
          justification: "start",
          content_max_width: 500,
        }),
        ({
          content: new Circle({
            key: "circle_1",
            width: 140,
            height: 140,
            fill: "#e13238"
          }),
          share: 40,
          alignment: "center",
          justification: "center",
          content_max_width: 500
        })
      ]
    })
  });
  view.add(slide_2);
  yield* beginSlide('slide_2');

  const circle = view.findFirst(node => node.key === "circle_1") as Circle;
  circle.parent().save();
  circle.restore();
  circle.parent().restore();
  circle.parent().layout(false);
  let x = circle.position().x;
  yield* all(
    circle.position.x(x + 100, 1).to(x, 1),
    circle.fill('#e6a700', 1).to('#e13238', 1),
  );


  const slide_3 = new Slide({
    slide_heading: 'Memory Layouts',
    slide_number: 3,
    slide_body: new SlideHBox({
      contents: [
        ({
          content: <MemoryLayout/>,
          share: 100,
          alignment: "center",
          justification: "center",
          content_max_width: 4000,
        })
      ]
    })
  });
  view.add(slide_3);
  yield* beginSlide('slide_3');
});


