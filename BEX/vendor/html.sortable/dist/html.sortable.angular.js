!function(e){"use strict";e.module("htmlSortable",[]).directive("htmlSortable",["$timeout","$parse",function(t,a){return{require:"?ngModel",link:function(n,r,o,l){var s,i,c;o.htmlSortableCallback&&(c=o.htmlSortableCallback),s=e.extend({},n.$eval(o.htmlSortable)),r.sortable(s),l&&(i=a(o.ngModel),l.$render=function(){t(function(){r.sortable("reload")},50)},n.$watch(i,function(){t(function(){r.sortable("reload")},50)},!0),r.sortable().bind("sortupdate",function(e,t){var r=t.startparent.attr("ng-model"),o=t.endparent.attr("ng-model"),l=a(r),s=a(o),i=t.oldindex,p=t.item.index();n.$apply(function(){if(l(t.startparent.scope())===s(t.endparent.scope())){var e=l(t.startparent.scope());e.splice(p,0,e.splice(i,1)[0]),l.assign(n,e)}else{var a=l(t.startparent.scope())[i],r=l(t.startparent.scope()),o=s(t.endparent.scope())||[];r.splice(i,1),o.splice(p,0,a),l.assign(n,r),s.assign(n,o)}}),c&&n[c](l(t.startparent.scope()),s(t.endparent.scope()),i,p)}))}}}])}(angular);