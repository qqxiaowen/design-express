webpackJsonp([7],{"+30v":function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("Au9i"),o={data:function(){return{password:"",newPassword:"",agePassword:""}},methods:{handlePassword:function(){var s=this;if(this.password&&this.newPassword&&this.agePassword)if(this.newPassword!=this.agePassword)Object(a.Toast)("两次输入的密码不一致");else{var t=this.$store.state.userinfo._id;this.$axios.put("/user/password/"+t,{password:this.password,newPassword:this.newPassword}).then(function(t){0==t.code?(Object(a.Toast)(t.msg),s.$store.commit("CHANGEINFO",""),setTimeout(function(){s.$router.push("/login")},500)):Object(a.Toast)(t.msg)})}else Object(a.Toast)("请完善表单")}}},r={render:function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"password"},[e("div",{staticClass:"form"},[e("input",{directives:[{name:"model",rawName:"v-model",value:s.password,expression:"password"}],staticClass:"buttonInputStyle",attrs:{placeholder:"请输入旧密码",type:"password"},domProps:{value:s.password},on:{input:function(t){t.target.composing||(s.password=t.target.value)}}}),s._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:s.newPassword,expression:"newPassword"}],staticClass:"buttonInputStyle",attrs:{placeholder:"请输入新密码",type:"password"},domProps:{value:s.newPassword},on:{input:function(t){t.target.composing||(s.newPassword=t.target.value)}}}),s._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:s.agePassword,expression:"agePassword"}],staticClass:"buttonInputStyle",attrs:{placeholder:"再次输入新密码",type:"password"},domProps:{value:s.agePassword},on:{input:function(t){t.target.composing||(s.agePassword=t.target.value)}}})]),s._v(" "),e("div",{staticClass:"operation"},[e("mt-button",{staticClass:"buttonInputStyle",attrs:{type:"primary"},on:{click:s.handlePassword}},[s._v("修改密码")])],1)])},staticRenderFns:[]};var n=e("VU/8")(o,r,!1,function(s){e("JTq1")},"data-v-6d3d4669",null);t.default=n.exports},JTq1:function(s,t){}});
//# sourceMappingURL=7.1ab2e79ff780b3ab7667.js.map