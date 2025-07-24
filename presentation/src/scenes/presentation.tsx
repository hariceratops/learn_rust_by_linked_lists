import { makeScene2D, Circle } from '@motion-canvas/2d';
import { beginSlide, all, createRef, debug } from '@motion-canvas/core';
import { Slide } from '../components/slide';
import { Title } from '../components/title';
import { SlideTextTree } from '../components/slide_text_tree';
import { SlideVBox } from '../components/slide_vbox';
import { SlideHBox } from '../components/slide_hbox';


import {Shape, Latex, Layout, Rect} from '@motion-canvas/2d';
import {sequence, Vector2, ThreadGenerator} from '@motion-canvas/core';


export function* appear(object: Shape, duration = 1): ThreadGenerator {
    let scale = object.scale();

    yield* all(
        object.scale(0).scale(scale, duration),
        object.opacity(0).opacity(1, duration),
    );
}


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
            text: ("Fearless Concurrency. But I must explain to you how all this mistaken idea of denouncing pleasure."), children: []
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
  myCircle().save();
  myCircle().parent().save();
  myCircle().restore();
  myCircle().parent().restore();
  myCircle().parent().layout(false);
  let x = myCircle().position().x;
  yield* all(
    myCircle().position.x(x + 100, 1).to(x, 1),
    myCircle().fill('#e6a700', 1).to('#e13238', 1),
  );
  yield* beginSlide('slide_3');
});

// export default makeScene2D(function* (view) {
//     const rectangles = Array.from({length: 3}, () => createRef<Rect>());
//     const numbers = Array.from({length: 3}, () => createRef<Latex>());
//
//     // create the layout to place the things into
//     const layout = createRef<Layout>();
//     view.add(<Layout layout ref={layout} gap={50}>
//         {rectangles.map((ref, i) =>
//             <Rect ref={ref} grow={1} size={300} stroke={'white'} lineWidth={5} fill={'cyan'}
//                   justifyContent={'center'} alignItems={'center'}
//             >
//                 <Latex tex={`${i}`}
//                        ref={numbers[i]} fill={'white'}
//                        scale={4} opacity={0}/>
//             </Rect>
//         )}
//     </Layout>)
//
//     // save this state of nodes (they should end up like this)
//     rectangles.forEach(ref => ref().save())
//
//     // disable the layout, moving the rects back to origin
//     // in reality, their position has always been (0, 0),
//     // but the layout previously dictated their position
//     layout().layout(false);
//
//     // scatter them around the screen to make it look cooler
//     rectangles[0]().scale(0.5)
//     rectangles[0]().position(new Vector2(100, 200))
//     rectangles[0]().rotation(30)
//     rectangles[0]().opacity(0)
//
//     rectangles[1]().scale(0.7)
//     rectangles[1]().position(new Vector2(-50, -100))
//     rectangles[1]().rotation(230)
//     rectangles[1]().opacity(0)
//
//     rectangles[2]().scale(0.4)
//     rectangles[2]().position(new Vector2(-200, 150))
//     rectangles[2]().rotation(-150)
//     rectangles[2]().opacity(0)
//
//     yield* sequence(0.15, ...rectangles.map(ref => appear(ref())));
//
//     // restoring them (in an animated way) returns them to the layout,
//     // since we're restoring the absolute values of its attributes
//     yield* all(...rectangles.map(ref => ref().restore(1)));
//
//     // now we can re-enable the layout, since nothing will change
//     layout().layout(true);
//
//     yield* sequence(0.15, ...numbers.map(ref => appear(ref())));
//
//     // since they're in a flexbox, we can do cool flexbox stuff!
//     yield* all(
//         layout().width(1200, 1),
//         ...rectangles.map((ref, i) => ref().height(100 * (i + 3), 1)),
//     )
// });

// export default makeScene2D(function* (view) {
//     const rectangles = Array.from({length: 3}, () => createRef<Rect>());
//
//     // we can use any of the names from the X11 color standard!
//     // a nice website for picking colors: https://x11.linci.co/
//     const rectangleColors = ['crimson', 'forestgreen', 'deepskyblue'];
//
//     const layout = createRef<Layout>();
//
//     view.add(
//         <Layout layout gap={50} ref={layout}>
//             {rectangles.map((ref, i) =>
//                 <Rect
//                     ref={ref} opacity={0} stroke={rectangleColors[i]}
//                     lineWidth={5} size={300}
//                 />
//             )}
//         </Layout>
//     )
//
//     yield* sequence(0.15, ...rectangles.map(ref => appear(ref())));
//
//     // scale the entire group
//     yield* all(
//         layout().scale(1.5, 1),
//         layout().position.y(-200, 1),
//     )
//
//     // suppress the layout for a while and remember the positions
//     layout().children().forEach(ref => ref.save())
//     layout().layout(false);
//     layout().children().forEach(ref => ref.restore())
//
//     // now we can move it
//     yield* rectangles[1]().position.y(300, 1);
//
//     // layout().layout(true);
//     // layout doesn't have attributes of the children, so setting colors on it won't work
//     yield* all(...rectangles.map(ref => ref().stroke('white', 1)));
//     yield* all(...rectangles.map(ref => ref().fill('white', 1)));
// });
