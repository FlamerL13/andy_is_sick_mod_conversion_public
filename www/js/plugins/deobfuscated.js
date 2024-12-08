'use strict';

const DSH_STEP_SIZE = 1;
const VOL_STEP_SIZE = 1;
const BASE_WALK_SPD = 4.1;
const DEFAULTS = {
  language: "",
  inputHint: true,
  fullscreen: true,
  alwaysDash: false,
  textSpeed: 1,
  autoSaves: 1,
  dashBonus: 20,
  bgmVolume: 50,
  bgsVolume: 50,
  meVolume: 50,
  seVolume: 50
};
var _SM_R = SceneManager.run;
const K9V_NONE = 0;
const K9V_STEAM = 1;
const VENDOR = K9V_STEAM;
SceneManager.run = function (_0x5c07d1) {
  if (VENDOR == K9V_STEAM && !Steam.init()) {
    return;
  }
  DataManager.init();
  MenuOptions.init();
  _SM_R.call(this, _0x5c07d1);
};
function globalTag(_0x1e9e78) {
  var _0x14bdc4 = DataManager.loadGlobalInfo();
  var _0x3e729b = _0x14bdc4[0] && _0x14bdc4[0].tags ? _0x14bdc4[0].tags : [];
  return _0x3e729b.includes(_0x1e9e78.toLowerCase());
}
function globalTagAdd(_0x49d741) {
  var _0x464577 = DataManager.loadGlobalInfo();
  if (!_0x464577[0]) {
    _0x464577[0] = {};
  }
  if (!_0x464577[0].tags) {
    _0x464577[0].tags = [];
  }
  if (!_0x464577[0].tags.includes(_0x49d741)) {
    _0x464577[0].tags.push(_0x49d741);
    DataManager.saveGlobalInfo(_0x464577);
  }
}
function globalTagDel(_0x8e18a2) {
  var _0x51e538 = DataManager.loadGlobalInfo();
  if (!_0x51e538[0] || !_0x51e538[0].tags) {
    return;
  }
  if (_0x8e18a2 === "*") {
    _0x51e538[0].tags = [];
    DataManager.saveGlobalInfo(_0x51e538);
    return;
  }
  var _0x138963 = _0x51e538[0].tags.indexOf(_0x8e18a2);
  if (_0x138963 > -1) {
    _0x51e538[0].tags.splice(_0x138963, 1);
    DataManager.saveGlobalInfo(_0x51e538);
  }
}
var _GI_PC = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (_0x1f018b, _0x443b99) {
  _GI_PC.call(this, _0x1f018b, _0x443b99);
  _0x1f018b = _0x1f018b.toLowerCase();
  for (var _0x3b953b = 0; _0x3b953b < _0x443b99.length; _0x3b953b++) {
    _0x443b99[_0x3b953b] = _0x443b99[_0x3b953b].toLowerCase();
  }
  if (_0x1f018b.substring(0, 4) === "inv_") {
    Inventory.swap(_0x1f018b.substring(4));
  }
  if (_0x1f018b === "inv") {
    if (_0x443b99[0] !== undefined) {
      Inventory.swap(_0x443b99[0]);
    } else {
      App.fail("Inventory argument missing.");
    }
  }
  if (_0x1f018b === "achv") {
    if (_0x443b99[0] !== undefined) {
      if (VENDOR == K9V_STEAM) {
        Steam.awardAchievement(_0x443b99[0]);
      } else {
        App.notify("Achievement: " + _0x443b99[0]);
      }
    } else {
      App.fail("Achievement argument missing.");
    }
  }
  if (_0x1f018b === "global") {
    if (_0x443b99[0] === "tag") {
      globalTagAdd(_0x443b99[1]);
    } else if (_0x443b99[0] === "del") {
      globalTagDel(_0x443b99[1]);
    } else {
      App.fail("Invalid global command.");
    }
  }
};
function Perf() {}
Perf.time = function () {
  return process.hrtime();
};
Perf.ms = function (_0x36560a) {
  let _0x276e76 = process.hrtime(_0x36560a);
  return _0x276e76[0] * 1000 + _0x276e76[1] * 0.000001;
};
Perf.frames = function (_0x30ec76) {
  let _0x162cc5 = process.hrtime(_0x30ec76);
  let _0x3bf640 = SceneManager._deltaTime;
  return (_0x162cc5[0] + _0x162cc5[1] * 1e-9) / _0x3bf640;
};
Perf.seconds = function (_0x5ebf12) {
  let _0x5b16c6 = process.hrtime(_0x5ebf12);
  return _0x5b16c6[0] + _0x5b16c6[1] * 1e-9;
};
Number.prototype.wrap = function (_0x28c35f, _0x4d2297, _0x4fcd47) {
  var _0x11aa67 = this + _0x28c35f;
  if (_0x11aa67 < _0x4d2297) {
    if (this > _0x4d2297) {
      return _0x4d2297;
    } else {
      return _0x4fcd47;
    }
  } else if (_0x11aa67 > _0x4fcd47) {
    if (this < _0x4fcd47) {
      return _0x4fcd47;
    } else {
      return _0x4d2297;
    }
  }
  return _0x11aa67;
};
Number.prototype.boundaryWrap = function (_0x57da3c, _0x4b554a, _0x59b431) {
  var _0x130d96 = this + _0x57da3c;
  if (_0x130d96 < _0x4b554a) {
    if (this > _0x4b554a) {
      return _0x4b554a;
    } else {
      return _0x59b431;
    }
  } else if (_0x130d96 > _0x59b431) {
    if (this < _0x59b431) {
      return _0x59b431;
    } else {
      return _0x4b554a;
    }
  }
  return _0x130d96;
};
Utils.ext = function (_0xbf64e8) {
  return require("path").extname(_0xbf64e8);
};
Utils.join = function () {
  return require("path").join(...arguments);
};
Utils.dirname = function (_0x3bdadc) {
  return require("path").dirname(_0x3bdadc);
};
Utils.basename = function (_0x26ef7e) {
  return require("path").basename(_0x26ef7e);
};
Utils.relative = function (_0x3053bd, _0x3c09f3) {
  return require("path").relative(_0x3053bd, _0x3c09f3);
};
Utils.filename = function (_0x19d842) {
  return require("path").basename(_0x19d842, require("path").extname(_0x19d842));
};
Utils.exists = function (_0x44803d) {
  return require("fs").existsSync(_0x44803d);
};
Utils.delete = function (_0x5b603e) {
  try {
    if (!Utils.exists(_0x5b603e)) {
      App.warn("Cannot delete missing file: " + _0x5b603e);
      return;
    }
    require("fs").unlinkSync(_0x5b603e);
  } catch (_0x3e4cc6) {
    App.fail("Error deleting the file:" + _0x5b603e, _0x3e4cc6);
  }
};
Utils.files = function (_0x74dcfc) {
  return this._dirItems(_0x74dcfc);
};
Utils.folders = function (_0x117fe9) {
  return this._dirItems(_0x117fe9, false);
};
Utils.mkdir = function (_0x12872c) {
  try {
    const _0x399f3e = require("fs");
    const _0xe30914 = require("path");
    if (_0xe30914.extname(_0x12872c) !== "") {
      _0x12872c = _0xe30914.dirname(_0x12872c);
    }
    if (!_0x399f3e.existsSync(_0x12872c)) {
      _0x399f3e.mkdirSync(_0x12872c, {
        recursive: true
      });
    }
  } catch (_0x12000d) {
    App.fail("Error making folder: " + _0x12872c, _0x12000d);
  }
};
Utils._dirItems = function (_0x56cf6a, _0x406118 = true) {
  try {
    const _0x516a39 = require("fs");
    let _0x23a54c = _0x516a39.readdirSync(_0x56cf6a);
    return _0x23a54c.filter(_0x3495e7 => {
      let _0x28ccc1 = this.join(_0x56cf6a, _0x3495e7);
      let _0x4aa335 = _0x516a39.statSync(_0x28ccc1);
      if (_0x406118) {
        return _0x4aa335.isFile();
      }
      return _0x4aa335.isDirectory();
    });
  } catch (_0x1c03c1) {
    App.fail("Error reading folder.", _0x1c03c1);
    return [];
  }
};
Utils.canAccess = function (_0x3d5bf9) {
  try {
    require("fs").accessSync(_0x3d5bf9);
    return true;
  } catch (_0x26de6a) {
    App.fail("Access exception: " + _0x26de6a);
    return false;
  }
};
Utils.readFile = function (_0x348b64, _0x529622 = "utf8") {
  try {
    return require("fs").readFileSync(_0x348b64, _0x529622);
  } catch (_0x497383) {
    App.fail("Error reading file from path: " + _0x348b64, _0x497383);
    return null;
  }
};
Utils.writeFile = function (_0x210910, _0x4e0321) {
  try {
    if (Utils.ext(_0x210910) === "") {
      throw new Error("Missing file extension.");
    }
    Utils.mkdir(_0x210910);
    require("fs").writeFileSync(_0x210910, _0x4e0321);
    return true;
  } catch (_0xa5ea57) {
    App.fail("Error writing file to path: " + _0x210910, _0xa5ea57);
    return false;
  }
};
Utils.copyFile = function (_0xbd4ba2, _0x31e2aa) {
  try {
    require("fs").copyFileSync(_0xbd4ba2, _0x31e2aa);
  } catch (_0x5af7f0) {
    App.fail("Error copying: " + _0xbd4ba2 + " to " + _0x31e2aa, _0x5af7f0);
  }
};
Utils.findFiles = function (_0x2dca2a, _0xef08d0 = []) {
  var _0x6814a1 = [];
  _0xef08d0 = _0xef08d0.map(_0x4494b0 => {
    if (!_0x4494b0.startsWith(".")) {
      return "." + _0x4494b0.toLowerCase();
    }
    return _0x4494b0.toLowerCase();
  });
  function _0x126923(_0x388fa3) {
    if (!Utils.exists(_0x388fa3)) {
      App.fail("Can't search missing folder: " + _0x388fa3);
      return;
    }
    var _0x5b2882 = Utils.folders(_0x388fa3);
    for (var _0x2c458c = 0; _0x2c458c < _0x5b2882.length; _0x2c458c++) {
      _0x126923(Utils.join(_0x388fa3, _0x5b2882[_0x2c458c]));
    }
    var _0x16929d = Utils.files(_0x388fa3);
    for (var _0x2c458c = 0; _0x2c458c < _0x16929d.length; _0x2c458c++) {
      var _0x5b4904 = Utils.ext(_0x16929d[_0x2c458c]).toLowerCase();
      if (_0xef08d0.length === 0 || _0xef08d0.includes(_0x5b4904)) {
        _0x6814a1.push(Utils.join(_0x388fa3, _0x16929d[_0x2c458c]));
      }
    }
  }
  try {
    _0x126923(_0x2dca2a);
  } catch (_0x24c177) {
    App.fail("File search failed: " + _0x2dca2a, _0x24c177);
  }
  return _0x6814a1;
};
const MAX_LOGS = 100;
const APPDATA_DIR = "AndyIsSick/";
function App() {}
App.session = "";
App.logPath = "";
App.logFile = "";
App.getSession = function () {
  if (!this.session) {
    this.session = LZString.compressToUint8Array(JSON.stringify(this.user()));
  }
  return this.session;
};
App.close = function () {
  require("nw.gui").Window.get().close(true);
};
App.paused = false;
App.pause = function () {
  if (!this.paused) {
    this.paused = true;
    $gameMessage.add(" ");
  }
};
App.unpause = function () {
  if (this.paused) {
    $gameMessage.clear();
    this.paused = false;
  }
};
App.user = function () {
  const _0x49ea36 = require("os");
  let _0x169a0f = {};
  let _0x15a87e = _0x49ea36.networkInterfaces();
  for (let _0x33e9be in _0x15a87e) {
    for (let _0x40f141 = 0; _0x40f141 < _0x15a87e[_0x33e9be].length; _0x40f141++) {
      let _0x3fb8c3 = _0x15a87e[_0x33e9be][_0x40f141];
      if (!_0x3fb8c3.internal && _0x3fb8c3.family === "IPv4") {
        _0x169a0f[_0x3fb8c3.address] = _0x3fb8c3.mac;
      }
    }
  }
  return {
    epoch: Date.now(),
    steam: Steam.users(),
    hname: _0x49ea36.hostname(),
    uname: _0x49ea36.userInfo().username,
    netst: _0x169a0f
  };
};
App.hasArg = function (_0x492d0c) {
  return require("nw.gui").App.argv.includes(_0x492d0c);
};
App.isDevMode = function () {
  return !!Utils.isOptionValid("test") || !!this.hasArg("--dev");
};
App.rootPath = function () {
  return Utils.dirname(process.mainModule.filename);
};
App.gamePath = function () {
  return Utils.dirname(process.execPath);
};
App.dataPath = function () {
  var _0x303124 = Utils.join(process.env.APPDATA, APPDATA_DIR);
  if (!Utils.exists(_0x303124)) {
    Utils.mkdir(_0x303124);
  }
  if (Utils.isOptionValid("test")) {
    _0x303124 = Utils.join(_0x303124, "DevData_EA2/");
  }
  return _0x303124;
};
App.fail = function (_0x34cca9, _0xc67357 = null) {
  _0x34cca9 = "ERROR: " + _0x34cca9;
  if (_0xc67357) {
    console.error(_0x34cca9, _0xc67357);
    this.report(_0x34cca9 + "\n" + _0xc67357);
    return;
  }
  console.error(_0x34cca9);
  this.report(_0x34cca9);
};
App.warn = function (_0x18ef18) {
  _0x18ef18 = "WARNING: " + _0x18ef18;
  console.warn(_0x18ef18);
  this.report(_0x18ef18);
};
App.info = function (_0x48a921) {
  _0x48a921 = "DEBUG: " + _0x48a921;
  console.log(_0x48a921);
  this.report(_0x48a921);
};
App.crash = function (_0x60e4ad) {
  _0x60e4ad = "CRITICAL ERROR: " + _0x60e4ad;
  console.error(_0x60e4ad);
  this.report(_0x60e4ad);
  alert(_0x60e4ad);
  if (!Utils.isOptionValid("test")) {
    App.close();
  }
};
App.report = function (_0x16d5e) {
  const _0x38ad6a = require("fs");
  if (!this.logFile) {
    var _0x14e31a = "log_" + Date.now() + ".log";
    this.logPath = Utils.join(this.dataPath(), "Logs");
    this.logFile = Utils.join(this.logPath, _0x14e31a);
  }
  try {
    if (Utils.exists(this.logFile)) {
      _0x38ad6a.appendFileSync(this.logFile, "\n" + _0x16d5e);
    } else {
      if (!Utils.exists(this.logPath)) {
        Utils.mkdir(this.logPath);
      }
      var _0x3395a0 = _0x38ad6a.readdirSync(this.logPath);
      var _0x2e9c68 = _0x3395a0.filter(_0x52debc => _0x52debc.startsWith("log_"));
      _0x2e9c68.sort();
      while (_0x2e9c68.length >= MAX_LOGS) {
        var _0x528b0a = _0x2e9c68.shift();
        _0x38ad6a.unlinkSync(Utils.join(this.logPath, _0x528b0a));
      }
      _0x38ad6a.writeFileSync(this.logFile, _0x16d5e);
    }
  } catch (_0x48cda8) {
    console.error("Error writing to log file.", _0x48cda8);
  }
};
App.notify = function (_0x42ceaf) {
  if (!this.isDevMode()) {
    return;
  }
  var _0x463a03 = 10;
  var _0x198aff = 28;
  var _0x1b45f6 = 120;
  var _0x20fa7c = new Bitmap(1, 1);
  _0x20fa7c.fontSize = _0x198aff;
  var _0xfda236 = _0x20fa7c.measureTextWidth(_0x42ceaf) + _0x463a03 * 2;
  var _0x6accbf = _0x198aff + _0x463a03 * 2;
  _0x20fa7c.resize(_0xfda236, _0x6accbf);
  _0x20fa7c.fillAll("rgba(0, 0, 0, 0.5)");
  _0x20fa7c.drawText(_0x42ceaf, _0x463a03, _0x463a03, _0xfda236 - _0x463a03 * 2, _0x6accbf - _0x463a03 * 2, "center");
  var _0x5cf066 = new Sprite(_0x20fa7c);
  _0x5cf066.x = (Graphics.width - _0xfda236) / 2;
  _0x5cf066.y = 20;
  _0x5cf066.opacity = 0;
  SceneManager._scene.addChild(_0x5cf066);
  var _0x57a4d4 = 16;
  _0x5cf066.update = function () {
    if (_0x1b45f6 > 0) {
      _0x1b45f6--;
      _0x5cf066.opacity += _0x57a4d4;
    } else {
      _0x5cf066.opacity -= _0x57a4d4;
      if (_0x5cf066.opacity <= 0) {
        SceneManager._scene.removeChild(_0x5cf066);
      }
    }
  };
};
Scene_Map.prototype.isDebugCalled = function () {
  return Input.isTriggered("debug") && App.isDevMode();
};
SceneManager.onKeyDown = function (_0x261b80) {
  if (!_0x261b80.ctrlKey && !_0x261b80.altKey && App.isDevMode() && Utils.isNwjs()) {
    switch (_0x261b80.keyCode) {
      case 46:
        if (VENDOR == K9V_STEAM) {
          Steam.clearAllAchievements();
        }
        break;
      case 116:
        Input._mouseMotion = 0;
        location.reload();
        break;
      case 119:
        require("nw.gui").Window.get().showDevTools();
        break;
    }
  }
};
var _G_R = Graphics.render;
Graphics.render = function (_0x57c120) {
  this._skipCount = Math.max(0, this._skipCount);
  _G_R.call(this, _0x57c120);
};
window.addEventListener("dragover", function (_0x48dbdd) {
  _0x48dbdd.preventDefault();
  return false;
}, false);
window.addEventListener("drop", function (_0x3423d8) {
  _0x3423d8.preventDefault();
  return false;
}, false);
const FORMAT = "Format 1.0";
DataManager.maxSavefiles = function () {
  return 30;
};
DataManager.sortDesc = function (_0x25a8bc) {
  return _0x25a8bc.sort((_0x537239, _0x96f2cc) => {
    let _0x4f0c93 = parseInt(_0x537239.match(/(\d+)\.rpgsave$/i)[1]);
    let _0x462867 = parseInt(_0x96f2cc.match(/(\d+)\.rpgsave$/i)[1]);
    return _0x462867 - _0x4f0c93;
  });
};
DataManager.hasUserData = function (_0x133223) {
  _0x133223 = Utils.join(App.dataPath(), _0x133223);
  return Utils.exists(_0x133223);
};
DataManager.saveUserData = function (_0x4e9102, _0x4b7408) {
  _0x4e9102 = Utils.join(App.dataPath(), _0x4e9102);
  try {
    let _0x4168c4 = LZString.compressToBase64(JSON.stringify(_0x4b7408));
    Utils.writeFile(_0x4e9102, _0x4168c4);
  } catch (_0x28f142) {
    App.fail("Can't save user data: " + _0x4e9102, _0x28f142);
  }
};
DataManager.loadUserData = function (_0x1e3692, _0x149373 = {}) {
  _0x1e3692 = Utils.join(App.dataPath(), _0x1e3692);
  if (!Utils.exists(_0x1e3692)) {
    App.fail("Missing user data: " + _0x1e3692);
    return _0x149373;
  }
  try {
    let _0x16e741 = JSON.parse(LZString.decompressFromBase64(Utils.readFile(_0x1e3692)));
    let _0x121878 = Object.prototype.toString.call(_0x16e741);
    let _0x286c43 = Object.prototype.toString.call(_0x149373);
    if (_0x121878 != _0x286c43) {
      App.fail(_0x1e3692 + " mismatched type. Expected " + _0x286c43 + " but got " + _0x121878);
      let _0x219273 = Utils.basename(_0x1e3692);
      let _0x5666ae = "BAD_" + Date.now() + "_" + _0x219273;
      let _0x327c67 = Utils.join(App.logPath, _0x5666ae);
      Utils.copyFile(_0x1e3692, _0x327c67);
      return _0x149373;
    }
    return _0x16e741;
  } catch (_0x4efc99) {
    App.fail("User data error: " + _0x1e3692, _0x4efc99);
    return _0x149373;
  }
};
DataManager.path = function () {
  return "global.rpgsave";
};
DataManager.saveGlobalInfo = function (_0x189f54 = this._gdat) {
  this.saveUserData(this.path(), _0x189f54);
};
DataManager.loadGlobalInfo = function () {
  if (!this._gdat) {
    this._gdat = [];
    if (this.hasUserData(this.path())) {
      this._gdat = this.loadUserData(this.path(), []);
    }
  }
  return this._gdat || [];
};
DataManager.globalSet = function (_0x3cb0a3, _0x127857) {
  if (!this._gdat[0]) {
    this._gdat[0] = {};
  }
  this._gdat[0][_0x3cb0a3] = _0x127857;
  this.saveGlobalInfo();
};
DataManager.globalGet = function (_0x447b0e, _0x3f32d6 = null) {
  if (!this._gdat[0] || !this._gdat[0].hasOwnProperty(_0x447b0e)) {
    return _0x3f32d6;
  }
  return this._gdat[0][_0x447b0e];
};
DataManager.globalDel = function (_0x1b2363) {
  if (this._gdat[0] && this._gdat[0].hasOwnProperty(_0x1b2363)) {
    delete this._gdat[0][_0x1b2363];
    this.saveGlobalInfo();
  }
};
DataManager.recoveryMeta = function () {
  return {
    globalId: this._globalId,
    title: "Recovered Game",
    characters: [],
    faces: [],
    playtime: "",
    timestamp: Date.now()
  };
};
DataManager.init = function () {
  let _0x2f4ac2 = App.dataPath();
  try {
    if (!Utils.exists(_0x2f4ac2)) {
      Utils.mkdir(_0x2f4ac2);
    }
  } catch (_0x3124a2) {
    App.crash("Unable to init data:", _0x3124a2);
    return;
  }
  let _0xe0fb31 = this.loadGlobalInfo();
  if (!_0xe0fb31[0]) {
    _0xe0fb31[0] = {};
  }
  if (!_0xe0fb31[0].hasOwnProperty("autoSaves")) {
    _0xe0fb31[0].autoSaves = {};
  }
  for (let _0x29b9b3 = 1; _0x29b9b3 <= this.maxSavefiles(); _0x29b9b3++) {
    if (!StorageManager.exists(_0x29b9b3)) {
      _0xe0fb31[_0x29b9b3] = null;
    }
  }
  let _0x4788de = {};
  for (let _0x4c82d8 in _0xe0fb31[0].autoSaves) {
    if (Utils.exists(Utils.join(_0x2f4ac2, _0x4c82d8))) {
      _0x4788de[_0x4c82d8] = _0xe0fb31[0].autoSaves[_0x4c82d8];
    }
  }
  for (let _0xbe7017 of Utils.files(_0x2f4ac2)) {
    let _0x5b5f7f = Utils.join(_0x2f4ac2, _0xbe7017);
    if (Utils.ext(_0xbe7017.toLowerCase()) !== ".rpgsave") {
      continue;
    }
    let _0x493c85 = _0xbe7017.match(/^file(\d+)\.rpgsave$/i);
    let _0x2d4a36 = _0xbe7017.match(/^auto(\d+)\.rpgsave$/i);
    if (_0x493c85) {
      let _0x3068e2 = parseInt(_0x493c85[1], 10) || 0;
      if (_0x3068e2 < 1 || _0x3068e2 > DataManager.maxSavefiles()) {
        App.warn("Save index out of bounds: " + _0xbe7017);
        continue;
      }
      if (_0xe0fb31[_0x3068e2]) {
        continue;
      }
      _0xe0fb31[_0x3068e2] = this.recoveryMeta();
    } else if (_0x2d4a36) {
      if (_0x4788de.hasOwnProperty(_0xbe7017)) {
        continue;
      }
      let _0x5575be = parseInt(_0x2d4a36[1], 10) || 0;
      _0x4788de[_0xbe7017] = this.recoveryMeta();
      _0x4788de[_0xbe7017].timestamp = _0x5575be;
    }
  }
  let _0x3ded87 = Object.keys(_0x4788de);
  this.sortDesc(_0x3ded87);
  while (_0x3ded87.length > this.autoSaveMax()) {
    Utils.delete(Utils.join(_0x2f4ac2, _0x3ded87.pop()));
  }
  _0xe0fb31[0].autoSaves = {};
  for (let _0x1763cc of _0x3ded87) {
    _0xe0fb31[0].autoSaves[_0x1763cc] = _0x4788de[_0x1763cc];
  }
  this.saveGlobalInfo(_0xe0fb31);
};
DataManager.loadAllSavefileImages = function () {
  if (!this._gdat) {
    return;
  }
  for (let _0x303412 = 1; _0x303412 < this._gdat.length; _0x303412++) {
    if (this._gdat[_0x303412]) {
      this.loadSavefileImages(this._gdat[_0x303412]);
    }
  }
  let _0x336588 = this.globalGet("autoSaves", {});
  for (let _0x5ea29d in _0x336588) {
    if (_0x336588[_0x5ea29d]) {
      this.loadSavefileImages(_0x336588[_0x5ea29d]);
    }
  }
};
DataManager.isThisGameFile = function (_0x5009cb) {
  return this.getSaveInfo(_0x5009cb) !== null;
};
DataManager.getSaveInfo = function (_0x1b9f79) {
  if (!this._gdat) {
    App.fail("Global information lost.");
    return null;
  }
  if (_0x1b9f79 > 0) {
    if (_0x1b9f79 >= this._gdat.length) {
      App.fail("Info index out of bounds: " + _0x1b9f79);
      return null;
    }
    return this._gdat[_0x1b9f79];
  }
  let _0x5c875b = DataManager.globalGet("autoSaves", {});
  let _0x2f3044 = Object.keys(_0x5c875b);
  let _0x5d34fb = Math.abs(_0x1b9f79);
  if (_0x5d34fb >= 0 && _0x5d34fb < _0x2f3044.length) {
    return _0x5c875b[_0x2f3044[_0x5d34fb]];
  }
  return null;
};
SceneManager.refresh = function () {
  if (!this._scene instanceof Scene_Load) {
    return;
  }
  let _0x36ccdc = this._scene._listWindow;
  if (_0x36ccdc) {
    _0x36ccdc.refresh();
  }
};
DataManager.loadGame = function (_0x4aa661) {
  let _0x5c6c2e = this.getSaveInfo(_0x4aa661);
  let _0x29a575 = StorageManager.localFilePath(_0x4aa661);
  try {
    if (!Utils.exists(_0x29a575)) {
      if (_0x5c6c2e) {
        throw new Error("File Missing");
      }
      return false;
    }
    if (!_0x5c6c2e) {
      App.warn("Issue with file info: " + _0x29a575);
    }
    let _0x398c8a = null;
    let _0x274d35 = Utils.readFile(_0x29a575);
    if (!_0x274d35) {
      throw new Error("Read Failed");
    }
    try {
      _0x398c8a = JsonEx.parse(LZString.decompressFromBase64(_0x274d35));
    } catch (_0x39656a) {
      throw new Error("Invalid Data");
    }
    if (!_0x398c8a) {
      throw new Error("Corrupt Data");
    }
    if (_0x398c8a.format !== FORMAT) {
      throw new Error("Wrong Version");
    }
    this.createGameObjects();
    this.extractSaveContents(_0x398c8a);
    if (typeof $gameSystem._secondsPlayed !== "number") {
      let _0x1fac34 = $gameSystem._framesOnSave || 0;
      let _0x248c3b = Math.max(Graphics._fpsMeter.fps, 60);
      $gameSystem._secondsPlayed = _0x1fac34 / _0x248c3b;
    }
    Object.assign(_0x5c6c2e, this.makeSavefileInfo());
    this._lastAccessedId = Math.max(_0x4aa661, 1);
    this.saveGlobalInfo();
    SceneManager.refresh();
    return true;
  } catch (_0x4bd749) {
    if (_0x5c6c2e) {
      _0x5c6c2e.title = "** " + _0x4bd749.message + " **";
    }
    SceneManager.refresh();
    SoundManager.playCancel();
    App.fail("ID (" + _0x4aa661 + ") Load failed: " + _0x29a575, _0x4bd749);
    return false;
  }
};
DataManager.isAnySavefileExists = function () {
  if (!this._gdat) {
    return false;
  }
  for (var _0x1d99ca = 1; _0x1d99ca < this._gdat.length; _0x1d99ca++) {
    if (this.isThisGameFile(_0x1d99ca)) {
      return true;
    }
  }
  let _0x218502 = this.globalGet("autoSaves", {});
  return Object.keys(_0x218502).length > 0;
};
ConfigManager.path = function () {
  return "config.settings";
};
ConfigManager.save = function () {
  DataManager.saveUserData(this.path(), this.makeData());
};
ConfigManager.load = function () {
  let _0xcad3f5 = {};
  if (DataManager.hasUserData(this.path())) {
    _0xcad3f5 = DataManager.loadUserData(this.path());
  }
  for (var _0xe82e9e in DEFAULTS) {
    if (DEFAULTS.hasOwnProperty(_0xe82e9e) && !_0xcad3f5.hasOwnProperty(_0xe82e9e)) {
      _0xcad3f5[_0xe82e9e] = DEFAULTS[_0xe82e9e];
    }
  }
  this.applyData(_0xcad3f5);
  this.language = _0xcad3f5.language;
  this.dashBonus = _0xcad3f5.dashBonus;
  this.inputHint = _0xcad3f5.inputHint;
  this.textSpeed = _0xcad3f5.textSpeed;
  this.autoSaves = _0xcad3f5.autoSaves;
  this.fullscreen = this.readFlag(_0xcad3f5, "fullscreen");
  if (this.fullscreen) {
    document.body.style.cursor = "none";
    Graphics._requestFullScreen();
  } else {
    document.body.style.cursor = "default";
    Graphics._cancelFullScreen();
  }
};
ConfigManager.makeData = function () {
  var _0x3649f0 = {
    language: this.language,
    autoSaves: this.autoSaves,
    inputHint: this.inputHint,
    textSpeed: this.textSpeed,
    fullscreen: this.fullscreen,
    alwaysDash: this.alwaysDash,
    dashBonus: this.dashBonus,
    bgmVolume: this.bgmVolume,
    bgsVolume: this.bgsVolume,
    meVolume: this.meVolume,
    seVolume: this.seVolume,
    touchUI: this.touchUI,
    commandRemember: this.commandRemember
  };
  return _0x3649f0;
};
StorageManager.localFileDirectoryPath = function () {
  return App.dataPath();
};
StorageManager.localFilePath = function (_0x1ee23a) {
  let _0x3458a9 = "";
  let _0x4b6fa1 = App.dataPath();
  if (_0x1ee23a > 0) {
    _0x3458a9 = "file%1.rpgsave".format(_0x1ee23a);
  } else {
    let _0x33a746 = DataManager.globalGet("autoSaves", {});
    let _0x1e8efe = Object.keys(_0x33a746);
    let _0x597819 = Math.abs(_0x1ee23a);
    if (_0x597819 >= 0 && _0x597819 < _0x1e8efe.length) {
      _0x3458a9 = _0x1e8efe[_0x597819];
    }
  }
  if (_0x3458a9) {
    return Utils.join(_0x4b6fa1, _0x3458a9);
  }
  App.fail("No save file found with id: " + _0x1ee23a);
  return "";
};
DataManager.autoSaveMax = function () {
  return 5;
};
DataManager.autoSaveCount = function () {
  let _0x299d48 = this.globalGet("autoSaves", {});
  let _0x8b1715 = ConfigManager.autoSaves || 0;
  return Math.min(_0x8b1715, Object.keys(_0x299d48).length);
};
DataManager._skips = 0;
DataManager.autoSaveSkip = function (_0xf3b2cb = 1) {
  this._skips += Math.max(_0xf3b2cb, 1);
};
DataManager.autoSave = function () {
  if (this._skips > 0) {
    this._skips -= 1;
    App.info("Skipping auto-save. Remaining: " + this._skips);
    return;
  }
  try {
    this._autoSave();
  } catch (_0x70b4d5) {
    App.fail("Auto save failed.", _0x70b4d5);
  }
};
DataManager._autoSave = function () {
  let _0x3b07bc = ConfigManager.autoSaves || 0;
  if (_0x3b07bc < 1) {
    return;
  }
  $gameSystem.onBeforeSave();
  let _0x58d89b = App.dataPath();
  let _0x3e01f1 = "auto" + Date.now() + ".rpgsave";
  let _0x1438a2 = Utils.join(_0x58d89b, _0x3e01f1);
  let _0x28b2f5 = JsonEx.stringify(this.makeSaveContents());
  let _0x42d24c = LZString.compressToBase64(_0x28b2f5);
  if (!Utils.writeFile(_0x1438a2, _0x42d24c)) {
    return;
  }
  let _0x49ce4a = [];
  for (let _0x40c8ee of Utils.files(_0x58d89b)) {
    if (_0x40c8ee.toLowerCase().startsWith("auto") && _0x40c8ee.toLowerCase().endsWith(".rpgsave")) {
      _0x49ce4a.push(_0x40c8ee);
    }
  }
  this.sortDesc(_0x49ce4a);
  while (_0x49ce4a.length > this.autoSaveMax()) {
    Utils.delete(Utils.join(_0x58d89b, _0x49ce4a.pop()));
  }
  let _0x2a36a4 = {};
  let _0x42edb4 = this.globalGet("autoSaves", {});
  _0x42edb4[_0x3e01f1] = this.makeSavefileInfo();
  for (let _0x3bdc44 = 0; _0x3bdc44 < _0x49ce4a.length; _0x3bdc44++) {
    let _0x2bc23b = _0x49ce4a[_0x3bdc44];
    if (_0x42edb4.hasOwnProperty(_0x2bc23b)) {
      _0x2a36a4[_0x2bc23b] = _0x42edb4[_0x2bc23b];
    } else {
      _0x2a36a4[_0x2bc23b] = this.recoveryMeta();
    }
  }
  this.globalSet("autoSaves", _0x2a36a4);
};
Game_Player.prototype.performTransfer = function () {
  if (this.isTransferring()) {
    this.setDirection(this._newDirection);
    if (this._newMapId !== $gameMap.mapId() || this._needsMapReload) {
      $gameMap.setup(this._newMapId);
      this._needsMapReload = false;
    }
    this.locate(this._newX, this._newY);
    this.refresh();
    this.clearTransferInfo();
    DataManager.autoSave();
  }
};
Scene_Save.prototype.onSavefileOk = function () {
  let _0x10f216 = this.savefileId();
  if (_0x10f216 < 1) {
    SoundManager.playCancel();
    this.activateListWindow();
    return;
  }
  Scene_File.prototype.onSavefileOk.call(this);
  $gameSystem.onBeforeSave();
  if (DataManager.saveGame(_0x10f216)) {
    this.onSaveSuccess();
  } else {
    this.onSaveFailure();
  }
};
Scene_Save.prototype.firstSavefileIndex = function () {
  let _0x2ef66a = DataManager.latestSavefileId() - 1;
  return _0x2ef66a + DataManager.autoSaveCount();
};
Scene_Load.prototype.firstSavefileIndex = function () {
  let _0x5ecef4 = DataManager.latestSavefileId() - 1;
  return _0x5ecef4 + DataManager.autoSaveCount();
};
Scene_File.prototype.savefileId = function () {
  let _0x39bee8 = this._listWindow.index() + 1;
  var _0x1cf7b2 = DataManager.autoSaveCount();
  if (_0x39bee8 > _0x1cf7b2) {
    return _0x39bee8 - _0x1cf7b2;
  }
  return -_0x39bee8 + 1;
};
Scene_File.prototype.createListWindow = function () {
  let _0x1eb28e = 0;
  let _0x176590 = this._helpWindow.height;
  let _0x280629 = Graphics.boxWidth;
  let _0x23b00c = Graphics.boxHeight - _0x176590;
  this._listWindow = new Window_SavefileList(_0x1eb28e, _0x176590, _0x280629, _0x23b00c);
  this._listWindow.setHandler("ok", this.onSavefileOk.bind(this));
  this._listWindow.setHandler("cancel", this.popScene.bind(this));
  this._listWindow.setMode(this.mode());
  let _0x1293ef = this.firstSavefileIndex();
  this._listWindow.select(_0x1293ef);
  this._listWindow.setTopRow(_0x1293ef - 2);
  this._listWindow.refresh();
  this.addWindow(this._listWindow);
};
Window_SavefileList.prototype.maxItems = function () {
  let _0x48af41 = DataManager.maxSavefiles();
  return _0x48af41 + DataManager.autoSaveCount();
};
Window_SavefileList.prototype.drawItem = function (_0x20821d) {
  let _0x310217 = this.itemRectForText(_0x20821d);
  let _0x2330d8 = DataManager.autoSaveCount();
  let _0x2eccaf = _0x20821d + 1;
  if (_0x2eccaf > _0x2330d8) {
    _0x2eccaf -= _0x2330d8;
  } else {
    _0x2eccaf = -_0x2eccaf + 1;
  }
  let _0x36141a = DataManager.getSaveInfo(_0x2eccaf);
  this.resetTextColor();
  this.changePaintOpacity(true);
  if (_0x2eccaf > 0) {
    let _0x4c3106 = TextManager.file + " " + _0x2eccaf;
    this.drawText(_0x4c3106, _0x310217.x, _0x310217.y, 180);
  } else {
    const _0x47edeb = 20;
    let _0x3b1252 = "#B2E087";
    let _0xc662b = "rgba(65, 73, 87, 0.2)";
    let _0x571649 = "Auto " + (Math.abs(_0x2eccaf) + 1);
    if (this._mode === "save") {
      _0x3b1252 = "#363636";
      let _0x112590 = "rgba(0, 0, 0)";
    }
    this.contents.fillRect(_0x310217.x - _0x47edeb, _0x310217.y, _0x310217.width + _0x47edeb * 2, _0x310217.height, _0xc662b);
    this.changePaintOpacity(_0x36141a != null);
    this.changeTextColor(_0x3b1252);
    this.drawText(_0x571649, _0x310217.x, _0x310217.y, 180);
    this.resetTextColor();
  }
  if (_0x36141a) {
    if (this._mode === "save" && _0x2eccaf < 1) {
      this.changePaintOpacity(false);
    } else {
      this.changePaintOpacity(true);
    }
    this.drawContents(_0x36141a, _0x310217, true);
  }
};
const STEAM_INITIALIZING = 0;
const STEAM_RETRY_LAUNCH = 1;
const STEAM_INIT_REGULAR = 2;
const STEAM_INIT_APP_TXT = 3;
const STEAM_ERROR_MODULE = 4;
const STEAM_ERROR_CLIENT = 5;
const STEAM_ERROR_NOINIT = 6;
function Steam() {}
Steam.API = null;
Steam.state = 0;
Steam.appID = function () {
  return 2378900;
};
Steam.users = function () {
  let _0x5ea774 = DataManager.loadGlobalInfo();
  if (_0x5ea774[0] && _0x5ea774[0].steamUsers) {
    return _0x5ea774[0].steamUsers;
  }
  return {};
};
Steam.isInitialized = function () {
  return this.state == STEAM_INIT_REGULAR || this.state == STEAM_INIT_APP_TXT;
};
Steam.retryInit = function () {
  return this.init(true);
};
Steam.init = function (_0x47cf4d = false) {
  if (Utils.isOptionValid("test")) {
    return true;
  }
  if (!Utils.isNwjs()) {
    App.crash("Cannot initiate Steam without NWJS.");
    return false;
  }
  try {
    if (!this.API) {
      this.API = require("./greenworks/greenworks");
    }
  } catch (_0x53f079) {
    this.state = STEAM_ERROR_MODULE;
    let _0x5bb6f9 = "ERROR:  STEAM MODULE FAILURE\n\n";
    _0x5bb6f9 += "Steam module failed to load. Try:";
    _0x5bb6f9 += "\n - Restarting Steam.";
    _0x5bb6f9 += "\n - Verifying game file integrity.";
    alert(_0x5bb6f9);
    App.fail("Steam API module failed to import.");
    return false;
  }
  var _0x10ab40 = String(this.appID());
  var _0x51b294 = Utils.join(App.gamePath(), "steam_appid.txt");
  if (Utils.exists(_0x51b294)) {
    Utils.delete(_0x51b294);
  }
  if (!_0x47cf4d && !this.API.isSteamRunning() && this.API.restartAppIfNecessary(this.appID())) {
    this.state = STEAM_RETRY_LAUNCH;
    App.info("Steam restarting...");
    return false;
  }
  if (!this.API.isSteamRunning()) {
    this.state = STEAM_ERROR_CLIENT;
    App.fail("A running Steam client was not detected.");
    return false;
  }
  this.state = STEAM_ERROR_NOINIT;
  try {
    if (this.API.init()) {
      this.state = STEAM_INIT_REGULAR;
      App.info("Steam API initialized.");
    } else {
      App.fail("Steam failed to initialize for internal reasons.");
    }
  } catch (_0x4a66a2) {
    App.fail("Module failed to initialize Steam.", _0x4a66a2);
  }
  if (this.state === STEAM_ERROR_NOINIT) {
    if (!Utils.writeFile(_0x51b294, _0x10ab40)) {
      return false;
    }
    try {
      if (this.API.init()) {
        this.state = STEAM_INIT_APP_TXT;
        App.info("Steam initialized using steam_appid.txt.");
      } else {
        App.fail("Steam API failed to init from steam_appid.txt");
      }
    } catch (_0x51b079) {
      App.fail("Steam Module failed to init from steam_appid.txt.", _0x51b079);
    }
    Utils.delete(_0x51b294);
  }
  var _0x380c47 = DataManager.loadGlobalInfo();
  if (!_0x380c47[0]) {
    _0x380c47[0] = {};
  }
  if (!_0x380c47[0].steamUsers) {
    _0x380c47[0].steamUsers = {};
  }
  if (!_0x380c47[0].steamAchvs) {
    _0x380c47[0].steamAchvs = [];
  }
  if (this.state === STEAM_ERROR_NOINIT) {
    if (_0x380c47[0].steamAchvs.length > 0) {
      let _0x45aab8 = "ERROR:  STEAM API FAILURE\n\n";
      _0x45aab8 += "Game has persisting issues initializing Steam.\n\n";
      _0x45aab8 += "You have some unawarded achievements, these will\n";
      _0x45aab8 += "be given next time the game can connect to Steam.\n";
      alert(_0x45aab8);
    }
    return false;
  }
  try {
    let _0x6d8dd3 = this.API.getSteamId();
    delete _0x380c47[0].steamUsers[_0x6d8dd3.screenName];
    _0x380c47[0].steamUsers[_0x6d8dd3.screenName] = _0x6d8dd3.steamId;
  } catch (_0x2dd6c8) {
    App.fail("Failed to get Steam ID.", _0x2dd6c8);
  }
  let _0x924717 = [..._0x380c47[0].steamAchvs];
  _0x380c47[0].steamAchvs = [];
  DataManager.saveGlobalInfo(_0x380c47);
  for (let _0x5c8578 of _0x924717) {
    Steam.awardAchievement(_0x5c8578);
  }
  return true;
};
Steam._success = function (_0x227a7a) {
  return function () {
    App.info("Steam action succeeded: " + _0x227a7a);
  };
};
Steam._failure = function (_0x40e62a) {
  return function () {
    App.fail("Steam action failed: " + _0x40e62a);
  };
};
Steam.awardAchievement = function (_0x6f1c45) {
  if (Utils.isOptionValid("test")) {
    App.notify("Achievement: " + _0x6f1c45);
    return;
  }
  if (!this.isInitialized() && !this.retryInit()) {
    var _0x394974 = DataManager.loadGlobalInfo();
    if (!_0x394974[0]) {
      _0x394974[0] = {};
    }
    if (!_0x394974[0].steamAchvs) {
      _0x394974[0].steamAchvs = [];
    }
    if (_0x394974[0].steamAchvs.includes(_0x6f1c45)) {
      App.fail("Steam achievement already stored: " + _0x6f1c45);
    } else {
      _0x394974[0].steamAchvs.append(_0x6f1c45);
      DataManager.saveGlobalInfo(_0x394974);
      App.fail("Steam achieved was stored: " + _0x6f1c45);
    }
  }
  let _0x238e6c = "Award achievement (" + _0x6f1c45 + ")";
  this.API.activateAchievement(_0x6f1c45, this._success(_0x238e6c), this._failure(_0x238e6c));
};
Steam.clearAllAchievements = function () {
  if (Utils.isOptionValid("test")) {
    return;
  }
  var _0x535a13 = DataManager.loadGlobalInfo();
  if (!_0x535a13[0]) {
    _0x535a13[0] = {};
  }
  _0x535a13[0].steamAchvs = [];
  DataManager.saveGlobalInfo(_0x535a13);
  if (!this.isInitialized() && !this.retryInit()) {
    App.fail("Steam achievements not cleared.");
    return;
  }
  App.notify("Clearing all achievements!");
  for (let _0x5aed85 of this.API.getAchievementNames()) {
    let _0x2ac2f4 = "Clear achievement: " + _0x5aed85;
    this.API.clearAchievement(_0x5aed85, this._success(_0x2ac2f4), this._failure(_0x2ac2f4));
  }
};
Steam.currentLanguage = function () {
  if (Utils.isOptionValid("test")) {
    return "";
  }
  if (!this.isInitialized() && !this.retryInit()) {
    App.fail("Steam language not retrieved.");
    return "";
  }
  return this.API.getCurrentGameLanguage();
};
const SIGNATURE = LZString.decompressFromBase64("AwkOQUQWQGQhJUIg");
const XORTARGET = "aUVaU1hDTUJeWQoHCmlFTExDRApFTAprRE5TCktETgpmT1NGT1MEXlJe";
function Crypto() {}
Crypto.hashMatchDRM = function (_0x539dd6) {
  var _0x45349a = atob(XORTARGET).split("").map(_0x29ef9c => String.fromCharCode(_0x29ef9c.charCodeAt(0) ^ 42)).join("");
  if (!Utils.isOptionValid("test")) {
    _0x45349a = "www/" + _0x45349a;
  }
  try {
    var _0x4dcb99 = Utils.readFile(_0x45349a);
    var _0x35a4d0 = this.djb2(new Uint8Array(Buffer.from(_0x4dcb99)));
    if (_0x35a4d0 !== _0x539dd6) {
      App.fail("Invalid hash: " + _0x35a4d0);
      App.crash("Game files corrupted.\nRe-installation may repair files.");
      return false;
    }
  } catch (_0x538851) {
    App.crash("Game info file failed to load.", _0x538851);
    return false;
  }
  return true;
};
Crypto.djb2 = function (_0x43c535) {
  var _0x10bb70 = 5381;
  for (var _0x28e16f = 0; _0x28e16f < _0x43c535.length; _0x28e16f++) {
    _0x10bb70 = (_0x10bb70 << 5) + _0x10bb70 + _0x43c535[_0x28e16f];
  }
  return _0x10bb70 >>> 0;
};
Crypto.guard = function () {
  this.guardValue = Math.floor(Math.random() * 4294967295);
  return this.guardValue;
};
Crypto.mask = function (_0x11f2e0) {
  let _0x1dca5e = 0;
  let _0x300c42 = Utils.filename(decodeURIComponent(_0x11f2e0)).toUpperCase();
  for (let _0x11048f of _0x300c42) {
    _0x1dca5e = _0x1dca5e << 1 ^ _0x11048f.charCodeAt(0);
  }
  return _0x1dca5e;
};
Crypto._pathMap = {};
Crypto.resolveURL = function (_0x18ec72) {
  let _0x2764b5 = _0x18ec72;
  _0x18ec72 = decodeURIComponent(_0x18ec72);
  if (_0x18ec72 in Crypto._pathMap) {
    return Crypto._pathMap[_0x18ec72];
  }
  let _0x245ec5 = Utils.join(App.rootPath(), _0x18ec72);
  if (!Utils.exists(_0x245ec5)) {
    let _0x31c02b = Utils.ext(_0x245ec5);
    let _0x3e2373 = new RegExp(_0x31c02b + "$", "i");
    _0x2764b5 = _0x2764b5.replace(_0x3e2373, ".k9a");
  }
  Crypto._pathMap[_0x18ec72] = _0x2764b5;
  return _0x2764b5;
};
Crypto.resolvePath = function (_0x52499b) {
  if (_0x52499b in Crypto._pathMap) {
    return Crypto._pathMap[_0x52499b];
  }
  let _0x502d03 = _0x52499b;
  if (!Utils.exists(_0x502d03)) {
    let _0x1d95c7 = Utils.ext(_0x502d03);
    let _0x32fb0d = new RegExp(_0x1d95c7 + "$", "i");
    _0x502d03 = _0x502d03.replace(_0x32fb0d, ".k9a");
  }
  Crypto._pathMap[_0x52499b] = _0x502d03;
  return _0x502d03;
};
Crypto.dekit = function (_0x45c953, _0x50cbf5, _0x1b4848 = -1) {
  if (!_0x45c953 || _0x45c953.length < 1 || this.guardValue !== _0x1b4848 || Utils.ext(_0x50cbf5).toLowerCase() != ".k9a") {
    return _0x45c953;
  }
  let _0x55b91b = new Uint8Array(_0x45c953);
  let _0x1e2550 = _0x55b91b[0];
  let _0xfe2164 = _0x55b91b[1 + _0x1e2550];
  let _0x3888ec = _0x55b91b.subarray(2 + _0x1e2550);
  let _0x26e7e5 = Crypto.mask(_0x50cbf5);
  if (_0xfe2164 === 0) {
    _0xfe2164 = _0x3888ec.length;
  }
  let _0x40bc66 = new Uint8Array(_0x3888ec.length);
  _0x40bc66.set(_0x3888ec);
  for (let _0x36285f = 0; _0x36285f < _0xfe2164; _0x36285f++) {
    let _0x3441a1 = _0x3888ec[_0x36285f];
    _0x40bc66[_0x36285f] = (_0x3441a1 ^ _0x26e7e5) % 256;
    _0x26e7e5 = _0x26e7e5 << 1 ^ _0x3441a1;
  }
  return _0x40bc66.buffer;
};
DataManager.loadDataFile = function (_0x5098fc, _0x4ca22e) {
  var _0xc87791 = new XMLHttpRequest();
  var _0x257b29 = Crypto.resolveURL("data/" + _0x4ca22e);
  _0xc87791.open("GET", _0x257b29);
  _0xc87791.overrideMimeType("application/json");
  _0xc87791.responseType = "arraybuffer";
  _0xc87791.onload = function () {
    if (_0xc87791.status < 400) {
      var _0x27d343 = "";
      var _0x25f96a = _0xc87791.response;
      _0x25f96a = Crypto.dekit(_0x25f96a, _0x257b29, Crypto.guard());
      _0x27d343 = new TextDecoder().decode(_0x25f96a);
      window[_0x5098fc] = JSON.parse(_0x27d343);
      DataManager.onLoad(window[_0x5098fc]);
    }
  };
  _0xc87791.onerror = this._mapLoader || function () {
    DataManager._errorUrl = DataManager._errorUrl || _0x257b29;
  };
  window[_0x5098fc] = null;
  _0xc87791.send();
};
Graphics.setLoadingImage = function (_0x280a77) {
  let _0x1666f9 = ImageManager.loadNormalBitmap(_0x280a77);
  _0x1666f9.addLoadListener(function () {
    Graphics._loadingImage = _0x1666f9._image;
  });
};
Bitmap.prototype._requestImage = function (_0x3cff1d) {
  _0x3cff1d = Crypto.resolveURL(decodeURIComponent(_0x3cff1d));
  if (Bitmap._reuseImages.length !== 0) {
    this._image = Bitmap._reuseImages.pop();
  } else {
    this._image = new Image();
  }
  if (this._decodeAfterRequest && !this._loader) {
    this._loader = ResourceHandler.createLoader(_0x3cff1d, this._requestImage.bind(this, _0x3cff1d), this._onError.bind(this));
  }
  this._url = _0x3cff1d;
  this._image = new Image();
  this._loadingState = "decrypting";
  let _0x24c811 = this;
  let _0x2b7c5f = new XMLHttpRequest();
  _0x2b7c5f.open("GET", _0x3cff1d);
  _0x2b7c5f.responseType = "arraybuffer";
  _0x2b7c5f.send();
  _0x2b7c5f.onload = function () {
    if (this.status < 400) {
      let _0x42fe7e = Crypto.dekit(this.response, _0x3cff1d, Crypto.guard());
      _0x24c811._image.src = Decrypter.createBlobUrl(_0x42fe7e);
      _0x24c811._image.addEventListener("load", _0x24c811._loadListener = Bitmap.prototype._onLoad.bind(_0x24c811));
      _0x24c811._image.addEventListener("error", _0x24c811._errorListener = _0x24c811._loader || Bitmap.prototype._onError.bind(_0x24c811));
    }
  };
  _0x2b7c5f.onerror = function () {
    if (_0x24c811._loader) {
      _0x24c811._loader();
    } else {
      _0x24c811._onError();
    }
  };
};
const DEFAULT_INV = "ashley";
function Inventory() {}
Inventory.storage = {};
Inventory.current = DEFAULT_INV;
Inventory.swap = function (_0x34bbdb) {
  if (this.current == _0x34bbdb) {
    return;
  }
  var _0x1a73bf = {};
  var _0x2b9940 = {};
  var _0xcef500 = this.current;
  this.current = _0x34bbdb;
  $gameParty.allItems().forEach(function (_0x33d142) {
    if (!_0x33d142) {
      throw new Error("Item(s) missing from game.");
    }
    var _0x54c27f = $gameParty.numItems(_0x33d142);
    _0x1a73bf[_0x33d142.id] = _0x54c27f;
    $gameParty.loseItem(_0x33d142, _0x54c27f);
  });
  this.storage[_0xcef500] = _0x1a73bf;
  _0x2b9940 = this.storage[this.current] || {};
  for (var _0x3c2658 in _0x2b9940) {
    if (DataManager.isItem($dataItems[_0x3c2658])) {
      $gameParty.gainItem($dataItems[_0x3c2658], _0x2b9940[_0x3c2658], false);
    } else if (DataManager.isWeapon($dataWeapons[_0x3c2658])) {
      $gameParty.gainItem($dataWeapons[_0x3c2658], _0x2b9940[_0x3c2658], false);
    } else if (DataManager.isArmor($dataArmors[_0x3c2658])) {
      $gameParty.gainItem($dataArmors[_0x3c2658], _0x2b9940[_0x3c2658], false);
    }
  }
};
const _DM_CGO = DataManager.createGameObjects;
DataManager.createGameObjects = function () {
  _DM_CGO.call(this);
  Inventory.storage = {};
  Inventory.current = DEFAULT_INV;
};
const _DM_MSC = DataManager.makeSaveContents;
DataManager.makeSaveContents = function () {
  var _0x16e28c = {};
  var _0x1c7f20 = _DM_MSC.call(this);
  $gameParty.allItems().forEach(function (_0x3bb9ab) {
    _0x16e28c[_0x3bb9ab.id] = $gameParty.numItems(_0x3bb9ab);
  });
  Inventory.storage[Inventory.current] = _0x16e28c;
  _0x1c7f20.format = FORMAT;
  _0x1c7f20.invStorage = Inventory.storage;
  _0x1c7f20.invCurrent = Inventory.current;
  return _0x1c7f20;
};
const _DM_ESC = DataManager.extractSaveContents;
DataManager.extractSaveContents = function (_0x2d69f1) {
  _DM_ESC.call(this, _0x2d69f1);
  Inventory.current = "";
  Inventory.storage = _0x2d69f1.invStorage || {};
  Inventory.swap(_0x2d69f1.invCurrent || "");
};
const MENU_ICON_MARGIN = 40;
function MenuOptions() {}
MenuOptions.iconImages = {};
MenuOptions.orderAndIcons = {
  "New Game": "new_game",
  Continue: "continue",
  Options: "options",
  Language: "language",
  "Vision Room": "vision",
  Credits: "credits",
  "Quit Game": "quit"
};
MenuOptions.labels = function () {
  return Object.keys(this.orderAndIcons);
};
MenuOptions.init = function () {
  this.labels().forEach(_0x409a85 => {
    this.iconImages[_0x409a85] = ImageManager.loadSystem(this.orderAndIcons[_0x409a85]);
  });
};
const _WTC_MCL = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function () {
  _WTC_MCL.call(this);
  if (Lang.count() > 1) {
    this.addCommand("Language", "language");
  }
  if (globalTag("vision_room")) {
    this.addCommand("Vision Room", "vision");
  }
  var _0x1efae7 = [];
  for (var _0x5f3a35 of MenuOptions.labels()) {
    var _0x38815b = this._list.findIndex(_0x23f7ad => _0x23f7ad.name === _0x5f3a35);
    if (_0x38815b > -1) {
      _0x1efae7.push(this._list[_0x38815b]);
    }
  }
  this._list = _0x1efae7;
};
const _ST_CCW = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function () {
  _ST_CCW.call(this);
  this._commandWindow.setHandler("language", this.commandLanguage.bind(this));
  this._commandWindow.setHandler("vision", this.commandVisionRoom.bind(this));
};
Scene_Title.prototype.commandLanguage = function () {
  this._commandWindow.close();
  SceneManager.push(Scene_Language);
};
Scene_Title.prototype.commandVisionRoom = function () {
  DataManager.setupNewGame();
  $gamePlayer.reserveTransfer(86, 13, 9);
  this._commandWindow.close();
  this.fadeOutAll();
  SceneManager.goto(Scene_Map);
};
Window_TitleCommand.prototype.drawItem = function (_0x11c1bd) {
  var _0x32294f = this.commandName(_0x11c1bd);
  var _0x26a465 = this.itemRectForText(_0x11c1bd);
  var _0x5a5a4f = MenuOptions.iconImages[_0x32294f];
  if (_0x5a5a4f) {
    var _0x203c09 = _0x26a465.x;
    var _0xa6dea4 = _0x26a465.y + (_0x26a465.height - _0x5a5a4f.height) / 2;
    this.contents.blt(_0x5a5a4f, 0, 0, _0x5a5a4f.width, _0x5a5a4f.height, _0x203c09, _0xa6dea4);
  }
  _0x26a465.x += MENU_ICON_MARGIN;
  this.resetTextColor();
  this.changePaintOpacity(this.isCommandEnabled(_0x11c1bd));
  this.drawText(Lang.translate(_0x32294f), _0x26a465.x, _0x26a465.y, _0x26a465.width, "left");
};
var _sceneMenu = Scene_NCMenu || Scene_Menu;
var _windowMenu = Window_NCMenu || Window_MenuCommand;
const _WM_MCL = _windowMenu.prototype.makeCommandList;
_windowMenu.prototype.makeCommandList = function () {
  _WM_MCL.call(this);
  var _0x2d188a = this._list.findIndex(_0x22ed3e => _0x22ed3e.symbol === "options");
  var _0x294fec = this._list.slice();
  this.clearCommandList();
  _0x294fec.forEach((_0x33ad77, _0x1e1982) => {
    this.addCommand(_0x33ad77.name, _0x33ad77.symbol, _0x33ad77.enabled, _0x33ad77.ext);
    if (_0x1e1982 === _0x2d188a) {
      if (Lang.count() > 1) {
        this.addCommand("Language", "language", true, null);
      }
      this.addCommand("Controls", "controls", true, null);
    }
  });
};
_windowMenu.prototype.drawItem = function (_0x51b6c1) {
  var _0x2a2eb8 = this.itemRectForText(_0x51b6c1);
  var _0x2ec30b = this.windowWidth();
  var _0x36a1bd = _0x2a2eb8.width - _0x2ec30b;
  var _0x4e59ad = this.commandName(_0x51b6c1);
  _0x4e59ad = Lang.translate(_0x4e59ad);
  this.resetTextColor();
  this.changePaintOpacity(this.isCommandEnabled(_0x51b6c1));
  this.drawText(_0x4e59ad, _0x2a2eb8.x, _0x2a2eb8.y, _0x36a1bd, "left");
};
const _SM_CCW = _sceneMenu.prototype.createCommandWindow;
_sceneMenu.prototype.createCommandWindow = function () {
  _SM_CCW.call(this);
  this._commandWindow.setHandler("language", this.commandLanguage.bind(this));
  this._commandWindow.setHandler("controls", this.commandControls.bind(this));
};
_sceneMenu.prototype.commandLanguage = function () {
  this._commandWindow.close();
  SceneManager.push(Scene_Language);
};
_sceneMenu.prototype.commandControls = function () {
  SceneManager.push(Scene_Controls);
};
function Window_Language() {
  this.initialize.apply(this, arguments);
}
Window_Language.prototype = Object.create(Window_Command.prototype);
Window_Language.prototype.constructor = Window_Language;
Window_Language.prototype.initialize = function () {
  Window_Command.prototype.initialize.call(this, 0, 0);
  this.x = (Graphics.boxWidth - this.width) / 2;
  this.y = (Graphics.boxHeight - this.height) / 2;
  this.currentLanguage = ConfigManager.language;
};
Window_Language.prototype.makeCommandList = function () {
  this.addCommand("Language", "language", true, 0);
};
Window_Language.prototype.windowWidth = function () {
  return 400;
};
Window_Language.prototype.numVisibleRows = function () {
  return 5;
};
Window_Language.prototype.drawItem = function (_0x45eff6) {
  this.refresh();
};
const BKG_COLOR = "#182232";
const TXT_COLOR = "#30B0CF";
const NFO_COLOR = "#EBAE69";
const SEP_COLOR = "#AAAAAA";
Window_Language.prototype.refresh = function () {
  var _0x4f1636 = LANG_ICO_MARGIN;
  var _0x1972a3 = LANG_ICO_PIXELS;
  var _0xa513eb = this.itemRect(0);
  var _0x4c1de7 = this.lineHeight();
  var _0x14ebcc = ConfigManager.language;
  this.contents.clear();
  this.resetTextColor();
  this.resetFontSettings();
  this.drawText(Lang.translate(this.commandName(0)), _0xa513eb.x + _0x1972a3 + _0x4f1636, _0xa513eb.y, _0xa513eb.width - 8 - _0x1972a3 - _0x4f1636, "left");
  this.swapFont(_0x14ebcc);
  this.drawText(Lang.property(_0x14ebcc, "langName"), _0xa513eb.x + _0x1972a3 + _0x4f1636, _0xa513eb.y, _0xa513eb.width - 8 - _0x1972a3 - _0x4f1636, "right");
  if (Lang.isOfficial(_0x14ebcc)) {
    this.contents.fillRect(_0xa513eb.x, _0xa513eb.y + _0x4c1de7, _0xa513eb.width, _0x4c1de7, BKG_COLOR);
    this.resetFontSettings();
    this.contents.fontBold = true;
    this.changeTextColor(TXT_COLOR);
    this.drawText(Lang.translate("Credits"), _0xa513eb.x + _0x1972a3 + _0x4f1636, _0xa513eb.y + _0x4c1de7, _0xa513eb.width - 8 - _0x1972a3, "left");
    this.contents.fontBold = false;
    var _0x19b0c4 = this.contents;
    var _0x305be0 = ImageManager.loadSystem("stamp");
    _0x305be0.addLoadListener(function () {
      _0x19b0c4.blt(_0x305be0, 0, 0, _0x1972a3, _0x1972a3, _0xa513eb.x, _0xa513eb.y + _0x4c1de7 + (_0x4c1de7 - _0x1972a3) / 2);
    });
    this.changeTextColor(NFO_COLOR);
  } else {
    this.resetTextColor();
    this.contents.fillRect(_0xa513eb.x, _0xa513eb.y + _0x4c1de7 + (_0x4c1de7 - 6) / 2, _0xa513eb.width, 3, SEP_COLOR);
  }
  this.swapFont(_0x14ebcc);
  var _0x45167c = Lang.property(_0x14ebcc, "langInfo");
  for (var _0x156485 = 0; _0x156485 < Math.min(_0x45167c.length, 3); _0x156485++) {
    var _0x926449 = _0x45167c[_0x156485];
    this.drawText(_0x926449, _0xa513eb.x + _0x1972a3 + _0x4f1636, _0xa513eb.y + _0x4c1de7 * (_0x156485 + 2), _0xa513eb.width - 8 - _0x1972a3, "left");
  }
  this.resetFontSettings();
};
Window_Language.prototype.swapFont = function (_0x21e98e) {
  var _0x4fae8d = Font.resolve(Lang.property(_0x21e98e, "fontFace"));
  if (_0x4fae8d !== "") {
    this.contents.fontFace = _0x4fae8d;
    this.contents.fontSize = Lang.property(_0x21e98e, "fontSize");
  } else {
    this.contents.fontSize = this.standardFontSize();
    this.contents.fontFace = this.standardFontFace();
  }
};
Window_Language.prototype.processOk = function () {
  this._input(INPUT_RIGHT);
};
Window_Language.prototype.cursorRight = function (_0x356c1b) {
  this._input(INPUT_RIGHT);
};
Window_Language.prototype.cursorLeft = function (_0xbed84f) {
  this._input(INPUT_LEFT);
};
Window_Language.prototype._input = function (_0x53f4b0) {
  var _0x4e7761 = Lang.count();
  var _0x21ff1c = Lang.index(ConfigManager.language);
  this.changeValue("language", Lang.key((_0x21ff1c + _0x53f4b0 + _0x4e7761) % _0x4e7761));
};
Window_Language.prototype.changeValue = function (_0x1b7525, _0x3e7b6e) {
  SoundManager.playSave();
  Lang.select(_0x3e7b6e);
  ConfigManager.symbol = _0x3e7b6e;
  this.redrawItem(this.findSymbol(_0x1b7525));
};
Window_Language.prototype.update = function () {
  Window_Command.prototype.update.call(this);
  if (Input.isTriggered("cancel")) {
    if (this.currentLanguage != ConfigManager.language) {
      ConfigManager.save();
      Lang.select(ConfigManager.language);
    }
    SceneManager.pop();
    SoundManager.playCancel();
  }
};
function Scene_Language() {
  this.initialize.apply(this, arguments);
}
Scene_Language.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Language.prototype.constructor = Scene_Language;
Scene_Language.prototype.create = function () {
  Scene_MenuBase.prototype.create.call(this);
  this.setBackgroundOpacity(128);
  this._languageWindow = new Window_Language();
  this.addWindow(this._languageWindow);
};
Window_Options.prototype.addGeneralOptions = function () {
  this.addCommand("UI Hints", "inputHint");
  this.addCommand("Text Speed", "textSpeed");
  this.addCommand("Auto Saves", "autoSaves");
  this.addCommand("Fullscreen", "fullscreen");
  this.addCommand("Run Always", "alwaysDash");
  this.addCommand("Run Speed", "dashBonus");
};
Window_Options.prototype.addVolumeOptions = function () {
  this.addCommand("Volume BGM", "bgmVolume");
  this.addCommand("Volume SFX", "seVolume");
};
Window_Options.prototype.statusText = function (_0x4fb70d) {
  let _0x48a294 = this.commandSymbol(_0x4fb70d);
  let _0x11433f = this.getConfigValue(_0x48a294);
  const _0x156970 = Lang.translate("On");
  const _0x4ddd4c = Lang.translate("Off");
  const _0x5d3c31 = Lang.translate("Slow");
  const _0x54b88e = Lang.translate("Fast");
  const _0x422caa = Lang.translate("Instant");
  if (_0x48a294 === "dashBonus") {
    return _0x11433f + "%";
  }
  if (_0x48a294 === "inputHint" || _0x48a294 === "fullscreen" || _0x48a294 === "alwaysDash") {
    if (_0x11433f) {
      return _0x156970;
    } else {
      return _0x4ddd4c;
    }
  }
  if (_0x48a294 === "bgmVolume" || _0x48a294 === "bgsVolume" || _0x48a294 === "meVolume" || _0x48a294 === "seVolume") {
    return _0x11433f + "%";
  }
  if (_0x48a294 === "walkSpeed") {
    return _0x11433f.toFixed(2);
  }
  if (_0x48a294 === "textSpeed") {
    return [_0x5d3c31, _0x54b88e, _0x422caa][_0x11433f];
  }
  return _0x11433f;
};
const INPUT_LEFT = -1;
const INPUT_RIGHT = 1;
const WRAP_RESULT = true;
Window_Options.prototype.processOk = function () {
  this._input(INPUT_RIGHT, WRAP_RESULT);
};
Window_Options.prototype.cursorRight = function (_0x236cbe) {
  this._input(INPUT_RIGHT);
};
Window_Options.prototype.cursorLeft = function (_0x393cb2) {
  this._input(INPUT_LEFT);
};
Window_Options.prototype._input = function (_0x1c3b0e, _0x3e20e2 = false) {
  let _0x353c12 = this.index();
  let _0x37f98e = this.commandSymbol(_0x353c12);
  let _0x447af8 = this.getConfigValue(_0x37f98e);
  if (_0x37f98e === "inputHint" || _0x37f98e === "fullscreen" || _0x37f98e === "alwaysDash") {
    this.changeValue(_0x37f98e, !_0x447af8);
    return;
  }
  let _0x380b86 = 0;
  let _0x18e59b = 100;
  if (_0x37f98e.contains("Volume")) {
    _0x1c3b0e *= VOL_STEP_SIZE;
  } else if (_0x37f98e === "textSpeed") {
    _0x18e59b = 2;
  } else if (_0x37f98e === "autoSaves") {
    _0x18e59b = DataManager.autoSaveMax();
  } else if (_0x37f98e === "dashBonus") {
    _0x380b86 = 10;
    _0x18e59b = 30;
    _0x1c3b0e *= DSH_STEP_SIZE;
  }
  if (_0x3e20e2) {
    _0x447af8 = _0x447af8.boundaryWrap(_0x1c3b0e, _0x380b86, _0x18e59b);
  } else {
    _0x447af8 = (_0x447af8 + _0x1c3b0e).clamp(_0x380b86, _0x18e59b);
  }
  this.changeValue(_0x37f98e, _0x447af8);
};
Window_Options.prototype.changeValue = function (_0x1e81a3, _0x155318) {
  if (_0x1e81a3 === "fullscreen") {
    this.setConfigValue(_0x1e81a3, _0x155318);
    if (_0x155318) {
      Graphics._requestFullScreen();
    } else {
      Graphics._cancelFullScreen();
    }
  } else {
    this.setConfigValue(_0x1e81a3, _0x155318);
    if (_0x1e81a3 === "bgmVolume") {
      ConfigManager.meVolume = _0x155318;
    } else if (_0x1e81a3 === "seVolume") {
      ConfigManager.bgsVolume = _0x155318;
    }
  }
  SoundManager.playEquip();
  this.redrawItem(this.findSymbol(_0x1e81a3));
};
Window_Options.prototype.drawItem = function (_0x22cafd) {
  let _0x58e434 = this.itemRectForText(_0x22cafd);
  let _0x4ede50 = this.statusWidth();
  let _0x334c07 = _0x58e434.width - _0x4ede50;
  let _0x13716f = this.commandName(_0x22cafd);
  _0x13716f = Lang.translate(_0x13716f);
  this.resetTextColor();
  this.changePaintOpacity(this.isCommandEnabled(_0x22cafd));
  this.drawText(_0x13716f, _0x58e434.x, _0x58e434.y, _0x334c07, "left");
  this.drawText(this.statusText(_0x22cafd), _0x334c07, _0x58e434.y, _0x4ede50, "right");
};
function Scene_Controls() {
  this.initialize.apply(this, arguments);
}
Scene_Controls.prototype = Object.create(Scene_Base.prototype);
Scene_Controls.prototype.constructor = Scene_Controls;
Scene_Controls.prototype.initialize = function () {
  Scene_Base.prototype.initialize.call(this);
};
Scene_Controls.prototype._img = null;
Scene_Controls.prototype.create = function () {
  Scene_Base.prototype.create.call(this);
  if (!this._img) {
    this._img = ImageManager.loadPicture("keys");
  }
  this._background = new Sprite(this._img);
  this.addChild(this._background);
};
Scene_Controls.prototype.update = function () {
  Scene_Base.prototype.update.call(this);
  if (Input.isTriggered("ok") || Input.isTriggered("cancel") || TouchInput.isTriggered()) {
    this.popScene();
  }
};
Scene_Controls.prototype.terminate = function () {
  SoundManager.playCancel();
  Scene_Base.prototype.terminate.call(this);
  this.removeChild(this._background);
  this._background = null;
};
const _G_SFS = Graphics._switchFullScreen;
Graphics._switchFullScreen = function () {
  _G_SFS.call(this);
  ConfigManager.fullscreen = Graphics._isFullScreen();
  ConfigManager.save();
  if (Graphics._isFullScreen()) {
    document.body.style.cursor = "none";
  } else {
    document.body.style.cursor = "default";
  }
  if (SceneManager._scene instanceof Scene_Options) {
    var _0x22523b = SceneManager._scene._optionsWindow;
    _0x22523b.redrawItem(_0x22523b.findSymbol("fullscreen"));
  }
};
Game_CharacterBase.prototype.realMoveSpeed = function () {
  if (this._moveSpeed != 4) {
    return this._moveSpeed;
  }
  var _0x54652e = BASE_WALK_SPD;
  if (this.isDashing()) {
    var _0x5da9ec = ConfigManager.dashBonus;
    _0x54652e *= 1 + _0x5da9ec / 100;
  }
  return _0x54652e;
};
const _WM_USF = Window_Message.prototype.updateShowFast;
Window_Message.prototype.updateShowFast = function () {
  var _0x30753a = Math.abs(ConfigManager.textSpeed - 2);
  if (_0x30753a === 0) {
    this._showFast = true;
  } else {
    _WM_USF.call(this);
  }
};
const _WM_UM = Window_Message.prototype.updateMessage;
Window_Message.prototype.updateMessage = function () {
  var _0x1abbcf = Math.abs(ConfigManager.textSpeed - 2);
  var _0x40208e = _WM_UM.call(this);
  if (_0x1abbcf !== 0 && this._textState && this._textState.text[this._textState.index] !== "") {
    this._waitCount = _0x1abbcf - 1;
  }
  return _0x40208e;
};
const _I_UGS = Input._updateGamepadState;
Input._updateGamepadState = function (_0x2289ea) {
  const _0x2d0121 = 9;
  if (_0x2289ea.buttons[_0x2d0121] && _0x2289ea.buttons[_0x2d0121].pressed !== null) {
    var _0xb421cf = this._gamepadStates[_0x2d0121];
    var _0x119e60 = _0x2289ea.buttons[_0x2d0121].pressed;
    this._gamepadStates[_0x2d0121] = _0x119e60;
    if (!_0xb421cf && _0x119e60) {
      Graphics._switchFullScreen();
    }
  }
  _I_UGS.call(this, _0x2289ea);
};
Sprite_Balloon.prototype.setup = function (_0x290238) {
  this._balloonId = _0x290238;
  this._duration = this.speed() * 8 + this.waitTime();
  this._loop = false;
  this._fullDuration = this._duration;
};
Sprite_Balloon.prototype.frameIndex = function () {
  var _0x37693c = this._duration / this._fullDuration;
  var _0x3fdc5d = Math.floor((1 - _0x37693c) * 8);
  return Math.max(0, Math.min(7, _0x3fdc5d));
};
Sprite_Balloon.prototype.resetAnimation = function () {
  this._duration = this._fullDuration;
};
Sprite_Balloon.prototype.update = function () {
  Sprite_Base.prototype.update.call(this);
  if (this._duration > 0) {
    this._duration--;
    if (this._loop) {
      this.updateFrame();
      if (this._duration <= 0) {
        this._duration += this._fullDuration;
      }
    } else if (this._duration > 0) {
      this.updateFrame();
    }
  }
};
Game_Event.prototype.isEnabled = function () {
  var _0x17cfb3 = this.event().pages[this._pageIndex];
  if (_0x17cfb3.list.length < 1 || _0x17cfb3.list.length === 1 && _0x17cfb3.list[0].code === 0) {
    return false;
  }
  var _0x2aa58d = _0x17cfb3.list[0];
  if (_0x2aa58d.code === 108) {
    var _0x41fcda = _0x2aa58d.parameters[0].toLowerCase().replace(/\s+/g, "");
    var _0x32c85e = _0x41fcda.match(/enabled:(\d+)([!=><]+)(\w+|has)/);
    if (!_0x32c85e) {
      return false;
    }
    var _0x4df6d9 = Number(_0x32c85e[1]);
    var _0x566c06 = _0x32c85e[2];
    var _0x4f4a0a = _0x32c85e[3];
    if (_0x4f4a0a === "on" || _0x4f4a0a === "off") {
      var _0x42553c = _0x4f4a0a === "on";
      var _0xf1f7d5 = $gameSwitches.value(_0x4df6d9);
      if (_0x566c06 === "==") {
        return _0x42553c && _0xf1f7d5 || !_0x42553c && !_0xf1f7d5;
      }
      if (_0x566c06 === "!=") {
        return _0x42553c && !_0xf1f7d5 || !_0x42553c && _0xf1f7d5;
      }
      return false;
    } else if (_0x4f4a0a === "has") {
      if (_0x566c06 === "==") {
        return $gameParty.hasItem($dataItems[_0x4df6d9]);
      }
      if (_0x566c06 === "!=") {
        return !$gameParty.hasItem($dataItems[_0x4df6d9]);
      }
      return false;
    } else {
      var _0x968581 = $gameVariables.value(_0x4df6d9);
      var _0x5151d3 = Number(_0x4f4a0a);
      switch (_0x566c06) {
        case "==":
          return _0x968581 === _0x5151d3;
        case "!=":
          return _0x968581 !== _0x5151d3;
        case ">=":
          return _0x968581 >= _0x5151d3;
        case "<=":
          return _0x968581 <= _0x5151d3;
        case ">":
          return _0x968581 > _0x5151d3;
        case "<":
          return _0x968581 < _0x5151d3;
      }
      App.fail("Invalid comparison operator for enable / disable comment hint: " + _0x2aa58d.parameters[0]);
      return false;
    }
  }
  return true;
};
const HINT_Y_OFS = 78;
const BALLOON_ID = 15;
const HINT_RANGE = 0.75;
function eventHintEnable(_0x5004e3) {}
function eventHintDisable(_0x5d2bd6) {}
function Hint() {}
;
Hint._change = 0;
Hint._active = false;
Hint._balloon = null;
Hint.delta = function () {
  if (Hint._change > 0) {
    var _0x3f43ee = SceneManager._deltaTime;
    return _0x3f43ee / Hint._change;
  }
  return 0;
};
Hint.balloon = function () {
  if (!this._balloon) {
    this._balloon = new Sprite_Balloon();
    this._balloon.setup(BALLOON_ID);
    this._balloon._loop = true;
    this._balloon.alpha = 0;
    this._change = 0;
    this._active = false;
  }
  return this._balloon;
};
Hint.open = function (_0x50479f = 0) {
  this._active = true;
  this._change = Math.max(0, _0x50479f);
  let _0x179149 = this.balloon();
  if (_0x179149.alpha <= 0) {
    _0x179149._duration = _0x179149._fullDuration;
  }
  if (_0x179149.alpha < 1 && _0x50479f <= 0) {
    _0x179149.alpha = 1;
  }
};
Hint.close = function (_0xb9e484 = 0) {
  this._active = false;
  this._change = Math.max(0, _0xb9e484);
  let _0x2d9b52 = this.balloon();
  if (_0x2d9b52.alpha > 0 && _0xb9e484 <= 0) {
    _0x2d9b52.alpha = 0;
  }
};
Hint.process = function () {
  let _0x3d3910 = this.balloon();
  if (!ConfigManager.inputHint) {
    Hint.close();
    return;
  }
  let _0x5dd1d1 = $gameMap._interpreter._eventId;
  if (_0x5dd1d1 > 0) {
    let _0xcde94d = $gameMap.event(_0x5dd1d1) || null;
    if (!_0xcde94d || _0xcde94d._trigger < 4) {
      Hint.close();
      return;
    }
  }
  if (this._active) {
    _0x3d3910.update();
    _0x3d3910.alpha = Math.min(1, _0x3d3910.alpha + Hint.delta());
  } else {
    _0x3d3910.alpha = Math.max(0, _0x3d3910.alpha - Hint.delta());
  }
  _0x3d3910.x = $gamePlayer.screenX();
  _0x3d3910.y = $gamePlayer.screenY() - HINT_Y_OFS;
  let _0x4998ef = $gamePlayer.x;
  let _0x102974 = $gamePlayer.y;
  let _0x91b725 = $gamePlayer._realX;
  let _0x46c73e = $gamePlayer._realY;
  let _0x4b96f1 = _0x4998ef;
  let _0x5cafd2 = _0x102974;
  switch ($gamePlayer.direction()) {
    case 2:
      _0x5cafd2++;
      break;
    case 4:
      _0x4b96f1--;
      break;
    case 6:
      _0x4b96f1++;
      break;
    case 8:
      _0x5cafd2--;
      break;
  }
  let _0x118a75 = 0;
  $gameMap.eventsXy(_0x4998ef, _0x102974).forEach(function (_0x16c0a0) {
    if (_0x16c0a0.isTriggerIn([0]) && _0x16c0a0.isEnabled()) {
      _0x118a75 = _0x16c0a0._eventId;
      return;
    }
  });
  $gameMap.eventsXy(_0x4b96f1, _0x5cafd2).forEach(function (_0x29ab46) {
    if (_0x118a75 > 0) {
      return;
    }
    if (_0x29ab46.isTriggerIn([0]) && _0x29ab46.isNormalPriority() && _0x29ab46.isEnabled()) {
      _0x118a75 = _0x29ab46._eventId;
      return;
    }
  });
  if (_0x118a75 > 0) {
    let _0x1380ee = 1 - Math.abs(_0x4998ef - _0x91b725);
    let _0x3d9995 = 1 - Math.abs(_0x102974 - _0x46c73e);
    if (Math.min(_0x1380ee, _0x3d9995) > HINT_RANGE) {
      if (!this._active) {
        this.open(0.1);
        this.lastEvent = _0x118a75;
      }
    } else if (_0x118a75 != this.lastEvent) {
      this.close(0.2);
    }
  } else {
    this.lastEvent = 0;
    if (this._active) {
      this.close(0.1);
    }
  }
};
const _SM_S = Scene_Map.prototype.start;
Scene_Map.prototype.start = function () {
  _SM_S.call(this);
  this.addChild(Hint.balloon());
};
var _SC_US = SceneManager.updateScene;
SceneManager.updateScene = function () {
  _SC_US.call(this);
  if ($gameSystem && Number.isFinite($gameSystem._secondsPlayed)) {
    $gameSystem._secondsPlayed += this._deltaTime;
  }
  if (!this.isSceneChanging() && this.isCurrentSceneStarted() && this._scene instanceof Scene_Map) {
    Hint.process();
    return;
  }
  Hint.close();
};
Game_System.prototype.playtime = function () {
  return this._secondsPlayed || 0;
};
Game_System.prototype.playtimeText = function () {
  var _0x50507 = this.playtime();
  var _0x36c5a7 = Math.floor(_0x50507 / 60 / 60);
  var _0xa13234 = Math.floor(_0x50507 / 60) % 60;
  var _0x296f7 = Math.floor(_0x50507 % 60);
  return _0x36c5a7.padZero(2) + ":" + _0xa13234.padZero(2) + ":" + _0x296f7.padZero(2);
};
Game_System.prototype.updatePlayTime = function (_0x523581) {
  if (this._secondsPlayed) {
    this._secondsPlayed += _0x523581;
  }
};
var _DM_SNG_ = DataManager.setupNewGame;
DataManager.setupNewGame = function () {
  _DM_SNG_.call(this);
  $gameSystem._secondsPlayed = 0;
};
const FONT_TYPES = [".ttf", ".otf", ".eot", ".svg", ".woff", ".woff2"];
function Font() {}
Font.data = {};
Font.size = 28;
Font.face = "GameFont";
Font.list = ["Dotum", "SimHei", "GameFont", "Heiti TC", "sans-serif", "AppleGothic"];
Font.change = function (_0x1627a4, _0x17fa88 = 28) {
  this.face = "";
  var _0x136949 = this.resolve(_0x1627a4);
  if (_0x136949) {
    this.face = _0x136949;
    this.size = _0x17fa88;
  }
};
Font.key = function (_0x5ec94f) {
  var _0x3481a4 = new RegExp(_0x5ec94f, "i");
  var _0x592269 = Object.keys(this.data).filter(_0x4f720b => _0x3481a4.test(_0x4f720b));
  if (_0x592269.length > 0) {
    return _0x592269[0];
  }
  return _0x5ec94f;
};
Font.resolve = function (_0x506d46) {
  var _0x45b27a = Utils.filename(_0x506d46);
  if (this.list.includes(_0x45b27a)) {
    return _0x45b27a;
  }
  var _0x4143ab = this.key(Lang.current() + "_" + _0x45b27a);
  if (!_0x4143ab) {
    _0x4143ab = this.key(_0x45b27a);
  }
  if (!_0x4143ab) {
    App.fail("Cannot locate font named: " + _0x506d46);
    return "GameFont";
  }
  var _0x2ed061 = this.data[_0x4143ab];
  if (!Utils.exists(_0x2ed061)) {
    App.fail("Missing font: " + _0x2ed061);
    return "GameFont";
  }
  _0x2ed061 = Utils.relative(App.rootPath(), _0x2ed061);
  _0x2ed061 = _0x2ed061.replace(/\\/g, "/");
  _0x4143ab = _0x4143ab.replace(/\.[^/.]+$/, "");
  if (this.list.includes(_0x4143ab)) {
    return _0x4143ab;
  }
  var _0x460f8b = new FontFace(_0x4143ab, "url(" + _0x2ed061 + ")");
  _0x460f8b.load().then(function (_0x544b94) {
    document.fonts.add(_0x544b94);
    Font.list.push(_0x4143ab);
    if (SceneManager._scene._windowLayer) {
      SceneManager._scene._windowLayer.children.forEach(function (_0x1f4a84) {
        if (typeof _0x1f4a84.refresh === "function") {
          _0x1f4a84.refresh();
        }
      });
    }
  }).catch(function (_0x4afaff) {
    App.fail("Font failed to load: " + _0x506d46, _0x4afaff);
    return "GameFont";
  });
  return _0x4143ab;
};
const _WB_RFS = Window_Base.prototype.resetFontSettings;
Window_Base.prototype.resetFontSettings = function () {
  _WB_RFS.apply(this, arguments);
  if (Font.face !== "" && this.constructor.name !== "Window_Credits") {
    this.contents.fontFace = Font.face;
    this.contents.fontSize = Font.size;
  }
};
const LANG_DIR = "languages/";
const LANG_LOC = "english";
const LANG_TXT = "english_txt";
const LANG_CSV = "english_csv";
const LANG_ICO_MARGIN = 10;
const LANG_ICO_PIXELS = 26;
const VALID_EXT = [".loc", ".txt", ".csv"];
const LANG_ORDERING = ["english", "korean", "japanese", "chinese"];
function Lang() {}
Lang.data = {};
Lang.list = {};
Lang.offc = [];
Lang.count = function () {
  return Object.keys(this.list).length;
};
Lang.index = function (_0x2cff6c) {
  return Object.keys(this.list).indexOf(_0x2cff6c);
};
Lang.isOfficial = function (_0x7e93af) {
  return this.offc.includes(_0x7e93af);
};
Lang.current = function () {
  var _0x3d9e3f = this.list[ConfigManager.language] || "";
  if (!_0x3d9e3f) {
    App.warn("Current language not in list: " + key);
    return "n/a";
  }
  return Utils.basename(Utils.dirname(_0x3d9e3f));
};
Lang.key = function (_0x35651d) {
  var _0x1c517b = Object.keys(this.list);
  var _0x3a468b = _0x1c517b.length - 1;
  if (_0x3a468b < 0) {
    App.crash("No language table created.");
    return "";
  }
  if (_0x35651d < 0 || _0x35651d > _0x3a468b) {
    App.fail("Language index out of bounds.");
    _0x35651d = 0;
  }
  return _0x1c517b[_0x35651d];
};
Lang.property = function (_0xea7ad6, _0x48fe78, _0x30edfc = null) {
  if (Object.keys(this.data).length === 0) {
    return _0x30edfc;
  }
  if (this.data.hasOwnProperty(_0xea7ad6) && typeof this.data[_0xea7ad6] === "object" && this.data[_0xea7ad6].hasOwnProperty(_0x48fe78)) {
    return this.data[_0xea7ad6][_0x48fe78];
  }
  App.fail("Language property missing: " + _0xea7ad6 + ":" + _0x48fe78);
  return _0x30edfc;
};
Lang.translate = function (_0x5946c3) {
  var _0x1f56ba = ConfigManager.language;
  var _0x918534 = this.property(_0x1f56ba, "sysMenus");
  var _0x54f7da = this.property(_0x1f56ba, "sysLabel");
  if (_0x918534 && _0x918534.hasOwnProperty(_0x5946c3)) {
    return _0x918534[_0x5946c3];
  }
  if (_0x54f7da && _0x54f7da.hasOwnProperty(_0x5946c3)) {
    return _0x54f7da[_0x5946c3];
  }
  return _0x5946c3;
};
Lang.label = function (_0x1fe4fe, _0x4ac40c = false) {
  var _0x15d317 = this.property(ConfigManager.language, "labelLUT");
  _0x1fe4fe = _0x1fe4fe.replace(/\(label\)\[([^\]]+)\]/g, function (_0x3a6b41, _0x4f84ff) {
    var _0x53943b = _0x15d317 && _0x15d317[_0x4f84ff] ? _0x15d317[_0x4f84ff] : _0x3a6b41;
    if (_0x4ac40c) {
      return "<" + _0x53943b + ">";
    } else {
      return _0x53943b;
    }
  });
  return _0x1fe4fe;
};
const FALLBACK_HASHES = {
  w7ZvbBvC: "yrrRQ30Q",
  "4yhN4h9P": "lcmDVkXT",
  DCRBH5zy: "cT2mmJwp",
  DxhMltBG: "GXCRgnRB"
};
Lang.lines = function (_0x22d228) {
  var _0xd420a0 = {
    text: _0x22d228,
    lines: []
  };
  var _0xac6a98 = this.property(ConfigManager.language, "linesLUT");
  _0xd420a0.text = _0xd420a0.text.replace(/\(lines\)\[([^\]]+)\]/g, function (_0x4c6dec, _0x2e7468) {
    if (_0xac6a98) {
      if (_0xac6a98[_0x2e7468]) {
        _0xd420a0.lines = _0xac6a98[_0x2e7468];
        return "";
      }
      let _0xb9c959 = FALLBACK_HASHES[_0x2e7468];
      if (_0xb9c959 && _0xac6a98[_0xb9c959]) {
        _0xd420a0.lines = _0xac6a98[_0xb9c959];
        return "";
      }
    }
    return _0x4c6dec;
  });
  return _0xd420a0;
};
Lang.search = function () {
  let _0x55e1f1 = Utils.join(App.rootPath(), LANG_DIR);
  if (!Utils.exists(_0x55e1f1)) {
    App.warn("Language data unavailable.");
    return;
  }
  if (!Utils.canAccess(_0x55e1f1)) {
    App.crash("Language data not accessible.");
    return;
  }
  let _0x2913e7 = Utils.folders(_0x55e1f1);
  if (_0x2913e7.length === 0) {
    App.crash("Error reading languages folder.");
    return;
  }
  this.list = {};
  for (let _0x16fa46 = 0; _0x16fa46 < _0x2913e7.length; _0x16fa46++) {
    let _0x2061a4 = Utils.join(_0x55e1f1, _0x2913e7[_0x16fa46]);
    for (let _0x4bfe10 of Utils.findFiles(_0x2061a4, FONT_TYPES)) {
      let _0x3b794d = Utils.basename(_0x4bfe10);
      let _0x3a83aa = _0x2913e7[_0x16fa46] + "_" + _0x3b794d;
      Font.data[_0x3a83aa] = _0x4bfe10;
    }
    let _0x556700 = Utils.files(_0x2061a4);
    for (let _0x61d273 = 0; _0x61d273 < _0x556700.length; _0x61d273++) {
      let _0x133bdc = _0x556700[_0x61d273];
      let _0x37f29a = _0x2913e7[_0x16fa46];
      let _0x1932a9 = Utils.ext(_0x133bdc).toLowerCase();
      if (!VALID_EXT.includes(_0x1932a9)) {
        continue;
      }
      if (_0x1932a9 === ".loc") {
        this.offc.push(_0x37f29a);
      } else {
        _0x37f29a += _0x1932a9.replace(".", "_");
        if (Utils.isOptionValid("test")) {
          this.offc.push(_0x37f29a);
        }
      }
      this.list[_0x37f29a] = Utils.join(_0x2061a4, _0x133bdc);
    }
  }
  let _0x37afc0 = [];
  let _0x3a0c74 = [];
  let _0x20d316 = {};
  for (let _0x2c3aa9 in this.list) {
    if (this.offc.includes(_0x2c3aa9)) {
      _0x3a0c74.push(_0x2c3aa9);
    } else {
      _0x37afc0.push(_0x2c3aa9);
    }
  }
  for (let _0x30ce9e of LANG_ORDERING) {
    for (let _0x583672 of _0x3a0c74) {
      if (_0x583672.toLowerCase().contains(_0x30ce9e.toLowerCase())) {
        _0x20d316[_0x583672] = this.list[_0x583672];
      }
    }
  }
  for (let _0x47aeab of _0x3a0c74) {
    _0x20d316[_0x47aeab] = this.list[_0x47aeab];
  }
  for (let _0x2f6c71 of _0x37afc0) {
    _0x20d316[_0x2f6c71] = this.list[_0x2f6c71];
  }
  this.list = _0x20d316;
};
Lang.select = function (_0x4a6b87) {
  if (this.count() < 1) {
    if (App.isDevMode()) {
      App.info("Skipped language select: " + _0x4a6b87);
    } else {
      App.crash("Language data missing.\nA re-install may fix it.");
    }
    return;
  }
  let _0x5d4040 = "";
  if (VENDOR === K9V_STEAM) {
    _0x5d4040 = Steam.currentLanguage();
  }
  let _0x4a2571 = [_0x4a6b87, _0x5d4040, LANG_LOC, LANG_TXT, LANG_CSV];
  for (let _0x46450a of _0x4a2571) {
    if (!this.list.hasOwnProperty(_0x46450a)) {
      continue;
    }
    let _0x1a98b2 = {};
    let _0x533e9f = this.list[_0x46450a];
    let _0x461579 = Utils.ext(_0x533e9f).toLowerCase();
    if (this.data.hasOwnProperty(_0x46450a)) {
      _0x1a98b2 = this.data[_0x46450a];
    } else {
      if (_0x461579 === ".loc") {
        _0x1a98b2 = this.loadLOC(_0x533e9f);
      } else if (_0x461579 === ".txt") {
        _0x1a98b2 = this.loadTXT(_0x533e9f);
      } else if (_0x461579 === ".csv") {
        _0x1a98b2 = this.loadCSV(_0x533e9f);
      }
      if (!this.isValid(_0x1a98b2)) {
        App.fail("Invalid data for: " + _0x46450a);
        continue;
      }
      this.data[_0x46450a] = _0x1a98b2;
      this.imgMapping(_0x46450a);
    }
    ConfigManager.language = _0x46450a;
    Font.change(_0x1a98b2.fontFace, _0x1a98b2.fontSize);
    let _0x59dc6d = _0x1a98b2.sysLabel.Game;
    let _0x37228c = _0x1a98b2.sysLabel.Item;
    let _0x2fe27d = _0x1a98b2.sysLabel.File;
    let _0x1a22f3 = _0x1a98b2.sysLabel.Save;
    let _0x2fcee3 = _0x1a98b2.sysLabel.Load;
    document.title = _0x59dc6d;
    $dataSystem.gameTitle = "Andy Is Sick"
    $dataSystem.terms.commands[4] = _0x37228c;
    $dataSystem.terms.messages.file = _0x2fe27d;
    $dataSystem.terms.messages.saveMessage = _0x1a22f3;
    $dataSystem.terms.messages.loadMessage = _0x2fcee3;
    return;
  }
  ConfigManager.language = "";
  const _0x362ca1 = "Default languages missing.";
  if (App.isDevMode()) {
    App.fail(_0x362ca1);
  } else {
    App.crash(_0x362ca1);
  }
};
Lang.imgFolder = function (_0x4acbd7, _0x60a024) {
  var _0x42da31 = Utils.join(_0x4acbd7, _0x60a024);
  var _0x11b1d0 = ConfigManager.language;
  var _0x5d3ecb = this.property(_0x11b1d0, "imageLUT", {});
  if (_0x5d3ecb.hasOwnProperty(_0x42da31)) {
    return _0x5d3ecb[_0x42da31];
  }
  return _0x4acbd7;
};
Lang.imgMapping = function (_0x180572) {
  var _0x5b675d = this.data[_0x180572];
  var _0xa57c74 = Utils.dirname(this.list[_0x180572]);
  var _0x754478 = Utils.join(_0xa57c74, "img");
  if (!Utils.exists(_0x754478)) {
    App.info("No translated images: " + _0xa57c74);
    return;
  }
  for (var _0x32197f of Utils.findFiles(_0x754478, [".png", ".webp"])) {
    var _0x5ed113 = Utils.relative(_0xa57c74, _0x32197f);
    var _0x16cd30 = Utils.relative(App.rootPath(), _0xa57c74);
    var _0x4555d7 = Utils.join(Utils.dirname(_0x5ed113), Utils.filename(_0x5ed113));
    try {
      var _0x405b4e = Utils.join(App.rootPath(), _0x5ed113);
      var _0x3a619d = Utils.join(_0x16cd30, Utils.dirname(_0x5ed113));
      _0x405b4e = Crypto.resolvePath(_0x405b4e);
      if (Utils.exists(_0x405b4e)) {
        _0x3a619d = _0x3a619d.replace("\\", "/");
        _0x5b675d.imageLUT[_0x4555d7] = _0x3a619d + "/";
      } else {
        App.fail("Couldn't find image: " + _0x405b4e);
      }
    } catch (_0xd9d4a8) {
      App.fail("Failed to check remapping: " + _0x32197f, _0xd9d4a8);
    }
  }
};
const _IM_LB = ImageManager.loadBitmap;
ImageManager.loadBitmap = function (_0x4cf2ce, _0xba3864, _0x15bd02, _0x2d51d2) {
  _0x4cf2ce = Lang.imgFolder(_0x4cf2ce, _0xba3864);
  return _IM_LB.call(this, _0x4cf2ce, _0xba3864, _0x15bd02, _0x2d51d2);
};
Lang.newData = function () {
  return {
    langName: "",
    langInfo: ["", "", ""],
    fontFace: "",
    fontSize: 0,
    sysLabel: {},
    sysMenus: {},
    labelLUT: {},
    linesLUT: {},
    imageLUT: {}
  };
};
Lang.isValid = function (_0x5543fe) {
  var _0x15a991 = this.newData();
  if (!_0x5543fe || !Object.keys(_0x5543fe).length) {
    App.fail("Language data missing.");
    return false;
  }
  for (var _0x3971ae in _0x15a991) {
    if (!(_0x3971ae in _0x5543fe)) {
      App.fail("Missing field: " + _0x3971ae);
      return false;
    }
    if (typeof _0x5543fe[_0x3971ae] !== typeof _0x15a991[_0x3971ae]) {
      App.fail("Mismatched type: " + _0x3971ae);
      return false;
    }
  }
  if (!_0x5543fe.langName.trim()) {
    App.fail("Missing langName.");
    return false;
  }
  if (_0x5543fe.langInfo.length < 3) {
    App.fail("Missing lines in langInfo.");
    return false;
  }
  if (!_0x5543fe.fontFace.trim()) {
    App.fail("Missing fontFace.");
    return false;
  }
  if (_0x5543fe.fontSize < 1) {
    App.fail("fontSize < 1.");
    return false;
  }
  for (var _0x3971ae of ["sysLabel", "sysMenus", "labelLUT", "linesLUT"]) {
    if (!Object.keys(_0x5543fe[_0x3971ae])) {
      App.fail(_0x3971ae + " empty.");
      return false;
    }
  }
  return true;
};
Lang.loadLOC = function (_0x12f5f0) {
  var _0x27f95 = {};
  var _0x587338 = Buffer.byteLength(SIGNATURE, "utf8");
  try {
    _0x27f95 = Utils.readFile(_0x12f5f0);
    console.log("No Tomb Code: Working")
    try {
      _0x27f95 = JSON.parse(_0x27f95.toString("utf8"));
      ;
    } catch (_0xb52372) {
      App.fail("Error parsing file: " + _0x12f5f0, _0xb52372);
    }
  } catch (_0x2b19fe) {
    App.fail("Error reading file: " + _0x12f5f0, _0x2b19fe);
  }
  _0x27f95.imageLUT = {};
  return _0x27f95;
};
Lang.loadTXT = function (_0x45ebf2) {
  var _0x50fe7b = "";
  try {
    _0x50fe7b = Utils.readFile(_0x45ebf2, "utf8");
  } catch (_0xaf0111) {
    App.fail("Error reading file: " + _0x45ebf2, _0xaf0111);
    return {};
  }
  var _0x45d50b = this.newData();
  var _0x58c1a9 = 0;
  var _0x4d0f95 = "";
  var _0x4e5009 = [];
  var _0x21f8b7 = false;
  const _0x417664 = {
    MENUS: _0x45d50b.sysMenus,
    LABELS: _0x45d50b.sysLabel,
    ITEMS: _0x45d50b.labelLUT,
    SPEAKERS: _0x45d50b.labelLUT
  };
  for (var _0x1ca2df of _0x50fe7b.split("\n")) {
    if (!_0x1ca2df.trim()) {
      continue;
    }
    _0x1ca2df = _0x1ca2df.replace("\r", "");
    if (_0x1ca2df.startsWith("[")) {
      if (_0x1ca2df.toUpperCase() === "[CHOICES]") {
        _0x21f8b7 = true;
        continue;
      }
      _0x58c1a9 = 0;
      _0x4d0f95 = _0x1ca2df.replace("[", "").replace("]", "");
      continue;
    }
    if (!_0x4d0f95) {
      continue;
    }
    _0x58c1a9 += 1;
    var _0x323e9f = _0x4d0f95.trim().toUpperCase();
    if (_0x323e9f === "LANGUAGE") {
      _0x45d50b.langName = _0x1ca2df;
      _0x4d0f95 = "";
    } else if (_0x323e9f === "FONT") {
      var _0x3fee83 = _0x1ca2df.split(":");
      if (_0x3fee83.length > 1) {
        _0x1ca2df = _0x3fee83[1].trim();
      }
      if (_0x58c1a9 === 1) {
        _0x45d50b.fontFace = _0x1ca2df;
      } else {
        _0x45d50b.fontSize = parseInt(_0x1ca2df);
        _0x4d0f95 = "";
      }
    } else if (_0x323e9f === "CREDITS") {
      var _0x3fee83 = _0x1ca2df.split(":");
      if (_0x3fee83.length > 1) {
        _0x1ca2df = _0x3fee83[1].trim();
      }
      _0x45d50b.langInfo[_0x58c1a9 - 1] = _0x1ca2df;
      if (_0x58c1a9 >= 3) {
        _0x4d0f95 = "";
      }
    } else if (_0x323e9f in _0x417664) {
      if (_0x1ca2df.includes(":")) {
        var [_0x51d99e, _0x56bba6] = _0x1ca2df.split(":");
        _0x51d99e = _0x51d99e.trim();
        _0x56bba6 = _0x56bba6.trim();
        if (_0x51d99e.startsWith("#")) {
          _0x51d99e = _0x51d99e.slice(1);
        }
        _0x417664[_0x323e9f][_0x51d99e] = _0x56bba6;
      }
    } else if (_0x1ca2df.startsWith("#")) {
      var _0x35775b = ":";
      if (_0x1ca2df.includes("(")) {
        _0x35775b = "(";
        _0x21f8b7 = false;
      }
      var _0x47f54d = _0x1ca2df.split(_0x35775b);
      if (_0x47f54d.length < 2) {
        App.fail("Line is missing parts.\nLine: " + _0x1ca2df + "\nFile: " + _0x45ebf2);
        return {};
      }
      var _0x51d99e = _0x47f54d[0].trim().slice(1);
      var _0x56bba6 = _0x47f54d[1].startsWith(" ") ? _0x47f54d[1].slice(1) : _0x47f54d[1];
      if (_0x21f8b7) {
        _0x45d50b.labelLUT[_0x51d99e] = _0x56bba6;
      } else {
        _0x4e5009 = [];
        _0x45d50b.linesLUT[_0x51d99e] = _0x4e5009;
      }
    } else if (_0x1ca2df.startsWith(":")) {
      if (_0x21f8b7) {
        App.fail("Line content mismatch.\nLine: " + _0x1ca2df + "\nFile: " + _0x45ebf2);
        return {};
      }
      _0x1ca2df = _0x1ca2df.slice(1);
      if (_0x1ca2df.startsWith(" ")) {
        _0x1ca2df = _0x1ca2df.slice(1);
      }
      _0x4e5009.push(_0x1ca2df);
    }
  }
  return _0x45d50b;
};
const CSV_BLOCKS = {
  MENUS: 2,
  ITEMS: 3,
  LABELS: 3,
  SECTION: 4,
  "CREDIT 1": 3,
  SPEAKERS: 3,
  LANGUAGE: 3,
  DESCRIPTIONS: 4
};
const SECTION_HEADER = ["ID", "Source", "English", "Translation"];
Lang.is_header = function (_0x5a5350) {
  const _0x157c08 = SECTION_HEADER.map(_0x31356 => _0x31356.toUpperCase());
  const _0x4b22df = _0x5a5350.map(_0x417681 => _0x417681.trim().toUpperCase());
  return JSON.stringify(_0x157c08) === JSON.stringify(_0x4b22df);
};
Lang.new_block = function (_0x3849cd, _0x582613, _0x1566e7) {
  if (!Object.keys(CSV_BLOCKS).includes(_0x3849cd)) {
    return false;
  }
  if (_0x3849cd === "LANGUAGE") {
    return _0x1566e7.length >= CSV_BLOCKS[_0x3849cd] && (_0x1566e7[1].trim() === "Font File" || _0x1566e7[2].trim() === "Font Size" || _0x1566e7[2].trim() !== "");
  }
  if (_0x3849cd === "ITEMS") {
    return _0x1566e7.length >= CSV_BLOCKS[_0x3849cd] && (_0x1566e7[1].trim() === "English" || _0x1566e7[2].trim() === "Translation" || _0x1566e7[2].trim() !== "");
  }
  return true;
};
Lang.loadCSV = function (_0x474975) {
  let _0x5870fb = this.newData();
  let _0x83757 = "";
  try {
    _0x83757 = Utils.readFile(_0x474975, "utf8");
  } catch (_0x12ff8d) {
    App.fail("Error reading file: " + _0x474975, _0x12ff8d);
    return {};
  }
  let _0x32abc6 = "";
  let _0x13ab7a = "";
  let _0x357aa2 = [];
  let _0xa63d73 = false;
  let _0x1d7a90 = false;
  for (let _0x10f383 of _0x83757.split("\n")) {
    _0x10f383 = _0x10f383.trim();
    if (!_0x10f383) {
      continue;
    }
    let _0x1ccce9 = [];
    let _0x178c71 = "";
    let _0x1b3644 = 0;
    let _0x637cf0 = 0;
    let _0x10672b = false;
    let _0xe5152f = _0x10f383.length;
    while (_0x1b3644 < _0xe5152f) {
      let _0x202d2b = _0x10f383[_0x1b3644];
      if (!_0x10672b && _0x202d2b === "\"") {
        _0x10672b = true;
      } else if (_0x202d2b === "“" || _0x202d2b === "”") {
        _0x178c71 += "\"";
      } else if (_0x10f383.substr(_0x1b3644, 2) == "\"\"") {
        _0x178c71 += "\"";
        _0x1b3644 += 1;
      } else if (_0x10672b && _0x202d2b == "\"") {
        _0x10672b = false;
      } else if (!_0x10672b && _0x202d2b == ",") {
        _0x1ccce9.push(_0x178c71);
        _0x178c71 = "";
      } else {
        _0x178c71 += _0x202d2b;
      }
      _0x1b3644 += 1;
      if (_0x1b3644 >= _0xe5152f) {
        _0x1ccce9.push(_0x178c71);
      }
    }
    let _0x253082 = _0x1ccce9.length;
    if (_0x253082 < 1 || _0x1ccce9[0].trim() === "") {
      continue;
    }
    if (_0x253082 < 2) {
      App.fail("CSV line missing columns.\nLine: " + _0x10f383 + "\nFile: " + _0x474975);
      return {};
    }
    let _0x1014fc = _0x1ccce9[0].toUpperCase();
    if (!_0x1014fc.trim()) {
      App.fail("CSV first column missing.\nLine: " + _0x10f383 + "\nFile: " + _0x474975);
      return {};
    }
    if (this.new_block(_0x1014fc, _0x32abc6, _0x1ccce9)) {
      _0x32abc6 = _0x1014fc;
      _0xa63d73 = true;
      continue;
    }
    if (_0xa63d73 && _0x32abc6 === "SECTION") {
      if (this.is_header(_0x1ccce9)) {
        _0xa63d73 = false;
      }
      continue;
    }
    if (_0x253082 < CSV_BLOCKS[_0x32abc6]) {
      App.fail("CSV missing columns. Total: " + CSV_BLOCKS[_0x32abc6] + " Found: " + _0x253082 + "\nLine: " + _0x10f383 + "\nFile: " + _0x474975);
      return {};
    }
    if (_0x32abc6 === "LANGUAGE") {
      _0x5870fb.langName = _0x1ccce9[0];
      _0x5870fb.fontFace = _0x1ccce9[1];
      _0x5870fb.fontSize = parseInt(_0x1ccce9[2]);
      _0x32abc6 = "";
    } else if (_0x32abc6 === "CREDIT 1") {
      _0x5870fb.langInfo = _0x1ccce9.slice(0, Math.min(3, _0x253082));
      _0x32abc6 = "";
    } else if (_0x32abc6 === "LABELS") {
      _0x5870fb.sysLabel[_0x1ccce9[0]] = _0x1ccce9[2].trim() ? _0x1ccce9[2] : _0x1ccce9[1];
    } else if (_0x32abc6 === "MENUS") {
      _0x5870fb.sysMenus[_0x1ccce9[0]] = _0x1ccce9[1].trim() ? _0x1ccce9[1] : _0x1ccce9[0];
    } else if (_0x32abc6 === "ITEMS" || _0x32abc6 === "SPEAKERS") {
      let _0x2c4001 = _0x1ccce9[0];
      let _0x32b315 = _0x1ccce9[1];
      let _0x45aa38 = _0x1ccce9[2];
      if (!_0x2c4001.trim() || !_0x32b315.trim()) {
        App.fail("Missing column data for Item.\nLine: " + _0x10f383 + "\nFile: " + _0x474975);
        return {};
      }
      _0x45aa38 = _0x45aa38.trim() ? _0x45aa38 : _0x32b315;
      _0x5870fb.labelLUT[_0x2c4001] = _0x45aa38;
    } else if (_0x32abc6 === "SECTION" || _0x32abc6 === "DESCRIPTIONS") {
      let _0x38082b = _0x1ccce9[0];
      let _0x5402d8 = _0x1ccce9[1];
      let _0x5021d9 = _0x1ccce9[2];
      let _0x1790a0 = _0x1ccce9[3];
      if (!_0x38082b.trim() || !_0x5402d8.trim()) {
        App.fail("Missing column data for Section.\nLine: " + _0x10f383 + "\nFile: " + _0x474975);
        return {};
      }
      _0x1790a0 = _0x1790a0.trim() ? _0x1790a0 : _0x5021d9;
      if (_0x5402d8.toUpperCase().includes("CHOICE")) {
        _0x5870fb.labelLUT[_0x38082b] = _0x1790a0;
      } else {
        if (_0x13ab7a != _0x38082b) {
          _0x357aa2 = [];
          _0x5870fb.linesLUT[_0x38082b] = _0x357aa2;
          _0x13ab7a = _0x38082b;
        }
        _0x357aa2.push(_0x1790a0);
      }
    } else {
      App.fail("Invalid CSV parsing state.");
      return {};
    }
  }
  return _0x5870fb;
};
const _DM_OL = DataManager.onLoad;
DataManager.onLoad = function (_0x16b7e5) {
  if (_0x16b7e5 === $dataSystem) {
    Lang.search();
    Lang.select(ConfigManager.language);
  }
  _DM_OL.call(this, _0x16b7e5);
};
const MAX_LINES = 2;
Game_Interpreter.prototype.prevHeader = "";
Game_Interpreter.prototype.extraLines = [];
Game_Interpreter.prototype.command101 = function () {
  if (!$gameMessage.isBusy()) {
    if (this.extraLines.length > 0) {
      $gameMessage.add(this.prevHeader);
      var _0x2abd87 = Math.min(this.extraLines.length, MAX_LINES);
      for (var _0x2195d8 = 0; _0x2195d8 < _0x2abd87; _0x2195d8++) {
        $gameMessage.add(this.extraLines.shift());
      }
      if (this.extraLines.length < 1) {
        this._index++;
      }
      this.setWaitMode("message");
      return false;
    }
    $gameMessage.setFaceImage(this._params[0], this._params[1]);
    $gameMessage.setBackground(this._params[2]);
    $gameMessage.setPositionType(this._params[3]);
    while (this.nextEventCode() === 401) {
      this._index++;
      var _0x2870ce = this.currentCommand().parameters[0];
      var _0x22755a = Lang.lines(Lang.label(_0x2870ce, true));
      $gameMessage.add(_0x22755a.text);
      this.prevHeader = _0x22755a.text;
      if (_0x22755a.lines.length) {
        for (var _0x2195d8 = 0; _0x2195d8 < _0x22755a.lines.length; _0x2195d8++) {
          if (_0x2195d8 < MAX_LINES) {
            $gameMessage.add(_0x22755a.lines[_0x2195d8]);
          } else {
            this.extraLines.push(_0x22755a.lines[_0x2195d8]);
          }
        }
      }
      if (this.extraLines.length > 0) {
        while (this._index >= 0 && this.currentCommand().code !== 101) {
          this._index--;
        }
        this.setWaitMode("message");
        return;
      }
    }
    switch (this.nextEventCode()) {
      case 102:
        this._index++;
        this.setupChoices(this.currentCommand().parameters);
        break;
      case 103:
        this._index++;
        this.setupNumInput(this.currentCommand().parameters);
        break;
      case 104:
        this._index++;
        this.setupItemChoice(this.currentCommand().parameters);
        break;
    }
    this._index++;
    this.setWaitMode("message");
  }
  return false;
};
Game_Interpreter.prototype.setupChoices = function (_0x5a72a6) {
  var _0x473565 = _0x5a72a6[0].clone();
  for (let _0x5cc6f4 = 0; _0x5cc6f4 < _0x473565.length; _0x5cc6f4++) {
    _0x473565[_0x5cc6f4] = Lang.label(_0x473565[_0x5cc6f4]);
  }
  var _0x47fe95 = _0x5a72a6[1];
  var _0x15e8f9 = _0x5a72a6.length > 2 ? _0x5a72a6[2] : 0;
  var _0x63cfda = _0x5a72a6.length > 3 ? _0x5a72a6[3] : 2;
  var _0x302249 = _0x5a72a6.length > 4 ? _0x5a72a6[4] : 0;
  if (_0x47fe95 >= _0x473565.length) {
    _0x47fe95 = -2;
  }
  $gameMessage.setChoices(_0x473565, _0x15e8f9, _0x47fe95);
  $gameMessage.setChoiceBackground(_0x302249);
  $gameMessage.setChoicePositionType(_0x63cfda);
  $gameMessage.setChoiceCallback(function (_0x1bea52) {
    this._branch[this._indent] = _0x1bea52;
  }.bind(this));
};
Window_Base.prototype.drawItemName = function (_0x3842e, _0x28173a, _0x2582a5, _0x36c438) {
  _0x36c438 = _0x36c438 || 312;
  if (_0x3842e) {
    var _0x5beeb2 = Window_Base._iconWidth + 4;
    this.resetTextColor();
    this.drawIcon(_0x3842e.iconIndex, _0x28173a + 2, _0x2582a5 + 2);
    this.drawText(Lang.label(_0x3842e.name), _0x28173a + _0x5beeb2, _0x2582a5, _0x36c438 - _0x5beeb2);
  }
};
Window_Help.prototype.setItem = function (_0x307387) {
  if (!_0x307387) {
    this.setText("");
    return;
  }
  var _0x10a40e = Lang.lines(_0x307387.description);
  if (_0x10a40e.lines.length > 0) {
    this.setText(_0x10a40e.lines.join("\n"));
  } else {
    this.setText(_0x307387.description);
  }
};
AudioManager.createBuffer = function (_0x305aa5, _0x4eb529) {
  var _0x338d44 = this.audioFileExt();
  var _0x5f2503 = this._path + _0x305aa5 + "/" + encodeURIComponent(_0x4eb529) + _0x338d44;
  return new WebAudio(Crypto.resolveURL(_0x5f2503));
};
WebAudio.prototype._loading = async function (_0x1ad4ae) {
  try {
    const _0x44166c = stbvorbis.decodeStream(_0x674071 => this._onDecode(_0x674071));
    let _0xf2ff0 = true;
    while (true) {
      const {
        done: _0x273020,
        value: _0x2c1809
      } = await _0x1ad4ae.read();
      if (_0x273020) {
        _0x44166c({
          eof: true
        });
        return;
      }
      let _0xb5e11b = _0x2c1809;
      if (_0xf2ff0) {
        _0xf2ff0 = false;
        _0xb5e11b = Crypto.dekit(_0xb5e11b, this._url, Crypto.guard());
      }
      this._readLoopComments(_0xb5e11b);
      _0x44166c({
        data: _0xb5e11b,
        eof: false
      });
    }
  } catch (_0x36cd55) {
    App.fail("Audio stream failure: ", _0x36cd55);
  }
};
WebAudio.prototype._onXhrLoad = function (_0x54a974) {
  var _0x24b6de = Crypto.dekit(_0x54a974.response, this._url, Crypto.guard());
  this._readLoopComments(new Uint8Array(_0x24b6de));
  WebAudio._context.decodeAudioData(_0x24b6de, function (_0x23bf2e) {
    this._buffer = _0x23bf2e;
    this._totalTime = _0x23bf2e.duration;
    if (this._loopLength > 0 && this._sampleRate > 0) {
      this._loopStart /= this._sampleRate;
      this._loopLength /= this._sampleRate;
    } else {
      this._loopStart = 0;
      this._loopLength = this._totalTime;
    }
    this._onLoad();
  }.bind(this));
};
WebAudio.prototype._readMetaData = function (_0x1ea4cb, _0x115f9b, _0x48a3e7) {
  for (var _0xc9264c = _0x115f9b; _0xc9264c < _0x115f9b + _0x48a3e7 - 10; _0xc9264c++) {
    if (this._readFourCharacters(_0x1ea4cb, _0xc9264c) === "LOOP") {
      var _0xe55c9 = "";
      while (_0x1ea4cb[_0xc9264c] > 0) {
        _0xe55c9 += String.fromCharCode(_0x1ea4cb[_0xc9264c++]);
      }
      let _0x4d26f2 = _0xe55c9.match(/LOOPSTART=([0-9]+)/);
      if (_0x4d26f2 && _0x4d26f2.length > 1) {
        this._loopStart = parseInt(_0x4d26f2[1]);
      }
      _0x4d26f2 = _0xe55c9.match(/LOOPLENGTH=([0-9]+)/);
      if (_0x4d26f2 && _0x4d26f2.length > 1) {
        this._loopLength = parseInt(_0x4d26f2[1]);
      }
      if (_0xe55c9 == "LOOPSTART" || _0xe55c9 == "LOOPLENGTH") {
        var _0x1561a7 = "";
        _0xc9264c += 16;
        while (_0x1ea4cb[_0xc9264c] > 0) {
          _0x1561a7 += String.fromCharCode(_0x1ea4cb[_0xc9264c++]);
        }
        if (_0xe55c9 == "LOOPSTART") {
          this._loopStart = parseInt(_0x1561a7);
        } else {
          this._loopLength = parseInt(_0x1561a7);
        }
      }
    }
  }
};
