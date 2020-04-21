var PointBtn = {
  template: 
    `<button 
      class="pointBtnClass"
      @click="$emit('change', _self)"
      v-bind:class="status"
      v-text="ball.point">
    </button>`,
  props: ['ball', 'pId', 'CPId', 'CInning', 'CRack'],
  computed: {
    status: function(){
      // show current player point button only.
      if(this.pId != this.CPId){
        return 'hide';
      }

      // this ball is not point.
      if(this.ball.pId == -1){
        return 'yet';
      }

      // this ball pointed this inning.
      if(this.ball.pId == this.pId && this.ball.inning[this.CRack-1].inning == this.CInning){
        return 'get';
      }else{
        return 'already';
      }

    }
  }
};


var Player = {
  template:
    `<div v-bind:class="pClass">
      {{pName}}<br>
      <p class="scoreClass">
        Score : {{score}}
      </p>
      <point-btn
        v-for="ball in Balls"
        :key="ball.point"
        :ball="ball"
        :pId="pId"
        :CPId="CPId"
        :CInning="CInning"
        :CRack="CRack"
        @change="$emit('change',$event, _self)"/>
      <p>
        Inning {{inningScore}}
      </p>
    </div>`,
  components: {
    PointBtn
  },
  props: ['pName', 'pClass', 'Balls', 'pId', 'CPId', 'CInning', 'CRack'],
  data: function(){
    return {
      score: 0,
      inningScore: ''
    }
  }
};


var poolTable = new Vue({
  el: '#poolTable',
  template:
    `<div>
      <button @click="reset" class="btnClass">Reset</button><br>
      <button @click="changePlayer" class="btnClass">Change Player (Inning:{{Inning}})</button>
      <button @click="backPlayer" class="btnClass">Back</button><br>
      <button @click="nextRack" class="btnClass">Next Rack (Rack:{{Rack}})</button>
      <Player1 pId="1" pName="Player 1" pClass="p1" :Balls="Balls" :CPId="CurrentPId" :CInning="Inning" :CRack="Rack" @change="change"/>
      <Player2 pId="2" pName="Player 2" pClass="p2" :Balls="Balls" :CPId="CurrentPId" :CInning="Inning" :CRack="Rack" @change="change"/>
    </div>`,
  components: {
    Player1 : Player,
    Player2 : Player
  },
  data: function(){
    return {
      Balls:[
        { point: 1,  pId: -1, inning: []},
        { point: 2,  pId: -1, inning: []},
        { point: 3,  pId: -1, inning: []},
        { point: 4,  pId: -1, inning: []},
        { point: 5,  pId: -1, inning: []},
        { point: 6,  pId: -1, inning: []},
        { point: 7,  pId: -1, inning: []},
        { point: 8,  pId: -1, inning: []},
        { point: 9,  pId: -1, inning: []},
        { point: 10, pId: -1, inning: []},
        { point: 11, pId: -1, inning: []},
        { point: 12, pId: -1, inning: []},
        { point: 13, pId: -1, inning: []},
        { point: 14, pId: -1, inning: []},
        { point: 15, pId: -1, inning: []}
      ],
      Inning: 1,
      Rack: 1,
      CurrentPId: 1,
      Innings:[
        { player: 1, inning: 1}
      ]
    }
  },
  methods:{
    change(btn, player){
      if(btn.ball.pId == -1){
          player.score = Number(player.score) + Number(btn.ball.point);
          btn.ball.pId = player.pId;
          btn.ball.inning[this.Rack-1] = 
            {player: this.CurrentPId,
             inning: this.Inning};
          this._refreshInningScore(player);
          return;
      }

      if(btn.ball.pId == player.pId){
          player.score = Number(player.score) - Number(btn.ball.point);
          btn.ball.pId = -1;
          btn.ball.inning[this.Rack-1] = null;
          this._refreshInningScore(player);
          return;
      }

    },
    _refreshInningScore(player){
      scores = [];
      for(let b of player.Balls){
        for(let i of b.inning){
          if(!i)continue;
          if(player.pId == i.player){
            if(!scores[i.inning]){
              scores[i.inning] = 0;
            }
            scores[i.inning] += b.point;
          }
        }
      }
      player.inningScore = '';
      for (var i = 1; i <= player.CInning; i++) {
        player.inningScore += 
        '[' + i + ']' + (scores[i] ? scores[i] : 0) + ', '
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
      // save Rack inning info.
      this.Innings[this.Rack] = {
        player: this.CurrentPId,
        inning: this.Inning
      };
      this.Rack++;
    },
    changePlayer(){
      switch(this.CurrentPId){
        case 1:
          this.CurrentPId = 2;
          break;
        case 2:
          this.CurrentPId = 1;
          this.Inning++;
          break;
      }
    },

    // back button
    backPlayer(){
      if(this.Inning == this.Innings[this.Rack-1].inning
       && this.CurrentPId == this.Innings[this.Rack-1].player){
        return;
      }
      switch(this.CurrentPId){
        case 1:
          this.CurrentPId = 2;
          this.Inning--;
          break;
        case 2:
          this.CurrentPId = 1;
          break;
      }
    }
  }
});

