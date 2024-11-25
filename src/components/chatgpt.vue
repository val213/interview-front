<!-- <template>
    <div id="create">
      <button @click="addDiv1">Button 1</button>
      <button @click="addDiv2">Button 2</button>
      <button @click="addDiv3">Button 3</button>
      <div v-for="(div, index) in divs" :key="index" class="div" v-html="div"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        divs: [],
      }
    },
    methods: {
      addDiv1() {
        this.divs.push(`<h1>diyi</h1>`);
      },
      addDiv2() {
        this.divs.push(`<span>dier</span>`);
      },
      addDiv3() {
        this.divs.push(`<p>disan</p>`);
      },
    },
  };
  </script>
  
  <style>
  .div {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ccc;
  }
  </style> -->
  <template>
    <div id="app">
      <label for="input">输入文本:</label>
      <input id="input" v-model="text" />
      <br />
      <button @click="generateLink">确认</button>
      <br />
      <div v-if="link">
        <p>链接:</p>
        <a :href="link" target="_blank">{{ link }}</a>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        text: '',
        link: '',
      }
    },
    methods: {
      generateLink() {
        axios.post('http://localhost:8080/links', { text: this.text })
          .then(response => {
            this.link = 'http://localhost:8080/links/' + response.data.id
          })
          .catch(error => {
            console.log(error)
          })
      },
    },
  }
  </script>