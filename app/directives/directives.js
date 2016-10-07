(function() {
    "use strict";

    angular
        .module("app")
        .directive("unorderedList1", unorderedList1)
        .directive("unorderedList2", unorderedList2)
        .directive("unorderedList3", unorderedList3)
        .directive("unorderedList4", unorderedList4)
        .directive("unorderedList5", unorderedList5)
        .directive("unorderedList6", unorderedList6)
        .directive("unorderedList7", unorderedList7)
        .directive("unorderedList8", unorderedList8)
        .directive("unorderedList9", unorderedList9)
        .directive("unorderedList10", unorderedList10)
        .directive("unorderedList11", unorderedList11)
        .directive("unorderedList12", unorderedList12)
        .directive("unorderedListAttrs", unorderedListAttrs)
        .directive("unorderedListScope", unorderedListScope)
        .directive("scopeDemoFalse", scopeDemoFalse)
        .directive("scopeDemoTrue", scopeDemoTrue)
        .directive("scopeDemoIsolated", scopeDemoIsolated)
        .directive("component", component)
        .directive("decor1", decor1)
        .directive("decor2", decor2)
        .directive("scopeDemoIsolated1", scopeDemoIsolated1)
        .directive("scopeDemoIsolated2", scopeDemoIsolated2)
        .directive("scopeDemoIsolated3", scopeDemoIsolated3)
        .directive("scopeDemoIsolated4", scopeDemoIsolated4)
        .directive("scopeDemoIsolated5", scopeDemoIsolated5)
        .directive("greeting1", greeting1)
        .directive("greeting2", greeting2)
        .directive("greeting3", greeting3)
        .directive("greeting4", greeting4)
        .directive("greeting5", greeting5)
        .directive("greeting6", greeting6)
        .directive("hi", hi)
        .directive("hello", hello)
        .directive("hi2", hi2)
        .directive("hello2", hello2)
        .directive("hi3", hi3)
        .directive("hello3", hello3)
        .directive("multiElem", multiElem)
    ;

    function unorderedList1() {
        return function(scope) {
            let data = scope.products;

            angular.forEach(data, (dataItem) => {
                console.log(`Item: ${dataItem.name}`);
            });
        };
    }
    
    function unorderedList2() {
        return {
            link: function(scope) {
                let data = scope.products;
                
                angular.forEach(data, (dataItem) => {
                    console.log(`Item: ${dataItem.name}`);
                });
            }
        };
    }

    function unorderedList3() {
        return {
            link: function(scope, element, attrs) {
                let data = scope[attrs["unorderedList3"]];
                let propertyName = attrs["listProperty"];
                
                angular.forEach(data, (dataItem) => {
                    // console.log(`Item: ${dataItem[propertyName]}`);
                    console.log(`Item: ${scope.$eval(propertyName, dataItem)}`);
                });
            }
        };
    }

    function unorderedList4() {
        return {
            link: function(scope, element, attrs) {
                let data = scope[attrs["unorderedList4"]];
                let propertyName = attrs["listProperty"];

                let listElem = angular.element("<ul>");

                angular.forEach(data, (dataItem) => {
                    // console.log(`Item: ${dataItem[propertyName]}`);
                    // console.log(`Item: ${scope.$eval(propertyName, dataItem)}`);
                    listElem.append(angular.element("<li>")
                                        .text(scope.$eval(propertyName, dataItem)));
                });

                element.append(listElem);
            }
        };
    }

    function unorderedList5() {
        return {
            link: function(scope, element, attrs) {
                let data = scope[attrs["unorderedList5"]];
                let propertyName = attrs["listProperty"];

                let listElem = angular.element("<ul>");

                angular.forEach(data, (dataItem) => {
                    // console.log(`Item: ${dataItem[propertyName]}`);
                    // console.log(`Item: ${scope.$eval(propertyName, dataItem)}`);
                    // listElem.append(angular.element("<li>")
                    //                         .text(scope.$eval(propertyName, dataItem)));
                    let itemElem = angular.element("<li>");
                    listElem.append(itemElem);

                    let watcherFn = function(watchScope) {
                        return watchScope.$eval(propertyName, dataItem);
                    };

                    scope.$watch(watcherFn, (newVal, oldVal) => {
                        itemElem.text(newVal);
                    });
                });

                element.append(listElem);
            }
        };
    }

    function unorderedListAttrs() {
        return {
            link: function(scope, element, attrs) {
                let data = scope[attrs["unorderedListAttrs"]];

                attrs.$observe("listProperty", (newVal, oldVal) => {
                    element.html("");

                    let propertyName = newVal;

                    let listElem = angular.element("<ul>");

                    angular.forEach(data, (dataItem) => {
                        let itemElem = angular.element("<li>");
                        listElem.append(itemElem);

                        let watcherFn = function(watchScope) {
                            return watchScope.$eval(propertyName, dataItem);
                        };

                        scope.$watch(watcherFn, (newVal, oldVal) => {
                            itemElem.text(newVal);
                        });
                    });

                    element.append(listElem);
                });
            }
        };
    }

    function unorderedListScope() {
        return {
            scope: {
                unorderedListScope: "=",
                listProperty: "="
            },

            link: function(scope, element, attrs) {
                // let data = scope[attrs["unorderedListAttrs"]];
                let data = scope.unorderedListScope;

                // attrs.$observe("listProperty", (newVal, oldVal) => {
                scope.$watch("listProperty", (newVal, oldVal) => {
                    element.html("");

                    let propertyName = newVal;

                    let listElem = angular.element("<ul>");

                    angular.forEach(data, (dataItem) => {
                        let itemElem = angular.element("<li>");
                        listElem.append(itemElem);

                        let watcherFn = function(watchScope) {
                            return watchScope.$eval(propertyName, dataItem);
                        };

                        scope.$watch(watcherFn, (newVal, oldVal) => {
                            itemElem.text(newVal);
                        });
                    });

                    element.append(listElem);
                });
            }
        };
    }

    function unorderedList6() {
        return {
            restrict: "EACM",

            link: function(scope, element, attrs) {
                let data = scope[attrs["unorderedList6"] || attrs["listSource"]];
                let propertyName = attrs["listProperty"] || "price | currency";

                let listElem = angular.element("<ul>");

                angular.forEach(data, (dataItem) => {
                    listElem.append(angular.element("<li>")
                                        .text(scope.$eval(propertyName, dataItem)));
                });

                if (element[0].nodeName === "#comment") {
                    element.parent().append(listElem);
                } else {
                    element.append(listElem);
                }
            }
        };
    }

    function unorderedList7() {
        return {
            restrict: "A",

            link: function(scope, element, attrs) {
                let markup = "<ul><li ng-repeat='item in data'>{{ item.price | currency }}</li></ul>";
                scope.data = scope[attrs["unorderedList7"]];
                element.append(markup);
            }
        };
    }

    function unorderedList8($compile) {
        return {
            restrict: "A",

            link: function(scope, element, attrs) {
                let markup = "<ul><li ng-repeat='item in data'>{{ item.price | currency }}</li></ul>";
                scope.data = scope[attrs["unorderedList8"]];
                element.append($compile(markup)(scope));
            }
        };
    }

    function unorderedList9() {
        return {
            restrict: "A",
            template: "<ul><li ng-repeat='item in data'>{{ item.price | currency }}</li></ul>",

            link: function(scope, element, attrs) {
                scope.data = scope[attrs["unorderedList9"]];
            }
        };
    }

    function unorderedList10() {
        return {
            restrict: "A",
            template: function(tElem, tAttrs) {
                return angular.element(document.querySelector("#listTemplate")).html();
            },
            link: function(scope, element, attrs) {
                scope.data = scope[attrs["unorderedList10"]];
            }
        };
    }

    function unorderedList11() {
        return {
            restrict: "A",
            templateUrl: "templates/itemTemplate.html",
            link: function(scope, element, attrs) {
                scope.data = scope[attrs["unorderedList11"]];
            }
        };
    }

    function unorderedList12() {
        return {
            restrict: "A",
            templateUrl: function(tElem, tAttrs) {
                return tAttrs["template"] === "table"
                        ? "templates/tableTemplate.html"
                        : "templates/itemTemplate.html";
            },
            link: function(scope, element, attrs) {
                scope.data = scope[attrs["unorderedList12"]];
            }
        };
    }

    function scopeDemoFalse() {
        return {
            restrict: "A",
            scope: false,
            templateUrl: "templates/scopeDemoFalseTemplate.html"
        };
    }

    function scopeDemoTrue() {
        return {
            restrict: "A",
            scope: true,
            templateUrl: "templates/scopeDemoFalseTemplate.html"
        };
    }

    function scopeDemoIsolated() {
        return {
            restrict: "A",
            scope: {},
            templateUrl: "templates/userDataTemplate.html",
            link: function(scope) {
                scope.user = {name: "Vitaliy"};  
            }
        };
    }

    function component() {
        return {
            restrict: "E",
            scope: {},
            link: function(scope) {
                scope.dataSource = "directive";
                console.log("component");
                console.log(`dataSource = ${scope.dataSource}`);
            }
        };
    }

    function decor1() {
        return {
            restrict: "A",
            scope: false,
            link: function(scope) {
                // scope.dataSource = "decor1";
                console.log("decor1");
                console.log(`dataSource = ${scope.dataSource}`);
            }
        };
    }

    function decor2() {
        return {
            restrict: "A",
            scope: false,
            link: function(scope) {
                scope.dataSource = "decor2";
                console.log("decor2");
                console.log(`dataSource = ${scope.dataSource}`);
            }
        };
    }

    function scopeDemoIsolated1() {
        return {
            restrict: "A",
            scope: {
                local: "@prop"
            },
            templateUrl: "templates/scopeBindingsTemplate.html"
        };
    }

    function scopeDemoIsolated2() {
        return {
            restrict: "A",
            scope: {
                local: "=?prop"
            },
            templateUrl: "templates/scopeBindingsTemplate.html"
        };
    }

    function scopeDemoIsolated3() {
        return {
            restrict: "A",
            scope: {
                local: "<prop"
            },
            // templateUrl: "templates/scopeBindingsTemplate.html",
            template: `
                <p>
                    <strong>Data Value: </strong>
                    <input ng-model="local.name">
                </p>
            `
        };
    }

    function scopeDemoIsolated4() {
        return {
            restrict: "A",
            scope: {
                // local: "<prop",
                cityFn: "&city"
            },
            // templateUrl: "templates/scopeEvalTemplate.html",
            templateUrl: "templates/scopeEvalDataTemplate.html",
        };
    }

    function greeting1() {
        return {
            restrict: "E",
            scope: {},
            templateUrl: "templates/greetingTemplate.html",
            controller: function($scope) {
                $scope.sayHello = function() {
                    alert("Hello");
                };
            }
        };
    }

    function greeting2() {
        return {
            restrict: "E",
            scope: {},
            templateUrl: "templates/greetingTemplate.html",
            controller: "Greeting"
        };
    }

    function greeting3() {
        return {
            restrict: "E",
            scope: {},
            templateUrl: "templates/greetingTemplate.html",
            controller: "@",
            name: "ctrl"
        };
    }

    function scopeDemoIsolated5() {
        return {
            restrict: "A",
            scope: {
                // prop: "@"
            },
            template: "{{$ctrl.prop}} = {{$ctrl.result}}",
            controllerAs: "$ctrl",
            // bindToController: true,
            bindToController: {
                prop: "@"
            },
            controller: function() {
                let $ctrl = this;

                $ctrl.result = 1;
            }
        };
    }

    function greeting4() {
        let greetings = [];

        return {
            restrict: "E",
            scope: {},
            priority: 3,
            terminal: false,
            templateUrl: "templates/greetingTemplate.html",
            controller: function($scope) {
                let $ctrl = this;

                $scope.sayHello = function() {
                    alert(greetings.join());
                };

                $ctrl.addGreeting = function(greeting) {
                    greetings.push(greeting);
                };
            }
        };
    }

    function hi() {
        return {
            restrict: "A",
            require: "greeting4",
            priority: 1,
            terminal: false,
            link: function(scope, elem, attrs, ctrl) {
                ctrl.addGreeting("Hi");
                console.log(scope.dataSource);
            }
        };
    }

    function hello() {
        return {
            restrict: "A",
            require: "greeting4",
            priority: 2,
            terminal: true,
            link: function(scope, elem, attrs, ctrl) {
                ctrl.addGreeting("Hello");
            }
        };
    }

    function greeting5() {
        let greetings = [];

        return {
            restrict: "E",
            scope: {},
            transclude: true,
            templateUrl: "templates/greetingTranscludeTemplate.html",
            controller: function($scope) {
                let $ctrl = this;

                $scope.sayHello = function() {
                    alert(greetings.join());
                };

                $ctrl.addGreeting = function(greeting) {
                    greetings.push(greeting);
                };
            }
        };
    }

    function hi2() {
        return {
            restrict: "A",
            require: "^greeting5",
            link: function(scope, elem, attrs, ctrl) {
                ctrl.addGreeting("Hi");
                console.log(scope.dataSource);
            }
        };
    }

    function hello2() {
        return {
            restrict: "A",
            require: "^greeting5",
            link: function(scope, elem, attrs, ctrl) {
                ctrl.addGreeting("Hello");
            }
        };
    }

    function greeting6() {
        let greetings = [];

        return {
            restrict: "E",
            scope: {},
            transclude: true,
            templateUrl: "templates/greetingTranscludeTemplate.html",
            controller: function($scope) {
                let $ctrl = this;

                $scope.sayHello = function() {
                    alert(greetings.join(", "));
                };

                $ctrl.addGreeting = function(greeting) {
                    greetings.push(greeting);
                };
            }
        };
    }

    function hi3() {
        return {
            restrict: "A",
            require: "^greeting6",
            priority: 2,
            link: function(scope, elem, attrs, ctrl) {
                ctrl.addGreeting("Hi");
                console.log(scope.dataSource);
            }
        };
    }

    function hello3() {
        return {
            restrict: "A",
            require: "^greeting6",
            priority: 1,
            link: function(scope, elem, attrs, ctrl) {
                ctrl.addGreeting("Hello");
            }
        };
    }

    function multiElem() {
        return {
            restrict: "A",
            multiElement: true,
            link: function(scope, elems, attrs) {
                angular.element(elems[0]).css("color", "red");
            }
        };
    }

})();