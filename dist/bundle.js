!function(){"use strict";angular.module("app",["ngDialog","ngScrollbars","duScroll","valdr"])}(),function(){"use strict";function t(t){t.debugInfoEnabled(!1)}angular.module("app").config(t),t.$inject=["$compileProvider"]}(),function(){"use strict";function t(t){t.defaults={scrollButtons:{scrollAmount:"auto",enable:!1},axis:"yx"}}angular.module("app").config(t),t.$inject=["ScrollBarsProvider"]}(),function(){"use strict";function t(t){t.addConstraints({PhoneForm:{phone:{size:{min:12,max:15,message:"Нужно не менее 12 символов, но не более 15."},pattern:{value:"/^[+]{0,1}[-(),0-9]{5,}$/",message:"Номер телефона включает только цифры"},required:{message:"Обязательное поле"}}}})}angular.module("app").config(t),t.$inject=["valdrProvider"]}(),function(){"use strict";function t(t,e){function o(){t.get("./data/products.json").then(function(t){e.update("root.products",t.data)}),t.get("./data/feedback.json").then(function(t){e.update("root.feedback",t.data)})}var a={fetchData:o};return a}angular.module("app").factory("DataService",t),t.$inject=["$http","Store"]}(),function(){"use strict";function t(){function t(){return device.mobile()}function e(){return device.tablet()}function o(){return device.desktop()}var a={isPhone:t,isTablet:e,isDesktop:o};return a}angular.module("app").factory("DeviceDetector",t),t.inject=[]}(),function(){"use strict";function t(){function t(t,e){for(var o=[];e--;)o[e]=t;return o}function e(t,e,o){for(var a=0,n=t.length;a<n;a++)if(t[a][e]===o)return a;return-1}var o={makeArrayOf:t,getCurIndexObjectInArray:e};return o}angular.module("app").factory("lkFunctions",t),t.$inject=[]}(),function(){"use strict";function t(t){function e(e){return t.open({template:e,className:"ngdialog-theme-default"})}var o={showModal:e};return o}angular.module("app").factory("Modals",t),t.$inject=["ngDialog"]}(),function(){"use strict";function t(){var t={root:{cart:{},products:[],feedback:[]}};return new Spawn(t)}angular.module("app").factory("Store",t),t.$inject=[]}(),function(){"use strict";function t(t,e){function o(){n()}function a(){t.update("root.cart.value",d),t.update("root.cart.sum",p),localStorage.setItem("GLOBAL_STATE",JSON.stringify(t.getState())),console.log("global state: ",t.getState().root)}function n(){t.detect("root.cart.value",function(){d=t.getState().root.cart.value})}function r(t){s.push(t),i(),l(),a()}function c(t){var o=e.getCurIndexObjectInArray(d,"id",t);o!==-1&&d.splice(o,1),l(),a()}function u(){d=[],p=0,a()}function l(){for(var t=0,e=0,o=d.length;e<o;e++)t+=d[e].price*d[e].amount*d[e].volume;p=t}function i(){for(var t=0,o="",a=0,n=0,r=0,c=!1,u=0;u<s.length;u++){t=0,o="",a=0,n=0;for(var l=0;l<s.length;l++)s[u].id===s[l].id&&(c=!0,t=s[u].id,o=s[u].name,a+=s[u].volume,n+=s[u].amount,r+=s[u].price);if(c){var i=e.getCurIndexObjectInArray(d,"id",t);i!==-1?d[i]={id:t,name:o,volume:a,amount:n,price:r}:d.push({id:t,name:o,volume:a,amount:n,price:r}),c=!1}}s=[]}var s=[],d=[],p=0,m={addToCart:r,deleteFromCart:c,clearCart:u};return o(),m}angular.module("app").factory("CartService",t),t.$inject=["Store","lkFunctions"]}(),function(){"use strict";function t(){$("[testimonials-carousel]").slick({infinite:!0,speed:800,slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:3e3})}window.addEventListener("load",t)}(),function(){"use strict";function t(t,e,o,a,n,r,c){function u(){l(),i()}function l(){n.detect("root.cart.value",function(){v.cart=n.getState().root.cart.value,0!==v.cart.length&&s()}),n.detect("root.cart.sum",function(){v.sum=n.getState().root.cart.sum})}function i(){var t=document.querySelector("[cart-btn]");setInterval(function(){0!==v.cart.length&&t.classList.toggle("cart-animate")},5e3)}function s(){h.hasClass("js-cart--active")||h.addClass("js-cart--active"),y.hasClass("js-products--active")||y.addClass("js-products--active")}function d(){h.hasClass("js-cart--active")&&h.removeClass("js-cart--active"),y.hasClass("js-products--active")&&y.removeClass("js-products--active")}function p(t){r.deleteFromCart(t),0===v.cart.length&&d()}function m(){r.clearCart(),d()}function f(e){S=c.showModal(e),a(function(){var e=document.querySelector(".ngdialog");o(e)(t);var a=document.querySelector("[iframe-order]"),n=document.createElement("iframe"),r=v.sum,c=document.location.hostname,u="https://money.yandex.ru/embed/shop.xml?account=410011483894113&quickpay=shop&payment-type-choice=on&mobile-payment-type-choice=on&writer=seller&targets=%D0%9F%D0%BE%D0%BA%D1%83%D0%BF%D0%BA%D0%B0+%D0%91%D0%B0%D1%88%D0%BA%D0%B8%D1%80%D1%81%D0%BA%D0%BE%D0%B3%D0%BE+%D0%BC%D1%91%D0%B4%D0%B0&default-sum="+r+"&button-text=01&fio=on&phone=on&address=on&successURL=http%3A%2F%2F"+c+"%2F";n.setAttribute("frameborder","0"),n.setAttribute("allowtransparency","true"),n.setAttribute("scrolling","no"),n.setAttribute("width","100%"),n.setAttribute("height","200px"),n.setAttribute("src",u),a.appendChild(n)},100)}function g(){var t="ajax/index.php",o={type:"Новый Заказ",phone:v.phone,cart:v.cart,sum:v.sum},a={params:{order:JSON.stringify(o)}};e.get(t,a).then(function(t){console.log("response: ",t)})}var v=this,h=angular.element(document.querySelector(".js-cart")),y=angular.element(document.querySelector(".js-products")),S="";v.cart=[],v.sum=0,v.closeCart=d,v.openCart=s,v.deleteFromCart=p,v.clearCart=m,v.showModal=f,v.sendLetter=g,u()}angular.module("app").component("bashCart",{templateUrl:"./app/components/cart/cart.component.html",controller:["$scope","$http","$compile","$timeout","Store","CartService","Modals",t]})}(),function(){"use strict";function t(t){function e(){}var o=this;o.showModal=t.showModal,e()}angular.module("app").component("bashCertificate",{templateUrl:"./app/components/certificate/certificate.component.html",controller:["Modals",t]})}(),function(){"use strict";function t(t,e,o,a){function n(){}function r(n){l=a.showModal(n),o(function(){var o=document.querySelector(".ngdialog");e(o)(t)},100)}function c(){var t=angular.element(event.target),e=t.closest("[modal-type]").attr("modal-type");if("order-phone"===e){var o=document.querySelector("[modal-type="+e+"] [input-name]").value+"",a=document.querySelector("[modal-type="+e+"] [input-phone]").value+"",n={type:"Заказ звонка",name:o,phone:a};console.log("Заказ звонка: ",n)}if("order-email"===e){var r=document.querySelector("[modal-type="+e+"] [input-email]").value+"",c=document.querySelector("[modal-type="+e+"] [input-message]").value+"",n={type:"Вопрос нам",email:r,message:c};console.log("Вопрос нам: ",n)}l.close()}var u=this,l="";u.showModal=r,u.send=c,n()}angular.module("app").component("bashContacts",{templateUrl:"./app/components/contacts/contacts.component.html",controller:["$scope","$compile","$timeout","Modals",t]})}(),function(){"use strict";function t(t,e,o,a,n,r){function c(){o.detect("root.feedback",function(){i.feedback=o.getState().root.feedback})}function u(o){s=n.showModal(o),a(function(){var o=document.querySelector(".ngdialog");e(o)(t)},100)}function l(){var t=angular.element(event.target),e=t.closest("[modal-type]").attr("modal-type");if("feedback"===e){var o=document.querySelector("[modal-type="+e+"] [input-name]").value+"",a=document.querySelector("[modal-type="+e+"] [input-feedback]").value+"",n={type:"Отзыв",name:o,feedback:a};console.log("Отзыв: ",n)}s.close()}var i=this,s="";i.feedback,i.showModal=u,i.send=l,c()}angular.module("app").component("bashFeedback",{templateUrl:"./app/components/feedback/feedback.component.html",controller:["$scope","$compile","Store","$timeout","Modals","DataService",t]})}(),function(){"use strict";function t(t){function e(){if(!t.isPhone()){var e=document.querySelector("[map-container]"),o="https://api-maps.yandex.ru/services/constructor/1.0/js/?sid=OxxN2m77qGHWGaZ_i5urM0qfl05TZ6EI&amp;width=100%&amp;height=550&amp;lang=ru_RU&amp;sourceType=constructor&amp;scroll=false",a=document.createElement("script");a.setAttribute("async",""),a.setAttribute("src",o),e.appendChild(a)}}e()}angular.module("app").component("bashMap",{templateUrl:"./app/components/map/map.component.html",controller:["DeviceDetector",t]})}(),function(){"use strict";function t(t,e){function o(){}function a(t){for(var e=angular.element(t.target),o=(e.closest("["+s+"]"),e.closest("["+s+"]").attr(s)),a=(e.attr("radio-value"),document.querySelectorAll("["+s+'="'+o+'"] .js-product-card__radio-btn')),n=0,r=a.length;n<r;n++)angular.element(a[n]).hasClass("js-product-card__radio-btn--active")&&angular.element(a[n]).removeClass("js-product-card__radio-btn--active");e.addClass("js-product-card__radio-btn--active")}function n(t){var e=angular.element(document.querySelector("["+s+'="'+t+'"] .js-product-card__radio-btn--active')),o=parseFloat(e.attr("radio-value"))/1e3;return o}function r(t,e){var o=angular.element(t.target),a=(o.closest("["+s+"]"),o.closest("["+s+"]").attr(s)),n=angular.element(document.querySelector("["+s+'="'+a+'"] .js-product-card__amount-count')),r=parseInt(n.text()),c=0;e>0&&n.text(r+e),r>1&&e<0&&n.text(r+e),c=parseInt(n.text())}function c(t){var e=angular.element(document.querySelector("["+s+'="'+t+'"] .js-product-card__amount-count')),o=parseInt(e.text());return o}function u(t){var e=angular.element(document.querySelector("["+s+'="'+t+'"] [card-price]')),o=parseFloat(e.text());return o}function l(t){var o=angular.element(t.target),a=(o.closest(s),o.closest("["+s+"]").attr(s)),r=angular.element(document.querySelector("["+s+'="'+a+'"] [card-name]')).attr("card-name"),l=n(a),i=c(a),d=u(a),p={id:a,name:r,volume:l,amount:i,price:d};e.addToCart(p)}var i=this,s="card-id";i.setVolume=a,i.setAmount=r,i.addToCart=l,o()}angular.module("app").component("bashProductCard",{bindings:{product:"<"},templateUrl:"./app/components/product-card/product-card.component.html",controller:["Store","CartService",t]})}(),function(){"use strict";function t(t,e,o){function a(){n(),o.fetchData(),r()}function n(){var t=JSON.parse(localStorage.getItem("GLOBAL_STATE"));t&&t.root&&(e.update("root",t.root),console.log("global state: ",e.getState().root))}function r(){e.detect("root.products",function(){u.products=e.getState().root.products})}function c(e){var o=angular.element(document.querySelector(e));t.scrollToElement(o,30,800)}var u=this;u.products=[],u.year=(new Date).getFullYear(),u.scrollTo=c,a()}angular.module("app").controller("SharedController",t),t.$inject=["$document","Store","DataService"]}();