webpackJsonp([7],{Cq9n:function(e,a){},"Noz+":function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r=t("YAzi"),o={props:{teacherInfo:Object},components:{Uploadimg:r.a},data:function(){return{formData:{}}},methods:{handlerevise:function(){var e=this;this.$axios.put("/user/teacher/"+this.formData._id,this.formData).then(function(a){0==a.code?(e.$message.success(a.msg),e.$router.push("/layout/home")):e.$message("修改失败")})}},mounted:function(){var e=this;setTimeout(function(){e.formData=e.teacherInfo},100)}},s={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("el-breadcrumb",{staticClass:"mb30",attrs:{separator:"/"}},[t("el-breadcrumb-item",{attrs:{to:{path:"/layout/home"}}},[e._v("首页")]),e._v(" "),t("el-breadcrumb-item",[e._v("修改个人信息")])],1),e._v(" "),t("el-card",[t("el-form",{ref:"form",staticClass:"table-ys",attrs:{model:e.formData,"label-width":"100px","label-position":"left"}},[t("el-form-item",{attrs:{label:"工号",required:""}},[t("el-input",{attrs:{disabled:""},model:{value:e.formData.numId,callback:function(a){e.$set(e.formData,"numId",a)},expression:"formData.numId"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"用户名",required:""}},[t("el-input",{attrs:{disabled:""},model:{value:e.formData.username,callback:function(a){e.$set(e.formData,"username",a)},expression:"formData.username"}})],1),e._v(" "),t("el-form-item",{staticClass:"admin-desc",attrs:{label:"管理员权限"}},[t("span",[e._v(e._s(1==this.formData.superAdmin?"开":"关"))])]),e._v(" "),t("el-form-item",{attrs:{label:"性别"}},[t("el-select",{model:{value:e.formData.sex,callback:function(a){e.$set(e.formData,"sex",a)},expression:"formData.sex"}},[t("el-option",{attrs:{label:"男",value:1}}),e._v(" "),t("el-option",{attrs:{label:"女",value:0}})],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"头像"}},[t("Uploadimg",{model:{value:e.formData.avatar,callback:function(a){e.$set(e.formData,"avatar",a)},expression:"formData.avatar"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"简介"}},[t("el-input",{model:{value:e.formData.desc,callback:function(a){e.$set(e.formData,"desc",a)},expression:"formData.desc"}})],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:e.handlerevise}},[e._v("立即修改")]),e._v(" "),t("el-button",{on:{click:function(a){e.$router.push("/layout/home")}}},[e._v("取消")])],1)],1)],1)],1)},staticRenderFns:[]};var l=t("VU/8")(o,s,!1,function(e){t("Cq9n")},"data-v-c3aaf33a",null);a.default=l.exports}});
//# sourceMappingURL=7.39cfdf6aa9fff267123b.js.map