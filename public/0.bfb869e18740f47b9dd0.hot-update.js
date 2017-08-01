webpackHotUpdate(0,{

/***/ 420:
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./frontend/pages/Welcome.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ 0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactBootstrap = __webpack_require__(/*! react-bootstrap */ 618);\n\nvar _ = __webpack_require__(/*! ../ */ 169);\n\nvar _2 = _interopRequireDefault(_);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Welcome = function (_React$Component) {\n  _inherits(Welcome, _React$Component);\n\n  function Welcome(props) {\n    _classCallCheck(this, Welcome);\n\n    var _this = _possibleConstructorReturn(this, (Welcome.__proto__ || Object.getPrototypeOf(Welcome)).call(this, props));\n\n    _this.state = {\n      showLoginModal: false,\n      showRegisterModal: false\n    };\n    return _this;\n  }\n\n  _createClass(Welcome, [{\n    key: 'closeLogin',\n    value: function closeLogin() {\n      this.setState({ showLoginModal: false });\n    }\n  }, {\n    key: 'openLogin',\n    value: function openLogin() {\n      this.setState({ showLoginModal: true });\n    }\n  }, {\n    key: 'closeRegister',\n    value: function closeRegister() {\n      this.setState({ showRegisterModal: false });\n    }\n  }, {\n    key: 'openRegister',\n    value: function openRegister() {\n      this.setState({ showRegisterModal: true });\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var _this2 = this;\n\n      return _react2.default.createElement(\n        'div',\n        { className: 'welcome-page' },\n        _react2.default.createElement(\n          _reactBootstrap.Button,\n          {\n            bsStyle: 'primary',\n            bsSize: 'large',\n            onClick: function onClick() {\n              return _this2.openLogin();\n            }\n          },\n          'Login'\n        ),\n        _react2.default.createElement(\n          _reactBootstrap.Button,\n          {\n            bsStyle: 'primary',\n            bsSize: 'large',\n            onClick: function onClick() {\n              return _this2.openRegister();\n            }\n          },\n          'Register'\n        ),\n        _react2.default.createElement(\n          _reactBootstrap.Modal,\n          { show: this.state.showLoginModal, onHide: function onHide() {\n              return _this2.closeLogin();\n            } },\n          _react2.default.createElement(\n            _reactBootstrap.Modal.Header,\n            { closeButton: true },\n            _react2.default.createElement(\n              _reactBootstrap.Modal.Title,\n              null,\n              'Login'\n            )\n          ),\n          _react2.default.createElement(\n            _reactBootstrap.Modal.Body,\n            null,\n            _react2.default.createElement(\n              'form',\n              null,\n              _react2.default.createElement(_reactBootstrap.FieldGroup, {\n                id: 'formControlsText',\n                type: 'text',\n                label: 'Text',\n                placeholder: 'Username'\n              }),\n              _react2.default.createElement(_reactBootstrap.FieldGroup, {\n                id: 'formControlsPassword',\n                label: 'Password',\n                type: 'password'\n              })\n            )\n          ),\n          _react2.default.createElement(\n            _reactBootstrap.Modal.Footer,\n            null,\n            _react2.default.createElement(\n              _reactBootstrap.Button,\n              { onClick: function onClick() {\n                  return _this2.closeLogin();\n                } },\n              'Login'\n            )\n          )\n        ),\n        _react2.default.createElement(\n          _reactBootstrap.Modal,\n          { show: this.state.showRegisterModal, onHide: function onHide() {\n              return _this2.closeRegister();\n            } },\n          _react2.default.createElement(\n            _reactBootstrap.Modal.Header,\n            { closeButton: true },\n            _react2.default.createElement(\n              _reactBootstrap.Modal.Title,\n              null,\n              'Register as a New User!'\n            )\n          ),\n          _react2.default.createElement(\n            _reactBootstrap.Modal.Body,\n            null,\n            _react2.default.createElement(\n              'form',\n              null,\n              _react2.default.createElement(_reactBootstrap.FieldGroup, {\n                id: 'formControlsFirstName',\n                type: 'text',\n                label: 'First name',\n                placeholder: 'First name'\n              }),\n              _react2.default.createElement(_reactBootstrap.FieldGroup, {\n                id: 'formControlsLastName',\n                type: 'text',\n                label: 'Last name',\n                placeholder: 'Last name'\n              }),\n              _react2.default.createElement(_reactBootstrap.FieldGroup, {\n                id: 'formControlsEmail',\n                type: 'text',\n                label: 'Username',\n                placeholder: 'Username'\n              }),\n              _react2.default.createElement(_reactBootstrap.FieldGroup, _defineProperty({\n                id: 'formControlsPassword',\n                type: 'text',\n                label: 'Password'\n              }, 'type', 'password')),\n              _react2.default.createElement(_reactBootstrap.FieldGroup, _defineProperty({\n                id: 'formControlsRepeatPassword',\n                type: 'text',\n                label: 'Repeat password'\n              }, 'type', 'password'))\n            )\n          ),\n          _react2.default.createElement(\n            _reactBootstrap.Modal.Footer,\n            null,\n            _react2.default.createElement(\n              _reactBootstrap.Button,\n              { onClick: function onClick() {\n                  return _this2.closeRegister();\n                } },\n              'Register'\n            )\n          )\n        )\n      );\n    }\n  }]);\n\n  return Welcome;\n}(_react2.default.Component);\n\nexports.default = Welcome;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDIwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2Zyb250ZW5kL3BhZ2VzL1dlbGNvbWUuanM/NWNkNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTW9kYWwsIEJ1dHRvbiwgRmllbGRHcm91cCwgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgQ29udHJvbExhYmVsIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi4vJ1xuXG5jbGFzcyBXZWxjb21lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2hvd0xvZ2luTW9kYWw6IGZhbHNlLFxuICAgICAgc2hvd1JlZ2lzdGVyTW9kYWw6IGZhbHNlXG4gICAgfTtcbiAgfVxuXG4gIGNsb3NlTG9naW4oKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dMb2dpbk1vZGFsOiBmYWxzZSB9KTtcbiAgfVxuXG4gIG9wZW5Mb2dpbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2hvd0xvZ2luTW9kYWw6IHRydWUgfSk7XG4gIH1cblxuICBjbG9zZVJlZ2lzdGVyKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93UmVnaXN0ZXJNb2RhbDogZmFsc2UgfSk7XG4gIH1cblxuICBvcGVuUmVnaXN0ZXIoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dSZWdpc3Rlck1vZGFsOiB0cnVlIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIndlbGNvbWUtcGFnZVwiPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgYnNTdHlsZT1cInByaW1hcnlcIlxuICAgICAgICAgIGJzU2l6ZT1cImxhcmdlXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLm9wZW5Mb2dpbigpfVxuICAgICAgICA+TG9naW5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBic1N0eWxlPVwicHJpbWFyeVwiXG4gICAgICAgICAgYnNTaXplPVwibGFyZ2VcIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMub3BlblJlZ2lzdGVyKCl9XG4gICAgICAgID5SZWdpc3RlclxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPE1vZGFsIHNob3c9e3RoaXMuc3RhdGUuc2hvd0xvZ2luTW9kYWx9IG9uSGlkZT17KCkgPT4gdGhpcy5jbG9zZUxvZ2luKCl9PlxuICAgICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XG4gICAgICAgICAgICA8TW9kYWwuVGl0bGU+TG9naW48L01vZGFsLlRpdGxlPlxuICAgICAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICAgICAgPGZvcm0+XG4gICAgICAgICAgICAgPEZpZWxkR3JvdXBcbiAgICAgICAgICAgICAgIGlkPVwiZm9ybUNvbnRyb2xzVGV4dFwiXG4gICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICBsYWJlbD1cIlRleHRcIlxuICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJVc2VybmFtZVwiXG4gICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICA8RmllbGRHcm91cFxuICAgICAgICAgICAgICAgaWQ9XCJmb3JtQ29udHJvbHNQYXNzd29yZFwiXG4gICAgICAgICAgICAgICBsYWJlbD1cIlBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgLz5cbiAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgIDwvTW9kYWwuQm9keT5cbiAgICAgICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXsoKSA9PiB0aGlzLmNsb3NlTG9naW4oKX0+TG9naW48L0J1dHRvbj5cbiAgICAgICAgICA8L01vZGFsLkZvb3Rlcj5cbiAgICAgICAgPC9Nb2RhbD5cblxuICAgICAgICA8TW9kYWwgc2hvdz17dGhpcy5zdGF0ZS5zaG93UmVnaXN0ZXJNb2RhbH0gb25IaWRlPXsoKSA9PiB0aGlzLmNsb3NlUmVnaXN0ZXIoKX0+XG4gICAgICAgICAgPE1vZGFsLkhlYWRlciBjbG9zZUJ1dHRvbj5cbiAgICAgICAgICAgIDxNb2RhbC5UaXRsZT5SZWdpc3RlciBhcyBhIE5ldyBVc2VyITwvTW9kYWwuVGl0bGU+XG4gICAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICAgICAgPE1vZGFsLkJvZHk+XG4gICAgICAgICAgICA8Zm9ybT5cbiAgICAgICAgICAgICA8RmllbGRHcm91cFxuICAgICAgICAgICAgICAgaWQ9XCJmb3JtQ29udHJvbHNGaXJzdE5hbWVcIlxuICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgbGFiZWw9XCJGaXJzdCBuYW1lXCJcbiAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRmlyc3QgbmFtZVwiXG4gICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICA8RmllbGRHcm91cFxuICAgICAgICAgICAgICAgaWQ9XCJmb3JtQ29udHJvbHNMYXN0TmFtZVwiXG4gICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICBsYWJlbD1cIkxhc3QgbmFtZVwiXG4gICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkxhc3QgbmFtZVwiXG4gICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICA8RmllbGRHcm91cFxuICAgICAgICAgICAgICAgaWQ9XCJmb3JtQ29udHJvbHNFbWFpbFwiXG4gICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICBsYWJlbD1cIlVzZXJuYW1lXCJcbiAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiVXNlcm5hbWVcIlxuICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgPEZpZWxkR3JvdXBcbiAgICAgICAgICAgICAgIGlkPVwiZm9ybUNvbnRyb2xzUGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgbGFiZWw9XCJQYXNzd29yZFwiXG4gICAgICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgPEZpZWxkR3JvdXBcbiAgICAgICAgICAgICAgIGlkPVwiZm9ybUNvbnRyb2xzUmVwZWF0UGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgbGFiZWw9XCJSZXBlYXQgcGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAvPlxuICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICAgIDxNb2RhbC5Gb290ZXI+XG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9eygpID0+IHRoaXMuY2xvc2VSZWdpc3RlcigpfT5SZWdpc3RlcjwvQnV0dG9uPlxuICAgICAgICAgIDwvTW9kYWwuRm9vdGVyPlxuICAgICAgICA8L01vZGFsPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBXZWxjb21lO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL3BhZ2VzL1dlbGNvbWUuanMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUZBO0FBSEE7QUFPQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFIQTtBQUFBO0FBQUE7QUFNQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBSEE7QUFBQTtBQUFBO0FBTUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUdBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFQQTtBQURBO0FBZUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQW5CQTtBQXdCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUF6QkE7QUFEQTtBQWtDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBdENBO0FBckNBO0FBaUZBOzs7O0FBN0dBO0FBQ0E7QUErR0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///420\n");

/***/ })

})