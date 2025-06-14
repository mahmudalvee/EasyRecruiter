import {
  NgForOf
} from "./chunk-AWG6DRI7.js";
import {
  BehaviorSubject,
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  HostBinding,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  Optional,
  Renderer2,
  __async,
  isDevMode,
  map,
  setClassMetadata,
  skip,
  tap,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵtemplate
} from "./chunk-MOADAK7L.js";

// node_modules/@progress/kendo-angular-l10n/fesm2022/progress-kendo-angular-l10n.mjs
var MessageService = class _MessageService {
  /**
   * @hidden
   */
  constructor() {
  }
  /**
   * @hidden
   */
  changes = new BehaviorSubject({
    rtl: void 0
  });
  /**
   * Notifies the components that the messages were changed.
   *
   * @param rtl - (Optional) A new value for the [text direction token]({% slug api_l10n_rtl %}).
   */
  notify(rtl) {
    this.changes.next({
      rtl
    });
  }
  /**
   * Returns a localized message for the supplied key.
   *
   * @param _key - The message key. For example, `"kendo.grid.noRecords"`.
   * @return - The localized message for this key or `undefined` if not found.
   */
  get(_key) {
    return void 0;
  }
  static ɵfac = function MessageService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MessageService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _MessageService,
    factory: _MessageService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MessageService, [{
    type: Injectable
  }], function() {
    return [];
  }, null);
})();
var ComponentMessages = class _ComponentMessages {
  service;
  subscription;
  get override() {
    return false;
  }
  ngOnChanges(changes) {
    this.register(changes);
    if (Object.keys(changes).some((field) => !changes[field].isFirstChange())) {
      this.service.notifyChanges();
    }
  }
  ngOnInit() {
    this.subscription = this.service.changes.pipe(skip(1)).subscribe(() => this.register(this));
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  register(changes) {
    const keys = Object.keys(changes);
    keys.forEach((key) => this.service.register(key, this[key], this.override));
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  static ɵfac = function ComponentMessages_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ComponentMessages)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _ComponentMessages,
    features: [ɵɵNgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ComponentMessages, [{
    type: Directive,
    args: [{}]
  }], null, null);
})();
var RTL = new InjectionToken("Kendo UI Right-to-Left token");
var L10N_PREFIX = new InjectionToken("Localization key prefix");
var LocalizationService = class _LocalizationService {
  prefix;
  messageService;
  _rtl;
  changes;
  subscription;
  dictionary = {};
  constructor(prefix, messageService, _rtl) {
    this.prefix = prefix;
    this.messageService = messageService;
    this._rtl = _rtl;
    this.changes = new BehaviorSubject({
      rtl: this._rtl
    });
    if (messageService) {
      this.subscription = messageService.changes.pipe(map(({
        rtl
      }) => rtl !== void 0 ? rtl : this._rtl), tap((rtl) => this._rtl = rtl)).subscribe((rtl) => {
        this.dictionary = {};
        this.changes.next({
          rtl
        });
      });
    }
  }
  get rtl() {
    return this._rtl;
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  get(shortKey) {
    const key = this.key(shortKey);
    return this.dictionary[key];
  }
  register(shortKey, value, override = false) {
    const key = this.key(shortKey);
    let message = value;
    if (!override) {
      if (Object.hasOwnProperty.call(this.dictionary, key)) {
        return;
      }
      message = this.defaultValue(key, value);
    }
    this.dictionary[key] = message;
  }
  notifyChanges() {
    this.changes.next({
      rtl: this.rtl
    });
  }
  key(shortKey) {
    return this.prefix + "." + shortKey;
  }
  defaultValue(key, value) {
    if (!this.messageService) {
      return value;
    }
    const alt = this.messageService.get(key);
    return alt === void 0 ? value : alt;
  }
  static ɵfac = function LocalizationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LocalizationService)(ɵɵinject(L10N_PREFIX), ɵɵinject(MessageService, 8), ɵɵinject(RTL, 8));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _LocalizationService,
    factory: _LocalizationService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LocalizationService, [{
    type: Injectable
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [L10N_PREFIX]
      }]
    }, {
      type: MessageService,
      decorators: [{
        type: Optional
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Optional
      }, {
        type: Inject,
        args: [RTL]
      }]
    }];
  }, null);
})();

