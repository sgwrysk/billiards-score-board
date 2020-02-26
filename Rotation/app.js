const app = new Vue({
  el: '#p1',
  data: {
    score: 0
  },
  methods: {
    changeScore: function (v) {
      this.score += v;
    },
    clear: function () {
      this.score = 0;
    }
  }
})

const app2 = new Vue({
  el: '#p2',
  data: {
    score: 0
  },
  methods: {
    changeScore: function (v) {
      this.score += v;
    },
    clear: function () {
      this.score = 0;
    }
  }
})