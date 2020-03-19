Vue.component("my-card", {
  props: ["image", "id"],

  template: `
        <div class="outer" v-on:click="flip()">
            <div class="card front" v-bind:style="{ transform: flipped? 'rotateY(180deg)': 'none' }">
                <img 
                v-bind:src=this.image
                >
            </div>
            <div class="card back" v-bind:style="{ transform: flipped? 'rotateY(180deg)': 'none' }"></div>
        </div>
    `,
  data: function() {
    return {
      flipped: false,
      found: false
    };
  },
  methods: {
    flip: function() {
      if (app.started) {
        if (!this.found) {
          if (!this.flipped) {
            if (app.flippedCards.length < 2) {
              this.flipped = true;
              this.$emit("addtoflipped", this);
            }
          }
        }
      }
    }
  }
});
