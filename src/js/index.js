import VideoDanmu from "./danmu";

// 弹幕数据
const danmuData = [
  {
    content: '我真的好喜欢这首钢琴曲0',
    speed: 1, // 平移像素
    runTime: 0, // 出现时间
    color: 'red'
  },
  {
    content: '这首曲子好清凉1',
    speed: 2,
    runTime: 5,
    color: 'green'
  },
  {
    content: '这首曲子好清凉2',
    speed: 3,
    runTime: 8,
    color: 'orange'
  },
  {
    content: '我真的好喜欢这首钢琴曲3',
    speed: 4,
    runTime: 8,
    color: 'orange'
  },

  {
    content: '这首曲子好清凉4',
    speed: 2,
    runTime: 5,
    color: ''
  },
  {
    content: '我真的好喜欢这首钢琴曲5',
    speed: 1,
    runTime: 10,
    color: 'pink'
  },
]

  ; ((doc) => {
    const oDanmuVideo = doc.getElementById('J_danmuVideo')
    console.log(oDanmuVideo.offsetWidth)
    const oDanmuCanvas = doc.getElementById('J_danmuCanvas')
    const oDanmuInput = doc.getElementsByClassName('danmu_input')[0]
    const oDanmuBtn = doc.getElementsByClassName('danmu_btn')[0]
    const oColorInput = doc.getElementsByClassName('color_input')[0]
    // 模块初始化函数
    const init = () => {
      // 实例化弹幕插件
      window.videoDanmu = new VideoDanmu(
        oDanmuVideo,
        oDanmuCanvas,
        {
          danmuData,
        },
        oDanmuVideo.offsetWidth
      )

      bindEvent()
    }

    // 绑定事件处理函数的 管理函数
    function bindEvent () {
      oDanmuVideo.addEventListener('play', handleVideoPlay, false);
      oDanmuVideo.addEventListener('pause', handleVideoPause, false);
      oDanmuVideo.addEventListener('seeked', handleVideoSeek, false);
      oDanmuBtn.addEventListener('click', handleInputBtnClick, false);
    }

    function handleVideoPlay () {
      videoDanmu.danmuPaused = false;
      videoDanmu.render();
    }

    function handleVideoPause () {
      videoDanmu.danmuPaused = true;
    }
    function handleVideoSeek () {
      videoDanmu.reset()
    }
    function handleInputBtnClick () {
      if (oDanmuVideo.danmuPaused) return

      const input_value = oDanmuInput.value.trim();
      if (!input_value.length) return
      const colorValue = oColorInput.value, currentTime = oDanmuVideo.currentTime;
      const _data = {
        content: input_value,
        color: colorValue,
        runTime: currentTime,
      }

      videoDanmu.addDanmu(_data)
      oDanmuInput.value = ''
    }

    // 执行初始化函数
    init();
  })(document);