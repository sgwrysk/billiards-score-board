var PointBtn = {
  template: 
    `<button 
      class="pointBtnClass"
      @click="$emit('change', _self)"
      v-bind:class="status"
      v-text="ball.point">
    </button>`,
  props: ['ball', 'pId'],
  computed: {
    status: function(){
      if(this.ball.pId == -1){
        return 'yet';
      }
      if(this.ball.pId == this.pId){
        return 'get';
      }else{
        return 'lose';
      }

    }
  }
};


var Player = {
  template:
    `<div v-bind:class="pClass">
      {{pName}}<br>
      <p class="scoreClass">
        Score : {{ score }}
      </p>
      <point-btn
        v-for="ball in Balls"
        :key="ball.point"
        :ball="ball"
        :pId="pId"
        @change="$emit('change',$event, _self)"/>
    </div>`,
  components: {
    PointBtn
  },
  props: ['pName', 'pClass', 'Balls', 'pId'],
  data: function(){
    return {
      score: 0
    }
  }
};


var poolTable = new Vue({
  el: '#poolTable',
  template:
    `<div>
      <button @click="reset" class="btnClass">Reset</button>
      <button @click="nextRack" class="btnClass">Next Rack</button>
      <Player1 pId="1" pName="Player 1" pClass="p1" :Balls="Balls" @change="change"/>
      <Player2 pId="2" pName="Player 2" pClass="p2" :Balls="Balls" @change="change"/>
    </div>`,
  components: {
    Player1 : Player,
    Player2 : Player
  },
  data: function(){
    return {
      Balls:[
        { point: 1,  pId: -1},
        { point: 2,  pId: -1},
        { point: 3,  pId: -1},
        { point: 4,  pId: -1},
        { point: 5,  pId: -1},
        { point: 6,  pId: -1},
        { point: 7,  pId: -1},
        { point: 8,  pId: -1},
        { point: 9,  pId: -1},
        { point: 10, pId: -1},
        { point: 11, pId: -1},
        { point: 12, pId: -1},
        { point: 13, pId: -1},
        { point: 14, pId: -1},
        { point: 15, pId: -1}
      ]
    }
  },
  methods:{
    change(btn, player){
      if(btn.ball.pId == -1){
          player.score = Number(player.score) + Number(btn.ball.point);
          btn.ball.pId = player.pId;
          return;
      }

      if(btn.ball.pId == player.pId){
          player.score = Number(player.score) - Number(btn.ball.point);
          btn.ball.pId = -1;
          return;
      }
    },
    reset(){
      location.reload();
    },
    nextRack(){
      for(let b of this.Balls){
        if(b.pId == -1) return;
      }
      for(let b of this.Balls){
        b.pId = -1;
      }
    }
  }
});

