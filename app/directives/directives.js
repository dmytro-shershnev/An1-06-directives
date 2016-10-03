(function() {
    "use strict";

    angular
        .module("app")
        .directive("unorderedList1", unorderedList1)
        .directive("unorderedList2", unorderedList2)
        .directive("unorderedList3", unorderedList3)
        .directive("unorderedList4", unorderedList4)
        .directive("unorderedList5", unorderedList5)
        .directive("unorderedListAttrs", unorderedListAttrs)
        .directive("unorderedListScope", unorderedListScope)
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
})();