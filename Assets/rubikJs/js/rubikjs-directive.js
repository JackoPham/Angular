﻿!function () { "use strict"; angular.module("validate.Message", []).directive("validateMessage", ["$compile", function (e) { return { restrict: "A", replace: !0, compile: function (e, t) { var a = e.closest("form").attr("name"); a || (a = t.formName); var n = a + "." + t.name, o = t.ngMinlength, r = t.ngMaxlength, u = t.min, i = t.max, s = void 0 == t.required ? t.ngRequired : t.required, l = t.fieldName, d = t.compareTo, m = t.type, g = '<span ng-if="' + a + ".$submitted || " + n + '.$dirty" ng-messages="' + n + '.$error">'; !0 !== s && "true" !== s || (g += '<span style="color:#ed1c24;margin:5px 0 0 0;display:block;font-size:13px;" ng-message="required">' + l + " là thông tin bắt buộc</span>"), "email" === m && (g += '<span style="color:#ed1c24;margin:5px 0 0 0;display:block;font-size:13px;" ng-message="email">Email không đúng định dạng</span>'), u && (g += '<span style="color:#ed1c24;margin:5px 0 0 0;display:block;font-size:13px;" ng-message="min">' + l + " Tối thiểu là " + u + "</span>"), i && (g += '<span style="color:#ed1c24;margin:5px 0 0 0;display:block;font-size:13px;" ng-message="max">' + l + " Tối đa là " + i + "</span>"), "number" === m && (g += '<span style="color:#ed1c24;margin:5px 0 0 0;display:block;font-size:13px;" ng-message="number">' + l + "  Phải là kiểu số</span>"), void 0 !== o && "" !== o && (g += '<span style="color:#ed1c24;margin:5px 0 0 0;display:block;font-size:13px;" ng-message="minlength">' + l + " có độ dài tối thiểu là " + o + "  ký tự</span>"), void 0 !== r && "" !== r && (g += '<span style="color:#ed1c24;margin:5px 0 0 0;display:block;font-size:13px;" ng-message="maxlength">' + l + " có độ dài tối đa là " + r + " ký tự</span>"), d && (g += '<span style="color:#ed1c24;margin:5px 0 0 0;display:block;font-size:13px;" ng-message="compareTo">' + l + " không trùng nhau</span>"), g += "</span>", $(e).is("select") ? $(e).closest("div").after(g) : $(e).after(g) } } }]), angular.module("rubik.pagination", []).directive("pagination", ["$rootScope", function (e) { return { restrict: "E", replace: !0, templateUrl: "/Assets/rubikJs/components/paging.html", scope: { params: "=", totalRow: "=", showCount: "=", pageChange: "&" }, link: function (t, a, n) { t.IsShowCount = !0, t.CountShowPage = 6, t.pageNumber = t.params.p ? t.params.p : 1, 0 == t.showCount && (t.IsShowCount = !1), t.rowPerPage = 0, t.startNum = 0, t.endNum = 0, t.startIndex = 1, t.endIndex = 1, t.rowPerPage = t.params.ps ? t.params.ps : e.defaultPageSize, t.totalPage = Math.ceil(t.totalRow / t.rowPerPage), t.listDisplayCount = [{ value: 10, name: "10" }, { value: 20, name: "20" }, { value: 50, name: "50" }, { value: 100, name: "100" }], t.startIndex = (t.pageNumber - 1) * t.rowPerPage + 1, t.endIndex = Number(t.startIndex) + Number(t.rowPerPage) - 1, t.endIndex = t.endIndex >= t.totalRow ? t.totalRow : t.endIndex, t.pageNumber <= t.CountShowPage / 2 && t.totalPage <= t.CountShowPage ? (t.startNum = 1, t.endNum = t.CountShowPage) : t.pageNumber <= t.CountShowPage / 2 && t.totalPage > t.CountShowPage ? (t.startNum = 1, t.endNum = t.CountShowPage - 1) : t.pageNumber > t.totalPage - t.CountShowPage / 2 && t.totalPage > t.CountShowPage ? (t.endNum = t.totalPage, t.startNum = t.endNum - t.CountShowPage / 2 - 1) : (t.startNum = t.pageNumber - t.CountShowPage / 2 + 1, t.endNum = t.startNum + t.CountShowPage / 2), t.startNum < 1 && (t.startNum = 1), t.endNum > t.totalPage && (t.endNum = t.totalPage), t.getNumber = function (e) { return new Array(e) }, t.GoToPage = function (e, a) { a.preventDefault(), e != t.pageNumber && t.pageChange({ msg: { p: e, ps: Number(t.rowPerPage) } }) }, t.PreviousPage = function () { if (t.params.p > 1) { var e = Number(t.pageNumber) - 1; t.pageChange({ msg: { p: e, ps: Number(t.rowPerPage) } }) } }, t.NextPage = function (e) { if (e.preventDefault(), t.params.p < t.totalPage) { var a = Number(t.pageNumber) + 1; t.pageChange({ msg: { p: a, ps: Number(t.rowPerPage) } }) } }, t.ChangePageSize = function (e) { t.rowPerPage = e, t.pageChange({ msg: { p: 1, ps: Number(t.rowPerPage) } }), o() }, t.$watch("totalRow", function (e) { e ? (o(), t.startIndex = (t.pageNumber - 1) * t.rowPerPage + 1, t.endIndex = Number(t.startIndex) + Number(t.rowPerPage) - 1, t.endIndex = t.endIndex >= t.totalRow ? t.totalRow : t.endIndex) : (t.IsShowCount = !1, t.totalPage = 0) }), t.$watch("params.p", function (e) { e && (t.pageNumber = e, t.startIndex = (t.pageNumber - 1) * t.rowPerPage + 1, t.endIndex = Number(t.startIndex) + Number(t.rowPerPage) - 1, t.endIndex = t.endIndex >= t.totalRow ? t.totalRow : t.endIndex, t.pageNumber <= t.CountShowPage / 2 && t.totalPage <= t.CountShowPage ? (t.startNum = 1, t.endNum = t.CountShowPage) : t.pageNumber <= t.CountShowPage / 2 && t.totalPage > t.CountShowPage ? (t.startNum = 1, t.endNum = t.CountShowPage - 1) : t.pageNumber > t.totalPage - t.CountShowPage / 2 && t.totalPage > t.CountShowPage ? (t.endNum = t.totalPage, t.startNum = t.endNum - t.CountShowPage / 2 - 1) : (t.startNum = t.pageNumber - t.CountShowPage / 2 + 1, t.endNum = t.startNum + t.CountShowPage / 2), t.startNum < 1 && (t.startNum = 1), t.endNum > t.totalPage && (t.endNum = t.totalPage)) }); var o = function () { t.IsShowCount = !0, t.totalPage = Math.ceil(t.totalRow / parseInt(t.rowPerPage)), t.pageNumber <= t.CountShowPage / 2 && t.totalPage <= t.CountShowPage ? (t.startNum = 1, t.endNum = t.CountShowPage) : t.pageNumber <= t.CountShowPage / 2 && t.totalPage > t.CountShowPage ? (t.startNum = 1, t.endNum = t.CountShowPage - 1) : t.pageNumber > t.totalPage - t.CountShowPage / 2 && t.totalPage > t.CountShowPage ? (t.endNum = t.totalPage, t.startNum = t.endNum - t.CountShowPage / 2 - 1) : (t.startNum = t.pageNumber - t.CountShowPage / 2 + 1, t.endNum = t.startNum + t.CountShowPage / 2), t.startNum < 1 && (t.startNum = 1), t.endNum > t.totalPage && (t.endNum = t.totalPage) } } } }]), angular.module("rubik.ngEnter", []).directive("ngEnter", function () { return function (e, t, a) { t.bind("keydown keypress", function (t) { 13 === t.which && (e.$apply(function () { e.$eval(a.ngEnter) }), t.preventDefault()) }) } }), angular.module("rubik.datepicker", []).directive("datepicker", function () { return { restrict: "E", require: "ngModel", replace: !0, templateUrl: "/Assets/rubikJs/components/datepicker.html", scope: { dateFormat: "@", dateMin: "@", dateMax: "@", placeholder: "@", daysOfWeekDisabled: "=", outputFormat: "@", onSelect: "&", model: "=ngModel", ngClass: "=ngClass", myClass: "@", iconClass: "@" }, link: function (e, t, a, n) { e.dateFormat = angular.isUndefined(e.dateFormat) ? "DD/MM/YYYY" : e.dateFormat, e.outputFormat = angular.isUndefined(e.outputFormat) ? "YYYY-MM-DD" : e.outputFormat; var o = $(t).find("input[type=text]:first"), r = function () { void 0 !== o.data("DateTimePicker") && (o.data("DateTimePicker").destroy(), o.unbind("dp.change")); var t = { format: e.dateFormat, useCurrent: !1, minDate: e.dateMin, daysOfWeekDisabled: e.daysOfWeekDisabled }; o.datetimepicker(t), o.on("dp.change", function (t) { var a = t.date ? moment(t.date) : null, o = ""; if (null != a) { switch (e.outputFormat) { case "timestamp": o = a.valueOf(); break; default: o = a.format(e.outputFormat) }e.$apply(function () { n.$setViewValue(o) }), void 0 !== e.onSelect && null != a && e.onSelect({ date: a, formatedDate: o, weekDay: a.weekday() }) } }) }; e.$watch("daysOfWeekDisabled", function (t, a) { e.daysOfWeekDisabled = t, r() }), e.$watch("dateMin", function (e, t) { void 0 != e && o.data("DateTimePicker").setMinDate(e) }), e.$watch("dateMax", function (e, t) { void 0 != e && o.data("DateTimePicker").setMaxDate(e) }), e.$watch("model", function (e, t) { void 0 === e && o.data("DateTimePicker").setValue("") }), r() } } }), angular.module("rubik.compareTo", []).directive("compareTo", function () { return { restrict: "A", require: "ngModel", scope: { otherModelValue: "=compareTo" }, link: function (e, t, a, n) { n.$validators.compareTo = function (t) { return t == e.otherModelValue }, e.$watch("otherModelValue", function () { n.$validate() }) } } }), angular.module("rubik.uiRequired", []).directive("uiRequired", function () { return { restrict: "A", require: "ngModel", link: function (e, t, a, n) { n.$validators.uiRequired = function (e) { return !(e < parseInt(a.uiRequired) || "" == e || void 0 == e) && (t.find("a").attr("style", "border-color:'none'; background:'none';"), !0) } } } }), angular.module("rubik.textRequired", []).directive("textRequired", function () { return { restrict: "A", require: "ngModel", link: function (e, t, a, n) { n.$validators.textRequired = function (e) { return "" != e && void 0 != e && (t.attr("style", "border-color:'none'; background:'none';"), !0) }, n.$parsers.unshift(function (e) { return "" == e || void 0 == e ? (t.attr("style", "border-color:#de888a !important; background:#fee9ea !important;"), "") : e }) } } }); var e = function () { return { restrict: "A", require: "form", link: function (e, t) { t.on("submit", function () { var e = t.scope(), a = t[0].name; angular.forEach(e[a].$error, function (e) { e.length > 0 && e[0].$$element.focus(), angular.forEach(e, function (e, t) { e.$$element.hasClass("ui-select-container") ? e.$$element.find("a").attr("style", "border-color:#de888a !important; background:#fee9ea !important;") : (e.$$element.is("input") || e.$$element.is("select")) && e.$$element.attr("style", "border-color:#de888a !important; background:#fee9ea !important;") }) }), angular.forEach(e[a].$$success, function (e) { angular.forEach(e, function (e, t) { e.$$element.hasClass("ui-select-container") ? e.$$element.find("a").attr("style", "border-color:'none'; background:'none';") : (e.$$element.is("input") || e.$$element.is("select")) && e.$$element.attr("style", "border-color:'none'; background:'none';") }) }) }) } } }; angular.module("rubik.accessible", []).directive("accessibleRubik", e).directive("accessibleForm", e), angular.module("rubik-js", ["validate.Message", "rubik.pagination", "rubik.ngEnter", "rubik.datepicker", "rubik.compareTo", "rubik.uiRequired", "rubik.textRequired", "rubik.accessible"]) }();