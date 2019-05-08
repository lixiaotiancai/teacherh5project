function Swiper(opt) {
  var util = {
    byId: function(id) {
      return document.getElementById(id)
    },

    qS: function(ctx, style) {
      return ctx.querySelector(style)
    },

    qSA: function(ctx, style) {
      return ctx.querySelector(style)
    }
  }

  var option = this.option = {
    id: 'swiper',
    content: 'swiper-content',
    ...opt
  }

  // 获取元素
  var swiper = this.swiper = util.byId(option.id)
  var swiper_content = this.swiper_content = util.byId(option.content)

  // status: PENDING MOVING
  var status = this.status = 'PENDING'

  // swiper content init position
  var content_init_position = this.content_init_position = {
    x: swiper_content.offsetLeft
  }

  this.init()
}

// slide
Swiper.prototype.slide = function(x) {
  if (this.swiper_content.style.left === '') {
    this.swiper_content.style.left = '0px'
  }

  this.swiper_content.style.left = this.content_init_position.x + x - this.cursor_init_position.x + 'px'
}

// check border
Swiper.prototype.checkBorder = function() {
  var check_left_border = parseInt(this.swiper_content.style.left) > 0
  var check_right_border = this.swiper_content.clientWidth + this.swiper_content.offsetLeft - this.swiper.clientWidth < 0

  return {
    is_left_border: check_left_border,
    is_right_border: check_right_border
  }
}

Swiper.prototype.positionAdjust = function() {
  if (this.checkBorder().is_left_border) {
    this.swiper_content.style.left = '0px'
  }

  if (this.checkBorder().is_right_border) {
    this.swiper_content.style.left = this.swiper.clientWidth - this.swiper_content.clientWidth + 'px'
  }
}

// bind event
Swiper.prototype.bindEvent = function() {
  var self = this
  var content = this.swiper_content

  // touch start
  content.addEventListener('touchstart', function(e) {
    if (self.status === 'PENDING') {
      self.cursor_init_position = {
        x: e.touches[0].pageX,
      }

      self.status = 'MOVING'
    }
  })

  // touch move
  content.addEventListener('touchmove', function(e) {
    var target = e.target

    if (target && self.status === 'MOVING') {
      self.slide(e.touches[0].pageX)
    }
  })

  content.addEventListener('touchend', function(e) {
    self.status === 'PENDING'

    self.content_init_position = {
      x: self.swiper_content.offsetLeft
    }

    self.positionAdjust()
  })
}

Swiper.prototype.init = function() {
  this.bindEvent()
}