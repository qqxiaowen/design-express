webpackJsonp([10],{"fD2/":function(t,e){},r7kw:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s("Dd8w"),i=s.n(o),a=s("Au9i"),n={data:function(){return{course:[[{},{},{},{},{}],[{},{},{},{},{}],[{},{},{},{},{}],[{},{},{},{},{}],[{},{},{},{},{}],[{},{},{},{},{}],[{},{},{},{},{}]],url:"",user:"教师",location:{},gradeID:null,courseID:null,tacherID:null,ceshi:""}},methods:{getData:function(){var t=this,e=[[{},{},{},{},{}],[{},{},{},{},{}],[{},{},{},{},{}],[{},{},{},{},{}],[{},{},{},{},{}],[{},{},{},{},{}],[{},{},{},{},{}]];this.$axios.get(this.url).then(function(s){console.log(s),s.data.forEach(function(t){t.courseId=t._id,t.time_site.forEach(function(s){e[s.day-1][s.node-1]=i()({},t,s)})}),t.course=e})},handleclock:function(t){this.gradeID=t.grade._id,this.courseID=t.courseId,this.tacherID=t.teacher._id,1==this.$route.query.type?this.$router.push("/layout/commonClock?grade="+t.grade._id+"&course="+t.courseId):2==this.$route.query.type?this.getLocation():(this.user="学生")&&this.getLocation()},getLocation:function(){var t=this;mMap.getSessionLocation(function(){var e=JSON.parse(sessionStorage.getItem("location"));if(console.log("您当前位置:"+e.formattedAddress),console.log("lng:"+e.position.lng),console.log("lat:"+e.position.lat),t.location={lng:e.position.lng,lat:e.position.lat},"教师"==t.user){var s=(new Date).toLocaleDateString()+" "+(new Date).toTimeString().substr(0,5);t.$axios.post("/clock/teacher",{teacherLocation:t.location,grade:t.gradeID,course:t.courseID,clockName:s}).then(function(t){0==t.code?(console.log("教师定位ok： ",t),Object(a.Toast)("定位考勤成功，5分钟后接口关闭")):301==t.code&&Object(a.Toast)("已发起过定位考勤")})}else"学生"==t.user&&t.$axios.post("/clock/student",{grade:t.gradeID,teacher:t.tacherID,studentLocation:t.location}).then(function(t){t.code,Object(a.Toast)(t.msg)})})}},mounted:function(){var t=this;this.$store.state.userinfo&&this.$store.state.userinfo._id||(Object(a.Toast)("请先登录"),setTimeout(function(){t.$router.push("/login")},300)),this.$store.state.userinfo.faculty?this.url="/course/teacher/"+this.$store.state.userinfo._id:(this.user="学生",this.url="/course/grade/"+this.$store.state.userinfo.grade._id),this.getData()}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"courseList"},[s("div",{staticClass:"course-text"},[t._v("请选择一门课 "+t._s(this.ceshi))]),t._v(" "),s("div",{staticClass:"table-title"},t._l(["","周一","周二","周三","周四","周五","周六","周日"],function(e){return s("div",{key:e},[t._v(" "+t._s(e))])}),0),t._v(" "),s("div",{staticClass:"table-main"},[s("div",{staticClass:"main-left"},t._l(["第一节","第二节","第三节","第四节","第五节"],function(e){return s("div",{key:e},[s("span",[t._v(t._s(e))])])}),0),t._v(" "),s("div",{staticClass:"main-right"},t._l(t.course,function(e,o){return s("div",{key:o,staticClass:"main-list"},t._l(e,function(e,o){return s("div",{key:o,staticClass:"mian-item"},[e._id?s("div",{staticClass:"item-content",on:{click:function(s){t.handleclock(e)}}},[t._v("\n                        "+t._s(e.course_name.subjectName)+" "),s("br"),t._v("\n                        "+t._s(e.classroom)+" "),s("br"),t._v(" "),"学生"==t.user?s("span",[t._v(t._s(e.teacher.username))]):s("span",[t._v(t._s(e.grade.gradeName))])]):t._e()])}),0)}),0)])])},staticRenderFns:[]};var c=s("VU/8")(n,r,!1,function(t){s("fD2/")},"data-v-11037e43",null);e.default=c.exports}});
//# sourceMappingURL=10.cf246a5f528b1abc7768.js.map