/*!
 * jQuery UI Droppable 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./draggable","./mouse","./core"],e):e(jQuery)}(function(a){"use strict";function h(e,t,i){return t<=e&&e<t+i}return a.widget("ui.droppable",{version:"1.13.2",widgetEventPrefix:"drop",options:{accept:"*",addClasses:!0,greedy:!1,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var e,t=this.options,i=t.accept;this.isover=!1,this.isout=!0,this.accept="function"==typeof i?i:function(e){return e.is(i)},this.proportions=function(){if(!arguments.length)return e=e||{width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};e=arguments[0]},this._addToManager(t.scope),t.addClasses&&this._addClass("ui-droppable")},_addToManager:function(e){a.ui.ddmanager.droppables[e]=a.ui.ddmanager.droppables[e]||[],a.ui.ddmanager.droppables[e].push(this)},_splice:function(e){for(var t=0;t<e.length;t++)e[t]===this&&e.splice(t,1)},_destroy:function(){var e=a.ui.ddmanager.droppables[this.options.scope];this._splice(e)},_setOption:function(e,t){var i;"accept"===e?this.accept="function"==typeof t?t:function(e){return e.is(t)}:"scope"===e&&(i=a.ui.ddmanager.droppables[this.options.scope],this._splice(i),this._addToManager(t)),this._super(e,t)},_activate:function(e){var t=a.ui.ddmanager.current;this._addActiveClass(),t&&this._trigger("activate",e,this.ui(t))},_deactivate:function(e){var t=a.ui.ddmanager.current;this._removeActiveClass(),t&&this._trigger("deactivate",e,this.ui(t))},_over:function(e){var t=a.ui.ddmanager.current;t&&(t.currentItem||t.element)[0]!==this.element[0]&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this._addHoverClass(),this._trigger("over",e,this.ui(t)))},_out:function(e){var t=a.ui.ddmanager.current;t&&(t.currentItem||t.element)[0]!==this.element[0]&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this._removeHoverClass(),this._trigger("out",e,this.ui(t)))},_drop:function(t,e){var i=e||a.ui.ddmanager.current,s=!1;return!(!i||(i.currentItem||i.element)[0]===this.element[0])&&(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var e=a(this).droppable("instance");if(e.options.greedy&&!e.options.disabled&&e.options.scope===i.options.scope&&e.accept.call(e.element[0],i.currentItem||i.element)&&a.ui.intersect(i,a.extend(e,{offset:e.element.offset()}),e.options.tolerance,t))return!(s=!0)}),!s&&(!!this.accept.call(this.element[0],i.currentItem||i.element)&&(this._removeActiveClass(),this._removeHoverClass(),this._trigger("drop",t,this.ui(i)),this.element)))},ui:function(e){return{draggable:e.currentItem||e.element,helper:e.helper,position:e.position,offset:e.positionAbs}},_addHoverClass:function(){this._addClass("ui-droppable-hover")},_removeHoverClass:function(){this._removeClass("ui-droppable-hover")},_addActiveClass:function(){this._addClass("ui-droppable-active")},_removeActiveClass:function(){this._removeClass("ui-droppable-active")}}),a.ui.intersect=function(e,t,i,s){if(!t.offset)return!1;var o=(e.positionAbs||e.position.absolute).left+e.margins.left,r=(e.positionAbs||e.position.absolute).top+e.margins.top,n=o+e.helperProportions.width,a=r+e.helperProportions.height,l=t.offset.left,p=t.offset.top,c=l+t.proportions().width,d=p+t.proportions().height;switch(i){case"fit":return l<=o&&n<=c&&p<=r&&a<=d;case"intersect":return l<o+e.helperProportions.width/2&&n-e.helperProportions.width/2<c&&p<r+e.helperProportions.height/2&&a-e.helperProportions.height/2<d;case"pointer":return h(s.pageY,p,t.proportions().height)&&h(s.pageX,l,t.proportions().width);case"touch":return(p<=r&&r<=d||p<=a&&a<=d||r<p&&d<a)&&(l<=o&&o<=c||l<=n&&n<=c||o<l&&c<n);default:return!1}},!(a.ui.ddmanager={current:null,droppables:{default:[]},prepareOffsets:function(e,t){var i,s,o=a.ui.ddmanager.droppables[e.options.scope]||[],r=t?t.type:null,n=(e.currentItem||e.element).find(":data(ui-droppable)").addBack();e:for(i=0;i<o.length;i++)if(!(o[i].options.disabled||e&&!o[i].accept.call(o[i].element[0],e.currentItem||e.element))){for(s=0;s<n.length;s++)if(n[s]===o[i].element[0]){o[i].proportions().height=0;continue e}o[i].visible="none"!==o[i].element.css("display"),o[i].visible&&("mousedown"===r&&o[i]._activate.call(o[i],t),o[i].offset=o[i].element.offset(),o[i].proportions({width:o[i].element[0].offsetWidth,height:o[i].element[0].offsetHeight}))}},drop:function(e,t){var i=!1;return a.each((a.ui.ddmanager.droppables[e.options.scope]||[]).slice(),function(){this.options&&(!this.options.disabled&&this.visible&&a.ui.intersect(e,this,this.options.tolerance,t)&&(i=this._drop.call(this,t)||i),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],e.currentItem||e.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,t)))}),i},dragStart:function(e,t){e.element.parentsUntil("body").on("scroll.droppable",function(){e.options.refreshPositions||a.ui.ddmanager.prepareOffsets(e,t)})},drag:function(o,r){o.options.refreshPositions&&a.ui.ddmanager.prepareOffsets(o,r),a.each(a.ui.ddmanager.droppables[o.options.scope]||[],function(){var e,t,i,s;this.options.disabled||this.greedyChild||!this.visible||(s=!(s=a.ui.intersect(o,this,this.options.tolerance,r))&&this.isover?"isout":s&&!this.isover?"isover":null)&&(this.options.greedy&&(t=this.options.scope,(i=this.element.parents(":data(ui-droppable)").filter(function(){return a(this).droppable("instance").options.scope===t})).length&&((e=a(i[0]).droppable("instance")).greedyChild="isover"===s)),e&&"isover"===s&&(e.isover=!1,e.isout=!0,e._out.call(e,r)),this[s]=!0,this["isout"===s?"isover":"isout"]=!1,this["isover"===s?"_over":"_out"].call(this,r),e&&"isout"===s&&(e.isout=!1,e.isover=!0,e._over.call(e,r)))})},dragStop:function(e,t){e.element.parentsUntil("body").off("scroll.droppable"),e.options.refreshPositions||a.ui.ddmanager.prepareOffsets(e,t)}})!==a.uiBackCompat&&a.widget("ui.droppable",a.ui.droppable,{options:{hoverClass:!1,activeClass:!1},_addActiveClass:function(){this._super(),this.options.activeClass&&this.element.addClass(this.options.activeClass)},_removeActiveClass:function(){this._super(),this.options.activeClass&&this.element.removeClass(this.options.activeClass)},_addHoverClass:function(){this._super(),this.options.hoverClass&&this.element.addClass(this.options.hoverClass)},_removeHoverClass:function(){this._super(),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass)}}),a.ui.droppable});