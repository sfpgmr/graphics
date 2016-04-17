
export var seqData = {
  name: 'Test',
  tracks: [
    {
      name: 'part1',
      channel: 0,
      mml:
      `
       s0.01,0.2,0.2,0.03 @2 
       t140  q35 v30 l1r1r1r1r1 $l16o3 cccccccc<ggggaabb> cccccccc<gggg>cc<bb b-b-b-b-b-b-b-b-ffffggg+g+ g+g+g+g+g+g+g+g+ggggaabb >
      `
      },
    {
      name: 'part3',
      channel: 1,
      mml:
      `s0.01,0.01,1.0,0.05 o5 t140 @9 v50 q50 $l4gggg`
    }
     ,
    {
      name: 'part4',
      channel: 2,
      mml:
      `s0.01,0.01,1.0,0.05 o5 t140 @22 v60 q90 $/:l4rarl16a8r8:/3l4rarl16aaaa`
    }
     ,
    {
      name: 'part5',
      channel: 3,
      mml:
      `s0.01,0.01,1.0,0.05 o5 t140 @11 l16 q90 $v40@11aaaaaa@18v40a8`
    }
     ,
    {
      name: 'part5',
      channel: 4,
      mml:
      `s0.01,0.01,1.0,0.05 o5 t140 @14 q95 $v25 l4 rara`
    }
  ]
}