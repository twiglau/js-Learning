(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-center-center"], {
    "013b": function(t, e, i) {
        "use strict";
        i("7a82"),
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.default = void 0;
        var a = {
            data: function() {
                return {
                    mescroll: null
                }
            },
            onPullDownRefresh: function() {
                this.mescroll && this.mescroll.onPullDownRefresh()
            },
            onPageScroll: function(t) {
                this.mescroll && this.mescroll.onPageScroll(t)
            },
            onReachBottom: function() {
                this.mescroll && this.mescroll.onReachBottom()
            },
            methods: {
                mescrollInit: function(t) {
                    this.mescroll = t,
                    this.mescrollInitByRef()
                },
                mescrollInitByRef: function() {
                    if (!this.mescroll || !this.mescroll.resetUpScroll) {
                        var t = this.$refs.mescrollRef;
                        t && (this.mescroll = t.mescroll)
                    }
                },
                downCallback: function() {
                    var t = this;
                    this.mescroll.optUp.use ? this.mescroll.resetUpScroll() : setTimeout((function() {
                        t.mescroll.endSuccess()
                    }
                    ), 500)
                },
                upCallback: function() {
                    var t = this;
                    setTimeout((function() {
                        t.mescroll.endErr()
                    }
                    ), 500)
                }
            },
            mounted: function() {
                this.mescrollInitByRef()
            }
        }
          , s = a;
        e.default = s
    },
    1094: function(t, e, i) {
        "use strict";
        i.d(e, "b", (function() {
            return s
        }
        )),
        i.d(e, "c", (function() {
            return n
        }
        )),
        i.d(e, "a", (function() {
            return a
        }
        ));
        var a = {
            mescrollBody: i("e9d6").default,
            uPopup: i("769a").default,
            uSelect: i("b929").default
        }
          , s = function() {
            var t = this
              , e = t.$createElement
              , i = t._self._c || e;
            return i("v-uni-view", [i("v-uni-view", {
                staticClass: "nav_big"
            }, [i("v-uni-view", {
                staticClass: "nav"
            }, [i("v-uni-view", {
                staticClass: "nav_left"
            }), i("v-uni-view", {
                staticClass: "flex-row justify-between items-start nav_title"
            }, [i("v-uni-view", {
                staticClass: "flex-col items-center justify-center",
                class: 0 == t.tranKind ? "nav_title_selet" : "",
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.selectTran(0)
                    }
                }
            }, [i("v-uni-view", {}, [t._v(t._s(t.$t("registraList_txt1")))])], 1), i("v-uni-view", {
                staticClass: "flex-col items-center justify-center",
                class: 1 == t.tranKind ? "nav_title_selet" : "",
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.selectTran(1)
                    }
                }
            }, [i("v-uni-view", {}, [t._v(t._s(t.$t("registraList_txt2")))])], 1)], 1), i("v-uni-view", {
                staticClass: "nav_right"
            })], 1)], 1), i("v-uni-view", {
                staticClass: "flex-col page"
            }, [i("v-uni-view", {
                staticClass: "flex-col justify-start flex-auto group"
            }, [i("v-uni-view", {
                staticClass: "flex-col section",
                on: {
                    touchmove: function(e) {
                        e.stopPropagation(),
                        arguments[0] = e = t.$handleEvent(e)
                    },
                    touch: function(e) {
                        e.stopPropagation(),
                        arguments[0] = e = t.$handleEvent(e)
                    }
                }
            }, [i("mescroll-body", {
                ref: "mescrollRef",
                attrs: {
                    height: t.mainHeight,
                    down: t.downOption,
                    up: t.upOption
                },
                on: {
                    down: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.downCallback.apply(void 0, arguments)
                    },
                    up: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.upCallback.apply(void 0, arguments)
                    },
                    init: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.mescrollInit.apply(void 0, arguments)
                    }
                }
            }, [0 == t.tranKind && t.transaPair.length > 0 ? i("v-uni-view", {}, [t.transaPair.length ? i("v-uni-view", {
                staticClass: "flex-col"
            }, [i("v-uni-view", {
                staticClass: "flex-col justify-start relative group_3"
            }, [i("v-uni-view", {
                staticClass: "flex-col justify-start section_3"
            }, [i("v-uni-view", {
                staticClass: "flex-col section_5"
            }, [i("v-uni-view", {
                staticClass: "flex-row justify-between items-center"
            }, [i("v-uni-view", {
                staticClass: "flex-row items-center space-x-38"
            }, [i("v-uni-view", {
                staticClass: "flex-row items-center space-x-12",
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.showSidebar = !0
                    }
                }
            }, [i("v-uni-image", {
                staticClass: "shrink-0 image_4",
                staticStyle: {
                    width: "40rpx"
                },
                attrs: {
                    mode: "widthFix",
                    src: "/static/home/n_home/qiehuan.png"
                }
            }), i("v-uni-text", {
                staticClass: "font_1 text_5",
                staticStyle: {
                    "font-size": "40rpx",
                    "font-weight": "600"
                }
            }, [t._v(t._s(t.symbol ? t.symbol.slice(0, t.symbol.length - 1).toUpperCase() : ""))])], 1)], 1), i("v-uni-view", {
                staticClass: "flex-row group_4 space-x-20 items-center"
            }, [i("v-uni-image", {
                staticStyle: {
                    width: "52rpx",
                    "margin-right": "10rpx"
                },
                attrs: {
                    src: "/static/home/n_home/qushi.png",
                    mode: "widthFix"
                },
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.goWebview.apply(void 0, arguments)
                    }
                }
            }), 2 == t.isCollect ? i("v-uni-image", {
                staticStyle: {
                    width: "38rpx"
                },
                attrs: {
                    mode: "widthFix",
                    src: "/static/home/n_home/cang.png"
                },
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.getCollect.apply(void 0, arguments)
                    }
                }
            }) : t._e(), 1 == t.isCollect ? i("v-uni-image", {
                staticStyle: {
                    width: "38rpx"
                },
                attrs: {
                    mode: "widthFix",
                    src: "/static/home/n_home/cang_z.png"
                },
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.cancelCollect.apply(void 0, arguments)
                    }
                }
            }) : t._e()], 1)], 1), i("v-uni-view", {
                staticClass: "flex-row justify-between items-center group_5",
                staticStyle: {
                    "margin-top": "14rpx"
                }
            }, [i("v-uni-view", {
                staticClass: "flex-row items-center"
            }, [1 == t.transaPair[t.transaPairIndex].zhang ? i("v-uni-text", {
                staticClass: "text_3",
                staticStyle: {
                    color: "#2EBD85"
                }
            }, [t._v(t._s((parseInt(t.transaPair[t.transaPairIndex].new_price * Math.pow(10, t.numberDigits)) / Math.pow(10, t.numberDigits)).toFixed(t.numberDigits)))]) : t._e(), 0 == t.transaPair[t.transaPairIndex].zhang ? i("v-uni-text", {
                staticClass: "text_3",
                staticStyle: {
                    color: "#FF7272"
                }
            }, [t._v(t._s((parseInt(t.transaPair[t.transaPairIndex].new_price * Math.pow(10, t.numberDigits)) / Math.pow(10, t.numberDigits)).toFixed(t.numberDigits)))]) : t._e(), 1 == t.transaPair[t.transaPairIndex].zhang ? i("v-uni-text", {
                staticStyle: {
                    "font-size": "27rpx",
                    color: "#00923F",
                    "margin-left": "10rpx"
                }
            }, [t._v("+" + t._s(t.transaPair[t.transaPairIndex].ratio) + "%")]) : t._e(), 0 == t.transaPair[t.transaPairIndex].zhang ? i("v-uni-text", {
                staticStyle: {
                    "font-size": "27rpx",
                    color: "#DD4B4B",
                    "margin-left": "10rpx"
                }
            }, [t._v(t._s(t.transaPair[t.transaPairIndex].ratio) + "%")]) : t._e()], 1), i("v-uni-view", {
                staticClass: "flex-row items-center group_6 space-x-34"
            }, [i("v-uni-view", {
                staticClass: "flex-col justify-center items-start text-wrapper_2",
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.showDigits = !0
                    }
                }
            }, [i("v-uni-text", {
                staticClass: "font_3 text_6"
            }, [t._v(t._s(t.digitsList[t.numberDigits - 1].label))])], 1), i("v-uni-image", {
                staticStyle: {
                    width: "32rpx"
                },
                attrs: {
                    src: "/static/home/n_home/quhuan.png",
                    mode: "widthFix"
                }
            })], 1)], 1), i("v-uni-view", {}, [i("v-uni-view", {
                staticClass: "flex-row justify-between group_7",
                staticStyle: {
                    width: "100%"
                }
            }, [i("v-uni-view", {
                staticClass: "box_left flex-row justify-between",
                staticStyle: {
                    width: "49%"
                }
            }, [i("v-uni-text", {
                staticClass: "font_1555"
            }, [t._v(t._s(t.$t("registraList_txt3"))), i("br"), t._v("(USD)")]), i("v-uni-text", {
                staticClass: "font_144"
            }, [t._v(t._s(t.$t("registraList_txt4"))), i("br"), t._v("(TON)")])], 1), i("v-uni-view", {
                staticClass: "box_left flex-row justify-between",
                staticStyle: {
                    width: "49%"
                }
            }, [i("v-uni-text", {
                staticClass: "font_1555"
            }, [t._v(t._s(t.$t("registraList_txt3"))), i("br"), t._v("(USD)")]), i("v-uni-text", {
                staticClass: "font_144"
            }, [t._v(t._s(t.$t("registraList_txt4"))), i("br"), t._v("(TON)")])], 1)], 1), i("v-uni-view", {
                staticClass: "flex-row justify-between items-start",
                staticStyle: {
                    width: "100%",
                    "flex-wrap": "wrap"
                }
            }, [t.deepList && t.deepList.buy && t.deepList.buy.length > 0 ? i("v-uni-view", {
                staticClass: "flex-col group_8",
                staticStyle: {
                    width: "49%"
                }
            }, t._l(t.deepList.buy.slice(0, 10), (function(e, a) {
                return i("v-uni-view", {
                    key: a,
                    staticClass: "box_left1 flex-row justify-between  items-center",
                    staticStyle: {
                        position: "relative"
                    },
                    on: {
                        click: function(i) {
                            arguments[0] = i = t.$handleEvent(i),
                            t.selectPrice(e)
                        }
                    }
                }, [i("v-uni-view", {
                    staticClass: "font_7 text_7  flex-row justify-end items-center",
                    staticStyle: {
                        "z-index": "1",
                        "font-size": "24rpx"
                    }
                }, [t._v(t._s(e.price))]), i("v-uni-view", {
                    staticClass: "font_6 flex-row justify-end items-center",
                    staticStyle: {
                        "z-index": "1",
                        "font-size": "24rpx"
                    }
                }, [t._v(t._s(e.num))]), i("v-uni-view", {
                    staticStyle: {
                        position: "absolute",
                        top: "0",
                        right: "0",
                        bottom: "0",
                        width: "100%",
                        height: "100%",
                        "text-align": "right"
                    }
                }, [i("v-uni-view", {
                    staticClass: "mai_bg",
                    style: {
                        width: e.deep + "%"
                    }
                })], 1)], 1)
            }
            )), 1) : t._e(), t.deepList && t.deepList.buy && 0 == t.deepList.buy.length ? i("v-uni-view", {
                staticClass: "maizhan_1",
                staticStyle: {
                    width: "49%"
                }
            }) : t._e(), t.deepList && !t.deepList.buy ? i("v-uni-view", {
                staticClass: "maizhan_1",
                staticStyle: {
                    width: "49%"
                }
            }) : t._e(), t.deepList && t.deepList.sell && t.deepList.sell.length > 0 ? i("v-uni-view", {
                staticClass: "flex-col group_8",
                staticStyle: {
                    width: "49%"
                }
            }, t._l(t.deepList.sell.slice(0, 10), (function(e, a) {
                return i("v-uni-view", {
                    key: a,
                    staticClass: "box_left1 flex-row justify-between items-center",
                    staticStyle: {
                        position: "relative"
                    },
                    on: {
                        click: function(i) {
                            arguments[0] = i = t.$handleEvent(i),
                            t.selectPrice(e)
                        }
                    }
                }, [i("v-uni-view", {
                    staticClass: "font_8 text_12  flex-row justify-end items-center",
                    staticStyle: {
                        "z-index": "1",
                        "font-size": "24rpx"
                    }
                }, [t._v(t._s(e.price))]), i("v-uni-view", {
                    staticClass: "font_6 flex-row justify-end items-center",
                    staticStyle: {
                        "z-index": "1",
                        "font-size": "24rpx"
                    }
                }, [t._v(t._s(e.num))]), i("v-uni-view", {
                    staticStyle: {
                        position: "absolute",
                        top: "0",
                        right: "0",
                        bottom: "0",
                        width: "100%",
                        height: "100%",
                        "text-align": "right"
                    }
                }, [i("v-uni-view", {
                    staticClass: "mai_bg2",
                    style: {
                        width: e.deep + "%"
                    }
                })], 1)], 1)
            }
            )), 1) : t._e(), t.deepList && t.deepList.sell && 0 == t.deepList.sell.length ? i("v-uni-view", {
                staticClass: "maizhan_2 ",
                staticStyle: {
                    width: "49%"
                }
            }) : t._e(), t.deepList && !t.deepList.sell ? i("v-uni-view", {
                staticClass: "maizhan_2 ",
                staticStyle: {
                    width: "49%"
                }
            }) : t._e()], 1)], 1), i("v-uni-view", {
                staticClass: "charts-box"
            }, [i("v-uni-canvas", {
                staticClass: "line",
                staticStyle: {
                    width: "750rpx",
                    height: "200rpx"
                },
                attrs: {
                    "canvas-id": "line",
                    id: "line"
                }
            })], 1)], 1)], 1)], 1)], 1) : t._e(), i("v-uni-view", {
                staticClass: "flex-row justify-between items-center section_4",
                staticStyle: {
                    padding: "0",
                    height: "85rpx"
                }
            }, [i("v-uni-view", {
                staticClass: "flex-row justify-center items-center text-wrapper",
                class: 0 == t.maiKind ? "text-wrapper_color_bor" : "",
                staticStyle: {
                    padding: "0",
                    height: "85rpx"
                },
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.maiKind = 0
                    }
                }
            }, [i("v-uni-text", {
                staticClass: "font_1 "
            }, [t._v(t._s(t.$t("registraList_txt5")))])], 1), i("v-uni-view", {
                staticClass: "flex-row justify-center items-center text-wrapper",
                class: 1 == t.maiKind ? "text-wrapper_color_txt" : "",
                staticStyle: {
                    padding: "0",
                    height: "85rpx"
                },
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.maiKind = 1
                    }
                }
            }, [i("v-uni-text", {
                staticClass: "font_1 "
            }, [t._v(t._s(t.$t("registraList_txt6")))])], 1)], 1), 0 == t.maiKind ? i("v-uni-view", {}, [i("v-uni-view", {
                staticClass: "flex-col group_18 space-y-14"
            }, [i("v-uni-view", {
                staticClass: "flex-row items-center section_15 justify-between"
            }, [i("v-uni-view", {
                staticClass: "flex-row justify-start items-center",
                staticStyle: {
                    width: "75%"
                }
            }, [i("v-uni-view", {
                staticClass: "font_11"
            }, [t._v(t._s(t.$t("registraList_txt3")) + ":")]), i("v-uni-input", {
                attrs: {
                    type: "digit",
                    placeholder: t.$t("registraList_txt7"),
                    "placeholder-class": "inpu_ti"
                },
                model: {
                    value: t.checkJia,
                    callback: function(e) {
                        t.checkJia = e
                    },
                    expression: "checkJia"
                }
            })], 1), i("v-uni-view", {
                staticClass: "flex-row items-center shrink-0 group_19 space-x-40"
            }, [i("v-uni-image", {
                staticClass: "image_8",
                staticStyle: {
                    width: "25rpx"
                },
                attrs: {
                    src: "/static/home/n_home/add.png",
                    mode: "widthFix"
                },
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.checkJia++
                    }
                }
            }), i("v-uni-image", {
                staticClass: "image_7",
                staticStyle: {
                    width: "70rpx"
                },
                attrs: {
                    mode: "widthFix",
                    src: "/static/home/n_home/bg_jian.png"
                },
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.checkJia >= 1 && t.checkJia--
                    }
                }
            })], 1)], 1), i("v-uni-view", {
                staticClass: "flex-col section_16 space-y-24"
            }, [i("v-uni-view", {
                staticClass: "flex-row items-center section_15 group_20 justify-between",
                staticStyle: {
                    "padding-right": "35rpx"
                }
            }, [i("v-uni-view", {
                staticClass: "flex-row justify-start items-center",
                staticStyle: {
                    width: "75%"
                }
            }, [i("v-uni-view", {
                staticClass: "font_11"
            }, [t._v(t._s(t.$t("registraList_txt4")) + ":")]), i("v-uni-input", {
                attrs: {
                    type: "digit",
                    placeholder: t.$t("registraList_txt8"),
                    "placeholder-class": "inpu_ti"
                },
                model: {
                    value: t.checkNum,
                    callback: function(e) {
                        t.checkNum = e
                    },
                    expression: "checkNum"
                }
            })], 1), i("v-uni-view", {
                staticClass: "flex-row items-center shrink-0 space-x-42"
            }, [i("v-uni-image", {
                staticClass: "image_9",
                staticStyle: {
                    width: "70rpx"
                },
                attrs: {
                    src: "/static/home/n_home/bg_add.png",
                    mode: "widthFix"
                },
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.checkNum++
                    }
                }
            }), i("v-uni-view", {
                staticClass: "section_17",
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.checkNum >= 1 && t.checkNum--
                    }
                }
            })], 1)], 1)], 1), i("v-uni-view", {
                staticClass: "flex-row justify-between items-center group_23"
            }, t._l(t.checkBaiList, (function(e, a) {
                return i("v-uni-view", {
                    key: a,
                    staticClass: "flex-col justify-start items-center text-wrapper_8",
                    on: {
                        click: function(e) {
                            e.stopPropagation(),
                            arguments[0] = e = t.$handleEvent(e),
                            t.selectChexkdai(a)
                        }
                    }
                }, [i("v-uni-view", {
                    class: 1 == e.select ? "mai_jindu mai_jindu_buy" : "mai_jindu"
                }), i("v-uni-text", {
                    staticClass: "font_12",
                    class: 1 == e.select ? "text_33" : ""
                }, [t._v(t._s(e.label) + "%")])], 1)
            }
            )), 1), i("v-uni-view", {
                staticClass: "flex-col  group_24"
            }, [i("v-uni-view", {
                staticClass: "flex-row justify-between items-center"
            }, [i("v-uni-text", {
                staticClass: "font_1 text_34"
            }, [t._v(t._s(t.$t("buying_txt26")) + "(" + t._s(t.$t("registraList_txt9")) + "):")]), i("v-uni-text", {
                staticClass: "font_13 text_35"
            }, [t._v(t._s(t.amountPro(t.myAddrsss.dot)))])], 1), i("v-uni-view", {
                staticClass: "flex-row justify-between items-center"
            }, [i("v-uni-text", {
                staticClass: "font_1 text_34"
            }, [t._v(t._s(t.$t("registraList_txt12")) + ":")]), i("v-uni-text", {
                staticClass: "font_13 text_35"
            }, [t._v(t._s(t.amountPro(t.myAddrsss.usdt)))])], 1), i("v-uni-view", {
                staticClass: "flex-row justify-between items-center"
            }, [i("v-uni-text", {
                staticClass: "font_1 text_34"
            }, [t._v(t._s(t.$t("registraList_txt13")) + ":")]), i("v-uni-text", {
                staticClass: "font_13 text_35"
            }, [t._v(t._s(t.amountPro(t.myAddrsss.value)))])], 1)], 1), i("v-uni-view", {
                staticClass: "flex-col justify-start items-center button button_m",
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.checkAction.apply(void 0, arguments)
                    }
                }
            }, [i("v-uni-text", {
                staticClass: "font_14 text_36"
            }, [t._v(t._s(t.$t("registraList_txt5")))])], 1)], 1)], 1) : t._e(), 1 == t.maiKind ? i("v-uni-view", {}, [i("v-uni-view", {
                staticClass: "flex-col group_18 space-y-14"
            }, [i("v-uni-view", {
                staticClass: "flex-row items-center section_15 justify-between"
            }, [i("v-uni-view", {
                staticClass: "flex-row justify-start items-center",
                staticStyle: {
                    width: "75%"
                }
            }, [i("v-uni-view", {
                staticClass: "font_11"
            }, [t._v(t._s(t.$t("registraList_txt3")) + ":")]), i("v-uni-input", {
                attrs: {
                    type: "digit",
                    placeholder: t.$t("registraList_txt7"),
                    "placeholder-class": "inpu_ti"
                },
                model: {
                    value: t.sellJia,
                    callback: function(e) {
                        t.sellJia = e
                    },
                    expression: "sellJia"
                }
            })], 1), i("v-uni-view", {
                staticClass: "flex-row items-center shrink-0 group_19 space-x-40"
            }, [i("v-uni-image", {
                staticClass: "image_8",
                staticStyle: {
                    width: "25rpx"
                },
                attrs: {
                    src: "/static/home/n_home/add.png"
                },
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.sellJia++
                    }
                }
            }), i("v-uni-image", {
                staticClass: "image_7",
                staticStyle: {
                    width: "70rpx"
                },
                attrs: {
                    mode: "widthFix",
                    src: "/static/home/n_home/bg_jian.png"
                },
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.sellJia >= 1 && t.sellJia--
                    }
                }
            })], 1)], 1), i("v-uni-view", {
                staticClass: "flex-col section_16 space-y-24"
            }, [i("v-uni-view", {
                staticClass: "flex-row items-center section_15 group_20 justify-between",
                staticStyle: {
                    "padding-right": "35rpx"
                }
            }, [i("v-uni-view", {
                staticClass: "flex-row justify-start items-center",
                staticStyle: {
                    width: "75%"
                }
            }, [i("v-uni-view", {
                staticClass: "font_11"
            }, [t._v(t._s(t.$t("registraList_txt4")) + ":")]), i("v-uni-input", {
                attrs: {
                    type: "digit",
                    placeholder: t.$t("registraList_txt8"),
                    "placeholder-class": "inpu_ti"
                },
                model: {
                    value: t.sellNum,
                    callback: function(e) {
                        t.sellNum = e
                    },
                    expression: "sellNum"
                }
            })], 1), i("v-uni-view", {
                staticClass: "flex-row items-center shrink-0 space-x-42"
            }, [i("v-uni-image", {
                staticClass: "image_9",
                staticStyle: {
                    width: "70rpx"
                },
                attrs: {
                    mode: "widthFix",
                    src: "/static/home/n_home/bg_add.png"
                },
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.sellNum++
                    }
                }
            }), i("v-uni-view", {
                staticClass: "section_17",
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.sellNum >= 1 && t.sellNum--
                    }
                }
            })], 1)], 1)], 1), i("v-uni-view", {
                staticClass: "flex-row justify-between items-center group_23"
            }, t._l(t.sellBaiList, (function(e, a) {
                return i("v-uni-view", {
                    key: a,
                    staticClass: "flex-col justify-start items-center text-wrapper_8",
                    on: {
                        click: function(e) {
                            e.stopPropagation(),
                            arguments[0] = e = t.$handleEvent(e),
                            t.selectSelldai(a)
                        }
                    }
                }, [i("v-uni-view", {
                    class: 1 == e.select ? "mai_jindu mai_jindu_sell" : "mai_jindu"
                }), i("v-uni-text", {
                    staticClass: "font_12",
                    class: 1 == e.select ? "text_333" : ""
                }, [t._v(t._s(e.label) + "%")])], 1)
            }
            )), 1), i("v-uni-view", {
                staticClass: "flex-col  group_24 "
            }, [i("v-uni-view", {
                staticClass: "flex-row justify-between items-center"
            }, [i("v-uni-text", {
                staticClass: "font_1 text_34"
            }, [t._v(t._s(t.$t("buying_txt26")) + "(" + t._s(t.$t("registraList_txt9")) + "):")]), i("v-uni-text", {
                staticClass: "font_13 text_35"
            }, [t._v(t._s(t.amountPro(t.myAddrsss.dot)))])], 1), i("v-uni-view", {
                staticClass: "flex-row justify-between items-center"
            }, [i("v-uni-text", {
                staticClass: "font_1 text_34"
            }, [t._v(t._s(t.$t("registraList_txt12")) + ":")]), i("v-uni-text", {
                staticClass: "font_13 text_35"
            }, [t._v(t._s(t.amountPro(t.myAddrsss.usdt)))])], 1), i("v-uni-view", {
                staticClass: "flex-row justify-between items-center"
            }, [i("v-uni-text", {
                staticClass: "font_1 text_34"
            }, [t._v(t._s(t.$t("registraList_txt13")) + ":")]), i("v-uni-text", {
                staticClass: "font_13 text_35"
            }, [t._v(t._s(t.amountPro(t.myAddrsss.value)))])], 1)], 1), i("v-uni-view", {
                staticClass: "flex-col justify-start items-center button",
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.checkAction.apply(void 0, arguments)
                    }
                }
            }, [i("v-uni-text", {
                staticClass: "font_14 text_36"
            }, [t._v(t._s(t.$t("registraList_txt6")))])], 1)], 1)], 1) : t._e(), i("v-uni-view", {
                staticClass: "flex-row justify-between items-center group_25"
            }, [i("v-uni-view", {
                staticClass: "group_26"
            }, [i("v-uni-text", {
                staticClass: "font_14 text_37"
            }, [t._v(t._s(t.$t("registraList_txt14")))])], 1), i("v-uni-image", {
                staticClass: "image_10",
                attrs: {
                    src: "/static/mine/n_mine/ziwdk.png"
                },
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.goCenterRecode.apply(void 0, arguments)
                    }
                }
            })], 1), t.registList ? i("v-uni-view", {
                staticClass: "flex-col"
            }, [t._l(t.registList, (function(e, a) {
                return i("v-uni-view", {
                    key: a,
                    staticClass: "flex-col group_27 list-item"
                }, [i("v-uni-view", {
                    staticClass: "flex-col group_28",
                    staticStyle: {
                        "margin-bottom": "15rpx"
                    }
                }, [i("v-uni-view", {
                    staticClass: "flex-row justify-between group_29"
                }, [i("v-uni-view", {
                    staticClass: "flex-row"
                }, [i("v-uni-view", {
                    staticClass: "flex-col items-start group_30 space-y-18"
                }, [i("v-uni-text", {
                    staticClass: "font_15 text_39"
                }, [t._v(t._s(e.market ? e.market.toUpperCase() : ""))]), i("v-uni-text", {
                    staticClass: "font_17 text_40"
                }, [t._v(t._s(t.timeformat(e.time)))])], 1)], 1), i("v-uni-view", {
                    staticClass: "flex-col justify-start items-center text-wrapper_9",
                    on: {
                        click: function(i) {
                            arguments[0] = i = t.$handleEvent(i),
                            t.revokeOrder(e.id)
                        }
                    }
                }, [i("v-uni-text", {
                    staticClass: "font_16"
                }, [t._v(t._s(t.$t("registraList_txt15")))])], 1)], 1)], 1), i("v-uni-view", {
                    staticClass: "flex-col"
                }, [i("v-uni-view", {
                    staticClass: "flex-col  list_items_ding"
                }, [i("v-uni-view", {
                    staticClass: "flex-row justify-between items-center"
                }, [i("v-uni-text", {
                    staticClass: "font_13 text_41"
                }, [t._v(t._s(t.$t("registraList_txt16")))]), i("v-uni-text", {
                    staticClass: "font_19"
                }, [t._v(t._s(t.amountPro(e.num)))])], 1), i("v-uni-view", {
                    staticClass: "flex-row justify-between items-center"
                }, [i("v-uni-text", {
                    staticClass: "font_18 text_41"
                }, [t._v(t._s(t.$t("registraList_txt17")))]), i("v-uni-text", {
                    staticClass: "font_19"
                }, [t._v(t._s(t.amountPro(e.price)))])], 1), i("v-uni-view", {
                    staticClass: "flex-row justify-between items-center"
                }, [i("v-uni-text", {
                    staticClass: "font_13 text_41"
                }, [t._v(t._s(t.$t("registraList_txt18")))]), i("v-uni-text", {
                    staticClass: "font_19"
                }, [t._v(t._s(t.amountPro(e.unfilled)))])], 1), i("v-uni-view", {
                    staticClass: "flex-row justify-between items-center"
                }, [i("v-uni-text", {
                    staticClass: "font_13 text_41"
                }, [t._v(t._s(t.$t("buying_txt26")) + "(" + t._s(t.$t("buying_txt27")) + ")")]), i("v-uni-text", {
                    staticClass: "font_19"
                }, [t._v(t._s(t.amountPro(e.fee)))])], 1)], 1), i("v-uni-view", {
                    staticClass: "flex-col   list_items_ding"
                }, [i("v-uni-view", {
                    staticClass: "flex-row justify-between items-center"
                }, [i("v-uni-view", {
                    staticClass: "font_20 text_41"
                }, [t._v(t._s(t.$t("registraList_txt19")))]), i("v-uni-view", {
                    staticClass: "font_19"
                }, [t._v(t._s(0 == e.type ? t.$t("registraList_txt20") : t.$t("registraList_txt21")))])], 1), i("v-uni-view", {
                    staticClass: "flex-row justify-between items-center"
                }, [i("v-uni-view", {
                    staticClass: "font_20 text_41"
                }, [t._v(t._s(t.$t("registraList_txt22")))]), i("v-uni-view", {
                    staticClass: "font_19"
                }, [t._v(t._s(0 == e.status ? t.$t("registraList_txt23") : 1 == e.status ? t.$t("registraList_txt24") : t.$t("registraList_txt25")))])], 1)], 1)], 1)], 1)
            }
            )), t.registKong ? i("v-uni-view", {
                staticClass: "home_content"
            }, [i("v-uni-view", {
                staticClass: "nodata"
            }, [i("v-uni-image", {
                attrs: {
                    src: "/static/login/new_logo/kong.png",
                    mode: "widthFix"
                }
            }), i("v-uni-text", [t._v(t._s(t.$t("registraList_txt26")))])], 1)], 1) : t._e()], 2) : t._e()], 1) : t._e(), 0 == t.tranKind && 0 == t.transaPair.length ? i("v-uni-view", {}, [i("v-uni-view", {
                staticClass: "nodata"
            }, [i("v-uni-image", {
                attrs: {
                    src: "/static/login/new_logo/kong.png",
                    mode: "widthFix"
                }
            }), i("v-uni-text", [t._v(t._s(t.$t("registraList_txt37")))])], 1)], 1) : t._e(), 1 == t.tranKind ? i("v-uni-view", {}, [i("v-uni-view", {
                staticClass: "flex-col section_5555 space-y-10"
            }, [i("v-uni-text", {
                staticClass: "self-center text_3",
                staticStyle: {
                    "font-weight": "600",
                    color: "#1A1A1A",
                    "font-size": "31rpx"
                }
            }, [t._v(t._s(t.$t("registraList_txt27")) + "：" + t._s(t.amountPro(t.moneyZong.penalty)) + t._s(t.moneyZong.penalty_coin ? t.moneyZong.penalty_coin.toUpperCase() : ""))]), i("v-uni-view", {
                staticClass: "flex-row"
            }, [i("v-uni-view", {
                staticClass: "flex-col items-center space-y-20",
                staticStyle: {
                    flex: "1 1 219.5rpx",
                    padding: "32rpx 0"
                }
            }, [i("v-uni-text", {
                staticClass: "font_22222"
            }, [t._v(t._s(t.$t("registraList_txt28")))]), i("v-uni-text", {
                staticClass: "font_11111"
            }, [t._v(t._s(t.amountPro(t.moneyZong.balance)))])], 1), i("v-uni-view", {
                staticClass: "flex-col items-center space-y-20",
                staticStyle: {
                    flex: "1 1 219.5rpx",
                    padding: "32rpx 0"
                }
            }, [i("v-uni-text", {
                staticClass: "font_22222"
            }, [t._v(t._s(t.$t("registraList_txt29")))]), i("v-uni-text", {
                staticClass: "font_11111"
            }, [t._v(t._s(t.amountPro(t.moneyZong.carbon)))])], 1), i("v-uni-view", {
                staticClass: "flex-col ",
                staticStyle: {
                    flex: "1 1 219.5rpx",
                    padding: "32rpx 0"
                }
            }, [i("v-uni-text", {
                staticClass: "self-center font_22222"
            }, [t._v(t._s(t.$t("registraList_txt30")))]), i("v-uni-text", {
                staticClass: "self-center font_11111 text_4"
            }, [t._v(t._s(t.amountPro(t.moneyZong.dot)))])], 1)], 1), i("v-uni-view", {
                staticStyle: {
                    position: "absolute",
                    bottom: "21rpx",
                    right: "46rpx"
                }
            }, [i("v-uni-image", {
                staticStyle: {
                    width: "34rpx"
                },
                attrs: {
                    src: "/static/home/n_home/imagejsnf.png",
                    mode: "widthFix"
                }
            })], 1)], 1), i("v-uni-view", {
                staticClass: "flex-col line-tabs"
            }, [i("v-uni-view", {
                staticClass: "flex-col group_2"
            }, [i("v-uni-view", {
                staticClass: "flex-row justify-between items-center group_3"
            }, [i("v-uni-text", {
                class: 0 == t.registIndex ? "text_5" : "font_3 text_6",
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.selectRegist(0)
                    }
                }
            }, [t._v(t._s(t.$t("registraList_txt31")))]), i("v-uni-text", {
                class: 1 == t.registIndex ? "text_5" : "font_3 text_6",
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.selectRegist(1)
                    }
                }
            }, [t._v(t._s(t.$t("registraList_txt32")))]), i("v-uni-view", {
                staticClass: "section_6"
            })], 1), i("v-uni-view", {
                staticClass: "self-start section_7",
                class: 1 == t.registIndex ? "section_78" : ""
            })], 1), 0 == t.registIndex ? i("v-uni-view", {
                staticClass: "flex-row justify-between items-center bus_kind"
            }, [i("v-uni-view", {
                staticClass: "flex-row items-center"
            }, [i("v-uni-view", {
                staticClass: "btn",
                class: 0 == t.businessKind ? "select_btn" : "",
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.selectBusKind(0)
                    }
                }
            }, [t._v(t._s(t.$t("registraList_txt33")))]), i("v-uni-view", {
                staticClass: "btn",
                class: 1 == t.businessKind ? "select_btn" : "",
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.selectBusKind(1)
                    }
                }
            }, [t._v(t._s(t.$t("registraList_txt34")))])], 1), i("v-uni-image", {
                staticStyle: {
                    width: "48rpx"
                },
                attrs: {
                    src: "/static/home/n_home/add_dan.png",
                    mode: "widthFix"
                },
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.goAddregistra.apply(void 0, arguments)
                    }
                }
            })], 1) : t._e(), 0 == t.registIndex && 0 == t.businessKind ? i("v-uni-view", {
                staticClass: "flex-col"
            }, [t._l(t.checkList, (function(e, a) {
                return i("v-uni-view", {
                    key: a,
                    staticClass: "flex-col list-item space-y-30"
                }, [i("v-uni-view", {
                    staticClass: "flex-row justify-between"
                }, [i("v-uni-view", {
                    staticClass: "flex-row items-center space-x-22"
                }, [i("v-uni-image", {
                    staticClass: "shrink-0 image_3",
                    attrs: {
                        src: e.coin_pic
                    }
                }), i("v-uni-text", {
                    staticClass: "font_4 text_7"
                }, [t._v(t._s(e.coin ? e.coin.toUpperCase() : ""))])], 1)], 1), i("v-uni-view", {
                    staticClass: "flex-row justify-between items-center",
                    staticStyle: {
                        width: "100%"
                    }
                }, [i("v-uni-view", {
                    staticStyle: {
                        width: "65%"
                    }
                }, [i("v-uni-view", {
                    staticClass: "flex-row justify-start items-center",
                    staticStyle: {
                        "margin-bottom": "21rpx"
                    }
                }, [i("v-uni-view", {
                    staticClass: "font_3",
                    staticStyle: {
                        width: "25%"
                    }
                }, [t._v(t._s(t.$t("registraList_txt4")))]), i("v-uni-text", {
                    staticClass: "font_5 text_8"
                }, [t._v(t._s(t.amountPro(e.less_num)))])], 1), i("v-uni-view", {
                    staticClass: "flex-row justify-start items-center"
                }, [i("v-uni-view", {
                    staticClass: "font_3",
                    staticStyle: {
                        width: "25%"
                    }
                }, [t._v(t._s(t.$t("registraList_txt3")))]), i("v-uni-text", {
                    staticClass: "font_5 text_8"
                }, [t._v(t._s(t.amountPro(e.price)))])], 1)], 1), i("v-uni-view", {
                    staticClass: "flex-row justify-center items-center mai_left",
                    staticStyle: {
                        width: "35%"
                    },
                    on: {
                        click: function(i) {
                            arguments[0] = i = t.$handleEvent(i),
                            t.buyRegistra(e.id)
                        }
                    }
                }, [t._v(t._s(t.$t("registraList_txt35")))])], 1)], 1)
            }
            )), t.checkKong ? i("v-uni-view", {
                staticClass: "home_content"
            }, [t.checkList.length > 0 ? i("v-uni-view", {
                staticClass: "wan"
            }, [t._v(t._s(t.$t("registraList_txt36")))]) : i("v-uni-view", {
                staticClass: "nodata"
            }, [i("v-uni-image", {
                attrs: {
                    src: "/static/login/new_logo/kong.png",
                    mode: "widthFix"
                }
            }), i("v-uni-text", [t._v(t._s(t.$t("registraList_txt37")))])], 1)], 1) : t._e(), t.checkLoading ? i("BottomLoading") : t._e()], 2) : t._e(), 0 == t.registIndex && 1 == t.businessKind ? i("v-uni-view", {
                staticClass: "flex-col"
            }, [t._l(t.sellList, (function(e, a) {
                return i("v-uni-view", {
                    key: a,
                    staticClass: "flex-col list-item space-y-30"
                }, [i("v-uni-view", {
                    staticClass: "flex-row justify-between"
                }, [i("v-uni-view", {
                    staticClass: "flex-row items-center space-x-22"
                }, [i("v-uni-image", {
                    staticClass: "shrink-0 image_3",
                    attrs: {
                        src: e.coin_pic
                    }
                }), i("v-uni-text", {
                    staticClass: "font_4 text_7"
                }, [t._v(t._s(e.coin ? e.coin.toUpperCase() : ""))])], 1)], 1), i("v-uni-view", {
                    staticClass: "flex-row justify-between items-center",
                    staticStyle: {
                        width: "100%"
                    }
                }, [i("v-uni-view", {
                    staticStyle: {
                        width: "65%"
                    }
                }, [i("v-uni-view", {
                    staticClass: "flex-row justify-start items-center",
                    staticStyle: {
                        "margin-bottom": "21rpx"
                    }
                }, [i("v-uni-view", {
                    staticClass: "font_3",
                    staticStyle: {
                        width: "25%"
                    }
                }, [t._v(t._s(t.$t("registraList_txt4")))]), i("v-uni-text", {
                    staticClass: "font_5 text_8"
                }, [t._v(t._s(t.amountPro(e.less_num)))])], 1), i("v-uni-view", {
                    staticClass: "flex-row justify-start items-center"
                }, [i("v-uni-view", {
                    staticClass: "font_3",
                    staticStyle: {
                        width: "25%"
                    }
                }, [t._v(t._s(t.$t("registraList_txt3")))]), i("v-uni-text", {
                    staticClass: "font_5 text_8"
                }, [t._v(t._s(t.amountPro(e.price)))])], 1)], 1), i("v-uni-view", {
                    staticClass: "flex-row justify-center items-center mai_right",
                    staticStyle: {
                        width: "35%"
                    },
                    on: {
                        click: function(i) {
                            arguments[0] = i = t.$handleEvent(i),
                            t.goSellRegis(e.id)
                        }
                    }
                }, [t._v(t._s(t.$t("registraList_txt38")))])], 1)], 1)
            }
            )), t.sellKong ? i("v-uni-view", {
                staticClass: "home_content"
            }, [t.sellList.length > 0 ? i("v-uni-view", {
                staticClass: "wan"
            }, [t._v(t._s(t.$t("registraList_txt39")))]) : i("v-uni-view", {
                staticClass: "nodata"
            }, [i("v-uni-image", {
                attrs: {
                    src: "/static/login/new_logo/kong.png",
                    mode: "widthFix"
                }
            }), i("v-uni-text", [t._v(t._s(t.$t("registraList_txt40")))])], 1)], 1) : t._e(), t.sellLoading ? i("BottomLoading") : t._e()], 2) : t._e(), 1 == t.registIndex ? i("v-uni-view", {
                staticClass: "flex-row justify-between items-center bus_kind"
            }, [i("v-uni-view", {
                staticClass: "flex-row items-center"
            }, [i("v-uni-view", {
                staticClass: "btn",
                class: 0 == t.contSellKind ? "select_btn" : "",
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.selectContKind(0)
                    }
                }
            }, [t._v(t._s(t.$t("registraList_txt41")))]), i("v-uni-view", {
                staticClass: "btn",
                class: 1 == t.contSellKind ? "select_btn" : "",
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.selectContKind(1)
                    }
                }
            }, [t._v(t._s(t.$t("registraList_txt42")))])], 1)], 1) : t._e(), 1 == t.registIndex && 0 == t.contSellKind ? i("v-uni-view", {
                staticClass: "flex-col list space-y-29"
            }, [t._l(t.contCheckList, (function(e, a) {
                return i("v-uni-view", {
                    key: a,
                    staticClass: "flex-col list-item_ss space-y-38"
                }, [i("v-uni-view", {
                    staticClass: "flex-row justify-between items-center",
                    staticStyle: {
                        "padding-right": "25rpx"
                    }
                }, [i("v-uni-view", {
                    staticClass: "flex-row"
                }, [i("v-uni-image", {
                    staticClass: "image_3",
                    attrs: {
                        src: e.coin_pic
                    }
                }), i("v-uni-view", {
                    staticClass: "flex-col  space-y-18",
                    staticStyle: {
                        margin: "4rpx 0 4rpx 20rpx"
                    }
                }, [i("v-uni-text", {
                    staticClass: "self-start font_4 text_7"
                }, [t._v(t._s(e.consume_coin ? e.consume_coin.toUpperCase() : ""))]), i("v-uni-view", {
                    staticClass: "flex-row space-x-10"
                }, [i("v-uni-text", {
                    staticClass: "font_6"
                }, [t._v(t._s(t.timeformat(e.created_at)))])], 1)], 1)], 1), 0 == e.status ? i("v-uni-image", {
                    staticStyle: {
                        width: "96rpx"
                    },
                    attrs: {
                        src: "/static/home/n_home/he_ing.png",
                        mode: "widthFix"
                    }
                }) : i("v-uni-image", {
                    staticStyle: {
                        width: "96rpx"
                    },
                    attrs: {
                        src: "/static/home/n_home/he_end.png",
                        mode: "widthFix"
                    }
                })], 1), i("v-uni-view", {
                    staticClass: "flex-col space-y-28"
                }, [i("v-uni-view", {
                    staticClass: "flex-row justify-between items-center"
                }, [i("v-uni-text", {
                    staticClass: "font_3 text_9"
                }, [t._v(t._s(t.$t("registraList_txt3")) + "（" + t._s(e.consume_coin ? e.consume_coin.toUpperCase() : "") + "）")]), i("v-uni-text", {
                    staticClass: "font_5 text_10",
                    staticStyle: {
                        color: "#050A2F"
                    }
                }, [t._v(t._s(t.amountPro(e.price)))])], 1), i("v-uni-view", {
                    staticClass: "flex-row justify-between items-center"
                }, [i("v-uni-text", {
                    staticClass: "font_3"
                }, [t._v(t._s(t.$t("registraList_txt4")))]), i("v-uni-text", {
                    staticClass: "font_5 text_11",
                    staticStyle: {
                        color: "#050A2F"
                    }
                }, [t._v(t._s(t.amountPro(e.num)))])], 1), i("v-uni-text", {
                    staticClass: "self-end font_5 text_12",
                    staticStyle: {
                        color: "#00923F"
                    }
                }, [t._v(t._s(t.$t("registraList_txt43")) + ">")])], 1)], 1)
            }
            )), t.contCheckKong ? i("v-uni-view", {
                staticClass: "home_content"
            }, [t.contCheckList.length > 0 ? i("v-uni-view", {
                staticClass: "wan"
            }, [t._v(t._s(t.$t("registraList_txt44")))]) : i("v-uni-view", {
                staticClass: "nodata"
            }, [i("v-uni-image", {
                attrs: {
                    src: "/static/login/new_logo/kong.png",
                    mode: "widthFix"
                }
            }), i("v-uni-text", [t._v(t._s(t.$t("registraList_txt37")))])], 1)], 1) : t._e(), t.contCheckLoading ? i("BottomLoading") : t._e()], 2) : t._e(), 1 == t.registIndex && 1 == t.contSellKind ? i("v-uni-view", {
                staticClass: "flex-col list space-y-29"
            }, [t._l(t.contSellList, (function(e, a) {
                return i("v-uni-view", {
                    key: a,
                    staticClass: "flex-col list-item_ss space-y-38"
                }, [i("v-uni-view", {
                    staticClass: "flex-row justify-between items-center",
                    staticStyle: {
                        "padding-right": "25rpx"
                    }
                }, [i("v-uni-view", {
                    staticClass: "flex-row"
                }, [i("v-uni-image", {
                    staticClass: "image_3",
                    attrs: {
                        src: e.coin_pic
                    }
                }), i("v-uni-view", {
                    staticClass: "flex-col  space-y-18",
                    staticStyle: {
                        margin: "4rpx 0 4rpx 20rpx"
                    }
                }, [i("v-uni-text", {
                    staticClass: "self-start font_4 text_7"
                }, [t._v(t._s(e.consume_coin ? e.consume_coin.toUpperCase() : ""))]), i("v-uni-view", {
                    staticClass: "flex-row space-x-10"
                }, [i("v-uni-text", {
                    staticClass: "font_6"
                }, [t._v(t._s(t.timeformat(e.created_at)))])], 1)], 1)], 1), 0 == e.status ? i("v-uni-image", {
                    staticStyle: {
                        width: "96rpx"
                    },
                    attrs: {
                        src: "/static/home/n_home/he_ing.png",
                        mode: "widthFix"
                    }
                }) : i("v-uni-image", {
                    staticStyle: {
                        width: "96rpx"
                    },
                    attrs: {
                        src: "/static/home/n_home/he_end.png",
                        mode: "widthFix"
                    }
                })], 1), i("v-uni-view", {
                    staticClass: "flex-col space-y-28"
                }, [i("v-uni-view", {
                    staticClass: "flex-row justify-between items-center"
                }, [i("v-uni-text", {
                    staticClass: "font_3 text_9"
                }, [t._v(t._s(t.$t("registraList_txt3")) + "（" + t._s(e.consume_coin ? e.consume_coin.toUpperCase() : "") + "）")]), i("v-uni-text", {
                    staticClass: "font_5 text_10",
                    staticStyle: {
                        color: "#050A2F"
                    }
                }, [t._v(t._s(t.amountPro(e.price)))])], 1), i("v-uni-view", {
                    staticClass: "flex-row justify-between items-center"
                }, [i("v-uni-text", {
                    staticClass: "font_3"
                }, [t._v(t._s(t.$t("registraList_txt4")))]), i("v-uni-text", {
                    staticClass: "font_5 text_11",
                    staticStyle: {
                        color: "#050A2F"
                    }
                }, [t._v(t._s(t.amountPro(e.num)))])], 1), i("v-uni-text", {
                    staticClass: "self-end font_8 text_12",
                    staticStyle: {
                        color: "#00923F"
                    }
                }, [t._v(t._s(t.$t("registraList_txt43")) + ">")]), 0 == e.status ? i("v-uni-view", {
                    staticClass: "flex-row justify-center items-center mai_left",
                    staticStyle: {
                        width: "80%",
                        margin: "25rpx auto 0"
                    },
                    on: {
                        click: function(i) {
                            arguments[0] = i = t.$handleEvent(i),
                            t.confirmTransa(e.id)
                        }
                    }
                }, [t._v(t._s(t.$t("registraList_txt45")))]) : t._e()], 1)], 1)
            }
            )), t.contSellKong ? i("v-uni-view", {
                staticClass: "home_content"
            }, [t.contSellList.length > 0 ? i("v-uni-view", {
                staticClass: "wan"
            }, [t._v(t._s(t.$t("registraList_txt39")))]) : i("v-uni-view", {
                staticClass: "nodata"
            }, [i("v-uni-image", {
                attrs: {
                    src: "/static/login/new_logo/kong.png",
                    mode: "widthFix"
                }
            }), i("v-uni-text", [t._v(t._s(t.$t("registraList_txt37")))])], 1)], 1) : t._e(), t.contSellLoading ? i("BottomLoading") : t._e()], 2) : t._e()], 1)], 1) : t._e()], 1)], 1)], 1)], 1), i("u-popup", {
                attrs: {
                    mode: "left"
                },
                model: {
                    value: t.showSidebar,
                    callback: function(e) {
                        t.showSidebar = e
                    },
                    expression: "showSidebar"
                }
            }, [t.transaPair.length > 0 ? i("v-uni-view", {
                staticStyle: {
                    "padding-bottom": "100rpx"
                }
            }, [i("v-uni-view", {
                staticStyle: {
                    opacity: "0"
                }
            }, [t._v("151515151555555555555555555555555")]), i("v-uni-view", {
                staticClass: "popu_title"
            }, [t._v(t._s(t.$t("registraList_txt46")))]), t._l(t.transaPair, (function(e, a) {
                return i("v-uni-view", {
                    key: a,
                    staticClass: "flex-row justify-between items-center popu_list",
                    class: a == t.transaPairIndex ? "popu_listBg" : "",
                    on: {
                        click: function(e) {
                            arguments[0] = e = t.$handleEvent(e),
                            t.selectTransaPair(a)
                        }
                    }
                }, [i("v-uni-view", {
                    staticClass: "popu_list_one"
                }, [i("v-uni-text", [t._v(t._s(e.symbol ? e.symbol.slice(0, e.symbol.length - 1).toUpperCase() : ""))])], 1), i("v-uni-view", {
                    staticClass: "flex-col justify-end items-end popu_list_two"
                }, [1 == e.zhang ? i("v-uni-text", {
                    staticStyle: {
                        "font-size": "34rpx",
                        color: "#2EBD85"
                    }
                }, [t._v(t._s((parseInt(1e4 * e.new_price) / 1e4).toFixed(4)))]) : t._e(), 0 == e.zhang ? i("v-uni-text", {
                    staticStyle: {
                        "font-size": "34rpx",
                        color: "#FF7272"
                    }
                }, [t._v(t._s((parseInt(1e4 * e.new_price) / 1e4).toFixed(4)))]) : t._e(), 1 == e.zhang ? i("v-uni-text", {
                    staticStyle: {
                        "font-size": "22rpx",
                        color: "#2EBD85"
                    }
                }, [t._v("+" + t._s(e.ratio) + "%")]) : t._e(), 0 == e.zhang ? i("v-uni-text", {
                    staticStyle: {
                        "font-size": "22rpx",
                        color: "#FF7272"
                    }
                }, [t._v(t._s(e.ratio) + "%")]) : t._e()], 1)], 1)
            }
            ))], 2) : t._e()], 1), i("u-select", {
                attrs: {
                    mode: "single-column",
                    list: t.digitsList
                },
                on: {
                    confirm: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.confirmContry.apply(void 0, arguments)
                    },
                    cancel: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.showDigits = !1
                    }
                },
                model: {
                    value: t.showDigits,
                    callback: function(e) {
                        t.showDigits = e
                    },
                    expression: "showDigits"
                }
            }), i("u-popup", {
                attrs: {
                    mode: "center",
                    "border-radius": "30"
                },
                model: {
                    value: t.modalShow,
                    callback: function(e) {
                        t.modalShow = e
                    },
                    expression: "modalShow"
                }
            }, [i("v-uni-view", {
                staticClass: "uni-popup-dialog"
            }, [i("v-uni-view", {
                staticClass: "uni-dialog-content",
                staticStyle: {
                    "padding-bottom": "0"
                }
            }, [i("v-uni-text", {
                staticClass: "uni-dialog-title-text"
            }, [t._v(t._s(t.$t("widthdraw_txt11")))])], 1), i("v-uni-view", {
                staticClass: "uni-dialog-content"
            }, [i("v-uni-text", {
                staticClass: "uni-dialog-content-text",
                staticStyle: {
                    width: "100%"
                }
            }, [t._v(t._s(t.hintTxt) + "," + t._s(t.$t("buch_xtxt2")))])], 1), i("v-uni-view", {
                staticClass: "uni-dialog-button-group"
            }, [i("v-uni-view", {
                staticClass: "uni-dialog-button",
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.modalShow = !1
                    }
                }
            }, [i("v-uni-text", {
                staticClass: "uni-dialog-button-text"
            }, [t._v(t._s(t.$t("mine_txt33")))])], 1), i("v-uni-view", {
                staticClass: "uni-dialog-button uni-border-left",
                on: {
                    click: function(e) {
                        arguments[0] = e = t.$handleEvent(e),
                        t.goRecharge.apply(void 0, arguments)
                    }
                }
            }, [i("v-uni-text", {
                staticClass: "uni-dialog-button-text uni-button-color"
            }, [t._v(t._s(t.$t("buch_xtxt3")))])], 1)], 1)], 1)], 1), i("u-popup", {
                attrs: {
                    mode: "center",
                    "border-radius": "30"
                },
                model: {
                    value: t.buySuccess,
                    callback: function(e) {
                        t.buySuccess = e
                    },
                    expression: "buySuccess"
                }
            }, [i("v-uni-view", {
                staticClass: "uni-popup-dialog",
                staticStyle: {
                    padding: "20px",
                    width: "300px"
                }
            }, [i("v-uni-view", {
                staticClass: "uni-popup_image"
            }, [i("v-uni-image", {
                staticStyle: {
                    width: "93rpx"
                },
                attrs: {
                    src: "/static/home/n_home/buy_succ.png",
                    mode: "widthFix"
                }
            })], 1), i("v-uni-view", {
                staticClass: "succ_title"
            }, [t._v(t._s(t.$t("gou_tantxt1")))]), i("v-uni-view", {
                staticClass: "succ_de shenglv_txt"
            }, [t._v(t._s(t.gradeRate.vipPrice)), i("v-uni-text", [t._v("USD")])], 1), t.getLevelPrice.length > 0 ? i("v-uni-view", {
                staticStyle: {
                    "margin-top": "25rpx",
                    "border-top": "1px solid #E4E4E4"
                }
            }, [i("v-uni-view", {
                staticClass: "flex-row justify-between items-center",
                staticStyle: {
                    margin: "25rpx 0"
                }
            }, [i("v-uni-view", {
                staticClass: "flex-row justify-start items-center level_title"
            }, [i("v-uni-image", {
                attrs: {
                    src: "/static/home/n_home/logo.png",
                    mode: "widthFix"
                }
            }), i("v-uni-text", [t._v(t._s(t.$t("buch_xtxt1")) + "(USD)")])], 1), i("v-uni-view", {
                staticClass: "level_num shenglv_txt"
            }, [i("v-uni-text", {
                staticStyle: {
                    "font-size": "20rpx",
                    color: "#2B88FF",
                    "font-weight": "500"
                }
            }, [t._v(t._s(t.$t("deng_tjdub1")) + ":")]), t._v(t._s(Number(t.levelOne.vipPrice).toFixed(2)))], 1)], 1), i("v-uni-view", {
                staticClass: "flex-col level_form"
            }, [i("v-uni-view", {
                staticClass: "flex-row justify-between items-center level_form_child"
            }, [i("v-uni-view", {
                staticStyle: {
                    color: "#2B88FF"
                }
            }, [t._v(t._s(t.$t("mine_txt1")))]), i("v-uni-view", {}, [t._v(t._s(t.$t("deng_tjdub2")))]), i("v-uni-view", {}, [t._v(t._s(t.$t("deng_tjdub3")))]), i("v-uni-view", {}, [t._v(t._s(t.$t("deng_tjdub4")))])], 1), t._l(t.getLevelPrice, (function(e, a) {
                return i("v-uni-view", {
                    key: a,
                    staticClass: "flex-row justify-between items-center level_form_child level_form_conten"
                }, [i("v-uni-view", {
                    staticClass: "flex-row justify-center items-center"
                }, [0 == a ? i("v-uni-image", {
                    staticStyle: {
                        width: "35rpx"
                    },
                    attrs: {
                        src: "/static/mine/n_mine/ge.png",
                        mode: "widthFix"
                    }
                }) : t._e(), 1 == a ? i("v-uni-image", {
                    staticStyle: {
                        width: "35rpx"
                    },
                    attrs: {
                        src: "/static/mine/n_mine/qi.png",
                        mode: "widthFix"
                    }
                }) : t._e(), 2 == a ? i("v-uni-image", {
                    staticStyle: {
                        width: "35rpx"
                    },
                    attrs: {
                        src: "/static/mine/n_mine/jiren.png",
                        mode: "widthFix"
                    }
                }) : t._e()], 1), t._l(e, (function(e, a) {
                    return i("v-uni-view", {
                        key: a,
                        staticClass: "shenglv_txt"
                    }, [t._v(t._s(Number(e.vipPrice).toFixed(2)))])
                }
                ))], 2)
            }
            ))], 2)], 1) : t._e()], 1)], 1), i("u-popup", {
                attrs: {
                    "mask-close-able": !1,
                    mode: "center",
                    "border-radius": "50"
                },
                model: {
                    value: t.showBuyLiading,
                    callback: function(e) {
                        t.showBuyLiading = e
                    },
                    expression: "showBuyLiading"
                }
            }, [i("v-uni-view", {
                staticClass: "flex-col justify-end items-center",
                staticStyle: {
                    width: "250px",
                    height: "50px",
                    overflow: "hidden",
                    "padding-bottom": "3px"
                }
            }, [i("v-uni-image", {
                staticStyle: {
                    width: "85%"
                },
                attrs: {
                    src: t.gifUrl,
                    mode: "widthFix"
                }
            }), 1 == t.loadingKind ? i("v-uni-text", {
                staticStyle: {
                    "font-size": "12px",
                    color: "#2B88FF"
                }
            }, [t._v(t._s(t.$t("jsidnlsij1")))]) : i("v-uni-text", {
                staticStyle: {
                    "font-size": "12px",
                    color: "#2B88FF"
                }
            }, [t._v(t._s(t.$t("jsidnlsij2")))])], 1)], 1)], 1)
        }
          , n = []
    },
    "12c2": function(t, e, i) {
        "use strict";
        i("7a82"),
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.default = void 0,
        i("d401"),
        i("d3b7"),
        i("25f0"),
        i("c975"),
        i("acd8"),
        i("a9e3");
        var a = function(t) {
            var e;
            if (t) {
                var i = t.toString();
                e = i.indexOf(".") ? 2 == i.split(".").length ? parseFloat(Number(t).toFixed(4)) : parseFloat(t) : t
            } else
                e = 0 == t ? parseFloat(t) : "0";
            return e
        };
        e.default = a
    },
    "4d81": function(t, e, i) {
        var a = i("90e7");
        a.__esModule && (a = a.default),
        "string" === typeof a && (a = [[t.i, a, ""]]),
        a.locals && (t.exports = a.locals);
        var s = i("4f06").default;
        s("75882096", a, !0, {
            sourceMap: !1,
            shadowMode: !1
        })
    },
    "63b8": function(t, e, i) {
        "use strict";
        i.r(e);
        var a = i("1094")
          , s = i("c207");
        for (var n in s)
            ["default"].indexOf(n) < 0 && function(t) {
                i.d(e, t, (function() {
                    return s[t]
                }
                ))
            }(n);
        i("e358");
        var c = i("f0c5")
          , o = Object(c["a"])(s["default"], a["b"], a["c"], !1, null, "69fce8e8", null, !1, a["a"], void 0);
        e["default"] = o.exports
    },
    "90e7": function(t, e, i) {
        var a = i("24fb");
        e = a(!1),
        e.push([t.i, ".nav_big[data-v-69fce8e8]{\r\n\r\n\r\nheight:%?120?%\n}.nav[data-v-69fce8e8]{width:100%;\r\n\r\n\r\nheight:%?120?%;\r\nposition:fixed;top:0;\r\n\t\t/* left: 0; */box-sizing:border-box;display:flex;align-items:center;background-color:#fff;\r\n\t\t/* box-shadow: 0px 21.76rpx 29rpx #00923f33; */z-index:99;font-size:%?28?%;color:#fff;overflow:hidden}.nav_right[data-v-69fce8e8]{width:25%;padding:0 %?45?% 0 0;box-sizing:border-box;text-align:right}.nav_left[data-v-69fce8e8]{width:25%;text-align:left;padding:0 0 0 %?45?%;font-size:%?40?%;box-sizing:border-box;font-weight:bolder;display:flex;align-items:center;justify-content:flex-start}.nav_title[data-v-69fce8e8]{width:50%;text-align:center;\r\n\t\t/* font-weight: 600; */padding:0 0;font-size:%?36?%;color:#000}.bottom_loading[data-v-69fce8e8]{margin:0 auto;display:flex;justify-content:center;align-items:center;padding:%?20?% 0}.bottom_loading>uni-text[data-v-69fce8e8]{font-size:%?24?%;color:#666;margin-left:%?10?%}.nodata[data-v-69fce8e8]{width:100%;text-align:center;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:%?100?% 0;box-sizing:border-box}.nodata>uni-image[data-v-69fce8e8]{width:%?300?%}.nodata>uni-text[data-v-69fce8e8]{font-size:%?25?%;color:#a6a6a6;margin-top:%?-15?%}.wan[data-v-69fce8e8]{margin:%?41?% auto;text-align:center;font-size:%?23?%;color:#ccc}.uni-popup-dialog[data-v-69fce8e8]{width:300px;border-radius:11px;background-color:#fff}.uni-dialog-title[data-v-69fce8e8]{\r\ndisplay:flex;\r\nflex-direction:row;justify-content:center;padding-top:25px}.uni-dialog-title-text[data-v-69fce8e8]{font-size:16px;font-weight:500}.uni-dialog-content[data-v-69fce8e8]{\r\ndisplay:flex;\r\nflex-direction:row;justify-content:center;align-items:center;padding:20px;box-sizing:border-box}.uni-dialog-content-text[data-v-69fce8e8]{\r\n\t\t/* width: 100%; */font-size:14px;color:#6c6c6c;word-wrap:break-word;text-align:center}.uni-dialog-button-group[data-v-69fce8e8]{\r\ndisplay:flex;\r\nflex-direction:row;border-top-color:#f5f5f5;border-top-style:solid;border-top-width:1px}.uni-dialog-button[data-v-69fce8e8]{\r\ndisplay:flex;\r\nflex:1;flex-direction:row;justify-content:center;align-items:center;height:45px}.uni-border-left[data-v-69fce8e8]{border-left-color:#f0f0f0;border-left-style:solid;border-left-width:1px}.uni-dialog-button-text[data-v-69fce8e8]{font-size:16px;color:#333}.uni-button-color[data-v-69fce8e8]{color:#2b88ff}.uni-dialog-input[data-v-69fce8e8]{flex:1;font-size:14px;border:1px #eee solid;height:40px;padding:0 10px;border-radius:5px;color:#555}.button_bbbt[data-v-69fce8e8]{margin:%?0?% %?44?% %?35?% %?47?%;padding:%?25?% 0 %?25?%;background-image:url(/static/home/n_home/mai_btnbg.png);background-size:100% 100%;background-repeat:no-repeat;font-size:%?35?%;color:#fff}.button_m[data-v-69fce8e8]{background-image:url(/static/home/n_home/green_btn.png)}.popu_hint[data-v-69fce8e8]{padding-top:%?8?%;margin-left:%?8?%;padding-bottom:0;font-size:%?22?%!important;color:#9d9d9d;justify-content:space-between}.button_bbbt>uni-text[data-v-69fce8e8]{color:#fff;font-size:%?28?%}.forget_pass[data-v-69fce8e8]{margin-top:%?11?%;margin-left:%?27?%;font-size:%?25?%;font-weight:500;color:#2b88ff;border-bottom:1px solid #2b88ff}.downTime[data-v-69fce8e8]{color:#767676;border-bottom:none}.charts-box[data-v-69fce8e8]{width:100%;height:100px;margin:%?0?% auto 0\r\n\t/* margin-top:-100rpx; */}uni-page-body[data-v-69fce8e8]{background-color:#fff}body.?%PAGE?%[data-v-69fce8e8]{background-color:#fff}.nav_left[data-v-69fce8e8],.nav_right[data-v-69fce8e8]{width:4%;height:100%;padding:0}.nav_title[data-v-69fce8e8]{width:92%;height:80%;font-size:%?28?%;color:#777;background-color:#f0f3f5;border-radius:11px;\r\n\t/* padding: 3rpx; */box-sizing:border-box}.nav_title>uni-view[data-v-69fce8e8]{width:50%;height:100%;border:2px solid #f0f3f5;border-radius:11px}.nav_title_selet[data-v-69fce8e8]{font-size:%?28?%;color:#000;background-color:#fff;border-radius:11px;border:2px solid #d8d8d8!important\r\n\t/* text-shadow: 0px 4px 10px rgba(0,0,0,0.302); */}.nav_title uni-image[data-v-69fce8e8]{opacity:0}.nav_title_selet>uni-image[data-v-69fce8e8]{opacity:1}.nav[data-v-69fce8e8]{background-color:#fff;\r\npadding-top:%?30?%\n}.level_title>uni-image[data-v-69fce8e8]{width:%?35?%;margin-right:%?20?%}.level_title>uni-text[data-v-69fce8e8]{font-size:%?24?%;color:#000}.level_form[data-v-69fce8e8]{width:100%;\r\n\t/* padding: 20rpx; */box-sizing:border-box}.level_form_child>uni-view[data-v-69fce8e8]{width:25%;text-align:center;margin-bottom:%?12?%;font-size:%?20?%}.level_form_conten>uni-view[data-v-69fce8e8]{font-size:%?20?%;color:#dd4b4b}.uni-popup_image[data-v-69fce8e8]{width:100%;text-align:center}.vip_price[data-v-69fce8e8]{margin:%?15?% 0 %?9?%;border-top:%?1?% solid #d8d8d8}.level_xon[data-v-69fce8e8]{width:auto;background-color:#f5fcfb;border-radius:15px;padding:%?5?% %?35?%;box-sizing:border-box;margin-bottom:%?15?%;margin:0 %?5?% %?15?%}.level_name[data-v-69fce8e8]{font-size:%?20?%;color:#00923f}.level_ge[data-v-69fce8e8]{background-color:#c9cfce;width:%?2?%;height:%?15?%;margin:0 %?10?%}.level_num[data-v-69fce8e8]{font-size:%?24?%;color:#dd4b4b;width:45%;text-align:right}.level_num>uni-text[data-v-69fce8e8]{font-weight:600}.succ_title[data-v-69fce8e8]{width:100%;font-size:%?32?%;color:#050a2f;text-align:center;margin:%?7?% 0 %?15?%}.succ_de[data-v-69fce8e8]{text-align:center;font-size:%?60?%;color:#2b88ff;font-weight:800}.shenglv_txt[data-v-69fce8e8]{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.succ_de>uni-text[data-v-69fce8e8]{font-size:%?40?%;font-weight:500;margin-left:%?20?%}.vip_price_title[data-v-69fce8e8]{font-size:%?26?%;color:#3d3d3d;font-weight:700}.popu_title[data-v-69fce8e8]{width:100%;padding:%?119?% %?40?% %?50?%;box-sizing:border-box;font-size:%?46?%;color:#050a2f}.popu_list[data-v-69fce8e8]{width:100%;padding:%?20?% %?40?%;box-sizing:border-box}.popu_listBg[data-v-69fce8e8]{background:#f7f7f8}.popu_list_one[data-v-69fce8e8]{font-size:%?34?%;font-weight:500;color:#050a2f}.popu_list_two[data-v-69fce8e8]{font-weight:500;color:#f5465d}.page[data-v-69fce8e8]{background-color:#fff;width:100%}.space-y-10>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-y-10>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-y-10>uni-image[data-v-69fce8e8]:not(:first-child){margin-top:%?10?%}.section[data-v-69fce8e8]{\r\n\t/* padding-bottom: 142rpx; */}.group_3[data-v-69fce8e8]{padding-top:%?8?%}.section_3[data-v-69fce8e8]{\r\n\t/* margin-top: 208rpx; */background-color:#fff\r\n\t/* height: 638rpx; */}.section_5[data-v-69fce8e8]{width:92%;margin:%?15?% auto %?23?%\r\n\t/* padding: 28rpx 26rpx 23rpx 48rpx; */}.space-x-38>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-x-38>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-x-38>uni-image[data-v-69fce8e8]:not(:first-child){margin-left:%?38?%}.text_3[data-v-69fce8e8]{color:#00923f;font-size:%?40?%;font-weight:600}.font_2[data-v-69fce8e8]{font-size:%?27?%;line-height:%?18.5?%;color:#1a1a1a}.text_4[data-v-69fce8e8]{color:#00923f}.group_4[data-v-69fce8e8]{\r\n\t/* margin-right: 18rpx; */}.space-x-20>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-x-20>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-x-20>uni-image[data-v-69fce8e8]:not(:first-child){margin-left:%?20?%}.image_2[data-v-69fce8e8]{width:%?43?%;height:%?43?%}.group_5[data-v-69fce8e8]{margin-top:%?14?%}.space-x-12>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-x-12>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-x-12>uni-image[data-v-69fce8e8]:not(:first-child){margin-left:%?12?%}.image_4[data-v-69fce8e8]{width:%?21.5?%;height:%?25.5?%}.font_1[data-v-69fce8e8]{font-size:%?34?%;\r\n\t/* line-height: 22.5rpx; */color:#777\r\n\t/* font-weight: 600; */}.text_5[data-v-69fce8e8]{color:#767676;line-height:%?20?%}.group_6[data-v-69fce8e8]{margin-right:%?4?%}.space-x-34>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-x-34>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-x-34>uni-image[data-v-69fce8e8]:not(:first-child){margin-left:%?34?%}.text-wrapper_2[data-v-69fce8e8]{\r\n\t/* padding: 20rpx 0; */background-color:#f0f3f5;border-radius:%?12?%;width:%?244?%;height:%?54?%}.font_3[data-v-69fce8e8]{font-size:%?22?%;line-height:%?18.5?%;color:#767676}.text_6[data-v-69fce8e8]{margin-left:%?22?%;color:#767676;line-height:%?14.5?%}.image_3[data-v-69fce8e8]{width:%?32?%;height:%?32?%}.group_7[data-v-69fce8e8]{margin-top:%?20?%}.font_144[data-v-69fce8e8]{font-size:%?20?%;\r\n\t/* line-height: 16.5rpx; */color:#a7afb7;text-align:right}.space-x-26>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-x-26>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-x-26>uni-image[data-v-69fce8e8]:not(:first-child){margin-left:%?26?%}.font_1555[data-v-69fce8e8]{font-size:%?20?%;\r\n\t/* line-height: 17rpx; */color:#a7afb7}.group_8[data-v-69fce8e8]{margin-top:%?15?%\r\n\t/* height: 310rpx;\r\n\toverflow-y: scroll;\r\n\toverscroll-behavior: auto none; */}.mai_bg2[data-v-69fce8e8]{background:#fdf1f1;height:100%;float:right}.maizhan_1[data-v-69fce8e8]{background:#edfcf3;height:%?310?%}.maizhan_2[data-v-69fce8e8]{background:#fff2f2;height:%?310?%}.space-y-22>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-y-22>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-y-22>uni-image[data-v-69fce8e8]:not(:first-child){margin-top:%?22?%}.font_6[data-v-69fce8e8]{font-size:%?20?%;line-height:%?10.5?%;color:#1b232a}.group_9[data-v-69fce8e8]{padding-left:%?6?%}.font_7[data-v-69fce8e8]{font-size:%?14?%;color:#2ebd85}.text_7[data-v-69fce8e8]{margin-top:%?4?%}.text_8[data-v-69fce8e8]{margin-left:%?34?%;margin-top:%?4?%}.text-wrapper_3[data-v-69fce8e8]{padding:%?4?% 0 %?20?%;background-color:rgba(0,146,63,.10196078431372549);width:%?195.5?%;height:%?32.5?%}.text_10[data-v-69fce8e8]{margin-left:%?6?%}.text_11[data-v-69fce8e8]{margin-top:%?4?%}.group_10[data-v-69fce8e8]{margin-right:%?14?%}.group_11[data-v-69fce8e8]{padding-left:%?10?%}.space-x-36>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-x-36>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-x-36>uni-image[data-v-69fce8e8]:not(:first-child){margin-left:%?36?%}.font_8[data-v-69fce8e8]{font-size:%?14?%;color:#ff7272}.text_9[data-v-69fce8e8]{margin-top:%?4?%}.text-wrapper_4[data-v-69fce8e8]{padding:%?4?% 0 %?20?%;background-color:rgba(221,75,75,.10196078431372549);width:%?195.5?%}.text_12[data-v-69fce8e8]{margin-left:%?10?%}.text-wrapper_5[data-v-69fce8e8]{padding:%?4?% 0 %?20?%;background-color:rgba(0,146,63,.10196078431372549);width:%?189?%}.text_13[data-v-69fce8e8]{margin-top:%?4?%}.text_14[data-v-69fce8e8]{margin-top:%?4?%}.text_15[data-v-69fce8e8]{margin-left:%?34?%;margin-top:%?4?%}.text_17[data-v-69fce8e8]{margin-top:%?4?%}.section_10[data-v-69fce8e8]{margin-left:%?46?%;background-color:rgba(0,146,63,.10196078431372549);width:%?98?%;height:%?32.5?%}.text_18[data-v-69fce8e8]{margin-left:%?34?%;margin-top:%?4?%}.group_12[data-v-69fce8e8]{margin-right:%?14?%}.text-wrapper_6[data-v-69fce8e8]{padding:%?4?% 0 %?20?%;background-color:rgba(221,75,75,.10196078431372549);width:%?185?%}.text_16[data-v-69fce8e8]{margin-top:%?4?%}.section_9[data-v-69fce8e8]{background-color:rgba(221,75,75,.10196078431372549);width:%?141.5?%;height:%?32.5?%}.text_19[data-v-69fce8e8]{margin-top:%?4?%}.section_11[data-v-69fce8e8]{background-color:rgba(221,75,75,.10196078431372549);width:%?98?%;height:%?32.5?%}.group_13[data-v-69fce8e8]{margin-top:%?4?%}.space-x-76>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-x-76>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-x-76>uni-image[data-v-69fce8e8]:not(:first-child){margin-left:%?76?%}.space-x-70>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-x-70>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-x-70>uni-image[data-v-69fce8e8]:not(:first-child){margin-left:%?70?%}.section_12[data-v-69fce8e8]{background-color:rgba(0,146,63,.10196078431372549);width:%?50.5?%;height:%?32.5?%}.text_20[data-v-69fce8e8]{margin-top:%?6?%}.text_21[data-v-69fce8e8]{margin-top:%?6?%}.section_13[data-v-69fce8e8]{margin-right:%?14?%;background-color:rgba(221,75,75,.10196078431372549);width:%?50.5?%;height:%?32.5?%}.section_2[data-v-69fce8e8]{width:100%;z-index:9;background-color:#00923f;height:%?180?%;position:fixed;top:0;left:0}.section_4[data-v-69fce8e8]{width:92%;padding:%?8?%;background-color:#f0f3f5;border-radius:%?21.5?%;margin:0 auto 0}.text-wrapper[data-v-69fce8e8]{width:50%;padding:%?22?% 0;border-radius:%?21.5?%;height:%?69?%}.text-wrapper_color[data-v-69fce8e8]{background-color:#00923f;color:#fff}.text-wrapper_color>uni-text[data-v-69fce8e8]{color:#fff}.text-wrapper_color_txt[data-v-69fce8e8]{width:50%;background-image:url(/static/home/n_home/bug_xse.png);background-size:100% 100%;color:#fff}.text-wrapper_color_txt>uni-text[data-v-69fce8e8]{color:#fff}.text-wrapper_color_bor[data-v-69fce8e8]{width:50%;background-image:url(/static/home/n_home/bug_judh.png);background-size:100% 100%;color:#fff}.text-wrapper_color_bor>uni-text[data-v-69fce8e8]{color:#fff}.text[data-v-69fce8e8]{color:#fff;line-height:%?23.5?%}.text_2[data-v-69fce8e8]{margin-right:%?108?%;line-height:%?23.5?%}.image[data-v-69fce8e8]{width:%?750?%;height:%?88?%}.pos[data-v-69fce8e8]{position:absolute;left:0;right:0;top:0}.group_14[data-v-69fce8e8]{margin-top:%?-10?%;padding:%?46?% 0 %?84?%}.image_6[data-v-69fce8e8]{margin-right:%?122?%;width:%?16?%;height:%?9?%}.group_15[data-v-69fce8e8]{padding:%?2?% %?4?% 0 %?18?%;overflow:hidden;height:%?139?%}.pos_4[data-v-69fce8e8]{position:absolute;left:%?46?%;right:%?39?%;top:0}.group_16[data-v-69fce8e8]{width:%?126?%}.space-y-32>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-y-32>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-y-32>uni-image[data-v-69fce8e8]:not(:first-child){margin-top:%?32?%}.font_9[data-v-69fce8e8]{font-size:%?12?%;line-height:%?7?%;color:#5c6078}.text_22[data-v-69fce8e8]{margin-right:%?6?%}.group_17[data-v-69fce8e8]{padding-bottom:%?8?%}.text_23[data-v-69fce8e8]{margin-right:%?6?%}.section_14[data-v-69fce8e8]{margin-top:%?10?%;background-image:repeating-linear-gradient(90deg,#ffaa5a,#ffaa5a 4.08%,transparent 0,transparent 6.801%);background-position:%?-1.5?% 0;width:%?72.5?%;height:%?1?%}.text-wrapper_7[data-v-69fce8e8]{padding:%?4?% 0;background-color:#ffddbd;border-radius:%?5?%}.pos_5[data-v-69fce8e8]{position:absolute;right:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.text_24[data-v-69fce8e8]{margin:0 %?6?%;color:#050a2f}.text_25[data-v-69fce8e8]{margin-right:%?4?%;margin-top:%?14?%}.text_26[data-v-69fce8e8]{margin-right:%?6?%;margin-top:%?32?%}.equal-division[data-v-69fce8e8]{margin-top:%?26?%}.equal-division-item[data-v-69fce8e8]{padding:%?28?% 0 %?32?%;flex:1 1 %?375?%;background-color:#f0f3f5;height:%?87?%;border:2px solid #f0f3f5}.equal-division-item_s[data-v-69fce8e8]{border:2px solid #00923f;background-color:#fff;color:#00923f}.equal-division-item_m[data-v-69fce8e8]{border:2px solid #dd4b4b;background-color:#fff;color:#fff}.text_27[data-v-69fce8e8]{color:#171d22;font-size:%?16?%;line-height:%?17?%;text-align:center;width:%?13?%}.pos_6[data-v-69fce8e8]{position:absolute;left:%?97.5?%;top:%?18.5?%}.font_10[data-v-69fce8e8]{font-size:%?32?%;line-height:%?26.5?%}.font_101[data-v-69fce8e8]{color:#00923f}.font_102[data-v-69fce8e8]{color:#dd4b4b}.text_29[data-v-69fce8e8]{color:#fff;line-height:%?27.5?%}.group_18[data-v-69fce8e8]{width:92%;margin:%?26?% auto}.space-y-14>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-y-14>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-y-14>uni-image[data-v-69fce8e8]:not(:first-child){margin-top:%?14?%}.section_15[data-v-69fce8e8]{width:100%;height:%?90?%;padding:0 %?8?% 0 %?28?%;background-color:#f0f3f5;border-radius:%?21.5?%}.section_15 uni-input[data-v-69fce8e8]{width:80%;height:%?100?%;margin-left:%?25?%;font-size:%?28?%;color:#333}.inpu_ti[data-v-69fce8e8]{font-size:%?24?%;\r\n\t/* color: #333; */font-weight:400}.font_11[data-v-69fce8e8]{font-size:%?26?%;color:#767676}.text_30[data-v-69fce8e8]{margin-left:%?172?%}.space-x-40>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-x-40>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-x-40>uni-image[data-v-69fce8e8]:not(:first-child){margin-left:%?40?%}.image_8[data-v-69fce8e8]{width:%?21.5?%;height:%?21.5?%}.image_7[data-v-69fce8e8]{border-radius:0 %?21.5?% %?21.5?% 0;width:%?83.5?%;height:%?83.5?%}.section_16[data-v-69fce8e8]{\r\n\t/* padding-bottom: 28rpx;\r\n\tbackground-color: #f0f3f5; */border-radius:%?21.5?%}.space-y-24>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-y-24>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-y-24>uni-image[data-v-69fce8e8]:not(:first-child){margin-top:%?24?%}.group_20[data-v-69fce8e8]{padding:%?6?% %?30?%\r\n\t/* border-bottom: solid 1rpx #7676761a; */}.text_31[data-v-69fce8e8]{line-height:%?22?%}.text_32[data-v-69fce8e8]{margin-left:%?156?%}.group_21[data-v-69fce8e8]{margin-left:%?114?%}.space-x-42>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-x-42>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-x-42>uni-image[data-v-69fce8e8]:not(:first-child){margin-left:%?42?%}.image_9[data-v-69fce8e8]{border-radius:%?21.5?% 0 0 %?21.5?%;width:%?83.5?%;height:%?83.5?%}.section_17[data-v-69fce8e8]{background-color:#3e474f;width:%?16?%;height:%?3?%}.group_22[data-v-69fce8e8]{width:100%;padding:%?6?% %?30?% %?8?%;box-sizing:border-box}.divider[data-v-69fce8e8]{\r\n\t/* margin: 0 28rpx; */background-color:#dd4b4b}.divider_m[data-v-69fce8e8]{width:100%;height:%?1?%;background-color:#00923f;position:relative}.section_19[data-v-69fce8e8]{background-color:#252e35;width:%?219?%;height:%?1?%}.section_18[data-v-69fce8e8]{background-color:#252e35;border-radius:50%;width:%?18?%;height:%?18?%}.pos_7[data-v-69fce8e8]{position:absolute;\r\n\t/* left: 243rpx; */\r\n\t/* right: 406rpx; */top:%?-9?%}.group_23[data-v-69fce8e8]{margin-bottom:%?10?%\r\n\t/* padding-left: 45rpx;\r\n\tpadding-right: 45rpx; */}.group_23>uni-view[data-v-69fce8e8]{width:23%;text-align:center}.mai_jindu[data-v-69fce8e8]{width:100%;height:%?20?%;background:#f0f3f5;border-radius:5px;margin-bottom:%?15?%;margin-top:%?8?%}.mai_jindu_buy[data-v-69fce8e8]{background:#2ebd85}.mai_jindu_sell[data-v-69fce8e8]{background:#ff7272}.font_12[data-v-69fce8e8]{font-size:%?23?%;line-height:%?16?%;color:#777}.text-wrapper_8[data-v-69fce8e8]{display:flex;justify-content:center;align-items:center}.text-wrapper_8_mai[data-v-69fce8e8]{background-color:#dd4b4b;border-radius:50%}.text_33[data-v-69fce8e8]{font-weight:600;color:#00923f}.text_333[data-v-69fce8e8]{font-weight:600;color:#dd4b4b}.group_24[data-v-69fce8e8]{margin-top:%?15?%!important;margin-bottom:%?15?%;padding:0 %?15?%}.space-x-18-reverse>uni-view[data-v-69fce8e8]:not(:last-child),\r\n.space-x-18-reverse>uni-text[data-v-69fce8e8]:not(:last-child),\r\n.space-x-18-reverse>uni-image[data-v-69fce8e8]:not(:last-child){margin-right:%?18?%}.text_34[data-v-69fce8e8]{margin-bottom:%?5?%;font-size:%?20?%}.font_13[data-v-69fce8e8]{font-size:%?26?%;\r\n\t/* line-height: 18.5rpx; */color:#a8aab6}.text_35[data-v-69fce8e8]{color:#000\r\n\t/* line-height: 17.5rpx; */}.button[data-v-69fce8e8]{margin:0 0 0 0!important;padding:%?28?% 0 %?30?%;background-image:url(/static/home/n_home/mai_btnbg.png);background-size:100% 100%;background-repeat:no-repeat}.button_m[data-v-69fce8e8]{background-image:url(/static/home/n_home/green_btn2.png)}.font_14[data-v-69fce8e8]{font-size:%?34?%;line-height:%?31?%}.text_36[data-v-69fce8e8]{color:#fff;line-height:%?29.5?%}.group_25[data-v-69fce8e8]{width:92%;margin:%?50?% auto 0;padding-bottom:%?25?%;border-bottom:1px solid #e4e4e4}.group_26[data-v-69fce8e8]{line-height:%?31?%;height:%?31?%}.text_37[data-v-69fce8e8]{color:#1b232a;font-size:%?34?%}.text_38[data-v-69fce8e8]{color:#767676;font-size:%?34?%;line-height:%?30.5?%}.image_10[data-v-69fce8e8]{width:%?30?%;height:%?35?%}.group_27[data-v-69fce8e8]{padding-bottom:%?20?%}.list-item[data-v-69fce8e8]:first-of-type{border-bottom:solid %?1?% #f2f3f4}.group_28[data-v-69fce8e8]{\r\n\t/* padding: 0 30rpx; */}.divider_2[data-v-69fce8e8]{margin-left:%?6?%;margin-right:%?20?%;background-color:hsla(0,0%,46.3%,.2);height:%?1?%}.group_29[data-v-69fce8e8]{padding-top:%?28?%}.image_11[data-v-69fce8e8]{width:%?68?%;height:%?68?%}.group_30[data-v-69fce8e8]{margin:%?4?% 0 %?4?% %?0?%}.font_15[data-v-69fce8e8]{font-size:%?34?%;line-height:%?22.5?%;color:#050a2f}.text_39[data-v-69fce8e8]{line-height:%?23.5?%}.font_17[data-v-69fce8e8]{font-size:%?26?%;line-height:%?18.5?%;color:#5c6078}.text_40[data-v-69fce8e8]{line-height:%?17.5?%}.text-wrapper_9[data-v-69fce8e8]{padding:%?22?% 0 %?18?%;background-color:#f0f3f5;border-radius:%?16?%;width:%?191?%;height:%?68?%}.font_16[data-v-69fce8e8]{font-size:%?30?%;line-height:%?26.5?%;color:#050a2f}.space-x-174>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-x-174>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-x-174>uni-image[data-v-69fce8e8]:not(:first-child){margin-left:%?174?%}.font_18[data-v-69fce8e8]{font-size:%?26?%;color:#a8aab6}.text_41[data-v-69fce8e8]{margin-bottom:%?10?%}.list_items_ding[data-v-69fce8e8]{width:100%}.list_items_ding>uni-view[data-v-69fce8e8]{margin-bottom:%?8?%}.group_31[data-v-69fce8e8]{margin-top:%?20?%;padding-left:%?30?%;padding-right:%?26?%}.font_19[data-v-69fce8e8]{font-size:%?30?%;color:#050a2f}.view[data-v-69fce8e8]{margin-top:%?34?%}.section_8[data-v-69fce8e8]{margin-right:%?28?%}\r\n\t/* .space-x-142>view:not(:first-child),\r\n.space-x-142>text:not(:first-child),\r\n.space-x-142>image:not(:first-child) {\r\n\tmargin-left: 142rpx;\r\n} */.font_20[data-v-69fce8e8]{font-size:%?26?%;color:#a8aab6}.equal-division_2[data-v-69fce8e8]{padding-left:%?30?%;padding-right:%?22?%;box-sizing:border-box}.space-x-86>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-x-86>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-x-86>uni-image[data-v-69fce8e8]:not(:first-child){margin-left:%?86?%}.equal-division-item_3[data-v-69fce8e8]{padding:%?16?% 0}.text_44[data-v-69fce8e8]{margin-top:%?34?%}.text_46[data-v-69fce8e8]{margin-top:%?16?%}.text_45[data-v-69fce8e8]{margin-top:%?32?%;line-height:%?23?%}.text_47[data-v-69fce8e8]{line-height:%?22?%}.equal-division-item_4[data-v-69fce8e8]{padding:%?16?% 0 %?4?%;width:%?168?%}.space-y-58>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-y-58>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-y-58>uni-image[data-v-69fce8e8]:not(:first-child){margin-top:%?58?%}.image_12[data-v-69fce8e8]{width:%?48?%;height:%?48?%}.space-y-38>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-y-38>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-y-38>uni-image[data-v-69fce8e8]:not(:first-child){margin-top:%?38?%}.space-y-18>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-y-18>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-y-18>uni-image[data-v-69fce8e8]:not(:first-child){margin-top:%?18?%}.mai_bg[data-v-69fce8e8]{background:#effaf6;height:100%;float:right}.box_left1[data-v-69fce8e8]{height:%?35?%}.image_14[data-v-69fce8e8]{margin-left:%?70?%;width:%?86?%;height:%?86?%}.group_35[data-v-69fce8e8]{margin-left:%?56?%}.group_37[data-v-69fce8e8]{margin:%?3?% 0 %?3?% %?60?%;padding-bottom:%?6?%;overflow:hidden;width:%?78.5?%;height:%?80?%}.space-y-4>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-y-4>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-y-4>uni-image[data-v-69fce8e8]:not(:first-child){margin-top:%?4?%}.space-y-20>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-y-20>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-y-20>uni-image[data-v-69fce8e8]:not(:first-child){margin-top:%?20?%}.font_2[data-v-69fce8e8]{font-size:%?20?%;letter-spacing:%?-0.82?%;line-height:%?17?%;color:#fff}.equal-division-item_2[data-v-69fce8e8]{padding:%?32?% %?42?% 0;flex:1 1 %?219.5?%}.text_4[data-v-69fce8e8]{margin-top:%?20?%}.image_2[data-v-69fce8e8]{margin:%?22?% %?4?% %?-12?% 0;width:%?34?%;height:%?20?%}.line-tabs[data-v-69fce8e8]{margin-top:%?41?%;padding-bottom:%?30?%}.group_2[data-v-69fce8e8]{padding-left:%?174?%;padding-right:%?31?%;border-bottom:solid %?1?% #e6e6ea}.group_3[data-v-69fce8e8]{padding-bottom:%?10?%}.text_5[data-v-69fce8e8]{color:#050a2f;font-size:%?32?%;line-height:%?28?%}.font_3[data-v-69fce8e8]{font-size:%?28?%;line-height:%?26?%;color:#a8aab6}.text_6[data-v-69fce8e8]{color:#5c6078}.section_6[data-v-69fce8e8]{background-color:transparent;width:%?48?%;height:%?48?%}.section_7[data-v-69fce8e8]{margin-left:%?45?%;background-color:#ffaa5a;width:%?54?%;height:%?6?%}.section_78[data-v-69fce8e8]{margin-left:%?294?%}.list-item[data-v-69fce8e8]{width:92%;margin:%?32?% auto 0;padding-bottom:%?32?%;border-bottom:solid %?1?% #f2f3f4}.space-y-30>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-y-30>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-y-30>uni-image[data-v-69fce8e8]:not(:first-child){margin-top:%?30?%}.space-x-22>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-x-22>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-x-22>uni-image[data-v-69fce8e8]:not(:first-child){margin-left:%?22?%}.image_3[data-v-69fce8e8]{width:%?68?%;height:%?68?%}.font_4[data-v-69fce8e8]{font-size:%?34?%;line-height:%?26?%;color:#050a2f}.text_7[data-v-69fce8e8]{line-height:%?25?%}.font_5[data-v-69fce8e8]{font-size:%?30?%;line-height:%?20.5?%;color:#050a2f}.text_8[data-v-69fce8e8]{margin-right:%?4?%}.text_9[data-v-69fce8e8]{line-height:%?26.5?%}.space-y-4>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-y-4>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-y-4>uni-image[data-v-69fce8e8]:not(:first-child){margin-top:%?4?%}.section_5555[data-v-69fce8e8]{margin:%?35?% auto 0;margin-left:%?32?%;padding:%?36?% 0 %?32?%;box-sizing:border-box;width:92%;height:%?268?%;background-image:url(/static/home/n_home/beijing2.png);background-size:100% 100%;position:relative}.font_22222[data-v-69fce8e8]{font-size:%?24?%;color:#1a1a1a}.font_11111[data-v-69fce8e8]{font-size:%?28?%;font-weight:600;color:#1a1a1a}.mai_left[data-v-69fce8e8]{width:100%;padding:%?10?% 0;text-align:center;box-sizing:border-box;border-radius:8px 2.5px 8px 2.5px;background-image:url(/static/home/n_home/green_btn.png);background-size:100% 100%;font-size:%?30?%;color:#fff}.mai_right[data-v-69fce8e8]{width:100%;padding:%?10?% 0;text-align:center;box-sizing:border-box;border-radius:8px 2.5px 8px 2.5px;background-image:url(/static/home/n_home/mai_btnbg.png);background-size:100% 100%;font-size:%?30?%;color:#fff}.space-y-29>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-y-29>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-y-29>uni-image[data-v-69fce8e8]:not(:first-child){margin-top:%?29?%}.space-x-10>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-x-10>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-x-10>uni-image[data-v-69fce8e8]:not(:first-child){margin-left:%?10?%}.list-item_ss[data-v-69fce8e8]{padding:%?18?% %?8?% %?32?% %?18?%;border-radius:%?20?%;border:solid %?1?% #00923f}.list[data-v-69fce8e8]{padding:%?31?% %?19?% 0}.space-y-28>uni-view[data-v-69fce8e8]:not(:first-child),\r\n.space-y-28>uni-text[data-v-69fce8e8]:not(:first-child),\r\n.space-y-28>uni-image[data-v-69fce8e8]:not(:first-child){margin-top:%?20?%}.bus_kind[data-v-69fce8e8]{width:90%;margin:%?30?% auto;overflow:scroll}.bus_kind .btn[data-v-69fce8e8]{padding:%?15?% %?34?%;background:#f7f7f8;border-radius:8px;font-size:%?30?%;color:#767676;margin-right:%?30?%;border:1px solid #f7f7f8}.bus_kind .select_btn[data-v-69fce8e8]{color:#00923f;border:1px solid #00923f}", ""]),
        t.exports = e
    },
    c207: function(t, e, i) {
        "use strict";
        i.r(e);
        var a = i("ceaf")
          , s = i.n(a);
        for (var n in a)
            ["default"].indexOf(n) < 0 && function(t) {
                i.d(e, t, (function() {
                    return a[t]
                }
                ))
            }(n);
        e["default"] = s.a
    },
    ceaf: function(t, e, i) {
        "use strict";
        (function(t) {
            i("7a82");
            var a = i("4ea4").default;
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.default = void 0,
            i("a434"),
            i("fb6a"),
            i("14d9"),
            i("a9e3"),
            i("d401"),
            i("d3b7"),
            i("25f0"),
            i("c975"),
            i("ac1f"),
            i("5319"),
            i("acd8"),
            i("cb29"),
            i("4d63"),
            i("c607"),
            i("2c3e"),
            i("99af");
            var s, n = a(i("5530")), c = a(i("ade3")), o = a(i("12c2")), r = a(i("f50b")), l = a(i("013b")), d = {
                mixins: [l.default],
                data: function() {
                    return {
                        showBuyLiading: !1,
                        gifUrl: "/static/loading.gif",
                        loadingKind: 1,
                        buySuccess: !1,
                        modalShow: !1,
                        hintTxt: "余额不足",
                        showDigits: !1,
                        showSidebar: !1,
                        mainHeight: "",
                        mescroll: null,
                        chartData: null,
                        downOption: (0,
                        c.default)({
                            auto: !1,
                            noMoreSize: 1
                        }, "noMoreSize", 1),
                        upOption: {
                            use: !1,
                            auto: !1
                        },
                        timeformat: r.default,
                        amountPro: o.default,
                        current: 2,
                        tabbarlist: [{
                            iconPath: "/static/tabbar/tab_home.png",
                            selectedIconPath: "/static/tabbar/tabs_home.png",
                            text: "首页",
                            customIcon: !1,
                            pagePath: "/pages/home/home"
                        }, {
                            iconPath: "/static/tabbar/tab_gamefi.png",
                            selectedIconPath: "/static/tabbar/tabs_gamefi.png",
                            text: "抢购中心",
                            customIcon: !1,
                            pagePath: "/pages/gamefi/gamefi"
                        }, {
                            iconPath: "/static/tabbar/center.png",
                            selectedIconPath: "/static/tabbar/center_z.png",
                            text: "交易中心",
                            midButton: !0,
                            customIcon: !1,
                            pagePath: "/pages/center/center"
                        }, {
                            iconPath: "/static/tabbar/tab_fram.png",
                            selectedIconPath: "/static/tabbar/tabs_farm.png",
                            text: "机构中心",
                            pagePath: "/pages/farm/farm"
                        }, {
                            iconPath: "/static/tabbar/tab_mine.png",
                            selectedIconPath: "/static/tabbar/tabs_mine.png",
                            text: "个人中心",
                            customIcon: !1,
                            pagePath: "/pages/mine/mine"
                        }],
                        maiKind: 0,
                        tranKind: 0,
                        registIndex: 0,
                        businessKind: 0,
                        checkList: null,
                        checkPage: 1,
                        checkKong: !1,
                        checkLoading: !1,
                        sellList: null,
                        sellPage: 1,
                        sellKong: !1,
                        sellLoading: !1,
                        coinList: [],
                        coinKind: "",
                        moneyZong: "",
                        contSellKind: 0,
                        contSellList: null,
                        contSellPage: 1,
                        contSellKong: !1,
                        contSellLoading: !1,
                        contCheckList: null,
                        contCheckPage: 1,
                        contCheckKong: !1,
                        contCheckLoading: !1,
                        transaPair: [],
                        transaPairIndex: 0,
                        symbol: "",
                        latestPrice: "",
                        checkJia: "",
                        checkNum: "",
                        checkWidth: 0,
                        sellJia: "",
                        sellNum: "",
                        sellWidth: 0,
                        sellPass: "",
                        registList: null,
                        registPage: 1,
                        registKong: !1,
                        registLoading: !1,
                        myAddrsss: "",
                        deepList: null,
                        deepZhanMai: ["40%", "30%", "20%", "45%"],
                        deepZhanSell: ["60%", "20%", "70%", "30%"],
                        KLine: [],
                        isCollect: 2,
                        ctx: null,
                        ctxWidth: 0,
                        ctxHeight: 0,
                        maxPrice: 0,
                        minPrice: 0,
                        intervalWidth: 0,
                        startX: 0,
                        numberDigits: 4,
                        digitsList: [{
                            label: "0.1",
                            value: 1
                        }, {
                            label: "0.01",
                            value: 2
                        }, {
                            label: "0.001",
                            value: 3
                        }, {
                            label: "0.0001",
                            value: 4
                        }],
                        maiKuangWidth: 0,
                        checkIndexBai: -1,
                        checkBaiList: [{
                            label: 25,
                            select: 0
                        }, {
                            label: 50,
                            select: 0
                        }, {
                            label: 75,
                            select: 0
                        }, {
                            label: 100,
                            select: 0
                        }],
                        sellBaiList: [{
                            label: 25,
                            select: 0
                        }, {
                            label: 50,
                            select: 0
                        }, {
                            label: 75,
                            select: 0
                        }, {
                            label: 100,
                            select: 0
                        }],
                        sellIndexBai: -1,
                        timeInfo: null,
                        gradeRate: "",
                        getLevelPrice: [],
                        levelOne: "",
                        liandian: !0
                    }
                },
                onReachBottom: function() {
                    1 == this.tranKind && (0 == this.registIndex ? (0 == this.checkKong && null != this.checkList && 0 == this.businessKind && this.getRegisList(2),
                    0 == this.sellKong && null != this.sellList && 1 == this.businessKind && this.getRegisList(2)) : (0 == this.contCheckKong && null != this.contCheckList && 0 == this.contSellKind && this.getContract(2),
                    0 == this.contSellKong && null != this.contSellList && 1 == this.contSellKind && this.getContract(2)))
                },
                onReady: function() {
                    this.mainHeight = 2 * (uni.getSystemInfoSync().windowHeight - 90),
                    this.ctx = uni.createCanvasContext("line"),
                    this.ctx && this.setCtxSize()
                },
                onHide: function() {
                    t("log", 151515555, " at pages/center/center.vue:1015"),
                    t("log", this.timeInfo, " at pages/center/center.vue:1016"),
                    clearInterval(this.timeInfo),
                    this.timeInfo = null
                },
                onUnload: function() {
                    clearTimeout(this.timeInfo),
                    this.timeInfo = null
                },
                onLoad: function() {
                    this.getTransacPair()
                },
                onShow: function() {
                    var t = this;
                    this.hintTxt = this.$t("centerTi1"),
                    uni.setTabBarItem({
                        index: 0,
                        text: this.$t("shouye")
                    }),
                    uni.getStorageSync("userInfor") && 0 == this.tranKind && (this.timeInfo = setInterval((function() {
                        t.getTransacPair()
                    }
                    ), 2e3)),
                    uni.setTabBarItem({
                        index: 1,
                        text: this.$t("tabbar2")
                    }),
                    uni.setTabBarItem({
                        index: 2,
                        text: this.$t("tabbar3")
                    }),
                    uni.setTabBarItem({
                        index: 3,
                        text: this.$t("tabbar4")
                    }),
                    uni.setTabBarItem({
                        index: 4,
                        text: this.$t("tabbar5")
                    })
                },
                watch: {
                    symbol: function(t) {
                        if (t) {
                            for (var e in this.registList = [],
                            this.ctx.clearRect(0, 0, this.ctxWidth, this.ctxHeight),
                            this.ctx.draw(),
                            this.transaPair)
                                this.transaPair[e].symbol == t ? (this.transaPair[e].status = 1,
                                this.transaPairIndex = e,
                                this.isCollect = this.transaPair[e].collect) : this.transaPair[e].status = 0;
                            this.getTransacPair()
                        }
                    },
                    checkJia: function(t) {},
                    checkNum: function(t) {},
                    sellJia: function(t) {},
                    sellNum: function(t) {
                        this.getSellWidth(t, t)
                    }
                },
                methods: (s = {
                    getVipLevelPrice: function() {
                        var e = this;
                        this.$req([{
                            url: this.$url + "/venue/order-level"
                        }]).then((function(i) {
                            if (e.getGradeRate(),
                            i) {
                                var a = i[0].data.data;
                                for (var s in e.getLevelPrice = [],
                                a)
                                    a[s] = (0,
                                    n.default)({
                                        vipPrice: e.getAfterDiscount(a[s].trade_prefer)
                                    }, a[s]);
                                e.levelOne = a[0],
                                a.splice(0, 1);
                                for (var c = 0; c < a.length; c += 3) {
                                    var o = a.slice(c, c + 3);
                                    e.getLevelPrice.push(o)
                                }
                                t("log", e.getLevelPrice, " at pages/center/center.vue:1135")
                            }
                        }
                        ))
                    },
                    getAfterDiscount: function(e) {
                        return t("log", e, " at pages/center/center.vue:1143"),
                        t("log", Number(this.checkJia), " at pages/center/center.vue:1144"),
                        t("log", Number(this.checkNum), " at pages/center/center.vue:1145"),
                        (Number(this.checkJia) * Number(this.checkNum) * (1 - .001 * Number(e))).toFixed(3)
                    },
                    getGradeRate: function() {
                        var e = this;
                        this.$req([{
                            url: this.$url + "/user/level-progress"
                        }]).then((function(i) {
                            i && (i[0].data.data ? e.gradeRate = {
                                name: i[0].data.data.name,
                                vipPrice: e.getAfterDiscount(i[0].data.data.trade_prefer),
                                oldPrice: e.numberMul(Number(e.checkJia), Number(e.checkNum))
                            } : e.gradeRate = {
                                name: "",
                                vipPrice: e.numberMul(Number(e.checkJia), Number(e.checkNum)),
                                oldPrice: e.numberMul(Number(e.checkJia), Number(e.checkNum))
                            },
                            e.checkJia = "",
                            e.checkNum = "",
                            t("log", e.gradeRate, " at pages/center/center.vue:1171"))
                        }
                        ))
                    },
                    numberMul: function(t, e) {
                        if (t && e) {
                            var i = 0
                              , a = t.toString()
                              , s = e.toString();
                            return -1 != a.indexOf(".") && (i += a.split(".")[1].length),
                            -1 != s.indexOf(".") && (i += s.split(".")[1].length),
                            Number(a.replace(".", "")) * Number(s.replace(".", "")) / Math.pow(10, i)
                        }
                    },
                    goRecharge: function() {
                        uni.navigateTo({
                            url: "/pages/webView/webView"
                        }),
                        this.modalShow = !1
                    },
                    gunDong: function() {},
                    catchTouchMove2: function() {
                        return !1
                    },
                    catchTouchMove: function() {
                        return !1
                    },
                    selectSelldai: function(t) {
                        this.sellIndexBai = t,
                        this.$forceUpdate(),
                        this.sellWidth = Number(this.maiKuangWidth) / 4 * (t + 1),
                        this.sellNum = (Number(this.sellWidth + 9) / Number(this.maiKuangWidth) * Number(this.myAddrsss.value)).toFixed(4)
                    },
                    selectChexkdai: function(t) {
                        for (var e in this.checkBaiList)
                            this.checkBaiList[e].select = e <= t ? 1 : 0;
                        this.checkJia || (this.checkJia = this.amountPro(this.latestPrice.new_price)),
                        this.checkNum = (this.checkBaiList[t].label / 100 * Number(this.myAddrsss.usdt) / Number(this.checkJia)).toFixed(4)
                    }
                },
                (0,
                c.default)(s, "selectSelldai", (function(t) {
                    for (var e in this.sellBaiList)
                        this.sellBaiList[e].select = e <= t ? 1 : 0;
                    this.sellNum = (this.sellBaiList[t].label / 100 * Number(this.myAddrsss.value)).toFixed(4)
                }
                )),
                (0,
                c.default)(s, "checkJinChange", (function(t) {
                    this.checkWidth = t.detail.x,
                    this.checkJia ? this.checkNum = (Number(t.detail.x + 9) / Number(this.maiKuangWidth) * Number(this.myAddrsss.usdt) / Number(this.checkJia)).toFixed(4) : (this.checkJia = this.amountPro(this.latestPrice.new_price),
                    this.checkNum = (Number(t.detail.x + 9) / Number(this.maiKuangWidth) * Number(this.myAddrsss.usdt) / Number(this.latestPrice.new_price)).toFixed(4))
                }
                )),
                (0,
                c.default)(s, "checkMaiChange", (function(t) {
                    this.sellWidth = t.detail.x,
                    this.sellNum = (Number(t.detail.x + 9) / Number(this.maiKuangWidth) * Number(this.myAddrsss.value)).toFixed(4)
                }
                )),
                (0,
                c.default)(s, "confirmContry", (function(t) {
                    this.numberDigits = t[0].value,
                    this.createCanvas(),
                    this.getDepthData()
                }
                )),
                (0,
                c.default)(s, "selectPrice", (function(t) {
                    0 == this.maiKind ? this.checkJia = t.price : this.sellJia = t.price
                }
                )),
                (0,
                c.default)(s, "setCtxSize", (function() {
                    var e = this
                      , i = uni.createSelectorQuery();
                    i.select("#line").boundingClientRect((function(i) {
                        t("log", i, " at pages/center/center.vue:1293"),
                        e.ctxWidth = i.width - 30,
                        e.ctxHeight = i.height
                    }
                    )).exec()
                }
                )),
                (0,
                c.default)(s, "setMaxAndMinPrice", (function() {
                    var e = this.KLine;
                    t("log", e, " at pages/center/center.vue:1301");
                    for (var i = 0, a = 1 / 0, s = 0; s < e.length; s++) {
                        var n = parseFloat(e[s]["h"])
                          , c = parseFloat(e[s]["l"]);
                        n > i && (i = n),
                        c < a && (a = c)
                    }
                    this.maxPrice = parseFloat(i),
                    this.minPrice = parseFloat(a)
                }
                )),
                (0,
                c.default)(s, "getPointY", (function(t) {
                    var e = t - this.minPrice.toFixed(this.numberDigits);
                    if (e > 0)
                        var i = parseFloat(e / (this.maxPrice - this.minPrice))
                          , a = parseFloat((1 - i) * (.5 * this.ctxHeight) + .3 * this.ctxHeight);
                    else
                        a = .5 * this.ctxHeight;
                    return a
                }
                )),
                (0,
                c.default)(s, "countGridPrice", (function() {
                    var t = (this.maxPrice - this.minPrice) / 5
                      , e = this.minPrice + 8 * t
                      , i = this.maxPrice - 7 * t
                      , a = parseFloat((e - i) / 4);
                    this.ctx.textBaseline = "middle",
                    this.ctx.font = "10px Microsoft YaHei",
                    this.ctx.fillStyle = "#9396a6";
                    for (var s = 1; s < 4; s++) {
                        var n = parseFloat(i + s * a).toFixed(this.numberDigits);
                        this.ctx.fillText(n, .98 * this.ctxWidth - this.ctx.measureText(n).width, this.ctxHeight * (100 - 25 * s) / 100)
                    }
                }
                )),
                (0,
                c.default)(s, "drawLine", (function() {
                    var e = this.KLine
                      , i = this.startX
                      , a = this.getPointY(parseFloat(e[0]["c"]));
                    t("log", this.maxPrice, this.minPrice, " at pages/center/center.vue:1349");
                    var s = this.ctx.createLinearGradient(0, this.ctxHeight, 0, 0);
                    s.addColorStop(0, "white"),
                    s.addColorStop(1, "#FFAA5A"),
                    this.ctx.textBaseline = "middle",
                    this.ctx.font = "10px Microsoft YaHei",
                    this.ctx.fillStyle = "#050A2F",
                    this.ctx.strokeStyle = "#FFAA5A",
                    this.ctx.setLineDash([10, 4]);
                    var n = parseFloat(e[0]["c"]).toFixed(this.numberDigits)
                      , c = this.ctx.measureText(n).width;
                    this.ctx.beginPath(),
                    this.ctx.lineWidth = 2,
                    this.ctx.moveTo(i, a),
                    this.ctx.lineTo(.98 * this.ctxWidth - c, a),
                    this.ctx.fillStyle = "#FFAA5A",
                    this.ctx.fillRect(.98 * this.ctxWidth - 1.2 * c, a - 8, 1.4 * c, 14),
                    this.ctx.fillStyle = "#050A2F",
                    this.ctx.fillText(n, .98 * this.ctxWidth - c, a),
                    this.ctx.stroke(),
                    this.ctx.beginPath(),
                    this.ctx.moveTo(i, this.ctxHeight),
                    this.ctx.beginPath(),
                    this.ctx.setLineDash([]),
                    this.ctx.lineTo(i, a),
                    this.ctx.lineWidth = 4,
                    this.ctx.strokeStyle = "#FFAA5A",
                    i -= this.intervalWidth;
                    for (var o = 1; o < e.length; o++)
                        a = this.getPointY(parseFloat(e[o]["c"])),
                        this.ctx.lineTo(i, a),
                        i -= this.intervalWidth;
                    this.ctx.lineTo(0, this.ctxHeight),
                    this.ctx.lineTo(this.startX, this.ctxHeight),
                    this.ctx.stroke(),
                    this.ctx.fillStyle = s,
                    this.ctx.fill()
                }
                )),
                (0,
                c.default)(s, "createCanvas", (function() {
                    this.ctx.fillStyle = "#ffffff",
                    this.ctx.fillRect(0, 0, this.ctxWidth, this.ctxHeight),
                    this.setCtxSize(),
                    this.setMaxAndMinPrice(),
                    this.startX = .8 * this.ctxWidth,
                    this.intervalWidth = .8 * this.ctxWidth / (this.KLine.length - 1),
                    this.countGridPrice(),
                    this.drawLine(),
                    this.ctx.fillRect(0, this.ctxHeight - 1, this.ctxWidth, .1),
                    this.ctx.fillRect(this.ctxWidth - 1, 0, .1, this.ctxHeight),
                    this.ctx.draw()
                }
                )),
                (0,
                c.default)(s, "getCollect", (function() {
                    var t = this;
                    this.isCollect = 2 == this.isCollect ? 1 : 2,
                    this.$req([{
                        url: this.$url + "/venue/symbol-collect",
                        data: {
                            symbol: this.symbol
                        }
                    }]).then((function(e) {
                        e && t.getTransacPair()
                    }
                    )).catch((function(e) {
                        t.mescroll.endErr()
                    }
                    ))
                }
                )),
                (0,
                c.default)(s, "cancelCollect", (function() {
                    var t = this;
                    this.isCollect = 2 == this.isCollect ? 1 : 2,
                    this.$req([{
                        url: this.$url + "/venue/cancel-collect",
                        data: {
                            symbol: this.symbol
                        }
                    }]).then((function(e) {
                        e && t.getTransacPair()
                    }
                    )).catch((function(e) {
                        t.mescroll.endErr()
                    }
                    ))
                }
                )),
                (0,
                c.default)(s, "getTradingPairData", (function() {
                    var e = this;
                    this.$req([{
                        url: this.$url + "/venue/index-kline",
                        data: {
                            symbol: this.symbol,
                            type: 2
                        }
                    }]).then((function(i) {
                        i && (e.KLine = i[0].data.data,
                        t("log", e.KLine, " at pages/center/center.vue:1451"),
                        e.KLine.length > 0 && setTimeout((function() {
                            e.createCanvas()
                        }
                        ), 500))
                    }
                    )).catch((function(t) {
                        e.mescroll.endErr()
                    }
                    ))
                }
                )),
                (0,
                c.default)(s, "getSellWidth", (function(t, e) {}
                )),
                (0,
                c.default)(s, "getCalculateWidth", (function(t, e) {}
                )),
                (0,
                c.default)(s, "goWebview", (function() {
                    uni.navigateTo({
                        url: "/pages/center/candlestick/candlestick?symbol=" + this.symbol + "&numberDigits=" + this.numberDigits
                    })
                }
                )),
                (0,
                c.default)(s, "goCenterRecode", (function() {
                    uni.navigateTo({
                        url: "/pages/center/centerRecode/centerRecode?symbol=" + this.symbol
                    })
                }
                )),
                (0,
                c.default)(s, "revokeOrder", (function(t) {
                    var e = this;
                    uni.showModal({
                        title: this.$t("widthdraw_txt11"),
                        content: this.$t("centerTi2"),
                        confirmColor: "#2B88FF ",
                        confirmText: this.$t("confirm"),
                        cancelText: this.$t("cancel"),
                        success: function(i) {
                            i.confirm && (e.loadingKind = 2,
                            e.gifUrl = "/static/loading.gif?".concat((new Date).getTime()),
                            e.showBuyLiading = !0,
                            e.$req([{
                                url: e.$urlTran + "/order/remove",
                                data: {
                                    orderId: t
                                },
                                kind: "version"
                            }]).then((function(t) {
                                setTimeout((function() {
                                    e.showBuyLiading = !1,
                                    uni.showToast({
                                        title: t[0].data.message,
                                        icon: "none",
                                        mask: !0
                                    }),
                                    setTimeout((function() {
                                        e.getUserOrder()
                                    }
                                    ), 1500)
                                }
                                ), 2e3)
                            }
                            )).catch((function(t) {
                                e.mescroll.endErr(),
                                setTimeout((function() {
                                    e.showBuyLiading = !1
                                }
                                ), 2e3)
                            }
                            )))
                        }
                    })
                }
                )),
                (0,
                c.default)(s, "checkAction", (function() {
                    var e, i = this;
                    e = 0 == this.maiKind ? [{
                        value: this.checkJia,
                        hint: this.$t("centerTi3")
                    }, {
                        value: this.checkNum,
                        hint: this.$t("centerTi4")
                    }] : [{
                        value: this.sellJia,
                        hint: this.$t("centerTi3")
                    }, {
                        value: this.sellNum,
                        hint: this.$t("centerTi4")
                    }];
                    var a = !1;
                    for (var s in e)
                        if (!e[s].value) {
                            a = !0,
                            uni.showToast({
                                title: e[s].hint,
                                icon: "none",
                                mask: !0
                            });
                            break
                        }
                    if (0 == a) {
                        if (1 != this.liandian)
                            return !1;
                        var n;
                        this.liandian = !1,
                        this.loadingKind = 1,
                        this.gifUrl = "/static/loading.gif?".concat((new Date).getTime()),
                        this.showBuyLiading = !0,
                        n = 0 == this.maiKind ? {
                            symbol: this.symbol,
                            price: this.checkJia,
                            num: this.checkNum,
                            type: 0 == this.maiKind ? "buy" : "sell"
                        } : {
                            symbol: this.symbol,
                            price: this.sellJia,
                            num: this.sellNum,
                            type: 0 == this.maiKind ? "buy" : "sell"
                        },
                        this.$req([{
                            url: this.$urlTran + "/order/create",
                            data: n,
                            kind: "version"
                        }]).then((function(e) {
                            t("log", e[0].data, " at pages/center/center.vue:1620"),
                            200 == e[0].data.status ? "noBalance" == e.hint ? setTimeout((function() {
                                i.liandian = !0,
                                i.showBuyLiading = !1,
                                i.modalShow = !0
                            }
                            ), 2e3) : (i.sellJia = "",
                            i.sellNum = "",
                            0 == i.maiKind ? (setTimeout((function() {
                                i.liandian = !0,
                                i.showBuyLiading = !1,
                                i.buySuccess = !0
                            }
                            ), 2e3),
                            i.getVipLevelPrice()) : setTimeout((function() {
                                i.liandian = !0,
                                i.showBuyLiading = !1,
                                uni.showToast({
                                    title: e[0].data.message,
                                    icon: "none",
                                    mask: !0
                                })
                            }
                            ), 2e3),
                            setTimeout((function() {
                                i.getTransacPair()
                            }
                            ), 1500)) : setTimeout((function() {
                                i.liandian = !0,
                                i.showBuyLiading = !1,
                                uni.showToast({
                                    title: e[0].data.message,
                                    icon: "none",
                                    mask: !0
                                })
                            }
                            ), 5e3)
                        }
                        )).catch((function(t) {
                            i.mescroll.endErr(),
                            setTimeout((function() {
                                i.liandian = !0,
                                i.showBuyLiading = !1
                            }
                            ), 2e3)
                        }
                        ))
                    }
                }
                )),
                (0,
                c.default)(s, "getUserOrder", (function() {
                    var e = this;
                    this.$req([{
                        url: this.$urlTran + "/order/get-order",
                        data: {
                            symbol: this.symbol
                        }
                    }]).then((function(i) {
                        t("log", i, " at pages/center/center.vue:1688"),
                        i ? e.registList = i[0].data.data : (e.registList = [],
                        e.registKong = !1),
                        e.registList && 0 == e.registList.length ? e.registKong = !0 : e.registKong = !1
                    }
                    )).catch((function(t) {
                        e.mescroll.endErr()
                    }
                    ))
                }
                )),
                (0,
                c.default)(s, "getDepthData", (function() {
                    var e = this;
                    this.$req([{
                        url: this.$urlTran + "/order/get-depth",
                        data: {
                            symbol: this.symbol
                        }
                    }]).then((function(i) {
                        i && (e.deepList = i[0].data.data,
                        e.deepList.buy && (e.deepList.buy.length > 0 && (e.deepList.buy = e.getDepthNum(e.deepList.buy.slice(0, 10))),
                        e.deepList.sell.length > 0 && (e.deepList.sell = e.getDepthNum(e.deepList.sell.slice(0, 10)))),
                        t("log", e.deepList, " at pages/center/center.vue:1728"))
                    }
                    ))
                }
                )),
                (0,
                c.default)(s, "getDepthNum", (function(e) {
                    var i = new RegExp(",","g")
                      , a = 0;
                    for (var s in e) {
                        e[s].num = e[s].num.toString().replace(i, "");
                        var c = e[s].num.toString().replace(i, "");
                        Number(c) > Number(a) && (a = c)
                    }
                    for (var o in t("log", a, " at pages/center/center.vue:1752"),
                    e) {
                        var r = e[o].num.toString().replace(i, "");
                        e[o] = (0,
                        n.default)({
                            deep: 100 * (Number(r) / Number(a)).toFixed(2)
                        }, e[o]),
                        e[o].price = e[o].price.toString().replace(i, ""),
                        e[o].price = Number(e[o].price).toFixed(this.numberDigits)
                    }
                    return e
                }
                )),
                (0,
                c.default)(s, "getSymbolNews", (function() {
                    var e = this;
                    this.$req([{
                        url: this.$urlTran + "/order/get-market",
                        data: {
                            symbol: this.symbol
                        }
                    }]).then((function(i) {
                        if (i) {
                            e.latestPrice = i[0].data.data;
                            var a = 0
                              , s = !0;
                            e.latestPrice.new_price && e.latestPrice.buy_price && (s = Number(e.latestPrice.new_price) - Number(e.latestPrice.buy_price) >= 0,
                            a = ((Number(e.latestPrice.new_price) - Number(e.latestPrice.buy_price)) / Number(e.latestPrice.buy_price) * 100).toFixed(2)),
                            e.latestPrice = (0,
                            n.default)({
                                baiNum: a,
                                zhang: s
                            }, e.latestPrice),
                            t("log", a, " at pages/center/center.vue:1792")
                        }
                    }
                    )).catch((function(t) {
                        e.mescroll.endErr()
                    }
                    ))
                }
                )),
                (0,
                c.default)(s, "getMyselfBalance", (function(t) {
                    var e = this;
                    this.$req([{
                        url: this.$urlTran + "/order/get-balance",
                        data: {
                            symbol: this.symbol
                        }
                    }]).then((function(i) {
                        if (1 == t && e.mescroll.endSuccess(),
                        i)
                            for (var a in e.myAddrsss = i[0].data.data,
                            e.myAddrsss)
                                "dot" != a && "usdt" != a && (e.myAddrsss = (0,
                                n.default)({
                                    value: e.myAddrsss[a]
                                }, e.myAddrsss))
                    }
                    )).catch((function(t) {
                        e.mescroll.endErr()
                    }
                    ))
                }
                )),
                (0,
                c.default)(s, "selectTransaPair", (function(t) {
                    for (var e in this.ctx.clearRect(0, 0, this.ctxWidth, this.ctxHeight),
                    this.ctx.draw(),
                    this.transaPairIndex = t,
                    this.transaPair)
                        t == e ? (this.transaPair[e].status = 1,
                        this.symbol = this.transaPair[e].symbol,
                        this.isCollect = this.transaPair[e].collect) : this.transaPair[e].status = 0;
                    this.showSidebar = !1,
                    this.getTransacPair(),
                    this.$forceUpdate()
                }
                )),
                (0,
                c.default)(s, "getTransacPair", (function(t) {
                    var e = this;
                    this.$req([{
                        url: this.$url + "/venue/get-symbol"
                    }]).then((function(i) {
                        if (i && (1 == t && e.mescroll.endSuccess(),
                        e.transaPair = i[0].data.data,
                        e.transaPair.length > 0)) {
                            for (var a in e.transaPair) {
                                var s = !0;
                                -1 != e.transaPair[a].ratio.toString().indexOf("-") && (s = !1),
                                e.transaPair[a] = (0,
                                n.default)({
                                    status: 0,
                                    zhang: s
                                }, e.transaPair[a])
                            }
                            if (e.symbol) {
                                for (var c in e.transaPair)
                                    if (e.transaPair[c].symbol == e.symbol) {
                                        e.transaPairIndex = c,
                                        e.isCollect = e.transaPair[c].collect;
                                        break
                                    }
                            } else
                                e.transaPair[0].status = 1,
                                e.isCollect = e.transaPair[0].collect,
                                e.symbol = e.transaPair[0].symbol;
                            e.getMyselfBalance(),
                            e.getSymbolNews(),
                            e.getDepthData(),
                            e.getUserOrder(),
                            e.getTradingPairData()
                        }
                    }
                    )).catch((function(t) {
                        e.mescroll.endErr()
                    }
                    ))
                }
                )),
                (0,
                c.default)(s, "backAction", (function() {
                    this.getTransacPair()
                }
                )),
                (0,
                c.default)(s, "downCallback", (function(e) {
                    var i = this;
                    t("log", 1515155, " at pages/center/center.vue:1899"),
                    1 == this.tranKind ? 0 == this.registIndex ? this.getRegisList(1) : 1 == this.registIndex && this.getContract(1) : this.getTransacPair(1),
                    setTimeout((function() {
                        i.mescroll.endErr()
                    }
                    ), 5e3)
                }
                )),
                (0,
                c.default)(s, "upCallback", (function(t) {}
                )),
                (0,
                c.default)(s, "mescrollInit", (function(t) {
                    this.mescroll = t
                }
                )),
                (0,
                c.default)(s, "confirmTransa", (function(t) {
                    var e = this;
                    uni.showLoading({
                        title: this.$t("loading"),
                        mask: !0
                    }),
                    this.$req([{
                        url: this.$url + "/venue/deal-cofirm",
                        data: {
                            deal_id: t
                        }
                    }]).then((function(t) {
                        t && (uni.showToast({
                            title: t[0].data.message,
                            icon: "none",
                            mask: !0
                        }),
                        e.contSellList = null,
                        e.selectContKind(1))
                    }
                    )).catch((function(t) {
                        e.mescroll.endErr()
                    }
                    ))
                }
                )),
                (0,
                c.default)(s, "selectContKind", (function(t) {
                    this.contSellKind = t,
                    0 == this.contSellKind ? null == this.contCheckList && this.getContract(0) : null == this.contSellList && this.getContract(0)
                }
                )),
                (0,
                c.default)(s, "getContract", (function(e) {
                    var i = this;
                    t("log", this.contCheckPage, " at pages/center/center.vue:1962"),
                    0 == e ? (uni.showLoading({
                        title: this.$t("loading"),
                        mask: !0
                    }),
                    this.resetList()) : 1 == e ? this.resetList() : 2 == e && (0 == this.contSellKind ? this.contCheckLoading = !0 : this.contSellLoading = !0),
                    this.$req([{
                        url: this.$url + "/venue/user-deal",
                        data: {
                            type: 0 == this.contSellKind ? 1 : 2,
                            pages: 0 == this.contSellKind ? this.contCheckPage : this.contSellPage
                        }
                    }]).then((function(t) {
                        t && (1 == e && i.mescroll.endSuccess(),
                        0 == i.contSellKind ? 2 == e ? (i.contCheckLoading = !1,
                        i.contCheckList && (t[0].data.data.length > 0 ? (i.contCheckList = i.contCheckList.concat(t[0].data.data),
                        i.contCheckPage++) : i.contCheckKong = !0)) : (i.contCheckList = t[0].data.data,
                        0 == i.contCheckList.length ? i.contCheckKong = !0 : (i.contCheckKong = !1,
                        i.contCheckPage++)) : 2 == e ? (i.contSellLoading = !1,
                        i.contSellList && (t[0].data.data.length > 0 ? (i.contSellList = i.contSellList.concat(t[0].data.data),
                        i.contSellPage++) : i.contSellKong = !0)) : (i.contSellList = t[0].data.data,
                        0 == i.contSellList.length ? i.contSellKong = !0 : (i.contSellKong = !1,
                        i.contSellPage++)))
                    }
                    )).catch((function(t) {
                        i.mescroll.endErr()
                    }
                    ))
                }
                )),
                (0,
                c.default)(s, "getCoinKind", (function() {
                    var t = this;
                    this.$req([{
                        url: this.$url + "/venue/coin-list"
                    }]).then((function(e) {
                        e && (t.coinList = e[0].data.data,
                        t.getMoneyZong(t.coinList[0].title))
                    }
                    )).catch((function(e) {
                        t.mescroll.endErr()
                    }
                    ))
                }
                )),
                (0,
                c.default)(s, "getMoneyZong", (function(t) {
                    var e = this;
                    this.$req([{
                        url: this.$url + "/venue/statistics",
                        data: {
                            coin: t
                        }
                    }]).then((function(t) {
                        t && (e.moneyZong = t[0].data.data)
                    }
                    )).catch((function(t) {
                        e.mescroll.endErr()
                    }
                    ))
                }
                )),
                (0,
                c.default)(s, "goSellRegis", (function(t) {
                    uni.navigateTo({
                        url: "/pages/center/registraList/registraList?kind=sell&id=" + t
                    })
                }
                )),
                (0,
                c.default)(s, "buyRegistra", (function(t) {
                    uni.navigateTo({
                        url: "/pages/center/registraList/registraList?kind=mai&id=" + t
                    })
                }
                )),
                (0,
                c.default)(s, "goAddregistra", (function() {
                    uni.navigateTo({
                        url: "/pages/center/addRegistra/addRegistra"
                    })
                }
                )),
                (0,
                c.default)(s, "selectTran", (function(t) {
                    1 == t ? uni.showToast({
                        title: this.$t("centerTi5"),
                        icon: "none",
                        mask: !0
                    }) : this.tranKind = t
                }
                )),
                (0,
                c.default)(s, "selectRegist", (function(t) {
                    this.registIndex = t,
                    0 == this.registIndex ? this.selectBusKind(0) : this.selectContKind(0)
                }
                )),
                (0,
                c.default)(s, "beforeSwitch", (function(e) {
                    t("log", e, " at pages/center/center.vue:2123"),
                    uni.switchTab({
                        url: this.tabbarlist[e].pagePath
                    })
                }
                )),
                (0,
                c.default)(s, "selectBusKind", (function(t) {
                    this.businessKind = t,
                    null == this.checkList && 0 == this.businessKind && this.getRegisList(0),
                    null == this.sellList && 1 == this.businessKind && this.getRegisList(0)
                }
                )),
                (0,
                c.default)(s, "resetList", (function() {
                    0 == this.registIndex ? 0 == this.businessKind ? (this.checkList = null,
                    this.checkPage = 1,
                    this.checkKong = !1) : (this.sellList = null,
                    this.sellPage = 1,
                    this.sellKong = !1) : 0 == this.contSellKind ? (this.contCheckList = null,
                    this.contCheckPage = 1,
                    this.contCheckKong = !1) : (this.contSellKong = !1,
                    this.contSellList = null,
                    this.contSellPage = 1)
                }
                )),
                (0,
                c.default)(s, "getRegisList", (function(t) {
                    var e = this;
                    0 == t ? (uni.showLoading({
                        title: this.$t("loading"),
                        mask: !0
                    }),
                    this.resetList()) : 1 == t ? this.resetList() : 2 == t && (0 == this.businessKind ? this.checkLoading = !0 : this.sellLoading = !0),
                    this.$req([{
                        url: this.$url + "/venue/registration-list",
                        data: {
                            type: 0 == this.businessKind ? 2 : 1,
                            pages: 0 == this.businessKind ? this.checkPage : this.sellPage
                        }
                    }]).then((function(i) {
                        i && (1 == t && e.mescroll.endSuccess(),
                        0 == e.businessKind ? 2 == t ? (e.checkLoading = !1,
                        e.checkList && (i[0].data.data.length > 0 ? (e.checkList = e.checkList.concat(i[0].data.data),
                        e.checkPage++) : e.checkKong = !0)) : (e.checkList = i[0].data.data,
                        0 == e.checkList.length ? e.checkKong = !0 : (e.checkKong = !1,
                        e.checkPage++)) : 2 == t ? (e.sellLoading = !1,
                        e.sellList && (i[0].data.data.length > 0 ? (e.sellList = e.sellList.concat(i[0].data.data),
                        e.sellPage++) : e.sellKong = !0)) : (e.sellList = i[0].data.data,
                        0 == e.sellList.length ? e.sellKong = !0 : (e.sellKong = !1,
                        e.sellPage++)))
                    }
                    )).catch((function(t) {
                        e.mescroll.endErr()
                    }
                    ))
                }
                )),
                s)
            };
            e.default = d
        }
        ).call(this, i("0de9")["log"])
    },
    e358: function(t, e, i) {
        "use strict";
        var a = i("4d81")
          , s = i.n(a);
        s.a
    },
    f50b: function(t, e, i) {
        "use strict";
        i("7a82"),
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.default = void 0;
        var a = function(t, e) {
            var i = new Date(1e3 * t)
              , a = i.getFullYear()
              , s = i.getMonth() + 1 < 10 ? "0" + (i.getMonth() + 1) : i.getMonth() + 1
              , n = i.getDate() < 10 ? "0" + i.getDate() : i.getDate()
              , c = i.getHours() < 10 ? "0" + i.getHours() : i.getHours()
              , o = i.getMinutes() < 10 ? "0" + i.getMinutes() : i.getMinutes()
              , r = i.getSeconds() < 10 ? "0" + i.getSeconds() : i.getSeconds();
            if ("1970" == a)
                return "待揭晓";
            if (1 == e) {
                if (a && s && n) {
                    var l = a + "-" + s + "-" + n;
                    return l
                }
                return "******"
            }
            if (2 == e) {
                l = a + "年" + s + "月" + n + "日" + c + "时";
                return l
            }
            if (3 == e) {
                l = a + "/" + s + "/" + n;
                return l
            }
            return l = c + ":" + o + ":" + r + " " + a + "-" + s + "-" + n,
            l
        };
        e.default = a
    }
}]);
