function initCapital(){require(["capital"],function(t){t.showtradeStatistics(),t.showCapitals("search",1)})}function searchcapital(){require(["capital"],function(t){t.showCapitals("search",1)})}define("core",[],function(){function submitPwd(t){$.ajax({type:"POST",data:t,url:getHost()+"/member/updatePwd",success:function(t){var e=JSON.parse(t);console.log(e),e.status?(layer.msg("密码修改成功！"),$("#pwd-modal").modal("hide")):layer.msg("密码修改失败！")}})}var doTinit=function(){doT.templateSettings={evaluate:/\[\%([\s\S]+?)\%\]/g,interpolate:/\[\%=([\s\S]+?)\%\]/g,encode:/\[\%!([\s\S]+?)\%\]/g,use:/\[\%#([\s\S]+?)\%\]/g,define:/\[\%##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\%\]/g,conditional:/\[\%\?(\?)?\s*([\s\S]*?)\s*\%\]/g,iterate:/\[\%~\s*(?:\%\]|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\%\])/g,varname:"it",strip:!0,append:!0,selfcontained:!1}},getHost=function(){var t=location.origin||location.protocol+"//"+location.hostname+(80==location.port?"":":"+location.port);return t},exeError=function(t,e,a,n){if("http"==t.type){var s="status:"+e.status+" state:"+e.readyState+" text:"+a+" err:"+JSON.stringify(n);t.desc=s}console.log("错误处理："+JSON.stringify(t))},formatDate=function(){Date.prototype.format=function(t){t||(t="yyyy-MM-dd hh:mm:ss");var e={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var a in e)new RegExp("("+a+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[a]:("00"+e[a]).substr((""+e[a]).length)));return t}},ReConsole=function(){window.console=window.console||function(){var t={};return t.log=t.warn=t.debug=t.info=t.error=t.time=t.dir=t.profile=t.clear=t.exception=t.trace=t.assert=function(){},t}()},isExitsFunction=function(funcName){try{if("function"==typeof eval(funcName))return!0}catch(e){}return!1},isExitsVariable=function(t){try{return"undefined"!=typeof t}catch(e){}return!1};return $(document).on("click","#branner .download",function(){try{localStorage.setItem("is_show",!0)}catch(t){}}),$(document).on("click","#upgrade-bar .sui-close",function(){try{localStorage.setItem("upgrade-version",CURRENT_VERSION)}catch(t){}}),$(document).on("shown","#pwd-modal",function(){$("#pwd-form").validate({success:function(t){var e=t.serializeArray();submitPwd(e)}})}),$(document).on("hidden","#pwd-modal",function(){$("#pwd-form")[0].reset()}),$(function(){$.ajax({type:"get",url:getHost()+"/helpful/upgrade",dataType:"json"}).done(function(t){return t.status&&t.result.items.length?($("#upgrade-bar").find(".upgrade-title").empty().append(t.result.items[0].title).end().show(),$("#upgrade").find(".upgrade-content").empty().append(t.result.items[0].content),void(200==t.result.items[0].tips_type&&$("#upgrade-bar").hide())):null})}),$(function(){$.ajax({type:"POST",url:getHost()+"/store/getGrcode",success:function(t){1!=t&&$("#grcode").attr("src",t)},error:function(t,e){console.log("status:"+t.status),console.log("state:"+t.readyState),console.log("text:"+e)}})}),{doTinit:doTinit,getHost:getHost,exeError:exeError,formatDate:formatDate,ReConsole:ReConsole,isExitsVariable:isExitsVariable,isExitsFunction:isExitsFunction}}),define("service/pagin",[],function(){return $.fn.pagination.Constructor.prototype=$.extend($.fn.pagination.Constructor.prototype,{_drawCtrl:function(){var t="";if(this.pageSize&&this.itemsCount){var e=$('<select class="page-size-sel"></select>'),a=[15,30,50,100];for(var n in a){var s='<option value="'+a[n]+'"'+(this.pageSize==a[n]?"selected":"")+">"+a[n]+"</option>";e.append(s)}t+=e.prop("outerHTML"),t+="<div>&nbsp;"+("itemsCount"==this.displayInfoType?"<span>共"+this.itemsCount+"条</span>&nbsp;":"<span>共"+this.pages+"页</span>&nbsp;")+"("+this.itemsCount+'条记录)<span>&nbsp;到&nbsp;<input type="text" class="page-num"/><button class="page-confirm">确定</button>&nbsp;页</span></div>'}else t="<div>&nbsp;"+("itemsCount"==this.displayInfoType?"<span>共"+this.itemsCount+"条</span>&nbsp;":"<span>共"+this.pages+"页</span>&nbsp;")+'<span>&nbsp;到&nbsp;<input type="text" class="page-num"/><button class="page-confirm">确定</button>&nbsp;页</span></div>';return t},updateConfig:function(t){t.pageSize&&(this.pageSize=t.pageSize)}}),function(t,e,a,n,s,i,o){if(e=e||1,a=a||1,a||(a=Math.ceil(s/n)),"object"!=typeof t)var r=$(t);else r=t;r.data("sui-pagination",""),r.pagination({pages:a,styleClass:["pagination-large","pagination-right"],showCtrl:!0,displayPage:6,pageSize:n,itemsCount:s,currentPage:e,onSelect:i}),r.pagination("updatePages",~~a,~~e),r.data("evt-init")||(r.on("change",".page-size-sel",function(){r.pagination("updateConfig",{pageSize:+this.value}),i(1)}),r.data("evt-init",1))}}),define("capital",["core","service/pagin"],function(t,e){var a=15,n=function(t){a=t},s=function(a,n){var i={},o=$(".page-size-sel").val()||15;i.pagesize=o,i.pageno=n;var r=1;if("search"==a){i.trades_id=$("#tid").val(),i.start=$("#start").val(),i.end=$("#end").val(),i.pay_style=$("#pay_style").val(),i.platform_type=$("#platform_type").val(),""!=i.start&&""!=i.end||($.alert({title:"温馨提示!",body:"请输入查询日期!"}),r=0);var l=i.end.substring(5,i.end.lastIndexOf("-")),p=i.end.substring(i.end.length,i.end.lastIndexOf("-")+1),c=i.end.substring(0,i.end.indexOf("-")),u=i.start.substring(5,i.start.lastIndexOf("-")),d=i.start.substring(i.start.length,i.start.lastIndexOf("-")+1),g=i.start.substring(0,i.start.indexOf("-")),f=(Date.parse(l+"/"+p+"/"+c)-Date.parse(u+"/"+d+"/"+g))/864e5,h=Math.abs(f);h>90&&($.alert({title:"温馨提示!",body:"最多一次查询90天范围内订单!"}),r=0)}if(1==r){var m=layer.load(1,{shade:[.1,"#fff"]}),y=new Date;$.ajax({type:"POST",data:i,url:t.getHost()+"/capital/getCapitals",success:function(t){var n=JSON.parse(t);if(new Date-y<1500?setTimeout(function(){layer.close(m)},1500-(new Date-y)):layer.close(m),1==n.status){var i=$("#list_template").html(),r=doT.template(i),l=r(n);$("#capital_list").html(l),e("#pagelsit",+n.result.current,n.result.total_pages,o,n.result.total_items,function(t){s(a,t)})}else $("#capital_list").html('<tr><td colspan="7" style="text-align: center">'+n.result.msg+"</td></tr>"),$("#pagelsit").html("")}})}console.log("展示")},i=function(){var e={};e.store_id=$("#storeid").val(),console.log("postdata:"+JSON.stringify(e)),$.ajax({type:"POST",data:e,url:t.getHost()+"/capital/gettradeStatistics",success:function(t){console.log("资金详情:"+t);var e=JSON.parse(t);if(1==e.status){var a=$("#list_template2").html(),n=doT.template(a),s=n(e);$("#total").html(s)}else $.alert({title:"温馨提示!",body:e.result.msg})}}),console.log("展示")};return{showCapitals:s,showtradeStatistics:i,setPageSize:n}}),require.config({paths:{core:"../lovejs/core",capital:"service/capital"}}),$(function(){require(["core"],function(t){t.doTinit(),t.ReConsole()});var t=window.location.pathname;switch(t){case"/capital/index":initCapital()}}),define("capital_index",function(){});