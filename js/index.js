const app = new Vue({
  el: '#app',
  data: {
    products:[],
    sumProduct: 0,
    nameNewProduct: "",
    reductionProduct: 0,
    productSelected: null,
    isOptions: false
  },
  mounted(){
    this.products = this.getData()
    if(this.products && this.products.length){
      this.productSelected = this.products[0]
    }
    // console.log(this.products)
  },
  methods:{
    selectProduct(event){
      sumProduct = 0
      this.productSelected = this.products.find(
        (product) => product.name == event.target.value
      )
    },
    handleNumber(value){
      const _value = value.replace("-", "")  
      const number = parseFloat(_value)
      if(!isNaN(number)){
        return number
      } return null
    },
    addProduct(){
      const number = this.handleNumber(this.sumProduct)
      if(number){
        this.productSelected.amount += number
        this.sumProduct = 0
        this.saveData()
      }
    },
    reduceProduct(){
      const number = this.handleNumber(this.reductionProduct)
      if(number){
        this.productSelected.amount -= number
        this.reductionProduct = 0
        this.saveData()
      }
    },
    saveData(){
      if(this.productSelected.amount < 0){
        this.productSelected = 0
      }
      localStorage.setItem("products", JSON.stringify(this.products))
    },
    removeProduct(){
      this.products = this.products.filter(
        (product) => product.id != this.productSelected.id
      )
      if(this.products.length > 0){
        this.productSelected = this.products[0]
      }
      this.saveData()
    },
    getData(){
      const data = JSON.parse(localStorage.getItem("products"))
      if(data){
        return data
      } return []
    },
    addNewProduct(){
      this.products.push({
        id: this.products.length + 1,
        name: this.nameNewProduct,
        amount: 0
      })
      this.saveData()
      this.nameNewProduct = ""
    }
  }
})