(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["myPagesA/pages/addProject"],{5619:function(n,e,o){},"5e6f":function(n,e,o){"use strict";o.r(e);var t=o("e4d4"),u=o("a056");for(var i in u)"default"!==i&&function(n){o.d(e,n,(function(){return u[n]}))}(i);o("a8e7");var r,c=o("f0c5"),s=Object(c["a"])(u["default"],t["b"],t["c"],!1,null,"960b28de",null,!1,t["a"],r);e["default"]=s.exports},"8d6f":function(n,e,o){"use strict";(function(n){o("99ed");t(o("66fd"));var e=t(o("5e6f"));function t(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,o("543d")["createPage"])},a056:function(n,e,o){"use strict";o.r(e);var t=o("b788"),u=o.n(t);for(var i in t)"default"!==i&&function(n){o.d(e,n,(function(){return t[n]}))}(i);e["default"]=u.a},a8e7:function(n,e,o){"use strict";var t=o("5619"),u=o.n(t);u.a},b788:function(n,e,o){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={data:function(){return{show:!1,list:[{value:"1",label:"江"},{value:"2",label:"湖"}],form:{name:"",intro:"",address:"",fireMan:""},rules:{name:[{required:!0,message:"请输入姓名",trigger:["change","blur"]}]}}},methods:{confirm:function(n,e){console.log(n,e),this.form.fireMan=n[0].label},s:function(){var e=this;console.log(12123),n.chooseLocation({success:function(n){console.log("位置名称："+n.name),console.log("详细地址："+n.address),console.log("纬度："+n.latitude),console.log("经度："+n.longitude),e.form.address=n.address,console.log(e.form.address,22)}})},submit:function(){this.$refs.uForm.validate((function(n){n?console.log("验证通过"):console.log("验证失败")}))}},onReady:function(){this.$refs.uForm.setRules(this.rules)}};e.default=o}).call(this,o("543d")["default"])},e4d4:function(n,e,o){"use strict";o.d(e,"b",(function(){return u})),o.d(e,"c",(function(){return i})),o.d(e,"a",(function(){return t}));var t={uForm:function(){return o.e("uview-ui/components/u-form/u-form").then(o.bind(null,"c6ab"))},uFormItem:function(){return Promise.all([o.e("common/vendor"),o.e("uview-ui/components/u-form-item/u-form-item")]).then(o.bind(null,"da4f"))},uInput:function(){return Promise.all([o.e("common/vendor"),o.e("uview-ui/components/u-input/u-input")]).then(o.bind(null,"7412"))},uSelect:function(){return o.e("uview-ui/components/u-select/u-select").then(o.bind(null,"b4f2"))},uButton:function(){return o.e("uview-ui/components/u-button/u-button").then(o.bind(null,"3cb4"))}},u=function(){var n=this,e=n.$createElement;n._self._c;n._isMounted||(n.e0=function(e){n.show=!0},n.e1=function(e){n.show=!0},n.e2=function(e){n.show=!0},n.e3=function(e){n.show=!0},n.e4=function(e){n.show=!0})},i=[]}},[["8d6f","common/runtime","common/vendor"]]]);