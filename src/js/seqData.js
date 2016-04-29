
export var seqData = {
  name: 'Test',
  tracks: [
    // {
    //   name: 'part1',
    //   channel: 0,
    //   mml:
    //   `
    //    s0.01,0.2,0.2,0.03 @2 
    //    t90  q35 v30 l1r1r1r1r1 $l16o3 cccccccc<ggggaabb> cccccccc<gggg>cc<bb b-b-b-b-b-b-b-b-ffffggg+g+ g+g+g+g+g+g+g+g+ggggaabb >
    //          `
    //   },
    // {
    //   name: 'part1',
    //   channel: 0,
    //   mml:
    //   `
    //    s0.01,0.2,0.2,0.03 @2 
    //    t140  q55 v20 o2 l8 $bbbb bbbb
    //          `
    //   },
    // {
    //   name: 'part1',
    //   channel: 0,
    //   mml:
    //   `
    //    s0.01,0.2,0.2,0.05 @4 
    //    t140  q75 v20 o4 l8 $[bd+]1 [bd+][bd+] r8[f+>c+<] r8[d+b-] r8[bd+]2.r8r4
    //          `
    //   },
      
    {
      name: 'base',
      channel: 1,
      mml:
      `s0.01,0.01,1.0,0.05 o5 t140 @10 v60 q20 $l4grg8g8r`
    }
     ,
    {
      name: 'part4',
      channel: 2,
      mml:
      `s0.01,0.01,1.0,0.05 o5 t140 @21 v60 q80 $/:l4rv60b8.v30b16rl16v60b8r8:/3l4rb8.b16rl16br16bb`
    }
     ,
    {
      name: 'part5',
      channel: 3,
      mml:
      `s0.01,0.01,1.0,0.05 o5 t140 @11 l8 $ q20 v60 r8a8 r8a8`
    }
     ,
    {
      name: 'part5',
      channel: 4,
      mml:
      `s0.01,0.01,1.0,0.05 o5 t140 @20 q95 $v20 l4 rgrg `
    }
  ]
}