// node_modules/@progress/kendo-licensing/dist/index.mjs
function _0x4d92(_0x2376d0, _0x167ebe) {
  const _0x21589c = _0x2158();
  return _0x4d92 = function(_0x4d924c, _0xdb8786) {
    _0x4d924c = _0x4d924c - 307;
    let _0x348bac = _0x21589c[_0x4d924c];
    if (_0x4d92["gUKDvc"] === void 0) {
      var _0x2cc6dd = function(_0x42ee6a) {
        const _0x548ea6 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";
        let _0x58dc42 = "", _0x21f63f = "";
        for (let _0x8f4917 = 0, _0x144803, _0x409a79, _0x1a70dc = 0; _0x409a79 = _0x42ee6a["charAt"](_0x1a70dc++); ~_0x409a79 && (_0x144803 = _0x8f4917 % 4 ? _0x144803 * 64 + _0x409a79 : _0x409a79, _0x8f4917++ % 4) ? _0x58dc42 += String["fromCharCode"](255 & _0x144803 >> (-2 * _0x8f4917 & 6)) : 0) {
          _0x409a79 = _0x548ea6["indexOf"](_0x409a79);
        }
        for (let _0x1803122 = 0, _0x1c0fba2 = _0x58dc42["length"]; _0x1803122 < _0x1c0fba2; _0x1803122++) {
          _0x21f63f += "%" + ("00" + _0x58dc42["charCodeAt"](_0x1803122)["toString"](16))["slice"](-2);
        }
        return decodeURIComponent(_0x21f63f);
      };
      _0x4d92["LtQmWo"] = _0x2cc6dd, _0x2376d0 = arguments, _0x4d92["gUKDvc"] = !![];
    }
    const _0x5c3af7 = _0x21589c[0], _0x7aa830 = _0x4d924c + _0x5c3af7, _0x26f2ee = _0x2376d0[_0x7aa830];
    return !_0x26f2ee ? (_0x348bac = _0x4d92["LtQmWo"](_0x348bac), _0x2376d0[_0x7aa830] = _0x348bac) : _0x348bac = _0x26f2ee, _0x348bac;
  }, _0x4d92(_0x2376d0, _0x167ebe);
}
var _0x5377ad = _0x4d92;
(function(_0xe2a671, _0x55c171) {
  const _0x113beb = _0x4d92, _0x147a01 = _0xe2a671();
  while (!![]) {
    try {
      const _0x15d0c2 = -parseInt(_0x113beb(367)) / 1 + parseInt(_0x113beb(321)) / 2 + parseInt(_0x113beb(364)) / 3 + -parseInt(_0x113beb(433)) / 4 * (-parseInt(_0x113beb(322)) / 5) + -parseInt(_0x113beb(473)) / 6 * (parseInt(_0x113beb(435)) / 7) + parseInt(_0x113beb(312)) / 8 + -parseInt(_0x113beb(442)) / 9;
      if (_0x15d0c2 === _0x55c171) break;
      else _0x147a01["push"](_0x147a01["shift"]());
    } catch (_0x5c1246) {
      _0x147a01["push"](_0x147a01["shift"]());
    }
  }
})(_0x2158, 333496);
var GRACE_SUBSCRIPTION_DAYS = 10;
var JWT_LICENSE_EVIDENCE_TYPE = _0x5377ad(437);
var LOG_HEADER = _0x5377ad(467);
var PUBLIC_KEY = _0x5377ad(324);
var logHeader = (_0x19a3db, _0x5e126e) => "[" + _0x19a3db + "]" + ("[" + LOG_HEADER + "]") + (_0x5e126e ? " " + _0x5e126e + ":" : "");
function toNumericDate(_0x262b54) {
  const _0x23775a = _0x5377ad;
  return Math[_0x23775a(449)](_0x262b54[_0x23775a(475)]() / 1e3);
}
function addDays(_0x499b40, _0x3323fe) {
  const _0x59e15e = _0x5377ad, _0x25f936 = new Date(_0x499b40 * 1e3);
  return _0x25f936[_0x59e15e(347)](_0x25f936[_0x59e15e(401)]() + _0x3323fe), toNumericDate(_0x25f936);
}
function getCurrentDate() {
  return toNumericDate(/* @__PURE__ */ new Date());
}
function daysSinceToday(_0x52b8e4) {
  const _0x74e18e = _0x5377ad, _0x250c28 = getCurrentDate() - toNumericDate(_0x52b8e4), _0x180f40 = Math[_0x74e18e(449)](_0x250c28 / (24 * 60 * 60));
  return _0x180f40;
}
function decodeString(_0xbd2aeb) {
  const _0x1d0c29 = _0x5377ad;
  if (typeof atob === _0x1d0c29(410)) {
    if (_0x1d0c29(372) === _0x1d0c29(372)) return atob(_0xbd2aeb);
    else {
      const _0x27851d = _0x45eb19 ^ _0x3e027d;
      return _0x3a5992 = _0x3730b8, _0x27851d;
    }
  }
  if (typeof Buffer === _0x1d0c29(410)) {
    if (_0x1d0c29(465) !== _0x1d0c29(426)) return Buffer[_0x1d0c29(331)](_0xbd2aeb, _0x1d0c29(438))[_0x1d0c29(317)](_0x1d0c29(461));
    else {
      var _0x2c92b2, _0x222fc0;
      return _0x5982dc[_0x1d0c29(316)] === _0x234d23[_0x1d0c29(427)] || ((_0x2c92b2 = _0x6250bd[_0x1d0c29(310)]) === null || _0x2c92b2 === void 0 ? void 0 : _0x2c92b2[_0x1d0c29(382)](_0x48ef7f[_0x1d0c29(427)])) || ((_0x222fc0 = _0x5264b6[_0x1d0c29(344)]) === null || _0x222fc0 === void 0 ? void 0 : _0x222fc0[_0x1d0c29(382)](_0x318dc8[_0x1d0c29(427)]));
    }
  }
  throw new Error(_0x1d0c29(451));
}
function decodeBase64(_0x3ac1da) {
  const _0x530df7 = _0x5377ad, _0x589f8e = decodeString(_0x3ac1da), _0x4bc848 = new Uint8Array(_0x589f8e[_0x530df7(434)]);
  for (let _0x4c6a4b = 0; _0x4c6a4b < _0x589f8e[_0x530df7(434)]; _0x4c6a4b++) {
    if (_0x530df7(395) === _0x530df7(386)) {
      const _0x54c0ea = _0x2a8377(_0x4e61ea), _0xfafbab = new _0x4dd5c5(_0x54c0ea[_0x530df7(434)]);
      for (let _0x1f8ca1 = 0; _0x1f8ca1 < _0x54c0ea[_0x530df7(434)]; _0x1f8ca1++) {
        _0xfafbab[_0x1f8ca1] = _0x54c0ea[_0x530df7(369)](_0x1f8ca1);
      }
      return _0xfafbab;
    } else _0x4bc848[_0x4c6a4b] = _0x589f8e[_0x530df7(369)](_0x4c6a4b);
  }
  return _0x4bc848;
}
function decodeBase64Url(_0x348eeb) {
  const _0x12e0f2 = _0x5377ad, _0x532041 = _0x348eeb[_0x12e0f2(385)](/-/g, "+")[_0x12e0f2(385)](/_/g, "/");
  return decodeBase64(_0x532041);
}
function decodeLicenseEvidence(_0x633c41) {
  const _0x50e9cc = _0x5377ad, _0x93a1df = _0x633c41[_0x50e9cc(390)](".")[1], _0x5b1686 = String[_0x50e9cc(329)](...decodeBase64Url(_0x93a1df));
  return JSON[_0x50e9cc(425)](_0x5b1686);
}
function toDate(_0x3d4a04) {
  return new Date(_0x3d4a04 * 1e3);
}
function isExpired(_0x26de76, _0x52401c) {
  const _0x258672 = _0x5377ad, _0xe88086 = toDate(_0x52401c), _0x2c5704 = new Date(_0xe88086[_0x258672(388)](), _0xe88086[_0x258672(459)](), _0xe88086[_0x258672(401)]() + 1), _0x16aeb6 = _0x2c5704[_0x258672(475)]() / 1e3;
  return _0x26de76 > _0x16aeb6;
}
function findPackageLicense(_0x2af745, _0x1707d0) {
  const _0x466839 = _0x5377ad, _0x438d3d = _0x1707d0[_0x466839(340)]((_0x3893c9) => _0x3893c9[_0x466839(436)] !== _0x466839(466))[_0x466839(340)]((_0x1a0a20) => {
    const _0x711b08 = _0x466839;
    if (_0x711b08(353) !== _0x711b08(408)) {
      var _0x92a8a2, _0xb380a2;
      return _0x2af745[_0x711b08(316)] === _0x1a0a20[_0x711b08(427)] || ((_0x92a8a2 = _0x2af745[_0x711b08(310)]) === null || _0x92a8a2 === void 0 ? void 0 : _0x92a8a2[_0x711b08(382)](_0x1a0a20[_0x711b08(427)])) || ((_0xb380a2 = _0x2af745[_0x711b08(344)]) === null || _0xb380a2 === void 0 ? void 0 : _0xb380a2[_0x711b08(382)](_0x1a0a20[_0x711b08(427)]));
    } else {
      this[_0x711b08(366)] = _0x12519a, this[_0x711b08(404)] = _0x711b08(373), this[_0x711b08(427)] = _0x711b08(357);
      const _0x45eff4 = _0x318be5 ? _0x711b08(336) + _0xe92a75 : "";
      this[_0x711b08(387)] = _0x711b08(319) + _0x313547[_0x711b08(330)]() + _0x711b08(418) + ("" + _0x293c36 + _0x45eff4 + _0x711b08(342) + _0x52e88f[_0x711b08(330)]() + ".\n") + _0x711b08(441);
    }
  })[_0x466839(411)]((_0x5e36be, _0x19c2ff) => _0x19c2ff[_0x466839(314)] - _0x5e36be[_0x466839(314)]), _0x848be1 = () => _0x438d3d[_0x466839(398)]((_0x29e0e7) => _0x29e0e7[_0x466839(436)] === _0x466839(424) && !isExpired(getCurrentDate(), _0x29e0e7[_0x466839(314)])), _0x3f6ae6 = () => _0x438d3d[_0x466839(398)]((_0x3e838) => _0x3e838[_0x466839(436)] === _0x466839(381) && !isExpired(_0x2af745[_0x466839(318)], _0x3e838[_0x466839(314)])), _0x3804b1 = () => _0x438d3d[_0x466839(398)]((_0x2c6ada) => _0x2c6ada[_0x466839(436)] === _0x466839(424) && !isExpired(addDays(getCurrentDate(), GRACE_SUBSCRIPTION_DAYS), _0x2c6ada[_0x466839(314)])), _0x479e3f = () => _0x438d3d[_0x466839(398)]((_0x12e382) => _0x12e382[_0x466839(436)] === _0x466839(455) && !isExpired(getCurrentDate(), _0x12e382[_0x466839(314)])), _0x5e8922 = () => _0x438d3d[_0x466839(398)]((_0x1b5747) => _0x1b5747[_0x466839(436)] === _0x466839(381)), _0x1d2bd3 = () => _0x438d3d[_0x466839(398)]((_0x2f332d) => _0x2f332d[_0x466839(436)] === _0x466839(424)), _0xfc80b0 = () => _0x438d3d[_0x466839(398)]((_0x4d8e50) => _0x4d8e50[_0x466839(436)] === _0x466839(455));
  return _0x848be1() || _0x3f6ae6() || _0x3804b1() || _0x479e3f() || _0x1d2bd3() || _0x5e8922() || _0xfc80b0();
}
function findRuntimeLicense(_0x269f65, _0x2b5475) {
  const _0x585101 = _0x5377ad;
  var _0x24f98d, _0x5d309d;
  let _0x47771f = [];
  if (((_0x24f98d = _0x269f65[_0x585101(348)]) === null || _0x24f98d === void 0 ? void 0 : _0x24f98d[_0x585101(434)]) > 0) _0x585101(339) === _0x585101(360) ? _0x5502ca = !![] : _0x47771f = _0x269f65[_0x585101(348)][_0x585101(471)]((_0x399b26) => decodeLicenseEvidence(_0x399b26));
  else {
    if (((_0x5d309d = _0x269f65[_0x585101(469)]) === null || _0x5d309d === void 0 ? void 0 : _0x5d309d[_0x585101(434)]) > 0) {
      if (_0x585101(412) === _0x585101(412)) _0x47771f = _0x269f65[_0x585101(469)][_0x585101(471)]((_0x3d8610) => ({
        "type": _0x3d8610[_0x585101(455)] ? _0x585101(455) : _0x585101(381),
        "code": _0x3d8610[_0x585101(427)],
        "expiration": _0x3d8610[_0x585101(474)],
        "licenseId": null,
        "userId": _0x269f65[_0x585101(460)]
      }));
      else {
        const _0x2edea2 = _0x3990e2[_0x585101(425)](_0x19e0bf[_0x585101(351)]);
        _0x4ca1a4[_0x585101(469)] = [..._0x2edea2[_0x585101(469)], ..._0x43a9f3[_0x585101(469)]], _0x5d6ebe[_0x585101(348)] = [..._0x2edea2[_0x585101(348)], ..._0x1643dc[_0x585101(348)]];
      }
    }
  }
  return findPackageLicense(_0x2b5475, _0x47771f);
}
var getProductCode = (_0x32a22f) => _0x32a22f[_0x5377ad(316)] || _0x32a22f[_0x5377ad(344)][0];
var NoLicenseFoundRuntimeError = class {
  constructor(_0x4a1e2b) {
    const _0x104893 = _0x5377ad;
    this[_0x104893(366)] = _0x4a1e2b, this[_0x104893(404)] = _0x104893(373), this[_0x104893(427)] = _0x104893(309), this[_0x104893(387)] = _0x104893(379) + _0x104893(429);
  }
};
var ProductNotLicensedRuntimeError = class {
  constructor(_0xe45df6, _0x1e76c6) {
    const _0x30716e = _0x5377ad;
    this[_0x30716e(366)] = _0xe45df6, this[_0x30716e(404)] = _0x30716e(373), this[_0x30716e(427)] = _0x30716e(332), this[_0x30716e(387)] = _0xe45df6 + _0x30716e(452) + (_0x30716e(397) + _0xe45df6 + _0x30716e(400) + _0x1e76c6);
  }
};
var ExpiredTrialLicenseRuntimeError = class {
  constructor(_0x1dba59, _0x5069fa) {
    const _0x33d26b = _0x5377ad;
    this[_0x33d26b(366)] = _0x1dba59, this[_0x33d26b(404)] = _0x33d26b(373), this[_0x33d26b(427)] = _0x33d26b(419), this[_0x33d26b(387)] = _0x33d26b(420) + _0x5069fa + _0x33d26b(431) + (_0x33d26b(407) + _0x1dba59 + _0x33d26b(450)) + _0x33d26b(359);
  }
};
var ExpiredLicenseRuntimeError = class {
  constructor(_0x2be9b9, _0x51dbe9, _0x21245b, _0x18aee9) {
    const _0x363371 = _0x5377ad;
    this[_0x363371(366)] = _0x2be9b9, this[_0x363371(404)] = _0x363371(373), this[_0x363371(427)] = _0x363371(357);
    const _0x3a5b3a = _0x21245b ? _0x363371(336) + _0x21245b : "";
    this[_0x363371(387)] = _0x363371(319) + _0x51dbe9[_0x363371(330)]() + _0x363371(418) + ("" + _0x2be9b9 + _0x3a5b3a + _0x363371(342) + _0x18aee9[_0x363371(330)]() + ".\n") + _0x363371(441);
  }
};
var TrialLicenseRuntimeInfo = class {
  constructor(_0x4fe8f5, _0x523b4c) {
    const _0x188f36 = _0x5377ad;
    this[_0x188f36(366)] = _0x4fe8f5, this[_0x188f36(404)] = _0x188f36(352), this[_0x188f36(387)] = _0x188f36(362) + -_0x523b4c + _0x188f36(389) + _0x188f36(445);
  }
};
function importRsaKey(_0x451839) {
  const _0x50b41e = _0x5377ad, _0x2933d5 = _0x50b41e(335), _0x44716c = _0x50b41e(380), _0x3e5cb9 = _0x451839[_0x50b41e(385)](_0x2933d5, "")[_0x50b41e(385)](_0x44716c, "")[_0x50b41e(385)](/\n/gm, ""), _0x534f99 = decodeBase64(_0x3e5cb9);
  return crypto[_0x50b41e(394)][_0x50b41e(422)](_0x50b41e(405), _0x534f99, {
    "name": _0x50b41e(440),
    "hash": _0x50b41e(457)
  }, !![], [_0x50b41e(458)]);
}
function verifyLicenseEvidence(_0x34c356, _0x2c9e2d) {
  return __async(this, null, function* () {
    const _0x180d15 = _0x5377ad;
    if (typeof crypto !== _0x180d15(454) || typeof crypto[_0x180d15(394)] !== _0x180d15(454) || typeof TextEncoder !== _0x180d15(410) || typeof TextDecoder !== _0x180d15(410)) {
      if (_0x180d15(439) !== _0x180d15(396)) return;
      else {
        const _0x3f3659 = _0x34a581(_0x1582e2(_0x7bf33b[_0x180d15(314)]));
        _0x34c51f(_0x5506c5(), _0x25c113[_0x180d15(314)]) ? _0x28a253 = new _0x14430e(_0x3f997d[_0x180d15(366)], _0x3f3659) : (_0x36c8f5 = new _0x837e95(_0x56f6a2[_0x180d15(366)], _0x3f3659), _0x12c799 = !![]);
      }
    }
    const _0x4b923b = crypto[_0x180d15(394)], [_0x945bd5, _0x1a6c89, _0x4acf1c] = _0x34c356[_0x180d15(390)]("."), _0x53b8d4 = decodeBase64Url(_0x4acf1c), _0x2d65ab = new TextEncoder(), _0x3c573a = new TextDecoder(), _0x390a5b = _0x2d65ab[_0x180d15(327)](_0x945bd5 + "." + _0x1a6c89), _0x350a5a = _0x3c573a[_0x180d15(421)](decodeBase64Url(_0x945bd5)), _0x56b72c = JSON[_0x180d15(425)](_0x350a5a)[_0x180d15(376)] === JWT_LICENSE_EVIDENCE_TYPE;
    if (!_0x56b72c) {
      if (_0x180d15(392) !== _0x180d15(323)) throw new Error(_0x180d15(472));
      else {
        if (_0x1099c9[_0x180d15(456)](_0x46bd71[_0x180d15(453)])) return _0x4bcdc1[_0x180d15(354)](_0x3030b0[_0x180d15(453)]);
        const {
          isLicenseValid: _0x3a9fa0,
          message: _0x373847
        } = _0x3e7f38(_0x5b5d09), _0x5317c2 = _0x34b005(_0x12e66f);
        return _0x373847 && !_0x5d7ae8[_0x180d15(456)](_0x5317c2) && (_0x57b5ff(_0x373847, _0x5ee0c0), _0xc5232[_0x180d15(463)](_0x5317c2)), _0x5b533c[_0x180d15(399)](_0x36008[_0x180d15(453)], _0x3a9fa0), _0x3a9fa0;
      }
    }
    const _0x3bbfad = yield importRsaKey(_0x2c9e2d), _0x5783e2 = yield _0x4b923b[_0x180d15(458)](_0x3bbfad[_0x180d15(326)], _0x3bbfad, _0x53b8d4, _0x390a5b);
    if (!_0x5783e2) {
      if (_0x180d15(446) === _0x180d15(446)) throw new Error(_0x180d15(308));
      else _0x51af4d[_0x180d15(358)](_0x142c10);
    }
  });
}
var context = {
  data: "  {}  "
};
var publicKey = PUBLIC_KEY;
var cache = /* @__PURE__ */ new Map();
var touchedProducts = /* @__PURE__ */ new Set();
function _0x2158() {
  const _0x16f6f4 = ["yLD1B3O", "vvrMAgy", "igfUzcbPCYbUB3qGDMfSAwqGzM9Yia", "veTmmJaZ", "ww91CIb0CMLHBcbOyxmGzxHWAxjLzca", "zgvJB2rL", "Aw1WB3j0s2v5", "yNn4yva", "C3vIC2nYAxb0Aw9U", "CgfYC2u", "z3HvvK4", "y29Kzq", "vunJAum", "icbuBYbKB3DUBg9HzcbHigXPy2vUC2uGA2v5igzPBguSihzPC2L0igH0DhbZoI8VChjNCMvZCY5JBY8ZuhDrtuTA", "CwruBuC", "igrHEsHZksbHz28UcG", "z3jVDxa", "ndm2me5RzLP1Cq", "BgvUz3rO", "mJyXntjsuvP3z3y", "DhLWzq", "vgvSzxjPAYbmAwnLBNnLiev2AwrLBMnL", "yMfZzty0", "EMnSvNO", "uLnbu1nblvblq1mXlxyXxZu", "icbszw5LDYb5B3vYigXPy2vUC2uGyxqGAhr0Chm6lY9WCMDYzxnZlMnVlZnqEdLTnuy", "mtC2nZeZmKjqDgnnqW", "DgLTzxn0yw1W", "DMvYC2LVBG", "icbuBYbHy3f1AxjLigeGy29TBwvYy2LHBcbSAwnLBNnLlcb2AxnPDcbODhrWCZOVl3bYz3jLC3mUy28Vm1b5seLVsa", "zKLjz2m", "ywXS", "ANntr0K", "zMXVB3i", "lcb3zsbOB3bLihLVDsbLBMPVEwvKihLVDxiGDhjPywWGCgvYAw9KlGO", "yxrVyIbPCYb1BMrLzMLUzwq", "igLZig5VDcbSAxn0zwqGAw4GEw91CIbJDxjYzw50igXPy2vUC2uGzMLSzs4k", "BMfTzq", "B2jQzwn0", "DhjPywW", "AgfZ", "u0Hblti1nG", "DMvYAwz5", "z2v0tw9UDgG", "DxnLCKLK", "DxrMoa", "DK9jzgS", "ywrK", "DgHLBG", "rhn4Dei", "DxnHz2u", "vgvSzxjPAYbHBMqGs2vUzg8GvuKGtgLJzw5ZAw5N", "BgLJzw5ZAw5Nrg9JC1vYBa", "ChjVzhvJDhm", "y2f0y2G", "BwfW", "vw5RBM93BIbSAwnLBNnLigv2AwrLBMnLihr5Cgu", "nZy4AgTZu1Lz", "BgLJzw5Zzuv4CgLYyxrPB25eyxrL", "z2v0vgLTzq", "z3jVDxbfBMq", "sw52ywXPzcbSAwnLBNnLigv2AwrLBMnL", "veTmmJaX", "CMvKAxn0CMLIDxrLzej5", "q2jNAw0", "nda5mda5nKfotKXIsq", "rM1rwMq", "zxHWAxjHDgLVBG", "BvHUwgu", "ChjVzhvJDenVzgu", "Dg9tDhjPBMC", "ChvIBgLZAerHDgu", "ww91CIbJDxjYzw50igXPy2vUC2uGAgfZigv4CgLYzwqGB24G", "C3bSAwnL", "ndmXmdq2EfzhsxPw", "mJe1twHgtfPP", "vw13Egm", "ls0Tls1cruDjtIbqvujmsumGs0vzls0Tls0ktuLjqKLQqu5cz2TXAgTPrZL3mejbuuvgqufpq0froefnsuLcq2Dlq0frrueYBw5vvK1TA3rOmNGRtI9prhn6rWPprKLzqKW2tK9pmvHxuMOXD2TTzwnlDuX6AuPeAez6mfDrBxLpALKZnfLTzZLWthvcqtLru1DYCLP1DLb3ndbocM0Wwc9hqM10DezTue52y2eZv21kmM9lttDqCeXPvvu5zJDpDJvxzuLyBNGRk3rZl0Xdl09cn0z0wITmAvjNsJCkmg1ABLbLvg9NzezYqvnMmhPtuuP2ngPTwdG0meXqytzUB21xzvvNsvzhueXmvKKXneDPyJHeBcTUt2nRCunoyWPRqvvvAZrjqKy2n0r1zLj0oxPrEvj4zZK5ExnHA3ziwdjtrgjKr3zjqMr4v3H2AgHTCKjVzwL4mhvtvNrhmMDTcMPKDLnXBfbkvMr2twjRmvHLmITtvwXKsLbYEeGXvNjuwwvsvxq0ExfxEhKXnM5gsLveAJLLEfOYmdjynfriA1uksLfjrefrquikls0Tls1ftKqGufvcteLdieTfws0Tls0T", "zg5zEhC", "ywXNB3jPDgHT", "zw5JB2rL", "DMP0B1i", "zNjVBunOyxjdB2rL", "Dg9mB2nHBgveyxrLu3rYAw5N", "zNjVBq", "veTmmJaY", "EfDuzMm", "AM9PBG", "ls0Tls1cruDjtIbqvujmsumGs0vzls0Tls0", "ihzLCNnPB24G", "AKziDK0", "zMjfs3O", "Bxbuzfi", "zMLSDgvY", "DvPPt1C", "lIbuAguGChjVzhvJDcb3yxmGChvIBgLZAgvKig9Uia", "CgfYC2vjBNq", "ChjVzhvJDenVzgvZ", "Dw5KzwzPBMvK", "qvHeswW", "C2v0rgf0zq", "BgLJzw5Zzxm", "D3HsBNO", "C3rYAw5NAwz5", "zgf0yq", "su5gtW", "rhbnz00", "z2v0", "DhjPBq", "AvnVCxe", "veTmmJa0", "D2fYBG", "icbuBYbJB250Aw51zsb1C2LUzYbVDxiGChjVzhvJDcWGy29UC2LKzxiGDxbNCMfKAw5NihrVigeGy29TBwvYy2LHBcbSAwnLBNnLoIbODhrWCZOVl3bYz3jLC3mUy28Vm0m5BxiXtq", "D1jAsgu", "q2rwuhe", "ww91CIbuCMLHBcbSAwnLBNnLihDPBgWGzxHWAxjLigLUia", "ALPoyKG", "mti5nZmZnuXku1DAvW", "D3LevfG", "ChjVzhvJDe5HBwu", "mtK4mdq4B0jiEuX4", "s3jLC3G", "y2HHCKnVzgvbDa", "DejjvLu", "sKzkuvK", "y0j1C3G", "v0fstG", "AxnbCNjHEq", "teLcC1C", "DhLW", "tuXVBxq", "y2XLyxi", "tM8GvgvSzxjPAYbHBMqGs2vUzg8GvuKGtgLJzw5ZzsbMB3vUzc4k", "ls0Tls1ftKqGufvcteLdieTfws0Tls0T", "CgvYCgv0DwfS", "Aw5JBhvKzxm", "ChvZAa", "yMvTALi", "CMvWBgfJzq", "BvDPyMS", "BwvZC2fNzq", "z2v0rNvSBfLLyxi", "igrHEsHZks4k", "C3bSAxq", "Du5ezeO", "qK9PzKK", "AfvhwNy", "C3vIDgXL", "rfLjseq", "shLIEfC", "icbmzwfYBIbTB3jLigfIB3v0ia", "zMLUza", "C2v0", "igXPy2vUC2LUzYbHDca", "z2v0rgf0zq", "C2XPy2u", "q2LXqNG", "C2v2zxjPDhK", "C3bRAq", "C2nYAxb0s2v5", "icbuAgfUAYb5B3uGzM9YihrYEwLUzYbVDxqG", "r053tvC", "rgLMAMG", "zNvUy3rPB24", "C29YDa", "C2PbDNm", "v0rkz0m", "De93vhK", "D0j1wK0"];
  _0x2158 = function() {
    return _0x16f6f4;
  };
  return _0x2158();
}
var validateEvidencesCache = !![];
var validateEvidences = (_0x423ec4) => {
  const _0x3b6518 = _0x5377ad;
  var _0x212c56, _0x44fc41;
  return ((_0x212c56 = _0x423ec4[_0x3b6518(348)]) === null || _0x212c56 === void 0 ? void 0 : _0x212c56[_0x3b6518(434)]) > 0 && (_0x3b6518(328) !== _0x3b6518(361) ? Promise[_0x3b6518(447)]((_0x44fc41 = _0x423ec4[_0x3b6518(348)]) === null || _0x44fc41 === void 0 ? void 0 : _0x44fc41[_0x3b6518(471)]((_0x9b7a66) => verifyLicenseEvidence(_0x9b7a66, publicKey)))[_0x3b6518(464)](() => {
    const _0x373be9 = _0x3b6518;
    _0x373be9(371) !== _0x373be9(371) ? ((void 0)[_0x373be9(366)] = _0xa0e9fa, (void 0)[_0x373be9(404)] = _0x373be9(352), (void 0)[_0x373be9(387)] = _0x373be9(362) + -_0x3c322c + _0x373be9(389) + _0x373be9(445)) : validateEvidencesCache = !![];
  })[_0x3b6518(470)](() => {
    const _0xaf8377 = _0x3b6518;
    _0xaf8377(325) === _0xaf8377(384) ? (_0x279ee5(_0x40a78e, _0x376352), _0x1de0d9[_0xaf8377(463)](_0x9e336f)) : (validateEvidencesCache = ![], cache[_0xaf8377(378)]());
  }) : _0x4919fc = _0x176fb4[_0x3b6518(348)][_0x3b6518(471)]((_0x45317c) => _0x23b881(_0x45317c))), validateEvidencesCache;
};
function getLicenseStatus(_0x31ef35) {
  const _0x3fc971 = _0x5377ad, _0x4d8683 = JSON[_0x3fc971(425)](context[_0x3fc971(351)]), _0x294092 = !_0x4d8683[_0x3fc971(406)] && !_0x4d8683[_0x3fc971(443)], _0x2f7d80 = _0x4d8683[_0x3fc971(406)] && typeof KendoLicensing === _0x3fc971(345);
  let _0x1bea30, _0x533f0a = ![], _0x3b9651;
  if (_0x294092 || _0x2f7d80 || !validateEvidences(_0x4d8683)) _0x3fc971(346) !== _0x3fc971(346) ? _0x172134 = new _0xd45048(_0x20f331[_0x3fc971(366)], _0x5b103b[_0x3fc971(468)]) : _0x1bea30 = new NoLicenseFoundRuntimeError(_0x31ef35[_0x3fc971(366)]);
  else {
    if (_0x3fc971(338) === _0x3fc971(338)) {
      _0x3b9651 = findRuntimeLicense(_0x4d8683, _0x31ef35);
      if (!_0x3b9651) _0x3fc971(333) !== _0x3fc971(391) ? _0x1bea30 = new ProductNotLicensedRuntimeError(_0x31ef35[_0x3fc971(366)], _0x31ef35[_0x3fc971(468)]) : _0xa096c8 = new _0x98da4d(_0x16eef4[_0x3fc971(366)], _0x1785ac);
      else {
        if (_0x3b9651[_0x3fc971(436)] === _0x3fc971(455)) {
          if (_0x3fc971(363) === _0x3fc971(363)) {
            const _0x3cc7d0 = daysSinceToday(toDate(_0x3b9651[_0x3fc971(314)]));
            if (isExpired(getCurrentDate(), _0x3b9651[_0x3fc971(314)])) _0x3fc971(341) === _0x3fc971(341) ? _0x1bea30 = new ExpiredTrialLicenseRuntimeError(_0x31ef35[_0x3fc971(366)], _0x3cc7d0) : _0x35f50f = _0x1bc909[_0x3fc971(469)][_0x3fc971(471)]((_0x4b3376) => ({
              "type": _0x4b3376[_0x3fc971(455)] ? _0x3fc971(455) : _0x3fc971(381),
              "code": _0x4b3376[_0x3fc971(427)],
              "expiration": _0x4b3376[_0x3fc971(474)],
              "licenseId": null,
              "userId": _0x50a162[_0x3fc971(460)]
            }));
            else {
              if (_0x3fc971(413) !== _0x3fc971(375)) _0x1bea30 = new TrialLicenseRuntimeInfo(_0x31ef35[_0x3fc971(366)], _0x3cc7d0), _0x533f0a = !![];
              else {
                const _0x5a33b4 = _0x43aa00(_0x26c514), _0x3e53a3 = new _0x160981(_0x5a33b4[_0x3fc971(388)](), _0x5a33b4[_0x3fc971(459)](), _0x5a33b4[_0x3fc971(401)]() + 1), _0x242b25 = _0x3e53a3[_0x3fc971(475)]() / 1e3;
                return _0x30d191 > _0x242b25;
              }
            }
          } else throw new _0x448cfd(_0x3fc971(472));
        } else {
          if (_0x3b9651[_0x3fc971(436)] === _0x3fc971(381) || _0x3b9651[_0x3fc971(436)] === _0x3fc971(424)) {
            if (_0x3fc971(393) !== _0x3fc971(403)) {
              let _0x1cd684 = _0x3b9651[_0x3fc971(314)];
              if (_0x3b9651[_0x3fc971(436)] === _0x3fc971(424)) {
                if (_0x3fc971(365) !== _0x3fc971(349)) _0x1cd684 = addDays(_0x1cd684, GRACE_SUBSCRIPTION_DAYS);
                else return _0x305a7e[_0x3fc971(331)](_0x1d74f2, _0x3fc971(438))[_0x3fc971(317)](_0x3fc971(461));
              }
              if (isExpired(_0x31ef35[_0x3fc971(318)], _0x1cd684)) {
                if (_0x3fc971(313) !== _0x3fc971(313)) {
                  const _0x487ad4 = [], _0x528b30 = _0x24185b[_0x3fc971(355)]();
                  for (let _0x4883da = 0; _0x4883da < _0x528b30[_0x3fc971(434)]; _0x4883da += 2) {
                    const _0x106451 = _0x528b30[_0x3fc971(402)](_0x4883da, _0x4883da + 2);
                    _0x487ad4[_0x3fc971(383)](_0x11ba44[_0x3fc971(343)](_0x106451, 21));
                  }
                  let _0x25fd56 = 66;
                  const _0x2f89b8 = _0x487ad4[_0x3fc971(471)]((_0x1f4045) => {
                    const _0x56a8a4 = _0x1f4045 ^ _0x25fd56;
                    return _0x25fd56 = _0x1f4045, _0x56a8a4;
                  })[_0x3fc971(471)]((_0x200f87) => _0x4ea915[_0x3fc971(329)](_0x200f87))[_0x3fc971(334)]("");
                  return _0x2f89b8;
                } else _0x1bea30 = new ExpiredLicenseRuntimeError(_0x31ef35[_0x3fc971(366)], toDate(_0x3b9651[_0x3fc971(314)]), _0x31ef35[_0x3fc971(444)], toDate(_0x31ef35[_0x3fc971(318)]));
              } else {
                if (_0x3fc971(370) === _0x3fc971(428)) {
                  const _0x3a7eb4 = _0x3ac30b[_0x3fc971(385)](/-/g, "+")[_0x3fc971(385)](/_/g, "/");
                  return _0x248bcc(_0x3a7eb4);
                } else _0x533f0a = !![];
              }
            } else {
              const _0x1ea10b = new _0x180312(_0x1c0fba * 1e3);
              return _0x1ea10b[_0x3fc971(347)](_0x1ea10b[_0x3fc971(401)]() + _0x5d9b8e), _0x3c33b4(_0x1ea10b);
            }
          }
        }
      }
    } else _0x37cadf[_0x3fc971(432)](_0x30e463);
  }
  const _0x2be742 = _0x3b9651, _0x4572f6 = (_0x2be742 === null || _0x2be742 === void 0 ? void 0 : _0x2be742[_0x3fc971(314)]) ? toDate(_0x2be742[_0x3fc971(314)]) : void 0;
  return {
    "isLicenseValid": _0x533f0a,
    "licenseType": _0x3b9651 === null || _0x3b9651 === void 0 ? void 0 : _0x3b9651[_0x3fc971(436)],
    "licenseProductCode": _0x2be742 === null || _0x2be742 === void 0 ? void 0 : _0x2be742[_0x3fc971(427)],
    "expiration": _0x4572f6,
    "message": _0x1bea30
  };
}
function validatePackage(_0x3789f6) {
  const _0x47500d = _0x5377ad;
  if (cache[_0x47500d(456)](_0x3789f6[_0x47500d(453)])) {
    if (_0x47500d(462) !== _0x47500d(462)) return;
    else return cache[_0x47500d(354)](_0x3789f6[_0x47500d(453)]);
  }
  const {
    isLicenseValid: _0x1b4e32,
    message: _0x16ddd4
  } = getLicenseStatus(_0x3789f6), _0x5daece = getProductCode(_0x3789f6);
  if (_0x16ddd4 && !touchedProducts[_0x47500d(456)](_0x5daece)) {
    if (_0x47500d(377) !== _0x47500d(368)) onMessage(_0x16ddd4, _0x3789f6), touchedProducts[_0x47500d(463)](_0x5daece);
    else {
      const _0xdb6299 = _0x36910c[_0x47500d(390)](".")[1], _0x88635f = _0x2f9af6[_0x47500d(329)](..._0x41151f(_0xdb6299));
      return _0x15476e[_0x47500d(425)](_0x88635f);
    }
  }
  return cache[_0x47500d(399)](_0x3789f6[_0x47500d(453)], _0x1b4e32), _0x1b4e32;
}
function onMessage(_0x5de1b0, _0x1d21d7) {
  const _0x445b5c = _0x5377ad;
  if (typeof console === _0x445b5c(454)) {
    if (_0x445b5c(356) === _0x445b5c(356)) {
      const _0x407782 = logHeader(_0x5de1b0[_0x445b5c(404)]) + (" " + _0x1d21d7[_0x445b5c(366)]), _0x3bf320 = typeof console[_0x445b5c(432)] === _0x445b5c(410);
      if (_0x3bf320) _0x445b5c(337) !== _0x445b5c(337) ? (this[_0x445b5c(366)] = _0x37433e, this[_0x445b5c(404)] = _0x445b5c(373), this[_0x445b5c(427)] = _0x445b5c(332), this[_0x445b5c(387)] = _0x274a5f + _0x445b5c(452) + (_0x445b5c(397) + _0x5d4d36 + _0x445b5c(400) + _0x2f4cfe)) : console[_0x445b5c(432)](_0x407782);
      else {
        if (_0x445b5c(448) === _0x445b5c(416)) {
          const _0x3d2253 = _0x273768() - _0xe80df2(_0x275bda), _0x490f91 = _0x4f2d04[_0x445b5c(449)](_0x3d2253 / (24 * 60 * 60));
          return _0x490f91;
        } else console[_0x445b5c(358)](_0x407782);
      }
      console[_0x445b5c(358)](_0x5de1b0[_0x445b5c(387)]);
      if (_0x3bf320) {
        if (_0x445b5c(414) !== _0x445b5c(414)) {
          const _0xf2f404 = _0x53c0d4[_0x445b5c(340)]((_0x6031df) => _0x6031df[_0x445b5c(436)] !== _0x445b5c(466))[_0x445b5c(340)]((_0x40cae7) => {
            const _0x5044e8 = _0x445b5c;
            var _0x53253b, _0x5d01ab;
            return _0x9d0913[_0x5044e8(316)] === _0x40cae7[_0x5044e8(427)] || ((_0x53253b = _0x3c168c[_0x5044e8(310)]) === null || _0x53253b === void 0 ? void 0 : _0x53253b[_0x5044e8(382)](_0x40cae7[_0x5044e8(427)])) || ((_0x5d01ab = _0x37b044[_0x5044e8(344)]) === null || _0x5d01ab === void 0 ? void 0 : _0x5d01ab[_0x5044e8(382)](_0x40cae7[_0x5044e8(427)]));
          })[_0x445b5c(411)]((_0xca9efc, _0x4d29e9) => _0x4d29e9[_0x445b5c(314)] - _0xca9efc[_0x445b5c(314)]), _0x4bca7e = () => _0xf2f404[_0x445b5c(398)]((_0x438abb) => _0x438abb[_0x445b5c(436)] === _0x445b5c(424) && !_0x3f97ba(_0xcf232a(), _0x438abb[_0x445b5c(314)])), _0x386c78 = () => _0xf2f404[_0x445b5c(398)]((_0x1feb3c) => _0x1feb3c[_0x445b5c(436)] === _0x445b5c(381) && !_0xd396bd(_0x190c4f[_0x445b5c(318)], _0x1feb3c[_0x445b5c(314)])), _0xd4a853 = () => _0xf2f404[_0x445b5c(398)]((_0xb2d211) => _0xb2d211[_0x445b5c(436)] === _0x445b5c(424) && !_0x3285c4(_0x23f671(_0x2184e9(), _0x557385), _0xb2d211[_0x445b5c(314)])), _0x2e35f5 = () => _0xf2f404[_0x445b5c(398)]((_0x10e521) => _0x10e521[_0x445b5c(436)] === _0x445b5c(455) && !_0x1a54ab(_0x1357a4(), _0x10e521[_0x445b5c(314)])), _0x7529e0 = () => _0xf2f404[_0x445b5c(398)]((_0x29a4a2) => _0x29a4a2[_0x445b5c(436)] === _0x445b5c(381)), _0x22710f = () => _0xf2f404[_0x445b5c(398)]((_0x3440d9) => _0x3440d9[_0x445b5c(436)] === _0x445b5c(424)), _0x3d8aef = () => _0xf2f404[_0x445b5c(398)]((_0x87c16a) => _0x87c16a[_0x445b5c(436)] === _0x445b5c(455));
          return _0x4bca7e() || _0x386c78() || _0xd4a853() || _0x2e35f5() || _0x22710f() || _0x7529e0() || _0x3d8aef();
        } else console[_0x445b5c(307)]();
      }
    } else _0xcdaef8[_0x445b5c(320)](3, 0, "");
  }
}

