/**
 * Create by TuanPham 11/09/2017
 */

angular.module('rubik.tree', []).directive('rubikTree', rubikTree);

rubikTree.$inject = ['$compile'];

function rubikTree($compile) {
    var template = "<div class='rubik' id='rubiktree'></ul>";
    return {
        restrict: 'E',
        scope: {
            data: '=',
            selected: '=',
            expand: '=',
            selectedChange: '&',
            treeDisplay: '=',
            treeValue: '='
        },

        template: template,
        controller: function ($scope, $element) {
            ctrl = $scope;

            ctrl.childClick = function (obj, optionA) {
                setSelected(ctrl, obj);
                $scope.optionA = optionA;
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
                                if ($(child).hasClass("fa-plus-square-o")) {
                                    $(child).removeClass("fa-plus-square-o")
                                    $(child).addClass("fa-minus-square-o")
                                } else {
                                    $(child).addClass("fa-plus-square-o")
                                    $(child).removeClass("fa-minus-square-o")
                                }
                            }
                        }
                    });
                    e.stopPropagation();
                }
            };
        },
        link: function (scope, element, attrs, ngModel) {
            var list = angular.element(element[0].querySelector('#rubiktree'));

            scope.$watchGroup(['data'], function (newValues, oldValues, scope) {
                list.html('');
                var options = getOptions(scope, scope.data, 0, scope.expand);
                list.append($compile(options)(scope));
            });

            scope.$watchGroup(['selected'], function (newValues, oldValues, scope) {
                if (!scope.selected) {
                    setSelected(scope, null);
                }
                else {
                    if (scope.optionA) {
                        var listp = angular.element(document.getElementsByClassName('rubikp2010_jack'));
                        angular.forEach(listp, function (item, index) {
                            if ($(item).hasClass('selected'))
                                $(item).removeClass('selected');
                        });
                        scope.optionA.addClass("selected");
                        scope.selectedChange({ data: scope.selected });
                    }
                }
            });

        }
    };

    function getOptions(scope, data, level, expand) {
        var colName = "name";
        var colId = "id";
        if (scope.treeDisplay)
            colName = scope.treeDisplay;
        if (scope.treeValue)
            colId = scope.treeValue;
        var optionUL = angular.element("<ul></ul>");
        angular.forEach(data, function (obj) {
            obj.isExpand = false;
            if (expand) {
                obj.isExpand = true;
            }
            var optionLI = angular.element("<li id='rubik_" + obj[colId] + "'></li>");
            var optionA = "";
            if (obj.children) {
                var icon = "";
                if (expand) {
                    icon = angular.element("<i class='fa fa-minus-square-o cursor'></i>");
                }
                else {
                    icon = angular.element("<i class='fa fa-plus-square-o cursor'></i>");
                }
                var name = "<span>&nbsp;&nbsp;&nbsp;" + obj[colName] + "</span>";
                icon.bind("click", function (e) {
                    scope.expaned(e, optionLI);
                })
                optionA = angular.element("<p class='cursor level-" + level + " rubikp2010_jack'></p>");
                optionA.append(icon);
                optionA.append(name);
            }
            else {
                optionA = angular.element("<p class='cursor level-" + level + " rubikp2010_jack'>" + obj[colName] + "</p>");
            }

            optionLI.append(optionA);

            // Set selected option if selected id or object exist..
            if (scope.selected && (scope.selected[colId] == obj[colId] && scope.selected['Level'] == obj['Level'])) {
                optionA.addClass('selected');
                setSelected(scope, obj);
            }

            optionA.bind("click", function () {
                scope.childClick(obj, optionA);
            })

            if (obj.children) {
                optionLI.append(getOptions(scope, obj.children, level + 1, expand));
            }
            optionUL.append(optionLI);
            if (level > 0) {
                if (!expand)
                    optionUL.addClass("hidden");
            }
        })

        return optionUL;
    }

    function setSelected(scope, obj) {
        if (obj) {
            scope.selected = obj;
        } else {
            scope.selected = null;
        }
    }
}