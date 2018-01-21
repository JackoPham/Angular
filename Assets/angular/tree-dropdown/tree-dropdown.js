/**
 * Created by Shripad on 2015-Nov-17.
 * Customize by TuanPham 11/09/2017
 * add tree may expand and collapse.
 * add icon tree
 */

angular.module('tree.dropdown', []).directive('treeDropdown', treeDropdown);

treeDropdown.$inject = ['$compile'];

function treeDropdown($compile) {
    var template = "<div class='select' ng-click='openTree()'><p>{{selectedName}}</p></div>";
    template += "<div class='list' ng-show='isOpen'></div>";

    return {
        restrict: 'E',
        scope: {
            data: '=',
            selected: '=',
            expand: '=',
            multiple: '='
        },

        template: template,
        controller: function ($scope, $element) {
            ctrl = $scope;
            ctrl.isOpen = false;

            ctrl.openTree = function () {
                ctrl.isOpen = ctrl.isOpen ? false : true;
            }

            ctrl.childClick = function (obj) {
                setSelected(ctrl, obj);
                ctrl.isOpen = false;
                ctrl.$apply();
            }

            ctrl.expaned = function (e, item) {
                if (e) {
                    var parent = item[0];
                    angular.forEach(parent.children, function (item, index) {
                        if ($(item).hasClass('hidden') && $(item).is('ul')) {
                            $(item).removeClass('hidden')
                        }
                        else if ($(item).is('ul')) {
                            $(item).addClass('hidden')
                        }
                        else if ($(item).is('p')) {
                            if (item.children) {
                                var child = item.children[0];
                                if ($(child).hasClass("fa-chevron-right")) {
                                    $(child).removeClass("fa-chevron-right")
                                    $(child).addClass("fa-chevron-down")
                                } else {
                                    $(child).addClass("fa-chevron-right")
                                    $(child).removeClass("fa-chevron-down")
                                }
                            }
                        }
                    });
                    e.stopPropagation();
                }
            };
        },
        link: function (scope, element, attrs, ngModel) {
            var list = angular.element(element[0].querySelector('.list'));

            scope.$watchGroup(['data'], function (newValues, oldValues, scope) {
                list.html('');
                var options = getOptions(scope, scope.data, 0, scope.expand);
                list.append($compile(options)(scope));
                if (!scope.expand && !scope.multiple) {
                    if (scope.selected != null) {
                        var elments = angular.element(list[0].querySelector('#rubik_' + scope.selected.id));
                        if (elments.length > 0) {
                            recursionRemoveParent(elments[0]);
                        };

                        function recursionRemoveParent(parent) {
                            if (parent.parentElement) {
                                if ($(parent.parentElement).hasClass('hidden')) {
                                    $(parent.parentElement).removeClass('hidden');
                                    var elmp = parent.parentElement.parentElement.children[0];
                                    if (elmp && $(elmp).is('p')) {
                                        var child = elmp.children[0];
                                        $(child).removeClass("fa-chevron-right");
                                        $(child).addClass("fa-chevron-down");
                                    }
                                    if (parent.parentElement.parentElement) {
                                        recursionRemoveParent(parent.parentElement.parentElement);
                                    }
                                }
                            }
                        }
                    }
                }
            });

            scope.$watchGroup(['selected'], function (newValues, oldValues, scope) {
                if (!scope.selected) {
                    setSelected(scope, null);
                }
                else {
                    if (scope.multiple && angular.isArray(scope.selected)) {
                        if (angular.isArray(scope.selected)) {
                            angular.forEach(scope.selected, function (item, index) {
                                scope.selectedName += item.name + ", ";
                            });
                        }
                    }
                    else {
                        scope.selectedName = scope.selected.name;
                    }
                }
            });


            // Close on click outside the dropdown...            
            angular.element(document).bind('click', function (event) {
                if (element !== event.target && !element[0].contains(event.target)) {
                    scope.$apply(function () {
                        scope.isOpen = false;
                    })
                }
            });
        }
    };

    function getOptions(scope, data, level, expand) {
        var optionUL = angular.element("<ul></ul>");
        angular.forEach(data, function (obj) {
            obj.isExpand = false;
            if (expand) {
                obj.isExpand = true;
            }
            var optionLI = angular.element("<li id='rubik_" + obj.id + "'></li>");
            var optionA = "";
            if (obj.children) {
                var icon = "";
                if (expand) {
                    icon = angular.element("<i class='fa fa-chevron-down cursor'></i>");
                }
                else {
                    icon = angular.element("<i class='fa fa-chevron-right cursor'></i>");
                }
                var name = "<span>&nbsp;&nbsp;&nbsp;" + obj.name + "</span>";
                icon.bind("click", function (e) {
                    scope.expaned(e, optionLI);
                })
                optionA = angular.element("<p ng-class='{selected:selected.id==" + obj.id + "}' class='cursor level-" + level + "'></p>");
                optionA.append(icon);
                optionA.append(name);
            }
            else {
                optionA = angular.element("<p ng-class='{selected:selected.id==" + obj.id + "}' class='cursor level-" + level + "'><i class='fa fa-minus cursor'></i>&nbsp;&nbsp;&nbsp;" + obj.name + "</p>");
            }

            optionLI.append(optionA);

            // Set selected option if selected id or object exist..
            if (scope.selected == obj) {
                setSelected(scope, obj);
            }

            optionA.bind("click", function () {
                scope.childClick(obj);
            })

            if (obj.children) {
                optionLI.append(getOptions(scope, obj.children, level + 1, expand));
            }
            optionUL.append(optionLI);
            if (level > 0) {
                if (expand == false)
                    optionUL.addClass("hidden");
            }
        })

        return optionUL;
    }

    function setSelected(scope, obj) {
        if (obj) {
            if (scope.multiple) {
                scope.selected = [];
                scope.selected.push(obj);
            }
            else {
                scope.selected = obj;
                scope.selectedName = obj.name;
            }
        } else {
            scope.selectedName = null;
            scope.selected = null;
        }
    }
}