Vue.component('my-board',{
    props: [],
    template: `<div class="board">
    <my-card v-for='image in images' v-bind:image=image></my-card>
    </div>`,
})