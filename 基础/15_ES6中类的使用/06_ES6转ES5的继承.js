class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    running() {
        console.log(this.name + " running~")
    }
}

class Student extends Person {
    constructor(name, age, sno) {
        super(name, age)
        this.sno = sno
    }

    studying() {
        console.log(this.name + " studying~")
    }
}

// babel 转换后的代码
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    // 寄生组合式继承
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: { value: subClass, writable: true, configurable: true }
    });
    Object.defineProperty(subClass, "prototype", { writable: false });
    // 为了静态方法的继承: Student.__proto__ = Persion
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf
        ? Object.setPrototypeOf.bind()
        : function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };
    return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived),
        result;
        if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        // Super: Person
        // arguments: ["why", 18]
        // NewTarget: Student
        // 会通过Super床垫出来一个实例, 但是这个实例的原型constructor指向的是NewTarget
        // 会通过Person创建出来一个实例, 但是这个实例的原型constructor指向的是Student
        result = Reflect.construct(Super, arguments, NewTarget);
        } else {
        result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
        return call;
    } else if (call !== void 0) {
        throw new TypeError(
        "Derived constructors may only return object or undefined"
        );
    }
    return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
        );
    }
    return self;
}
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
        );
        return true;
    } catch (e) {
        return false;
    }
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
        ? Object.getPrototypeOf.bind()
        : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        };
    return _getPrototypeOf(o);
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
    }
    function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
}
function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
}
let Person = /*#__PURE__*/ (function () {
    function Person(name, age) {
        _classCallCheck(this, Person);
        this.name = name;
        this.age = age;
    }
    _createClass(Person, [
        {
        key: "running",
        value: function running() {
            console.log(this.name + " running~");
        }
        }
    ]);
    return Person;
})();

let Student = /*#__PURE__*/ (function (_Person) {
    // 实现之前的寄生式组合式继承的方法(静态方法的继承)
    _inherits(Student, _Person);

    var _super = _createSuper(Student);
    function Student(name, age, sno) {
        var _this;
        _classCallCheck(this, Student);
        _this = _super.call(this, name, age);
        _this.sno = sno;
        return _this;
    }
    _createClass(Student, [
        {
            key: "studying",
            value: function studying() {
                console.log(this.name + " studying~");
            }
        }
    ]);
    return Student;
})(Person);
  