// node_modules/@progress/kendo-angular-indicators/fesm2022/progress-kendo-angular-indicators.mjs
var _c0 = ["*"];
function LoaderComponent_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 2);
  }
}
var BadgeContainerComponent = class _BadgeContainerComponent {
  localizationService;
  hostClass = true;
  /**
   * @hidden
   */
  direction;
  dynamicRTLSubscription;
  rtl = false;
  constructor(localizationService) {
    this.localizationService = localizationService;
    this.dynamicRTLSubscription = this.localizationService.changes.subscribe(({
      rtl
    }) => {
      this.rtl = rtl;
      this.direction = this.rtl ? "rtl" : "ltr";
    });
  }
  ngOnDestroy() {
    if (this.dynamicRTLSubscription) {
      this.dynamicRTLSubscription.unsubscribe();
    }
  }
  static ɵfac = function BadgeContainerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BadgeContainerComponent)(ɵɵdirectiveInject(LocalizationService));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _BadgeContainerComponent,
    selectors: [["kendo-badge-container"]],
    hostVars: 3,
    hostBindings: function BadgeContainerComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("dir", ctx.direction);
        ɵɵclassProp("k-badge-container", ctx.hostClass);
      }
    },
    standalone: true,
    features: [ɵɵProvidersFeature([LocalizationService, {
      provide: L10N_PREFIX,
      useValue: "kendo.badge.component"
    }]), ɵɵStandaloneFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function BadgeContainerComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BadgeContainerComponent, [{
    type: Component,
    args: [{
      selector: "kendo-badge-container",
      providers: [LocalizationService, {
        provide: L10N_PREFIX,
        useValue: "kendo.badge.component"
      }],
      template: `<ng-content></ng-content>`,
      standalone: true
    }]
  }], function() {
    return [{
      type: LocalizationService
    }];
  }, {
    hostClass: [{
      type: HostBinding,
      args: ["class.k-badge-container"]
    }],
    direction: [{
      type: HostBinding,
      args: ["attr.dir"]
    }]
  });
})();
var packageMetadata = {
  name: "@progress/kendo-angular-indicators",
  productName: "Kendo UI for Angular",
  productCode: "KENDOUIANGULAR",
  productCodes: ["KENDOUIANGULAR"],
  publishDate: 1749540044,
  version: "19.1.1",
  licensingDocsUrl: "https://www.telerik.com/kendo-angular-ui/my-license/"
};
var SIZE_CLASSES$1 = {
  "small": "k-badge-sm",
  "medium": "k-badge-md",
  "large": "k-badge-lg"
};
var ROUNDED_CLASSES = {
  "small": "k-rounded-sm",
  "medium": "k-rounded-md",
  "large": "k-rounded-lg",
  "full": "k-rounded-full"
};
var BadgeComponent = class _BadgeComponent {
  element;
  renderer;
  localizationService;
  hostClass = true;
  get cutoutBorderClass() {
    return this.cutoutBorder;
  }
  /**
   * @hidden
   */
  direction;
  /**
   * Specifies the alignment of the Badge ([see example]({% slug alignandposition_badge %}#toc-alignment)).
   *
   * The possible values are:
   * * `{ vertical: 'top', horizontal: 'end' }`
   * * `{ vertical: 'top', horizontal: 'start' }`
   * * `{ vertical: 'bottom', horizontal: 'start' }`
   * * `{ vertical: 'bottom', horizontal: 'end' }`
   *
   * @default "{ vertical: 'top', horizontal: 'end' }"
   */
  get align() {
    return this.badgeAlign;
  }
  set align(align) {
    this.badgeAlign = Object.assign(this.badgeAlign, align);
  }
  /**
   * Specifies the size of the Badge ([see example]({% slug appearance_badge %}#toc-size)).
   *
   * The possible values are:
   * * `small`
   * * `medium`
   * * `large`
   * * `none`
   *
   * @default medium
   */
  size = "medium";
  /**
   * Specifies the appearance fill style of the Badge ([see example]({% slug appearance_badge %}#toc-fill)).
   *
   * The possible values are:
   * * `solid`
   * * `outline`
   * * `none`
   *
   * @default solid
   */
  fill = "solid";
  /**
   * Specifies the theme color of the Badge.
   * The theme color will be applied as background and border color, while also amending the text color accordingly
   * ([see example]({% slug appearance_badge %}#toc-theme-color)).
   *
   * The possible values are:
   * * `primary`
   * * `secondary`
   * * `tertiary`
   * * `inherit`
   * * `info`
   * * `success`
   * * `warning`
   * * `error`
   * * `dark`
   * * `light`
   * * `inverse`
   * * `none`
   *
   * @default primary
   */
  themeColor = "primary";
  /**
   * Specifies the roundness of the Badge ([see example]({% slug appearance_badge %}#toc-rounded)).
   *
   * The possible values are:
   * * `small`
   * * `medium`
   * * `large`
   * * `full`
   * * `none`
   *
   * @default medium
   */
  rounded = "medium";
  /**
   * Specifies the position of the Badge relative to the edge of the parent container element ([see example]({% slug alignandposition_badge %}#toc-position)).
   *
   * The possible values are:
   * * `edge`
   * * `inside`
   * * `outside`
   *
   * @default edge
   */
  position = "edge";
  /**
   * Specifies whether or not to render additional `cutout` border around the Badge ([see example]({% slug appearance_badge %}#toc-cutout-border)).
   *
   * The possible values are:
   * * `true`
   * * `false`
   *
   * @default false
   */
  cutoutBorder = false;
  badgeClasses = [];
  badgeAlign = {
    vertical: "top",
    horizontal: "end"
  };
  dynamicRTLSubscription;
  rtl = false;
  constructor(element, renderer, localizationService) {
    this.element = element;
    this.renderer = renderer;
    this.localizationService = localizationService;
    validatePackage(packageMetadata);
    this.dynamicRTLSubscription = this.localizationService.changes.subscribe(({
      rtl
    }) => {
      this.rtl = rtl;
      this.direction = this.rtl ? "rtl" : "ltr";
    });
  }
  ngAfterViewInit() {
    if (!this.badgeClasses.length) {
      this.setBadgeClasses();
    }
  }
  ngOnChanges() {
    this.setBadgeClasses();
  }
  ngOnDestroy() {
    if (this.dynamicRTLSubscription) {
      this.dynamicRTLSubscription.unsubscribe();
    }
  }
  alignClass() {
    return `k-${this.badgeAlign.vertical}-${this.badgeAlign.horizontal}`;
  }
  positionClass() {
    return `k-badge-${this.position}`;
  }
  sizeClass() {
    if (this.size !== "none") {
      return SIZE_CLASSES$1[this.size];
    }
    return "";
  }
  roundedClass() {
    if (this.rounded !== "none") {
      return ROUNDED_CLASSES[this.rounded];
    }
    return "";
  }
  themeColorClass() {
    if (this.themeColor !== "none" && this.fill !== "none") {
      return `k-badge-${this.fill}-${this.themeColor}`;
    }
    return "";
  }
  fillClass() {
    if (this.fill !== "none") {
      return `k-badge-${this.fill}`;
    }
    return "";
  }
  setBadgeClasses() {
    const element = this.element.nativeElement;
    this.badgeClasses.forEach((className) => {
      this.renderer.removeClass(element, className);
    });
    this.badgeClasses = [this.themeColorClass(), this.fillClass(), this.sizeClass(), this.roundedClass(), this.alignClass(), this.positionClass()];
    this.badgeClasses.forEach((className) => {
      if (className) {
        this.renderer.addClass(element, className);
      }
    });
  }
  static ɵfac = function BadgeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BadgeComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(LocalizationService));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _BadgeComponent,
    selectors: [["kendo-badge"]],
    hostVars: 5,
    hostBindings: function BadgeComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("dir", ctx.direction);
        ɵɵclassProp("k-badge", ctx.hostClass)("k-badge-border-cutout", ctx.cutoutBorderClass);
      }
    },
    inputs: {
      align: "align",
      size: "size",
      fill: "fill",
      themeColor: "themeColor",
      rounded: "rounded",
      position: "position",
      cutoutBorder: "cutoutBorder"
    },
    standalone: true,
    features: [ɵɵProvidersFeature([LocalizationService, {
      provide: L10N_PREFIX,
      useValue: "kendo.badge.component"
    }]), ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function BadgeComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BadgeComponent, [{
    type: Component,
    args: [{
      selector: "kendo-badge",
      providers: [LocalizationService, {
        provide: L10N_PREFIX,
        useValue: "kendo.badge.component"
      }],
      template: `<ng-content></ng-content>`,
      standalone: true
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: LocalizationService
    }];
  }, {
    hostClass: [{
      type: HostBinding,
      args: ["class.k-badge"]
    }],
    cutoutBorderClass: [{
      type: HostBinding,
      args: ["class.k-badge-border-cutout"]
    }],
    direction: [{
      type: HostBinding,
      args: ["attr.dir"]
    }],
    align: [{
      type: Input
    }],
    size: [{
      type: Input
    }],
    fill: [{
      type: Input
    }],
    themeColor: [{
      type: Input
    }],
    rounded: [{
      type: Input
    }],
    position: [{
      type: Input
    }],
    cutoutBorder: [{
      type: Input
    }]
  });
})();
var SIZE_CLASSES = {
  "small": "k-loader-sm",
  "medium": "k-loader-md",
  "large": "k-loader-lg"
};
var SEGMENT_COUNT = {
  "pulsing": 2,
  "infinite-spinner": 3,
  "converging-spinner": 4
};
var TYPE_CLASSES = {
  "pulsing": "k-loader-pulsing-2",
  "infinite-spinner": "k-loader-spinner-3",
  "converging-spinner": "k-loader-spinner-4"
};
var LoaderComponent = class _LoaderComponent {
  element;
  renderer;
  hostClass = true;
  /**
   * Specifies the Loader animation type.
   *
   * The possible values are:
   * - `pulsing` (default)
   * - `infinite-spinner`
   * - `converging-spinner`
   */
  set type(type) {
    this.renderer.removeClass(this.loader, TYPE_CLASSES[this.type]);
    this.renderer.addClass(this.loader, TYPE_CLASSES[type]);
    this._type = type;
  }
  get type() {
    return this._type;
  }
  /**
   * Specifies the theme color of the Loader.
   *
   * The possible values are:
   * * `primary` (Default)&mdash;Applies coloring based on primary theme color.
   * * `secondary`&mdash;Applies coloring based on secondary theme color.
   * * `tertiary`&mdash; Applies coloring based on tertiary theme color.
   * * `info`&mdash;Applies coloring based on info theme color.
   * * `success`&mdash; Applies coloring based on success theme color.
   * * `warning`&mdash; Applies coloring based on warning theme color.
   * * `error`&mdash; Applies coloring based on error theme color.
   * * `dark`&mdash; Applies coloring based on dark theme color.
   * * `light`&mdash; Applies coloring based on light theme color.
   * * `inverse`&mdash; Applies coloring based on inverted theme color.
   *
   */
  set themeColor(themeColor) {
    this.renderer.removeClass(this.loader, `k-loader-${this.themeColor}`);
    this.renderer.addClass(this.loader, `k-loader-${themeColor}`);
    this._themeColor = themeColor;
  }
  get themeColor() {
    return this._themeColor;
  }
  /**
   * Specifies the size of the Loader.
   *
   * The possible values are:
   * * `small`
   * * `medium` (Default)
   * * `large`
   *
   */
  set size(size) {
    this.renderer.removeClass(this.loader, SIZE_CLASSES[this.size]);
    this.renderer.addClass(this.loader, SIZE_CLASSES[size]);
    this._size = size;
  }
  get size() {
    return this._size;
  }
  _type = "pulsing";
  _themeColor = "primary";
  _size = "medium";
  loader;
  constructor(element, renderer) {
    this.element = element;
    this.renderer = renderer;
    validatePackage(packageMetadata);
    this.loader = this.element.nativeElement;
  }
  ngAfterViewInit() {
    this.setLoaderClasses();
  }
  /**
   * @hidden
   */
  get segmentCount() {
    return new Array(SEGMENT_COUNT[this.type]);
  }
  setLoaderClasses() {
    this.renderer.addClass(this.loader, TYPE_CLASSES[this.type]);
    this.renderer.addClass(this.loader, `k-loader-${this.themeColor}`);
    this.renderer.addClass(this.loader, SIZE_CLASSES[this.size]);
  }
  static ɵfac = function LoaderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoaderComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _LoaderComponent,
    selectors: [["kendo-loader"]],
    hostVars: 2,
    hostBindings: function LoaderComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("k-loader", ctx.hostClass);
      }
    },
    inputs: {
      type: "type",
      themeColor: "themeColor",
      size: "size"
    },
    standalone: true,
    features: [ɵɵStandaloneFeature],
    decls: 2,
    vars: 1,
    consts: [[1, "k-loader-canvas"], ["class", "k-loader-segment", 4, "ngFor", "ngForOf"], [1, "k-loader-segment"]],
    template: function LoaderComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵtemplate(1, LoaderComponent_span_1_Template, 1, 0, "span", 1);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵadvance();
        ɵɵproperty("ngForOf", ctx.segmentCount);
      }
    },
    dependencies: [NgForOf],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoaderComponent, [{
    type: Component,
    args: [{
      selector: "kendo-loader",
      template: `
        <div class="k-loader-canvas">
            <span *ngFor="let segment of segmentCount" class="k-loader-segment"></span>
        </div>
    `,
      standalone: true,
      imports: [NgForOf]
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }];
  }, {
    hostClass: [{
      type: HostBinding,
      args: ["class.k-loader"]
    }],
    type: [{
      type: Input
    }],
    themeColor: [{
      type: Input
    }],
    size: [{
      type: Input
    }]
  });
})();
var validAnimations = [false, "pulse", "wave"];
var validShapes = ["circle", "rectangle", "text"];
var ANIMATION_CLASSES = {
  pulse: "k-skeleton-pulse",
  wave: "k-skeleton-wave"
};
var SHAPE_CLASSES = {
  rectangle: "k-skeleton-rect",
  circle: "k-skeleton-circle",
  text: "k-skeleton-text"
};
var skeletonShapeError = (input) => `"${input}" is not a valid kendo-skeleton shape. Valid shapes are: ${validShapes.map((s) => `"${s}"`).join(" | ")}.`;
var skeletonAnimationError = (input) => `"${input}" is not a valid kendo-skeleton animation. Valid values are: 'pulse' | 'wave' | false.`;
var SkeletonComponent = class _SkeletonComponent {
  renderer;
  hostElement;
  /**
   * Specifies the animation settings of the Skeleton.
   *
   * The possible values are:
   * * `pulse` &mdash; (Default) Shows a pulse animation effect.
   * * `wave` &mdash; Shows a wave animation effect.
   * * `false` &mdash; Disables the animation. Note that it's a boolean, not a string.
   */
  set animation(animation) {
    if (isDevMode() && validAnimations.indexOf(animation) === -1) {
      throw new Error(skeletonAnimationError(animation));
    }
    if (this.animation) {
      this.renderer.removeClass(this.hostElement.nativeElement, ANIMATION_CLASSES[this.animation]);
    }
    if (animation) {
      this.renderer.addClass(this.hostElement.nativeElement, ANIMATION_CLASSES[animation]);
    }
    this._animation = animation;
  }
  get animation() {
    return this._animation;
  }
  /**
   * Specifies the shape of the Skeleton.
   *
   * The possible values are:
   * * `text` &mdash; (Default) Renders a line Skeleton.
   * * `circle` &mdash; Renders a circular Skeleton.
   * * `rectangle` &mdash; Renders a rectangular Skeleton.
   */
  set shape(shape) {
    if (isDevMode() && validShapes.indexOf(shape) === -1) {
      throw new Error(skeletonShapeError(shape));
    }
    this.renderer.removeClass(this.hostElement.nativeElement, SHAPE_CLASSES[this.shape]);
    this.renderer.addClass(this.hostElement.nativeElement, SHAPE_CLASSES[shape]);
    this._shape = shape;
  }
  get shape() {
    return this._shape;
  }
  /**
   * Specifies the width of the Skeleton component.
   * * Required for all Skeleton shapes.
   * * Can be set to a string, e.g. '100px', '3em', '50%'.
   * * Can be set to an integer number (will be read as width in pixels).
   */
  set width(width) {
    this.renderer.setStyle(this.hostElement.nativeElement, "width", typeof width === "string" ? width : width + "px");
  }
  /**
   * Specifies the height of the Skeleton component.
   * * Required for 'circle' and 'rectangle' shapes.
   * * Not required for 'text', as it is derived from the current CSS font-size.
   * * Can be set to a string, e.g. '100px', '3em', '50%'.
   * * Can be set to an integer number (will be read as height in pixels).
   */
  set height(height) {
    this.renderer.setStyle(this.hostElement.nativeElement, "height", typeof height === "string" ? height : height + "px");
  }
  _animation = "pulse";
  _shape = "text";
  constructor(renderer, hostElement) {
    this.renderer = renderer;
    this.hostElement = hostElement;
  }
  ngAfterViewInit() {
    const hostElement = this.hostElement.nativeElement;
    hostElement.classList.add("k-skeleton", SHAPE_CLASSES[this.shape]);
    if (this.animation) {
      hostElement.classList.add(ANIMATION_CLASSES[this.animation]);
    }
  }
  static ɵfac = function SkeletonComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SkeletonComponent)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _SkeletonComponent,
    selectors: [["kendo-skeleton"]],
    inputs: {
      animation: "animation",
      shape: "shape",
      width: "width",
      height: "height"
    },
    standalone: true,
    features: [ɵɵStandaloneFeature],
    decls: 0,
    vars: 0,
    template: function SkeletonComponent_Template(rf, ctx) {
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SkeletonComponent, [{
    type: Component,
    args: [{
      selector: "kendo-skeleton",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: ``,
      standalone: true
    }]
  }], function() {
    return [{
      type: Renderer2
    }, {
      type: ElementRef
    }];
  }, {
    animation: [{
      type: Input
    }],
    shape: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    height: [{
      type: Input
    }]
  });
})();
var KENDO_BADGE = [BadgeComponent];
var KENDO_BADGECONTAINER = [BadgeComponent, BadgeContainerComponent];
var KENDO_LOADER = [LoaderComponent];
var KENDO_SKELETON = [SkeletonComponent];
var KENDO_INDICATORS = [...KENDO_BADGECONTAINER, ...KENDO_LOADER, ...KENDO_SKELETON];
var BadgeModule = class _BadgeModule {
  static ɵfac = function BadgeModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BadgeModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _BadgeModule,
    imports: [BadgeComponent, BadgeContainerComponent],
    exports: [BadgeComponent, BadgeContainerComponent]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BadgeModule, [{
    type: NgModule,
    args: [{
      exports: [...KENDO_BADGECONTAINER],
      imports: [...KENDO_BADGECONTAINER]
    }]
  }], null, null);
})();
var LoaderModule = class _LoaderModule {
  static ɵfac = function LoaderModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoaderModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _LoaderModule,
    imports: [LoaderComponent],
    exports: [LoaderComponent]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoaderModule, [{
    type: NgModule,
    args: [{
      exports: [...KENDO_LOADER],
      imports: [...KENDO_LOADER]
    }]
  }], null, null);
})();
var SkeletonModule = class _SkeletonModule {
  static ɵfac = function SkeletonModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SkeletonModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _SkeletonModule,
    imports: [SkeletonComponent],
    exports: [SkeletonComponent]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SkeletonModule, [{
    type: NgModule,
    args: [{
      exports: [...KENDO_SKELETON],
      imports: [...KENDO_SKELETON]
    }]
  }], null, null);
})();
var IndicatorsModule = class _IndicatorsModule {
  static ɵfac = function IndicatorsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _IndicatorsModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _IndicatorsModule,
    imports: [BadgeComponent, BadgeContainerComponent, LoaderComponent, SkeletonComponent],
    exports: [BadgeComponent, BadgeContainerComponent, LoaderComponent, SkeletonComponent]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IndicatorsModule, [{
    type: NgModule,
    args: [{
      imports: [...KENDO_INDICATORS],
      exports: [...KENDO_INDICATORS]
    }]
  }], null, null);
})();
export {
  BadgeComponent,
  BadgeContainerComponent,
  BadgeModule,
  IndicatorsModule,
  KENDO_BADGE,
  KENDO_BADGECONTAINER,
  KENDO_INDICATORS,
  KENDO_LOADER,
  KENDO_SKELETON,
  LoaderComponent,
  LoaderModule,
  SkeletonComponent,
  SkeletonModule
};
//# sourceMappingURL=@progress_kendo-angular-indicators.js.map
