
export var seqData = {
  name: 'Test',
  tracks: [
    {
      name: 'part1',
      channel: 0,
      mml:
      `
       s0.05,0.5,0.2,0.05 @4 
       t105 l8 o5 q75 v100 $
/: ab-> c4c4c4 c4.faf fedc<b-4 [gb-]2 [fa]4 agb-a>c<b- >c+dc<b-ag f2[ea]g f4r4 :/
/: [fa][eg] [eg]2[gb-][fa] [fa]2>c<b b>dfd<b>d c4.<b-
   ab-> c4c4c4 c4.faf fedc<b-4 [gb-]2 [fa]4 agb-a>c<b- >c+dc<b-ag f2[ea]g f4r4 :/
      `
      }
      ,
    {
      name: 'part2',
      channel: 1,
      mml:
        `
        s0.03,0.5,0.5,0.50 @6 
        t105 l8 o4 q75 v75 $
/: r4 f>c<a>c<a>c< f>c<a>c<a>c< g>c<b->c<b->c< [e>c]2 [f>c]4 [b->d]2.^2 [<b->b-]4 [ca]2[cb-]4 [fa]4 <f4> :/
/: r4 c4>c4r4< c4>c4r4< [cdf]4[cdf]4[cdf]4 [ce]4r4
   r4 f>c<a>c<a>c< f>c<a>c<a>c< g>c<b->c<b->c< [e>c]2 [f>c]4 [b->d]2.^2 [<b->b-]4 [ca]2[cb-]4 [fa]4 <f4> :/
        `
     }
     //,
    // {
    //   name: 'part3',
    //   channel: 2,
    //   mml:
    //   `s0.01,0.5,0.6,0.5t180@1v50l8r1r1$q50o6c1c1<q30l8.gdl4g>d4l8<g>c4.<g2r8`
    // }
  ]
}