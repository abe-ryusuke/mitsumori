var app = new Vue({
  el: '#app',
  data: {
    // もとになるリスト
    menuList:[],
    //初期値
    goukei:0,
    message:0,
    presetMenuData:[
        {
        name:'トマト',
        value:'100',
        },
        {
        name:'りんご',
        value:'200',
        },
        {
        name:'みかん',
        value:'300',
        },
     ]

  },
  methods: {
    doAdd: function () {
      // リスト内で1番大きいIDを取得
      var max = this.menuList.reduce(function (a, b) {
        return a > b.id ? a : b.id
      }, 0)

      var menuData = [
        {
        name:'トマト',
        value:'100',
        },
        {
        name:'りんご',
        value:'200',
        },
        {
        name:'みかん',
        value:'300',
        },
      ]
      this.menuList.push({
        id: max + 1, // 現在の最大のIDに+1してユニークなIDを作成
        lists:menuData,
        selectedMenuValue :'100',
        number:1,
        price:100,
        value:100,
        selectedMenuName:'トマト'
      })
    },
    onChangeMenu: function (menu) {
      //値段計算
      menu.price = menu.number * menu.selectedMenuValue;


      //selectedMenuNameが欲しいのでselectedMenuValueを参考にpresetMenuDataからデータを得る
      this.presetMenuData.forEach(item => {
        if (item.value == menu.selectedMenuValue) {
          menu.selectedMenuName = item.name
        }
      });


    },
    doRemove: function (menu) {
      var index = this.menuList.indexOf(menu)
      this.menuList.splice(index, 1)
    }
  },
  created: function () {
      //読込時
      var menuData = [
        {
        name:'トマト',
        value:'100',
        },
        {
        name:'りんご',
        value:'200',
        },
        {
        name:'みかん',
        value:'300',
        },
      ]
      this.menuList.push({
        id: 1,
        lists:menuData,
        selectedMenuValue :'100',
        number:1,
        price:100,
        value:100,
        selectedMenuName:'トマト'
      })
      
  },
  computed: {

  },
  watch: {
    // menuListに変更があるかWATCH
    menuList: {
      // 引数はウォッチしているプロパティの変更後の値
      handler: function () {
        var total = 0;
        var messageTxt ="";
        
        this.menuList.forEach(item => {
          //console.log( item.price);
          total += item.price;
          
          
          //テキストエリア生成
          messageTxt += item.selectedMenuName + '　　' + item.number + '個　　' + item.price + '円\n';


        });
        
        this.goukei = total;
        var goukeiText = '\n\n合計' + this.goukei + '円'
        messageTxt +=　goukeiText;
         //テキストエリア挿入
        this.message = messageTxt;

        

      },
      // deep オプションでネストしているデータも監視できる
      deep: true
    }
  },
})
