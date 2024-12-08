/*
 * Copyright (c) 2023 Vladimir Skrypnikov (Pheonix KageDesu)
 * <https://kdworkshop.net/>
 *

 * License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

 */

// Changelog:
// 1.0.1 - Fixed bug: wrong text width calculation

/*:
 * @plugindesc (v.1.0.1)[BASIC] Fonts Manager - custom fonts and colors
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/fonts-manager
 *
 * @help
 * ---------------------------------------------------------------------------
 * Help content: (below)
 * 1. How add and use custom font
 * 2. Font to Item name or Actor name
 * 3. Global fonts
 * 4. Global colors
 * 5. Global font and color both
 * 6. Custom pallete
 * 7. Extra palletes and switch between
 * ---------------------------------------------------------------------------
 * 1. How add and use custom font
 *
 *  Copy font file to project directory/fonts folder
 *  Open Plugin Parameters -> Fonts to load and add filename
 *  You should write full filname, with extension
 *  Example: myCoolFont.tff
 *
 *  Use control character \FF[X] for use your font in messages
 *      X - font index in Fonts to load list
 *  \FF[0] - return to default font
 *
 *  Alternative way \FF[myCoolFont]
 *  (supports only font names without spaces)
 * ---------------------------------------------------------------------------
 * 2. Font to Item name or Actor name
 *
 * Add to Note or Item\Weapon\Armor or Actor
 *
 * <FF:X>
 * <FF:name>
 *
 * ---------------------------------------------------------------------------
 * 3. Global fonts
 *  ! This future is expremental...not works always
 *  
 *  Set Plugin Parameter Fonts to load -> Is Global? to ON
 *
 *  Add |fX| to any text (in end) in database for change this text font
 *
 * RPG Maker will change font for any text with |fX|, where X - font index.
 * Example: Sword|f2|
 *
 * You can use this with third party plugins
 *
 * ---------------------------------------------------------------------------
 * 4. Global colors
 * ! This future is expremental...not works always
 *
 *  Same as Gloal fonts but for Colors
 *
 * Set Plugin Parameter Custom pallete -> Is Global? to ON
 *
 * Add |cX| to any text (in end) in database for change this text color
 *
 * Will change color for any text with |cX|, where X - color index.
 * Example: Sword|c2|
 *
 * You can use this with third party plugins
 * ---------------------------------------------------------------------------
 * 5. Global font and color both
 *
 * If you want change font and color in global level, use |fXcX|
 * Example: Sword|f3c1|
 *
 * ---------------------------------------------------------------------------
 * 6. Custom pallete
 * 
 * You can change default colors for character codes \C[X] to you own
 * See Plugin Parameters -> Custom pallete
 *
 * ---------------------------------------------------------------------------
 * 7. Extra palletes and switch between
 *
 *  Add more color palletes via Plugin Parameter -> More palletes
 * 
 *  And switch between then during game using script call:
 *  switchColorPallete(index);
 *
 *  index = 0 -> return to default one
 *
 * ===========================================================================

 * This is BASIC plugin version and have some restrictions:
 *    - Max. 5 custom fonts to load
 *    - Max. 1 custom user color pallete
 *    - Obfuscated code
 *    - Plugin updates with new features
 *    - Plugin usage allowed only in Non-Commercial project
 * 
 *  PRO version of plugin don't have this restrictions!
 
 * ---------------------------------------------------------------------------
 * If you like my Plugins, want more and offten updates,
 * please support me on Boosty (and get extra plugins)!
 * 
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all who supports me!
 * 

 * License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

 *
 * @param fontsToLoad:strA
 * @type text[]
 * @text Fonts to load
 * @default []
 * @desc Filename+.ext (in fonts folder). Are available by name (\\FF[test]) (without ext.) and Index (\\FF[2], |f2|)
 * 
 * @param isGlobal:b
 * @parent fontsToLoad:strA
 * @text Is Global?
 * @type boolean
 * @on Yes, |fX| available
 * @off No
 * @default true
 * @desc RPG Maker will change font for any text with |fX|, where X - font index. Example: Sword|f2|
 * 
 * @param isAutoLoad:b
 * @parent fontsToLoad:strA
 * @text Is Auto Load?
 * @type boolean
 * @on Auto
 * @off No
 * @default false
 * @desc [PC, MAC, LINUX] Auto load fonts (fonts folder). Available only by names (uses filename without ext as font name)
 * 
 * @param spacer|defaultFonts @text‏‏‎ ‎@desc ===============================================
 * 
 * @param defaultSetup
 * @text Default Fonts
 * 
 * @param allItemsFont
 * @parent defaultSetup
 * @text Items
 * @default
 * @desc Font name for all Items (names) in game. For all default Windows.
 * 
 * @param allArmorsFont
 * @parent defaultSetup
 * @text Armors
 * @default
 * @desc Font name for all Armors (names) in game. For all default Windows.
 * 
 * @param allWeaponsFont
 * @parent defaultSetup
 * @text Weapons
 * @default
 * @desc Font name for all Weapons (names) in game. For all default Windows.
 * 
 * @param allSkillsFont
 * @parent defaultSetup
 * @text Skills
 * @default
 * @desc Font name for all Skills (names) in game. For all default Windows.
 * 
 * @param allActorNamesFont
 * @parent defaultSetup
 * @text Actor name
 * @default
 * @desc Font name for all names (Actors names) in game. For all default Windows.
 * 
 * @param allActorClassFont
 * @parent defaultSetup
 * @text Actor class
 * @default
 * @desc Font name for all classes in game. For all default Windows.
 * 
 * @param allActorNickFont
 * @parent defaultSetup
 * @text Actor nickname
 * @default
 * @desc Font name for nicknames in game. For all default Windows.
 * 
 * @param allActorLevelFont
 * @parent defaultSetup
 * @text Actor level
 * @default
 * @desc Font name for level in game. For all default Windows.
 * 
 * @param spacer|colors @text‏‏‎ ‎@desc ===============================================
 * 
 * @param pallete:strA
 * @type text[]
 * @text Custom pallete
 * @default []
 * @desc Colors (hex) for replace \C[X]. Availble by Index. Example: #ba1a8f
 * 
 * @param userPalletes:structA
 * @parent pallete:strA
 * @type struct<Pallete>[]
 * @text More palletes
 * @default []
 * @desc You can switch palletes in game, script call: switchColorPallete(index);
 * 
 * @param isGlobalColors:b
 * @parent pallete:strA
 * @text Is Global?
 * @type boolean
 * @on Yes, |cX| available
 * @off No
 * @default true
 * @desc Will change color for any text with |cX|, where X - color index. Example: Sword|c2|
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*:ru
 * @plugindesc (v.1.0.1)[BASIC] Использование разных шрифтов
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/fonts-manager
 *
 * @help
 * ---------------------------------------------------------------------------
 * Разделы помощи: (ниже)
 * 1. Как добавить свой шрифт
 * 2. Задать шрифт через заметку
 * 3. Глобальный символ
 * 4. Глобальные цвета
 * 5. Глобальная пара (цвет и шрифт)
 * 6. Палитры цветов
 * 7. Доп. палитры и переключение между ними
 * ---------------------------------------------------------------------------
 * 1. Как добавить свой шрифт
 *
 *  Поместите файл шрифта в папку fonts    
 *  Откройте параметры плагина -> Fonts to load и добавьте ваши файлы
 *  Вписывать нужно полное имя файла с расширением
 *  Пример: myCoolFont.tff
 *
 *  Исп. символ \FF[X] для активации шрифта в сообщении
 *      X - номер шрифта из параметра Fonts to load
 *  \FF[0] - переключиться на стандартный шрифт
 *
 *  Альтернативый вариант: \FF[myCoolFont]
 *  (поддерживает только имена шрифтов без пробелов)
 * ---------------------------------------------------------------------------
 * 2. Задать шрифт через заметку
 *
 * Заметки для оружия, брони, предметов или персонажа (имя)
 *
 * <FF:номер шрифта>
 * <FF:имя шрифта>
 *
 * ---------------------------------------------------------------------------
 * 3. Глобальный символ
 *  ! Возможны сбои в работе в некоторых местах или плагинах
 *  
 *  Установите параметр плагина Fonts to load -> Is Global? на ВКЛ.
 *
 *  Добавьте |fX| к любому слову (в конец) в базе данных для смены шрифта
 *
 * RPG Maker будет везде менять шрифта текста с символом |fX|, где X - номер шрифта.
 * Пример: Меч|f2|
 *
 * Данный метод может работать и со сторонними плагинами
 *
 * ---------------------------------------------------------------------------
 * 4. Глобальные цвета
 * ! Возможны сбои в работе в некоторых местах или плагинах
 *
 *  Аналогично глобальному символу шрифтов, только для цвета
 *
 * Установите параметр плагина Custom pallete -> Is Global? на ВКЛ.
 *
 * Добавьте |cX| к любому слову (в конец) в базе данных для смены цвета
 *
 * RPG Maker будет везде менять цвет текста с символом |cX|, где X - номер цвета.
 * Пример: Меч|c2|
 *
 * Данный метод может работать и со сторонними плагинами
 * ---------------------------------------------------------------------------
 * 5. Глобальная пара (цвет и шрифт)
 *
 * Если хотите совместить шрифт и цвет, исп. |fXcX|
 * Пример: Меч|f3c1|
 *
 * ---------------------------------------------------------------------------
 * 6. Палитры цветов
 * 
 * Можно заменить стандартные цвета, исп. при символе \C[X] на собственные
 * См. параметры плагина -> Custom pallete
 *
 * ---------------------------------------------------------------------------
 * 7. Доп. палитры и переключение между ними
 *
 *  Можно добавить палитры через параметр плагина -> More palletes
 * 
 *  Для смены цветовых палитр во время игры, исп. вызов скрипта:
 *  switchColorPallete(индекс);
 *
 *  индекс = 0 -> стандартная цветовая палитра
 *
 * ===========================================================================

 * Это [BASIC] (базовая) версия плагина и имеет некоторые ограничения:
 *    - Макс. количество шрифтов: 5
 *    - Макс. количество цветовых палитр: 1
 *    - Обфусцированный код
 *    - Обновления плагина с новыми функциями и контентом
 *    - ЗАПРЕЩЕНО использовать плагин в коммерческих проектах
 * 
 *  [PRO] версия плагина не имеет данных ограничений!
 
 * ---------------------------------------------------------------------------
 * Если Вам нравятся мои плагины, поддержите меня на Boosty!
 * 
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 * 

 * Лицензия: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

 *
 * @param fontsToLoad:strA
 * @type text[]
 * @text Fonts to load
 * @default []
 * @desc Имя файла полностью (из папки fonts). Исп. (\\FF[имя]) (без разр.) или по индексу (\\FF[2], |f2|)
 * 
 * @param isGlobal:b
 * @parent fontsToLoad:strA
 * @text Is Global?
 * @type boolean
 * @on Да
 * @off Нет
 * @default true
 * @desc Использовать символ для смены шрифта |fX|, где X - номер шрифта. Пример: Sword|f2|
 * 
 * @param isAutoLoad:b
 * @parent fontsToLoad:strA
 * @text Is Auto Load?
 * @type boolean
 * @on Авто
 * @off Нет
 * @default false
 * @desc [PC, MAC, LINUX] Автозагрузка шрифтов (из папки fonts). Доступность по именам.
 * 
 * @param spacer|defaultFonts @text‏‏‎ ‎@desc ===============================================
 * 
 * @param defaultSetup
 * @text Default Fonts
 * 
 * @param allItemsFont
 * @parent defaultSetup
 * @text Items
 * @default
 * @desc Имя шрифта для всех предметов в игре. Для всех стандартных окон.
 * 
 * @param allArmorsFont
 * @parent defaultSetup
 * @text Armors
 * @default
 * @desc Имя шрифта для всей брони в игре. Для всех стандартных окон.
 * 
 * @param allWeaponsFont
 * @parent defaultSetup
 * @text Weapons
 * @default
 * @desc Имя шрифта для всего оружия в игре. Для всех стандартных окон.
 * 
 * @param allSkillsFont
 * @parent defaultSetup
 * @text Skills
 * @default
 * @desc Имя шрифта для всех навыков в игре. Для всех стандартных окон.
 * 
 * @param allActorNamesFont
 * @parent defaultSetup
 * @text Actor name
 * @default
 * @desc Имя шрифта для имён персонажей в игре. Для всех стандартных окон.
 * 
 * @param allActorClassFont
 * @parent defaultSetup
 * @text Actor class
 * @default
 * @desc Имя шрифта для названия классов в игре. Для всех стандартных окон.
 * 
 * @param allActorNickFont
 * @parent defaultSetup
 * @text Actor nickname
 * @default
 * @desc Имя шрифта для псевдонимов персонажей в игре. Для всех стандартных окон.
 * 
 * @param allActorLevelFont
 * @parent defaultSetup
 * @text Actor level
 * @default
 * @desc Имя шрифта для текста уровня персонажей в игре. Для всех стандартных окон.
 * 
 * @param spacer|colors @text‏‏‎ ‎@desc ===============================================
 * 
 * @param pallete:strA
 * @type text[]
 * @text Custom pallete
 * @default []
 * @desc Цвета (HEX формат) на замену станадртных номеров \C[X]. Пример: #ba1a8f
 * 
 * @param userPalletes:structA
 * @parent pallete:strA
 * @type struct<Pallete>[]
 * @text More palletes
 * @default []
 * @desc Можно менять палитры в игре, вызов скрипта: switchColorPallete(index);
 * 
 * @param isGlobalColors:b
 * @parent pallete:strA
 * @text Is Global?
 * @type boolean
 * @on Да
 * @off Нет
 * @default true
 * @desc Разрешить смену цвета символом |cX|, где X - номер цвета. Пример: Sword|c2|
 * 
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*~struct~Pallete:
* @param pallete:strA
* @type text[]
* @text Pallete
* @default []
* @desc Colors (hex) for replace \\C[X]. Availble by Index. Example: #ba1a8f
*/



var Imported = Imported || {};
Imported.PKD_FontsManager = true;

window.PKD_FTSM = {};

var PKD_FTSM = {};
PKD_FTSM.Version = 101;

//?VERSION
PKD_FTSM.isPro = function() { return false; };

// * For parameters
PKD_FTSM.PP = {};
PKD_FTSM.Utils = {};

// * Загрзука параметров
PKD_FTSM.LoadPluginSettings = () => {
    PKD_FTSM.PP._loader = new KDParamLoaderLite("PKD_FontsManager");
};

PKD_FTSM.LoadAllFonts = () => {
    try {
        let list = PKD_FTSM.PP.fontsToLoad();
        for (const i of list) {
            PKD_FTSM.Utils.loadFont(i);
        }
    } catch (e) {
        console.warn(e);
    }
};



//------------------------------------------------------------------------------
//FontLoader_NWJS

//[ENCODE]

var FontLoader_NWJS = function () {
    throw new Error('This is a static class');
};
FontLoader_NWJS.init = function () {
    var fs = require('fs');
    this._files = fs.readdirSync(this.localFileDirectoryPath());
    this._ready = false;
};

FontLoader_NWJS.isReady = function () {
    return (this._ready == true);
};

FontLoader_NWJS.loadAll = function () {
    if (FontLoader_NWJS.isReady()) return;
    for (var i = 0; i < this._files.length; i++) {
        let filename  = this._files[i];
        console.log("[Auto] Try load font file: " + filename);
        PKD_FTSM.Utils.loadFont(filename);
    }
    this._ready = true;
};

FontLoader_NWJS._localFileDirectoryPath = null;
FontLoader_NWJS.localFileDirectoryPath = function () {
    if (this._localFileDirectoryPath == null) {
        const path = require('path');
        const base = path.dirname(process.mainModule.filename);
        this._localFileDirectoryPath = path.join(base, 'fonts/');
    }
    return this._localFileDirectoryPath;
};

window.FontLoader_NWJS = FontLoader_NWJS;

//END FontLoader_NWJS
//------------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ FontManager.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    // * RPG Maker MV not have FontManager (from MZ)
    
    //[ENCODE]

    if(window.FontManager || !Utils.RPGMAKER_NAME.contains("MV")) {
        return;
    }

    function FontManager() {
        throw new Error("This is a static class");
    }

    FontManager._urls = {};
    FontManager._states = {};

    FontManager.load = function(family, filename) {
        if (this._states[family] !== "loaded") {
            if (filename) {
                const url = this.makeUrl(filename);
                this.startLoading(family, url);
            } else {
                this._urls[family] = "";
                this._states[family] = "loaded";
            }
        }
    };

    FontManager.isReady = function() {
        for (const family in this._states) {
            const state = this._states[family];
            if (state === "loading") {
                return false;
            }
            if (state === "error") {
                this.throwLoadError(family);
            }
        }
        return true;
    };

    FontManager.startLoading = function(family, url) {
        const source = "url(" + url + ")";
        const font = new FontFace(family, source);
        this._urls[family] = url;
        this._states[family] = "loading";
        font.load()
            .then(() => {
                document.fonts.add(font);
                this._states[family] = "loaded";
                return 0;
            })
            .catch(() => {
                this._states[family] = "error";
            });
    };

    FontManager.throwLoadError = function(family) {
        const url = this._urls[family];
        const retry = () => this.startLoading(family, url);
        throw ["LoadError", url, retry];
    };

    FontManager.makeUrl = function(filename) {
        return "fonts/" + Utils.encodeURI(filename);
    };

    Utils.encodeURI = function(str) {
        return encodeURIComponent(str).replace(/%2F/g, "/");
    };

    window.FontManager = FontManager;

})();
// ■ END FontManager.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////

function _0x39c2(_0x8a894b, _0x2708f6) {
    var _0x56e63f = _0x56e6();
    return _0x39c2 = function (_0x39c24f, _0x283ab3) {
        _0x39c24f = _0x39c24f - 0xb2;
        var _0x9ad897 = _0x56e63f[_0x39c24f];
        return _0x9ad897;
    }, _0x39c2(_0x8a894b, _0x2708f6);
}
function _0x56e6() {
    var _0x1f1496 = [
        '\x74\x65\x78\x74\x43\x6f\x6c\x6f\x72',
        '\x34\x36\x39\x35\x34\x36\x52\x44\x49\x4b\x53\x45',
        '\x5f\x5f\x70\x72\x65\x76\x43\x6f\x6c\x6f\x72',
        '\x70\x43\x68\x61\x6e\x67\x65\x43\x6f\x6c\x6f\x72\x46\x6f\x72\x63\x65',
        '\x32\x30\x36\x30\x32\x30\x6f\x4b\x4e\x78\x55\x6d',
        '\x66\x6f\x6e\x74\x46\x61\x63\x65',
        '\x71\x6c\x71\x4c\x46',
        '\x70\x47\x65\x74\x4e\x65\x77\x43\x6f\x6c\x6f\x72\x44\x61\x74\x61',
        '\x5a\x62\x4e\x6c\x59',
        '\x67\x65\x74\x46\x6f\x6e\x74\x4e\x61\x6d\x65\x42\x79\x49\x6e\x64\x65\x78',
        '\x5f\x5f\x70\x72\x65\x76\x46\x6f\x6e\x74',
        '\x58\x66\x4a\x6a\x53',
        '\x4e\x53\x46\x49\x4b',
        '\x63\x6f\x6c\x6f\x72',
        '\x53\x41\x56\x4e\x48',
        '\x34\x4f\x76\x4d\x49\x75\x79',
        '\x70\x45\x78\x74\x72\x61\x63\x74\x46\x6f\x6e\x74\x49\x6e\x64\x65\x78',
        '\x4c\x45\x4e\x53\x4f',
        '\x31\x30\x34\x61\x47\x57\x6e\x4d\x4a',
        '\x52\x4c\x50\x6f\x4d',
        '\x6a\x73\x5a\x6f\x57',
        '\x72\x46\x5a\x56\x56',
        '\x67\x65\x74\x50\x72\x6f\x70\x65\x72\x43\x6f\x6c\x6f\x72\x42\x79\x49\x6e\x64\x65\x78',
        '\x37\x31\x39\x33\x38\x35\x33\x4e\x72\x66\x66\x63\x50',
        '\x47\x79\x73\x79\x43',
        '\x70\x43\x68\x65\x63\x6b\x47\x6c\x6f\x62\x61\x6c\x46\x6f\x6e\x74',
        '\x31\x51\x67\x63\x76\x54\x62',
        '\x55\x74\x69\x6c\x73',
        '\x69\x73\x47\x6c\x6f\x62\x61\x6c',
        '\x72\x65\x70\x6c\x61\x63\x65',
        '\x69\x6e\x63\x6c\x75\x64\x65\x73',
        '\x71\x68\x76\x57\x69',
        '\x70\x41\x66\x74\x65\x72\x47\x6c\x6f\x62\x61\x6c',
        '\x77\x61\x72\x6e',
        '\x76\x51\x65\x6f\x77',
        '\x71\x53\x4a\x54\x55',
        '\x68\x79\x58\x51\x75',
        '\x6d\x61\x74\x63\x68',
        '\x74\x65\x78\x74',
        '\x70\x72\x6f\x74\x6f\x74\x79\x70\x65',
        '\x70\x42\x65\x66\x6f\x72\x65\x47\x6c\x6f\x62\x61\x6c',
        '\x4f\x57\x72\x53\x79',
        '\x4b\x45\x44\x55\x63',
        '\x37\x35\x31\x31\x39\x34\x62\x72\x63\x74\x69\x6c',
        '\x44\x5a\x73\x74\x72',
        '\x66\x4f\x44\x71\x6c',
        '\x69\x73\x47\x6c\x6f\x62\x61\x6c\x43\x6f\x6c\x6f\x72\x73',
        '\x57\x47\x6a\x75\x51',
        '\x31\x30\x34\x34\x33\x31\x32\x72\x62\x4f\x4a\x4e\x4c',
        '\x64\x72\x61\x77\x54\x65\x78\x74',
        '\x74\x6f\x53\x74\x72\x69\x6e\x67',
        '\x66\x76\x65\x67\x77',
        '\x62\x4e\x51\x74\x79',
        '\x6b\x70\x56\x6a\x4e',
        '\x68\x53\x78\x4c\x4b',
        '\x35\x35\x6a\x4a\x49\x6e\x42\x69',
        '\x70\x45\x78\x74\x72\x61\x63\x74\x43\x6f\x6c\x6f\x72\x49\x6e\x64\x65\x78',
        '\x70\x47\x65\x74\x46\x6f\x6e\x74\x4e\x61\x6d\x65',
        '\x70\x43\x68\x65\x63\x6b\x47\x6c\x6f\x62\x61\x6c\x50\x61\x69\x72',
        '\x66\x61\x63\x65',
        '\x31\x31\x36\x38\x30\x39\x35\x48\x63\x4d\x77\x6e\x58',
        '\x6c\x65\x67\x61\x63\x79',
        '\x31\x37\x36\x31\x39\x35\x34\x6d\x41\x64\x4b\x44\x65',
        '\x70\x43\x68\x61\x6e\x67\x65\x46\x6f\x6e\x74\x46\x6f\x72\x63\x65'
    ];
    _0x56e6 = function () {
        return _0x1f1496;
    };
    return _0x56e6();
}
(function (_0x321258, _0x531f1e) {
    var _0x4ff4eb = _0x39c2, _0x14aa7d = _0x321258();
    while (!![]) {
        try {
            var _0x2619bc = -parseInt(_0x4ff4eb(0xc2)) / 0x1 * (-parseInt(_0x4ff4eb(0xe6)) / 0x2) + parseInt(_0x4ff4eb(0xd3)) / 0x3 + parseInt(_0x4ff4eb(0xb7)) / 0x4 * (-parseInt(_0x4ff4eb(0xe4)) / 0x5) + -parseInt(_0x4ff4eb(0xd8)) / 0x6 + -parseInt(_0x4ff4eb(0xe9)) / 0x7 * (parseInt(_0x4ff4eb(0xba)) / 0x8) + parseInt(_0x4ff4eb(0xbf)) / 0x9 + parseInt(_0x4ff4eb(0xec)) / 0xa * (-parseInt(_0x4ff4eb(0xdf)) / 0xb);
            if (_0x2619bc === _0x531f1e)
                break;
            else
                _0x14aa7d['push'](_0x14aa7d['shift']());
        } catch (_0x41c7b0) {
            _0x14aa7d['push'](_0x14aa7d['shift']());
        }
    }
}(_0x56e6, 0x85c9d), (function () {
    var _0x7c2ea1 = _0x39c2, _0x12b743, _0x33c7fb;
    _0x33c7fb = Bitmap[_0x7c2ea1(0xcf)], _0x12b743 = _0x33c7fb['\x64\x72\x61\x77\x54\x65\x78\x74'], _0x33c7fb[_0x7c2ea1(0xd9)] = function (_0xb1e65b, _0x4565fa, _0x17180c, _0x432eec, _0x18d4d5, _0x5e928b) {
        var _0x3a6ef0 = _0x7c2ea1;
        this[_0x3a6ef0(0xd0)](), _0xb1e65b = this['\x70\x43\x68\x65\x63\x6b\x47\x6c\x6f\x62\x61\x6c\x73'](_0xb1e65b), _0x12b743['\x63\x61\x6c\x6c'](this, _0xb1e65b, _0x4565fa, _0x17180c, _0x432eec, _0x18d4d5, _0x5e928b), this[_0x3a6ef0(0xc8)]();
    }, _0x33c7fb['\x70\x43\x68\x65\x63\x6b\x47\x6c\x6f\x62\x61\x6c\x73'] = function (_0x29f2b1) {
        var _0x2b15f3 = _0x7c2ea1, _0x371502;
        try {
            if (PKD_FTSM[_0x2b15f3(0xe5)])
                return _0x29f2b1;
            PKD_FTSM['\x50\x50'][_0x2b15f3(0xc4)]() && PKD_FTSM['\x50\x50'][_0x2b15f3(0xd6)]() && ('\x4c\x59\x6c\x57\x77' === _0x2b15f3(0xb4) ? (_0x7ad0de = _0x44f05a, _0x21ee37[_0x2b15f3(0xc9)](_0xde1368)) : _0x29f2b1 = this[_0x2b15f3(0xe2)](_0x29f2b1)), PKD_FTSM['\x50\x50'][_0x2b15f3(0xc4)]() && (_0x29f2b1 = this[_0x2b15f3(0xc1)](_0x29f2b1)), PKD_FTSM['\x50\x50']['\x69\x73\x47\x6c\x6f\x62\x61\x6c\x43\x6f\x6c\x6f\x72\x73']() && (_0x29f2b1 = this['\x70\x43\x68\x65\x63\x6b\x47\x6c\x6f\x62\x61\x6c\x43\x6f\x6c\x6f\x72'](_0x29f2b1));
        } catch (_0x38b7aa) {
            _0x371502 = _0x38b7aa, console['\x77\x61\x72\x6e'](_0x371502);
        }
        return _0x29f2b1;
    }, _0x33c7fb[_0x7c2ea1(0xd0)] = function () {
        var _0x88fc97 = _0x7c2ea1;
        this[_0x88fc97(0xb2)] = null, this[_0x88fc97(0xea)] = null;
    }, _0x33c7fb[_0x7c2ea1(0xc8)] = function () {
        var _0xc393fe = _0x7c2ea1;
        if (_0xc393fe(0xcb) === '\x68\x54\x78\x59\x6e')
            return _0x859ff1 = _0x45de7b['\x72\x65\x70\x6c\x61\x63\x65'](/\|c\d+\|/, ''), {
                '\x63\x6f\x6c\x6f\x72': _0x49a956,
                '\x74\x65\x78\x74': _0x4cd89b
            };
        else
            this[_0xc393fe(0xb2)] && (this[_0xc393fe(0xed)] = this[_0xc393fe(0xb2)]), this['\x5f\x5f\x70\x72\x65\x76\x43\x6f\x6c\x6f\x72'] && (this[_0xc393fe(0xe8)] = this[_0xc393fe(0xea)]);
    }, _0x33c7fb['\x70\x43\x68\x65\x63\x6b\x47\x6c\x6f\x62\x61\x6c\x50\x61\x69\x72'] = function (_0x403980) {
        var _0x1f7c88 = _0x7c2ea1;
        if (_0x1f7c88(0xbc) === _0x1f7c88(0xbb))
            _0x5dc0a7 = this[_0x1f7c88(0xe2)](_0x4602c8);
        else {
            var _0x197304, _0x5361d9, _0x2852d2;
            if (_0x403980 != null && _0x403980[_0x1f7c88(0xda)]()[_0x1f7c88(0xc6)]('\x7c\x66') && _0x403980[_0x1f7c88(0xda)]()['\x69\x6e\x63\x6c\x75\x64\x65\x73']('\x63')) {
                _0x2852d2 = _0x403980[_0x1f7c88(0xcd)](/\|f(\d+)c(\d+)\|/);
                if (_0x2852d2 != null) {
                    if ('\x59\x44\x4c\x63\x49' === '\x59\x44\x4c\x63\x49')
                        _0x5361d9 = _0x2852d2[0x1], _0x197304 = _0x2852d2[0x2], _0x403980 = _0x403980[_0x1f7c88(0xc5)](/\|f(\d+)c(\d+)\|/, ''), _0x403980 += '\x7c\x66' + _0x5361d9 + '\x7c', _0x403980 = this[_0x1f7c88(0xe7)](_0x403980), _0x403980 += '\x7c\x63' + _0x197304 + '\x7c', _0x403980 = this[_0x1f7c88(0xeb)](_0x403980);
                    else {
                        var _0x26d77f, _0xc4e78c, _0x5e901f;
                        try {
                            _0x5e901f = this[_0x1f7c88(0xe0)](_0x431f31), _0x26d77f = _0x2062b1[_0x1f7c88(0xc3)][_0x1f7c88(0xbe)](_0x5e901f);
                            if (_0x26d77f != null)
                                return _0x48e45d = _0x2497ab[_0x1f7c88(0xc5)](/\|c\d+\|/, ''), {
                                    '\x63\x6f\x6c\x6f\x72': _0x26d77f,
                                    '\x74\x65\x78\x74': _0x46b6e1
                                };
                        } catch (_0x53b2eb) {
                            _0xc4e78c = _0x53b2eb, _0x19520a['\x77\x61\x72\x6e'](_0xc4e78c);
                        }
                        return null;
                    }
                }
            }
            return _0x403980;
        }
    }, _0x33c7fb[_0x7c2ea1(0xc1)] = function (_0x5adf8f) {
        var _0x4e18dc = _0x7c2ea1;
        if (_0x5adf8f != null && _0x5adf8f[_0x4e18dc(0xda)]()[_0x4e18dc(0xc6)]('\x7c\x66')) {
            if (_0x4e18dc(0xc7) !== '\x6a\x66\x62\x5a\x4e')
                _0x5adf8f = this[_0x4e18dc(0xe7)](_0x5adf8f);
            else
                return _0x485345 = _0x4e83f9[_0x4e18dc(0xc5)](/\|f\d+\|/, ''), {
                    '\x66\x61\x63\x65': _0x292ac2,
                    '\x74\x65\x78\x74': _0x44e9bf
                };
        }
        return _0x5adf8f;
    }, _0x33c7fb[_0x7c2ea1(0xe7)] = function (_0x5bd8a9) {
        var _0x4b30ec = _0x7c2ea1, _0x3541e3, _0x497a91;
        try {
            this[_0x4b30ec(0xb2)] = this[_0x4b30ec(0xed)], _0x497a91 = this[_0x4b30ec(0xe1)](_0x5bd8a9), _0x497a91 != null && (this[_0x4b30ec(0xed)] = _0x497a91[_0x4b30ec(0xe3)], _0x5bd8a9 = _0x497a91[_0x4b30ec(0xce)]);
        } catch (_0x5c0f8d) {
            if (_0x4b30ec(0xd2) === _0x4b30ec(0xd2))
                _0x3541e3 = _0x5c0f8d, console['\x77\x61\x72\x6e'](_0x3541e3);
            else {
                var _0x3689cf, _0x3099ce, _0x16909d;
                return _0x2b8085 != null && _0x135a01[_0x4b30ec(0xda)]()[_0x4b30ec(0xc6)]('\x7c\x66') && _0x27f3ba[_0x4b30ec(0xda)]()['\x69\x6e\x63\x6c\x75\x64\x65\x73']('\x63') && (_0x16909d = _0x451bb5['\x6d\x61\x74\x63\x68'](/\|f(\d+)c(\d+)\|/), _0x16909d != null && (_0x3099ce = _0x16909d[0x1], _0x3689cf = _0x16909d[0x2], _0x4025e1 = _0x3ac7dc[_0x4b30ec(0xc5)](/\|f(\d+)c(\d+)\|/, ''), _0x1b6e94 += '\x7c\x66' + _0x3099ce + '\x7c', _0x4e1199 = this[_0x4b30ec(0xe7)](_0x497776), _0x4856f9 += '\x7c\x63' + _0x3689cf + '\x7c', _0x436dfb = this[_0x4b30ec(0xeb)](_0x37c274))), _0x375f4e;
            }
        }
        return _0x5bd8a9;
    }, _0x33c7fb['\x70\x43\x68\x65\x63\x6b\x47\x6c\x6f\x62\x61\x6c\x43\x6f\x6c\x6f\x72'] = function (_0x56a6ef) {
        var _0x351ff4 = _0x7c2ea1;
        if (_0x351ff4(0xb3) !== _0x351ff4(0xd1))
            return _0x56a6ef != null && _0x56a6ef[_0x351ff4(0xda)]()[_0x351ff4(0xc6)]('\x7c\x63') && (_0x351ff4(0xcc) === _0x351ff4(0xdd) ? this[_0x351ff4(0xe8)] = this[_0x351ff4(0xea)] : _0x56a6ef = this[_0x351ff4(0xeb)](_0x56a6ef)), _0x56a6ef;
        else
            _0x48f228 = _0x1f7973[0x1], _0x573328 = _0x5990fc[0x2], _0x36a98b = _0x4cc2bb[_0x351ff4(0xc5)](/\|f(\d+)c(\d+)\|/, ''), _0x3cdbcf += '\x7c\x66' + _0x57c030 + '\x7c', _0x368f57 = this[_0x351ff4(0xe7)](_0x353e07), _0x3c00eb += '\x7c\x63' + _0x210d84 + '\x7c', _0x435ae2 = this[_0x351ff4(0xeb)](_0x5a8f5d);
    }, _0x33c7fb[_0x7c2ea1(0xeb)] = function (_0x595cc0) {
        var _0x2bfa50 = _0x7c2ea1, _0x4c3134, _0x65034;
        try {
            _0x2bfa50(0xb6) === _0x2bfa50(0xb6) ? (this['\x5f\x5f\x70\x72\x65\x76\x43\x6f\x6c\x6f\x72'] = this[_0x2bfa50(0xe8)], _0x4c3134 = this[_0x2bfa50(0xef)](_0x595cc0), _0x4c3134 != null && (this[_0x2bfa50(0xe8)] = _0x4c3134[_0x2bfa50(0xb5)], _0x595cc0 = _0x4c3134['\x74\x65\x78\x74'])) : _0x449151 = this[_0x2bfa50(0xe7)](_0x2f7e66);
        } catch (_0x2f9dab) {
            if ('\x4f\x66\x4a\x54\x52' === _0x2bfa50(0xf0))
                return _0x2a6252 != null && _0x4566f1[_0x2bfa50(0xda)]()[_0x2bfa50(0xc6)]('\x7c\x63') && (_0x20c67e = this['\x70\x43\x68\x61\x6e\x67\x65\x43\x6f\x6c\x6f\x72\x46\x6f\x72\x63\x65'](_0x2de18f)), _0x3241f4;
            else
                _0x65034 = _0x2f9dab, console[_0x2bfa50(0xc9)](_0x65034);
        }
        return _0x595cc0;
    }, _0x33c7fb['\x70\x47\x65\x74\x46\x6f\x6e\x74\x4e\x61\x6d\x65'] = function (_0x44d8b1) {
        var _0x203218 = _0x7c2ea1;
        if ('\x45\x7a\x7a\x62\x6f' === _0x203218(0xb9))
            this['\x5f\x5f\x70\x72\x65\x76\x46\x6f\x6e\x74'] && (this[_0x203218(0xed)] = this[_0x203218(0xb2)]), this[_0x203218(0xea)] && (this[_0x203218(0xe8)] = this[_0x203218(0xea)]);
        else {
            var _0x4d5329, _0x572a6d, _0x1243cd;
            try {
                if (_0x203218(0xd7) !== _0x203218(0xee)) {
                    _0x1243cd = this['\x70\x45\x78\x74\x72\x61\x63\x74\x46\x6f\x6e\x74\x49\x6e\x64\x65\x78'](_0x44d8b1);
                    if (_0x1243cd > 0x0) {
                        if ('\x70\x71\x54\x6a\x68' === _0x203218(0xdb)) {
                            var _0x4027f0, _0x19b2ac;
                            try {
                                this[_0x203218(0xb2)] = this[_0x203218(0xed)], _0x19b2ac = this[_0x203218(0xe1)](_0x225519), _0x19b2ac != null && (this['\x66\x6f\x6e\x74\x46\x61\x63\x65'] = _0x19b2ac['\x66\x61\x63\x65'], _0x4beb19 = _0x19b2ac[_0x203218(0xce)]);
                            } catch (_0x5db2c6) {
                                _0x4027f0 = _0x5db2c6, _0x4e1fb8[_0x203218(0xc9)](_0x4027f0);
                            }
                            return _0x7518e5;
                        } else {
                            _0x572a6d = PKD_FTSM['\x50\x50'][_0x203218(0xf1)](_0x1243cd);
                            if (_0x572a6d != null)
                                return _0x44d8b1 = _0x44d8b1[_0x203218(0xc5)](/\|f\d+\|/, ''), {
                                    '\x66\x61\x63\x65': _0x572a6d,
                                    '\x74\x65\x78\x74': _0x44d8b1
                                };
                        }
                    }
                } else
                    return _0x5909c0;
            } catch (_0x370e51) {
                if (_0x203218(0xde) === _0x203218(0xc0))
                    return _0xa11585 = _0x28acc0[_0x203218(0xcd)](/\|c(\d+)\|/), _0x67460c = _0x139e3d(_0x30fbe2[0x1]), _0x4dc042;
                else
                    _0x4d5329 = _0x370e51, console['\x77\x61\x72\x6e'](_0x4d5329);
            }
            return null;
        }
    }, _0x33c7fb[_0x7c2ea1(0xef)] = function (_0x1c6aef) {
        var _0x38ca31 = _0x7c2ea1, _0x5eff6c, _0x3ea7bb, _0x1358bf;
        try {
            _0x1358bf = this[_0x38ca31(0xe0)](_0x1c6aef), _0x5eff6c = PKD_FTSM[_0x38ca31(0xc3)][_0x38ca31(0xbe)](_0x1358bf);
            if (_0x5eff6c != null)
                return _0x1c6aef = _0x1c6aef['\x72\x65\x70\x6c\x61\x63\x65'](/\|c\d+\|/, ''), {
                    '\x63\x6f\x6c\x6f\x72': _0x5eff6c,
                    '\x74\x65\x78\x74': _0x1c6aef
                };
        } catch (_0x406258) {
            _0x38ca31(0xca) !== _0x38ca31(0xca) ? (_0x1e4741 = _0x2ad102, _0xa7934[_0x38ca31(0xc9)](_0x187565)) : (_0x3ea7bb = _0x406258, console['\x77\x61\x72\x6e'](_0x3ea7bb));
        }
        return null;
    }, _0x33c7fb[_0x7c2ea1(0xe0)] = function (_0x5e0052) {
        var _0x3c6d05 = _0x7c2ea1, _0x18aded, _0x30ce73, _0x1a50e5;
        try {
            if (_0x3c6d05(0xbd) === _0x3c6d05(0xd4)) {
                _0x61314e = this[_0x3c6d05(0xe0)](_0xadc912), _0x384ccd = _0x5b9dae[_0x3c6d05(0xc3)][_0x3c6d05(0xbe)](_0x2a8c79);
                if (_0x164b31 != null)
                    return _0x156f7a = _0xbdedb7['\x72\x65\x70\x6c\x61\x63\x65'](/\|c\d+\|/, ''), {
                        '\x63\x6f\x6c\x6f\x72': _0x4095c9,
                        '\x74\x65\x78\x74': _0x13b85d
                    };
            } else
                return _0x1a50e5 = _0x5e0052['\x6d\x61\x74\x63\x68'](/\|c(\d+)\|/), _0x30ce73 = parseInt(_0x1a50e5[0x1]), _0x30ce73;
        } catch (_0x1616b1) {
            _0x3c6d05(0xdc) !== _0x3c6d05(0xd5) ? (_0x18aded = _0x1616b1, console[_0x3c6d05(0xc9)](_0x18aded)) : (_0xa23051 = _0x3f8166, _0x5766bc[_0x3c6d05(0xc9)](_0x14407f));
        }
        return 0x0;
    }, _0x33c7fb[_0x7c2ea1(0xb8)] = function (_0x363c74) {
        var _0x45c77e = _0x7c2ea1, _0x228906, _0x13d48b, _0x5b2a8b;
        try {
            return _0x5b2a8b = _0x363c74['\x6d\x61\x74\x63\x68'](/\|f(\d+)\|/), _0x13d48b = parseInt(_0x5b2a8b[0x1]), _0x13d48b;
        } catch (_0x335f05) {
            _0x228906 = _0x335f05, console[_0x45c77e(0xc9)](_0x228906);
        }
        return 0x0;
    };
}()));

// Generated by CoffeeScript 2.6.1
// * Класс аналог KDCore.ParamLoader, но упрощённый, чтобы всю библиотеку не тащить
var KDParamLoaderLite;

KDParamLoaderLite = (function() {
  class KDParamLoaderLite {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this.paramsRaw = PluginManager.pParametersUnsafe(this.pluginName);
      if (!this.isLoaded()) {
        return;
      }
      this.params = this.parseParameters(this.paramsRaw);
      return;
    }

    isLoaded() {
      return this.paramsRaw != null;
    }

    parseParameters(paramSet) {
      var clearKey, key, params, typeKey, value;
      params = {};
      for (key in paramSet) {
        value = paramSet[key];
        clearKey = this.parseKey(key);
        typeKey = this.parseKeyType(key);
        params[clearKey] = this.parseParamItem(typeKey, value);
      }
      return params;
    }

    parseKey(keyRaw) {
      return keyRaw.split(":")[0];
    }

    parseKeyType(keyRaw) {
      return keyRaw.split(":")[1];
    }

    // * Имя параметра без ключа
    isHasParameter(paramName) {
      if (!this.isLoaded()) {
        return false;
      } else {
        return this.params[paramName] != null;
      }
    }

    // * Возвращает значение параметра (def - по умолчанию, если не найден)
    getParam(paramName, def) {
      var value;
      if (this.isHasParameter(paramName)) {
        value = this.params[paramName];
        if (value != null) {
          return value;
        }
      }
      return def;
    }

    parseParamItem(type, item) {
      var e;
      try {
        if (type == null) {
          return item;
        }
        switch (type) {
          case "int":
          case "i":
            return Number(item);
          case "intA":
            return this.parseArray(item, "int");
          case "bool":
          case "b":
          case "e":
            return eval(item);
          case "struct":
          case "s":
            return this.parseStruct(item);
          case "structA":
            return this.parseStructArray(item);
          case "str":
            return item;
          case "strA":
            return this.parseArray(item, "str");
          case "note":
            return this.parseNote(item);
          case "css":
            if (window.KDCore != null) {
              return item.toCss();
            } else {
              return item;
            }
            return item.toCss();
          case "color":
            if (window.KDCore != null) {
              return KDCore.Color.FromHex(item);
            } else {
              return item;
            }
            break;
          default:
            return item;
        }
      } catch (error) {
        e = error;
        console.warn(e);
        return item;
      }
    }

    parseArray(items, type) {
      var e, elements, i, len, p, parsed;
      try {
        elements = [];
        parsed = JsonEx.parse(items);
        for (i = 0, len = parsed.length; i < len; i++) {
          p = parsed[i];
          try {
            elements.push(this.parseParamItem(type, p));
          } catch (error) {
            e = error;
            console.warn(e);
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return elements;
    }

    parseStruct(item) {
      var e, parsed;
      try {
        parsed = JsonEx.parse(item);
        if (parsed != null) {
          return this.parseParameters(parsed);
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return null;
    }

    parseStructArray(items) {
      var e, elements, i, len, p, parsed;
      try {
        elements = [];
        parsed = JsonEx.parse(items);
        for (i = 0, len = parsed.length; i < len; i++) {
          p = parsed[i];
          try {
            elements.push(this.parseStruct(p));
          } catch (error) {
            e = error;
            console.warn(e);
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return elements;
    }

    parseNote(item) {
      var e, parsed;
      try {
        parsed = JsonEx.parse(item);
        if (parsed != null) {
          return parsed;
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return item;
    }

  };

  KDParamLoaderLite.Version = 100;

  return KDParamLoaderLite;

}).call(this);

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PluginManager.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = PluginManager;
  // * Не возвращает {}, а возвращает null, чтобы можно было проверить isLoaded
  _.pParametersUnsafe = function(name) {
    return this._parameters[name.toLowerCase()];
  };
})();

// ■ END PluginManager.coffee
//---------------------------------------------------------------------------


function _0x2ca9(_0x5f32d2, _0x4fb525) {
    var _0x45ade3 = _0x45ad();
    return _0x2ca9 = function (_0x2ca9aa, _0x58815a) {
        _0x2ca9aa = _0x2ca9aa - 0x12e;
        var _0x3f2c6b = _0x45ade3[_0x2ca9aa];
        return _0x3f2c6b;
    }, _0x2ca9(_0x5f32d2, _0x4fb525);
}
(function (_0x20b3d9, _0x2ee15c) {
    var _0x427d75 = _0x2ca9, _0x7cead5 = _0x20b3d9();
    while (!![]) {
        try {
            var _0xf7001f = parseInt(_0x427d75(0x143)) / 0x1 * (parseInt(_0x427d75(0x14a)) / 0x2) + -parseInt(_0x427d75(0x12e)) / 0x3 + -parseInt(_0x427d75(0x15b)) / 0x4 * (-parseInt(_0x427d75(0x157)) / 0x5) + -parseInt(_0x427d75(0x133)) / 0x6 + parseInt(_0x427d75(0x131)) / 0x7 + parseInt(_0x427d75(0x14d)) / 0x8 * (parseInt(_0x427d75(0x13c)) / 0x9) + -parseInt(_0x427d75(0x138)) / 0xa;
            if (_0xf7001f === _0x2ee15c)
                break;
            else
                _0x7cead5['push'](_0x7cead5['shift']());
        } catch (_0x5dd97d) {
            _0x7cead5['push'](_0x7cead5['shift']());
        }
    }
}(_0x45ad, 0x1b48e), (function () {
    var _0x37fa9f = _0x2ca9, _0x29ad8b;
    _0x29ad8b = PKD_FTSM['\x50\x50'], _0x29ad8b[_0x37fa9f(0x140)] = function () {
        var _0x1bf1c0 = _0x37fa9f;
        return Utils[_0x1bf1c0(0x14b)]() && this[_0x1bf1c0(0x14f)][_0x1bf1c0(0x132)](_0x1bf1c0(0x140), ![]);
    }, _0x29ad8b['\x66\x6f\x6e\x74\x73\x54\x6f\x4c\x6f\x61\x64'] = function () {
        return [];
    }, _0x29ad8b[_0x37fa9f(0x142)] = function () {
        var _0x2343bf = _0x37fa9f;
        return _0x2343bf(0x139) === _0x2343bf(0x150) ? null : this['\x5f\x6c\x6f\x61\x64\x65\x72']['\x67\x65\x74\x50\x61\x72\x61\x6d']('\x69\x73\x47\x6c\x6f\x62\x61\x6c', !![]);
    }, _0x29ad8b[_0x37fa9f(0x158)] = function () {
        var _0x22b7d3 = _0x37fa9f;
        return this[_0x22b7d3(0x14f)]['\x67\x65\x74\x50\x61\x72\x61\x6d']('\x61\x6c\x6c\x49\x74\x65\x6d\x73\x46\x6f\x6e\x74', null);
    }, _0x29ad8b[_0x37fa9f(0x134)] = function () {
        var _0x5397d3 = _0x37fa9f;
        return '\x75\x54\x61\x43\x58' !== _0x5397d3(0x141) ? this[_0x5397d3(0x14f)]['\x67\x65\x74\x50\x61\x72\x61\x6d'](_0x5397d3(0x134), null) : null;
    }, _0x29ad8b[_0x37fa9f(0x15a)] = function () {
        var _0x33ca4a = _0x37fa9f;
        return this[_0x33ca4a(0x14f)][_0x33ca4a(0x132)](_0x33ca4a(0x15a), null);
    }, _0x29ad8b['\x61\x6c\x6c\x53\x6b\x69\x6c\x6c\x73\x46\x6f\x6e\x74'] = function () {
        var _0x157282 = _0x37fa9f;
        return this['\x5f\x6c\x6f\x61\x64\x65\x72'][_0x157282(0x132)](_0x157282(0x14c), null);
    }, _0x29ad8b[_0x37fa9f(0x135)] = function () {
        var _0x5c1b44 = _0x37fa9f;
        return this['\x5f\x6c\x6f\x61\x64\x65\x72']['\x67\x65\x74\x50\x61\x72\x61\x6d'](_0x5c1b44(0x135), null);
    }, _0x29ad8b[_0x37fa9f(0x144)] = function () {
        var _0x451aca = _0x37fa9f;
        return _0x451aca(0x137) === _0x451aca(0x153) ? this[_0x451aca(0x14f)]['\x67\x65\x74\x50\x61\x72\x61\x6d']('\x61\x6c\x6c\x41\x63\x74\x6f\x72\x4e\x69\x63\x6b\x46\x6f\x6e\x74', null) : this[_0x451aca(0x14f)][_0x451aca(0x132)]('\x61\x6c\x6c\x41\x63\x74\x6f\x72\x43\x6c\x61\x73\x73\x46\x6f\x6e\x74', null);
    }, _0x29ad8b[_0x37fa9f(0x146)] = function () {
        var _0x5a7b8e = _0x37fa9f;
        return this['\x5f\x6c\x6f\x61\x64\x65\x72'][_0x5a7b8e(0x132)]('\x61\x6c\x6c\x41\x63\x74\x6f\x72\x4e\x69\x63\x6b\x46\x6f\x6e\x74', null);
    }, _0x29ad8b['\x61\x6c\x6c\x41\x63\x74\x6f\x72\x4c\x65\x76\x65\x6c\x46\x6f\x6e\x74'] = function () {
        var _0x48f57c = _0x37fa9f;
        return _0x48f57c(0x147) !== _0x48f57c(0x147) ? _0x56acf9 : this['\x5f\x6c\x6f\x61\x64\x65\x72'][_0x48f57c(0x132)](_0x48f57c(0x13a), null);
    }, _0x29ad8b[_0x37fa9f(0x13b)] = function () {
        var _0x5da07e = _0x37fa9f;
        return _0x5da07e(0x149) !== _0x5da07e(0x14e) ? this[_0x5da07e(0x14f)][_0x5da07e(0x132)]('\x70\x61\x6c\x6c\x65\x74\x65', []) : _0x3bace9[_0x5da07e(0x151)][_0x5da07e(0x13d)](_0x22c2be);
    }, _0x29ad8b[_0x37fa9f(0x152)] = function () {
        var _0x2923d3 = _0x37fa9f;
        return '\x51\x64\x77\x58\x6b' !== '\x4f\x43\x56\x59\x42' ? [] : this[_0x2923d3(0x14f)][_0x2923d3(0x132)](_0x2923d3(0x134), null);
    }, _0x29ad8b[_0x37fa9f(0x13f)] = function () {
        var _0x19f8c3 = _0x37fa9f;
        return _0x19f8c3(0x12f) !== _0x19f8c3(0x13e) ? this['\x5f\x6c\x6f\x61\x64\x65\x72']['\x67\x65\x74\x50\x61\x72\x61\x6d'](_0x19f8c3(0x13f), !![]) : this[_0x19f8c3(0x14f)]['\x67\x65\x74\x50\x61\x72\x61\x6d'](_0x19f8c3(0x13f), !![]);
    }, _0x29ad8b[_0x37fa9f(0x136)] = function (_0x2d1423) {
        var _0x9e86ba = _0x37fa9f, _0x519da3, _0x435531;
        try {
            if (_0x2d1423 <= 0x0)
                return null;
            _0x435531 = this[_0x9e86ba(0x159)]()[_0x2d1423 - 0x1];
            if (_0x435531 != null)
                return PKD_FTSM[_0x9e86ba(0x151)][_0x9e86ba(0x13d)](_0x435531);
        } catch (_0x1965e8) {
            _0x519da3 = _0x1965e8, console['\x77\x61\x72\x6e'](_0x519da3);
        }
        return null;
    }, _0x29ad8b[_0x37fa9f(0x148)] = function (_0xc72233) {
        var _0x34bea0 = _0x37fa9f;
        if (_0x34bea0(0x130) === _0x34bea0(0x130)) {
            var _0x527bb2, _0x29ccaf, _0x3d3736;
            try {
                if (_0xc72233 <= 0x0)
                    return null;
                _0x3d3736 = this[_0x34bea0(0x155)]();
                if (_0x3d3736 == null)
                    return null;
                if (_0x3d3736[_0x34bea0(0x154)] === 0x0)
                    return null;
                _0x29ccaf = _0x3d3736[_0xc72233 - 0x1];
                if (_0x29ccaf != null && _0x29ccaf !== '' && _0x29ccaf[_0x34bea0(0x156)]('\x23'))
                    return _0x29ccaf;
            } catch (_0x4fb73a) {
                _0x527bb2 = _0x4fb73a, console[_0x34bea0(0x145)](_0x527bb2);
            }
            return null;
        } else
            return this[_0x34bea0(0x14f)][_0x34bea0(0x132)](_0x34bea0(0x15a), null);
    }, _0x29ad8b[_0x37fa9f(0x155)] = function () {
        return this['\x63\x6f\x6c\x6f\x72\x50\x61\x6c\x6c\x65\x74\x65']();
    };
}()));
function _0x45ad() {
    var _0x5dfee6 = [
        '\x63\x6f\x6c\x6f\x72\x50\x61\x6c\x6c\x65\x74\x65\x73',
        '\x54\x52\x55\x71\x4c',
        '\x6c\x65\x6e\x67\x74\x68',
        '\x67\x65\x74\x50\x72\x6f\x70\x65\x72\x43\x6f\x6c\x6f\x72\x50\x61\x6c\x6c\x65\x74\x65',
        '\x63\x6f\x6e\x74\x61\x69\x6e\x73',
        '\x32\x35\x6b\x70\x62\x61\x69\x4e',
        '\x61\x6c\x6c\x49\x74\x65\x6d\x73\x46\x6f\x6e\x74',
        '\x66\x6f\x6e\x74\x73\x54\x6f\x4c\x6f\x61\x64',
        '\x61\x6c\x6c\x57\x65\x61\x70\x6f\x6e\x73\x46\x6f\x6e\x74',
        '\x31\x36\x35\x33\x30\x38\x6d\x78\x75\x73\x41\x41',
        '\x34\x38\x31\x38\x34\x32\x4e\x6c\x49\x4e\x71\x64',
        '\x63\x66\x64\x76\x50',
        '\x43\x64\x63\x65\x53',
        '\x33\x32\x38\x30\x39\x64\x76\x59\x77\x50\x5a',
        '\x67\x65\x74\x50\x61\x72\x61\x6d',
        '\x33\x37\x38\x33\x39\x36\x43\x56\x68\x73\x55\x49',
        '\x61\x6c\x6c\x41\x72\x6d\x6f\x72\x73\x46\x6f\x6e\x74',
        '\x61\x6c\x6c\x41\x63\x74\x6f\x72\x4e\x61\x6d\x65\x73\x46\x6f\x6e\x74',
        '\x67\x65\x74\x46\x6f\x6e\x74\x4e\x61\x6d\x65\x42\x79\x49\x6e\x64\x65\x78',
        '\x68\x4f\x44\x54\x71',
        '\x31\x32\x35\x38\x34\x30\x30\x68\x61\x51\x65\x47\x75',
        '\x6a\x51\x72\x49\x77',
        '\x61\x6c\x6c\x41\x63\x74\x6f\x72\x4c\x65\x76\x65\x6c\x46\x6f\x6e\x74',
        '\x63\x6f\x6c\x6f\x72\x50\x61\x6c\x6c\x65\x74\x65',
        '\x39\x4e\x54\x67\x75\x64\x55',
        '\x67\x65\x74\x4e\x61\x6d\x65\x57\x69\x74\x68\x6f\x75\x74\x45\x78\x74',
        '\x66\x54\x69\x69\x4e',
        '\x69\x73\x47\x6c\x6f\x62\x61\x6c\x43\x6f\x6c\x6f\x72\x73',
        '\x69\x73\x41\x75\x74\x6f\x4c\x6f\x61\x64',
        '\x68\x67\x4b\x43\x71',
        '\x69\x73\x47\x6c\x6f\x62\x61\x6c',
        '\x36\x77\x59\x4d\x56\x5a\x52',
        '\x61\x6c\x6c\x41\x63\x74\x6f\x72\x43\x6c\x61\x73\x73\x46\x6f\x6e\x74',
        '\x77\x61\x72\x6e',
        '\x61\x6c\x6c\x41\x63\x74\x6f\x72\x4e\x69\x63\x6b\x46\x6f\x6e\x74',
        '\x71\x75\x64\x6a\x69',
        '\x67\x65\x74\x55\x73\x65\x72\x43\x6f\x6c\x6f\x72\x49\x6e\x64\x65\x78',
        '\x61\x75\x46\x6f\x7a',
        '\x34\x33\x31\x37\x34\x41\x6e\x6a\x58\x64\x4e',
        '\x69\x73\x4e\x77\x6a\x73',
        '\x61\x6c\x6c\x53\x6b\x69\x6c\x6c\x73\x46\x6f\x6e\x74',
        '\x39\x36\x33\x34\x37\x32\x68\x4f\x47\x55\x56\x4a',
        '\x7a\x6f\x59\x66\x7a',
        '\x5f\x6c\x6f\x61\x64\x65\x72',
        '\x74\x70\x58\x73\x42',
        '\x55\x74\x69\x6c\x73'
    ];
    _0x45ad = function () {
        return _0x5dfee6;
    };
    return _0x45ad();
}

// Generated by CoffeeScript 2.6.1
(function() {
  window.switchColorPallete = function(index) {
    var e;
    try {
      return $gameSystem.switchColorPallete(index);
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
})();


function _0x59c4() {
    var _0x20fe95 = [
        '\x43\x74\x4f\x52\x51',
        '\x51\x63\x49\x68\x61',
        '\x31\x38\x37\x30\x38\x36\x4c\x43\x71\x51\x6f\x78',
        '\x63\x6f\x6e\x76\x65\x72\x74\x47\x6c\x6f\x62\x61\x6c\x43\x6f\x6c\x6f\x72\x73',
        '\x6c\x6f\x61\x64\x53\x79\x73\x74\x65\x6d',
        '\x55\x74\x69\x6c\x73',
        '\x63\x6f\x6e\x74\x61\x69\x6e\x73',
        '\x33\x30\x38\x4d\x6e\x47\x53\x53\x67',
        '\x74\x4e\x42\x67\x4b',
        '\x6c\x6f\x61\x64',
        '\x33\x39\x77\x71\x63\x41\x47\x45',
        '\x44\x58\x66\x55\x4b',
        '\x67\x65\x74\x4e\x61\x6d\x65\x57\x69\x74\x68\x6f\x75\x74\x45\x78\x74',
        '\x63\x6f\x6e\x76\x65\x72\x74\x47\x6c\x6f\x62\x61\x6c\x46\x6f\x6e\x74\x73',
        '\x5c\x46\x46\x5b\x24\x32\x5d\x24\x31\x5c\x46\x46\x5b\x30\x5d',
        '\x6b\x5a\x75\x77\x51',
        '\x31\x37\x36\x37\x34\x38\x35\x71\x4f\x73\x61\x58\x58',
        '\x38\x31\x38\x32\x39\x35\x35\x52\x6b\x6e\x48\x47\x42',
        '\x5c\x43\x5b\x24\x31\x5d\x24\x32\x5c\x43\x5b\x30\x5d',
        '\x66\x6c\x6f\x6f\x72',
        '\x31\x30\x49\x70\x6d\x49\x66\x54',
        '\x64\x57\x61\x47\x64',
        '\x5c\x43\x5b\x24\x33\x5d\x5c\x46\x46\x5b\x24\x32\x5d\x24\x31\x5c\x46\x46\x5b\x30\x5d\x5c\x43\x5b\x30\x5d',
        '\x69\x73\x47\x6c\x6f\x62\x61\x6c',
        '\x72\x65\x70\x6c\x61\x63\x65',
        '\x69\x73\x4d\x56',
        '\x57\x69\x6e\x64\x6f\x77',
        '\x63\x6f\x6e\x76\x65\x72\x74\x47\x6c\x6f\x62\x61\x6c\x50\x61\x69\x72',
        '\x69\x73\x47\x6c\x6f\x62\x61\x6c\x43\x6f\x6c\x6f\x72\x73',
        '\x31\x31\x48\x68\x66\x72\x73\x71',
        '\x67\x65\x74\x50\x69\x78\x65\x6c',
        '\x78\x53\x51\x46\x56',
        '\x6f\x69\x48\x47\x79',
        '\x37\x44\x52\x43\x6e\x52\x67',
        '\x63\x6f\x6e\x76\x65\x72\x74\x47\x6c\x6f\x62\x61\x6c\x41\x6c\x6c',
        '\x77\x61\x72\x6e',
        '\x34\x38\x35\x31\x78\x5a\x6b\x77\x74\x6f',
        '\x4d\x73\x6a\x50\x6f',
        '\x31\x35\x30\x33\x33\x6f\x58\x6c\x55\x4d\x42',
        '\x36\x30\x39\x32\x36\x36\x34\x6c\x64\x5a\x49\x74\x47',
        '\x4c\x6f\x51\x44\x46',
        '\x52\x50\x47\x4d\x41\x4b\x45\x52\x5f\x4e\x41\x4d\x45',
        '\x4b\x6d\x71\x45\x70',
        '\x74\x65\x78\x74\x43\x6f\x6c\x6f\x72',
        '\x37\x33\x38\x38\x39\x31\x36\x52\x6f\x4d\x6d\x63\x52',
        '\x6c\x6f\x61\x64\x46\x6f\x6e\x74',
        '\x69\x6e\x63\x6c\x75\x64\x65\x73',
        '\x50\x4a\x53\x72\x41',
        '\x67\x65\x74\x55\x73\x65\x72\x43\x6f\x6c\x6f\x72\x49\x6e\x64\x65\x78',
        '\x37\x38\x34\x38\x6b\x4b\x57\x58\x47\x67'
    ];
    _0x59c4 = function () {
        return _0x20fe95;
    };
    return _0x59c4();
}
function _0x1b25(_0x2574ea, _0x2bf050) {
    var _0x59c493 = _0x59c4();
    return _0x1b25 = function (_0x1b255a, _0x3da692) {
        _0x1b255a = _0x1b255a - 0x136;
        var _0x35faa7 = _0x59c493[_0x1b255a];
        return _0x35faa7;
    }, _0x1b25(_0x2574ea, _0x2bf050);
}
(function (_0x422112, _0x309b5a) {
    var _0x2bb164 = _0x1b25, _0x544116 = _0x422112();
    while (!![]) {
        try {
            var _0x4670c0 = parseInt(_0x2bb164(0x151)) / 0x1 * (parseInt(_0x2bb164(0x136)) / 0x2) + parseInt(_0x2bb164(0x15a)) / 0x3 * (-parseInt(_0x2bb164(0x13b)) / 0x4) + parseInt(_0x2bb164(0x144)) / 0x5 + -parseInt(_0x2bb164(0x15b)) / 0x6 * (parseInt(_0x2bb164(0x155)) / 0x7) + -parseInt(_0x2bb164(0x165)) / 0x8 * (parseInt(_0x2bb164(0x158)) / 0x9) + -parseInt(_0x2bb164(0x148)) / 0xa * (parseInt(_0x2bb164(0x145)) / 0xb) + parseInt(_0x2bb164(0x160)) / 0xc * (parseInt(_0x2bb164(0x13e)) / 0xd);
            if (_0x4670c0 === _0x309b5a)
                break;
            else
                _0x544116['push'](_0x544116['shift']());
        } catch (_0x3ee1ba) {
            _0x544116['push'](_0x544116['shift']());
        }
    }
}(_0x59c4, 0x87ae0), (function () {
    var _0x453184 = _0x1b25, _0x5188d0;
    _0x5188d0 = PKD_FTSM[_0x453184(0x139)], _0x5188d0[_0x453184(0x14d)] = function () {
        var _0x102071 = _0x453184;
        return Utils['\x52\x50\x47\x4d\x41\x4b\x45\x52\x5f\x4e\x41\x4d\x45'][_0x102071(0x13a)]('\x4d\x56');
    }, _0x5188d0[_0x453184(0x140)] = function (_0x5b6247) {
        var _0x2dfc51 = _0x453184;
        return _0x5b6247[_0x2dfc51(0x14c)](/\.[^\/.]+$/, '');
    }, _0x5188d0[_0x453184(0x161)] = function (_0x3764a7) {
        var _0x5a308f = _0x453184, _0x2fdfa6, _0x5e950f;
        try {
            if (_0x3764a7 == null)
                return;
            if (_0x3764a7 === '')
                return;
            return _0x5e950f = this[_0x5a308f(0x140)](_0x3764a7), FontManager[_0x5a308f(0x13d)](_0x5e950f, _0x3764a7);
        } catch (_0x9898d1) {
            return _0x2fdfa6 = _0x9898d1, console[_0x5a308f(0x157)]('\x55\x6e\x61\x62\x6c\x65\x20\x74\x6f\x20\x6c\x6f\x61\x64\x20\x66\x6f\x6e\x74\x20\x66\x69\x6c\x65\x3a\x20' + _0x3764a7 + '\x20' + _0x2fdfa6);
        }
    }, _0x5188d0[_0x453184(0x156)] = function (_0x14d397) {
        var _0x427396 = _0x453184;
        if (_0x427396(0x143) === _0x427396(0x166))
            return this[_0x427396(0x14d)]() ? (_0x310d2a = _0x242e75[_0x427396(0x138)](_0x427396(0x14e)), _0x18b85e = 0x60 + _0x3504c6 % 0x8 * 0xc + 0x6, _0xab3843 = 0x90 + _0x3f94a5[_0x427396(0x147)](_0x2da201 / 0x8) * 0xc + 0x6, _0x520ef9[_0x427396(0x152)](_0x468bf1, _0x4ab689)) : _0x26f1c8[_0x427396(0x15f)](_0x37d612);
        else {
            var _0x557098;
            try {
                if (_0x14d397 == null)
                    return _0x14d397;
                PKD_FTSM['\x50\x50'][_0x427396(0x14b)]() && PKD_FTSM['\x50\x50']['\x69\x73\x47\x6c\x6f\x62\x61\x6c\x43\x6f\x6c\x6f\x72\x73']() && (_0x14d397 = this[_0x427396(0x14f)](_0x14d397));
                if (PKD_FTSM['\x50\x50'][_0x427396(0x14b)]()) {
                    if (_0x427396(0x153) === _0x427396(0x153))
                        _0x14d397 = this[_0x427396(0x137)](_0x14d397);
                    else
                        return _0x39e932;
                }
                if (PKD_FTSM['\x50\x50'][_0x427396(0x150)]()) {
                    if (_0x427396(0x154) === '\x73\x63\x54\x57\x79')
                        return _0x598c5e[_0x427396(0x15d)]['\x63\x6f\x6e\x74\x61\x69\x6e\x73']('\x4d\x56');
                    else
                        _0x14d397 = this[_0x427396(0x141)](_0x14d397);
                }
            } catch (_0x3f1729) {
                _0x557098 = _0x3f1729, console[_0x427396(0x157)](_0x557098);
            }
            return _0x14d397;
        }
    }, _0x5188d0[_0x453184(0x14f)] = function (_0x262419) {
        var _0x362d0e = _0x453184, _0x2cfd63;
        try {
            _0x262419 != null && _0x262419[_0x362d0e(0x162)]('\x7c\x66') && _0x262419[_0x362d0e(0x162)]('\x63') && ('\x67\x55\x68\x56\x49' !== _0x362d0e(0x13f) ? _0x262419 = _0x262419['\x72\x65\x70\x6c\x61\x63\x65'](/\b([a-zA-Z0-9_]+)\b\|f(\d+)c(\d+)\|/gm, _0x362d0e(0x14a)) : _0x90c30 = _0x2ece85[_0x362d0e(0x14c)](/\b([a-zA-Z0-9_]+)\b\|f(\d+)c(\d+)\|/gm, _0x362d0e(0x14a)));
        } catch (_0x401824) {
            _0x2cfd63 = _0x401824, console['\x77\x61\x72\x6e'](_0x2cfd63);
        }
        return _0x262419;
    }, _0x5188d0[_0x453184(0x141)] = function (_0x5df370) {
        var _0x3b0dbb = _0x453184;
        if ('\x47\x69\x75\x4a\x4d' !== _0x3b0dbb(0x15c)) {
            var _0x2565b2;
            try {
                if (_0x5df370 != null && _0x5df370[_0x3b0dbb(0x162)]('\x7c\x66')) {
                    if ('\x78\x47\x73\x51\x46' === _0x3b0dbb(0x163)) {
                        var _0x199cd9;
                        try {
                            _0x3921ac != null && _0x494457[_0x3b0dbb(0x162)]('\x7c\x66') && _0x49bf84['\x69\x6e\x63\x6c\x75\x64\x65\x73']('\x63') && (_0x49ee13 = _0x42ef67[_0x3b0dbb(0x14c)](/\b([a-zA-Z0-9_]+)\b\|f(\d+)c(\d+)\|/gm, _0x3b0dbb(0x14a)));
                        } catch (_0x431b53) {
                            _0x199cd9 = _0x431b53, _0x56c55f[_0x3b0dbb(0x157)](_0x199cd9);
                        }
                        return _0x310bb9;
                    } else
                        _0x5df370 = _0x5df370[_0x3b0dbb(0x14c)](/\b([a-zA-Z0-9_]+)\b\|f(\d+)\|/gm, '\x5c\x46\x46\x5b\x24\x32\x5d\x24\x31\x5c\x46\x46\x5b\x30\x5d');
                }
            } catch (_0x54c1ed) {
                _0x2565b2 = _0x54c1ed, console[_0x3b0dbb(0x157)](_0x2565b2);
            }
            return _0x5df370;
        } else {
            if (_0xc3042e == null)
                return;
            if (_0x2777c9 === '')
                return;
            return _0x3c0657 = this[_0x3b0dbb(0x140)](_0x54eef8), _0x3d5893[_0x3b0dbb(0x13d)](_0xdfb58e, _0x3676f8);
        }
    }, _0x5188d0[_0x453184(0x137)] = function (_0x13f1f9) {
        var _0x123d1f = _0x453184, _0x4a5a6b;
        try {
            _0x13f1f9 != null && _0x13f1f9[_0x123d1f(0x162)]('\x7c\x63') && (_0x13f1f9 = _0x13f1f9[_0x123d1f(0x14c)](/\b([a-zA-Z0-9_]+)\b\|c(\d+)\|/gm, _0x123d1f(0x146)));
        } catch (_0x94a92) {
            _0x4a5a6b = _0x94a92, console[_0x123d1f(0x157)](_0x4a5a6b);
        }
        return _0x13f1f9;
    }, _0x5188d0['\x67\x65\x74\x50\x72\x6f\x70\x65\x72\x43\x6f\x6c\x6f\x72\x42\x79\x49\x6e\x64\x65\x78'] = function (_0x36531e) {
        var _0x25e898 = _0x453184, _0x5a128b, _0x149e8f, _0x5a9db2, _0x13b028, _0x368da6;
        try {
            _0x368da6 = PKD_FTSM['\x50\x50'][_0x25e898(0x164)](_0x36531e);
            if (_0x368da6 != null && _0x368da6 !== '')
                return _0x368da6;
            else {
                if (this[_0x25e898(0x14d)]())
                    return _0x25e898(0x159) === _0x25e898(0x149) ? (_0x1cf34a = _0x4990b8[_0x25e898(0x138)]('\x57\x69\x6e\x64\x6f\x77'), _0x2a913c = 0x60 + _0x2e8a1e % 0x8 * 0xc + 0x6, _0x2f8d1e = 0x90 + _0x304378[_0x25e898(0x147)](_0xcfba53 / 0x8) * 0xc + 0x6, _0x4e3fd2[_0x25e898(0x152)](_0x1a72c0, _0x335c4)) : (_0x13b028 = ImageManager[_0x25e898(0x138)](_0x25e898(0x14e)), _0x149e8f = 0x60 + _0x36531e % 0x8 * 0xc + 0x6, _0x5a9db2 = 0x90 + Math['\x66\x6c\x6f\x6f\x72'](_0x36531e / 0x8) * 0xc + 0x6, _0x13b028[_0x25e898(0x152)](_0x149e8f, _0x5a9db2));
                else {
                    if (_0x25e898(0x15e) !== _0x25e898(0x15e))
                        _0xdd52af = this['\x63\x6f\x6e\x76\x65\x72\x74\x47\x6c\x6f\x62\x61\x6c\x43\x6f\x6c\x6f\x72\x73'](_0x49c254);
                    else
                        return ColorManager[_0x25e898(0x15f)](_0x36531e);
                }
            }
        } catch (_0x2a2c11) {
            _0x25e898(0x167) !== _0x25e898(0x13c) ? (_0x5a128b = _0x2a2c11, console['\x77\x61\x72\x6e'](_0x5a128b)) : _0x3805e0 != null && _0x56de47[_0x25e898(0x162)]('\x7c\x66') && (_0x2c227d = _0x367939['\x72\x65\x70\x6c\x61\x63\x65'](/\b([a-zA-Z0-9_]+)\b\|f(\d+)\|/gm, _0x25e898(0x142)));
        }
        return null;
    };
}()));

(function (_0x4a3ac0, _0x434421) {
    var _0x56659b = _0xb445, _0x518728 = _0x4a3ac0();
    while (!![]) {
        try {
            var _0x3d3573 = parseInt(_0x56659b(0xc1)) / 0x1 * (parseInt(_0x56659b(0xc4)) / 0x2) + -parseInt(_0x56659b(0xaf)) / 0x3 * (-parseInt(_0x56659b(0xbf)) / 0x4) + parseInt(_0x56659b(0xc0)) / 0x5 * (-parseInt(_0x56659b(0xb4)) / 0x6) + parseInt(_0x56659b(0xbd)) / 0x7 + parseInt(_0x56659b(0xae)) / 0x8 * (parseInt(_0x56659b(0xb3)) / 0x9) + parseInt(_0x56659b(0xab)) / 0xa * (-parseInt(_0x56659b(0xba)) / 0xb) + parseInt(_0x56659b(0xb2)) / 0xc;
            if (_0x3d3573 === _0x434421)
                break;
            else
                _0x518728['push'](_0x518728['shift']());
        } catch (_0x540051) {
            _0x518728['push'](_0x518728['shift']());
        }
    }
}(_0x42c0, 0xa823b), (function () {
    var _0x3fe4be = _0xb445, _0x3d06e5;
    _0x3d06e5 = PKD_FTSM['\x50\x50'], _0x3d06e5[_0x3fe4be(0xb0)] = function () {
        var _0x1b5409 = _0x3fe4be, _0x32c1bd;
        return _0x32c1bd = this[_0x1b5409(0xb7)][_0x1b5409(0xc2)](_0x1b5409(0xb0), []), _0x32c1bd[_0x1b5409(0xbb)](0x0, 0x5);
    }, _0x3d06e5[_0x3fe4be(0xb9)] = function () {
        var _0x51bf9d = _0x3fe4be;
        if (_0x51bf9d(0xb6) === _0x51bf9d(0xb6)) {
            var _0x97148c;
            return _0x97148c = this[_0x51bf9d(0xb7)]['\x67\x65\x74\x50\x61\x72\x61\x6d'](_0x51bf9d(0xad), []), _0x97148c[_0x51bf9d(0xbb)](0x0, 0x1);
        } else {
            var _0x46548e;
            return _0x46548e = this[_0x51bf9d(0xb7)][_0x51bf9d(0xc2)](_0x51bf9d(0xb0), []), _0x46548e[_0x51bf9d(0xbb)](0x0, 0x5);
        }
    }, _0x3d06e5[_0x3fe4be(0xb5)] = function () {
        var _0x53065f = _0x3fe4be;
        if (_0x53065f(0xbc) !== _0x53065f(0xac)) {
            var _0x2f7774, _0x495396, _0x921490, _0x17a647;
            try {
                _0x495396 = $gameSystem[_0x53065f(0xc3)];
                if (_0x495396 > 0x0) {
                    _0x17a647 = this['\x63\x6f\x6c\x6f\x72\x50\x61\x6c\x6c\x65\x74\x65\x73'](), _0x921490 = _0x17a647[0x0];
                    if (_0x921490 != null)
                        return _0x921490[_0x53065f(0xb1)];
                }
            } catch (_0x3244ec) {
                _0x2f7774 = _0x3244ec, console[_0x53065f(0xb8)](_0x2f7774);
            }
            return this[_0x53065f(0xbe)]();
        } else {
            _0x3a36ae = _0xe22627[_0x53065f(0xc3)];
            if (_0x1d8c8c > 0x0) {
                _0x248117 = this['\x63\x6f\x6c\x6f\x72\x50\x61\x6c\x6c\x65\x74\x65\x73'](), _0xcbca90 = _0x147d25[0x0];
                if (_0x5aea28 != null)
                    return _0x278af3[_0x53065f(0xb1)];
            }
        }
    };
}()));
function _0xb445(_0x271742, _0x3db6d6) {
    var _0x42c052 = _0x42c0();
    return _0xb445 = function (_0xb445c1, _0x182d87) {
        _0xb445c1 = _0xb445c1 - 0xab;
        var _0x356c3b = _0x42c052[_0xb445c1];
        return _0x356c3b;
    }, _0xb445(_0x271742, _0x3db6d6);
}
function _0x42c0() {
    var _0x1ac18c = [
        '\x67\x65\x74\x50\x72\x6f\x70\x65\x72\x43\x6f\x6c\x6f\x72\x50\x61\x6c\x6c\x65\x74\x65',
        '\x45\x7a\x75\x74\x6d',
        '\x5f\x6c\x6f\x61\x64\x65\x72',
        '\x77\x61\x72\x6e',
        '\x63\x6f\x6c\x6f\x72\x50\x61\x6c\x6c\x65\x74\x65\x73',
        '\x31\x38\x37\x73\x6f\x50\x67\x73\x46',
        '\x73\x6c\x69\x63\x65',
        '\x58\x6a\x70\x4b\x65',
        '\x31\x32\x30\x32\x31\x31\x4b\x6a\x69\x6c\x4c\x4f',
        '\x63\x6f\x6c\x6f\x72\x50\x61\x6c\x6c\x65\x74\x65',
        '\x35\x34\x36\x35\x39\x37\x32\x72\x47\x70\x77\x6d\x41',
        '\x36\x33\x35\x33\x31\x39\x35\x46\x76\x66\x66\x70\x7a',
        '\x34\x37\x50\x6d\x4f\x74\x61\x42',
        '\x67\x65\x74\x50\x61\x72\x61\x6d',
        '\x70\x43\x6f\x6c\x6f\x72\x50\x61\x6c\x6c\x65\x74\x65\x49\x6e\x64\x65\x78',
        '\x33\x36\x36\x63\x6d\x76\x53\x70\x72',
        '\x32\x31\x37\x34\x37\x30\x49\x52\x73\x73\x59\x47',
        '\x50\x59\x56\x47\x63',
        '\x75\x73\x65\x72\x50\x61\x6c\x6c\x65\x74\x65\x73',
        '\x31\x36\x71\x6e\x44\x74\x53\x73',
        '\x33\x6d\x52\x48\x70\x68\x69',
        '\x66\x6f\x6e\x74\x73\x54\x6f\x4c\x6f\x61\x64',
        '\x70\x61\x6c\x6c\x65\x74\x65',
        '\x31\x36\x39\x32\x39\x38\x34\x6c\x48\x78\x43\x61\x61',
        '\x33\x35\x38\x30\x35\x39\x36\x7a\x4b\x41\x45\x61\x79',
        '\x36\x44\x42\x6c\x59\x42\x57'
    ];
    _0x42c0 = function () {
        return _0x1ac18c;
    };
    return _0x42c0();
}

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_System.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_System.prototype;
  _.switchColorPallete = function(index) {
    if (index <= 0) {
      this.pColorPalleteIndex = null;
    } else {
      this.pColorPalleteIndex = index;
    }
  };
})();

// ■ END Game_System.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Boot.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__start, _;
  //@[DEFINES]
  _ = Scene_Boot.prototype;
  //@[ALIAS]
  ALIAS__start = _.start;
  _.start = function() {
    var e;
    ALIAS__start.call(this, ...arguments);
    PKD_FTSM.LoadPluginSettings();
    if (PKD_FTSM.PP.isAutoLoad()) {
      try {
        FontLoader_NWJS.init();
        FontLoader_NWJS.loadAll();
      } catch (error) {
        e = error;
        console.warn(e);
      }
    }
    PKD_FTSM.LoadAllFonts();
  };
})();

// ■ END Scene_Boot.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__convertEscapeCharacters, ALIAS__drawItemName, ALIAS__drawTextEx, ALIAS__processColorChange, ALIAS__processEscapeCharacter, ALIAS__textColor, _;
  //@[DEFINES]
  _ = Window_Base.prototype;
  //@[ALIAS]
  ALIAS__drawTextEx = _.drawTextEx;
  _.drawTextEx = function(text, x, y) {
    var w;
    PKD_FTSM.legacy = true;
    if (text != null) {
      text = PKD_FTSM.Utils.convertGlobalAll(text);
    }
    w = ALIAS__drawTextEx.call(this, text, x, y);
    PKD_FTSM.legacy = null;
    return w;
  };
  //@[ALIAS]
  ALIAS__convertEscapeCharacters = _.convertEscapeCharacters;
  _.convertEscapeCharacters = function(text) {
    if (text != null) {
      text = PKD_FTSM.Utils.convertGlobalAll(text);
    }
    return ALIAS__convertEscapeCharacters.call(this, text);
  };
  //@[ALIAS]
  ALIAS__processEscapeCharacter = _.processEscapeCharacter;
  _.processEscapeCharacter = function(code, textState) {
    if (code === 'FF') {
      this.pApplyFontSettings(this.pObtainEscapeParamPlus(textState));
    }
    return ALIAS__processEscapeCharacter.call(this, ...arguments);
  };
  
  //@[ALIAS]
  ALIAS__drawItemName = _.drawItemName;
  _.drawItemName = function(item, x, y, width) {
    var __prevFont, e, fontName;
    try {
      fontName = this.pGetFontForItem(item);
      if (fontName !== null) {
        if (isFinite(fontName)) {
          fontName = PKD_FTSM.PP.getFontNameByIndex(parseInt(fontName));
        }
        __prevFont = this.contents.fontFace;
        this.pApplyFontByName(fontName);
      }
    } catch (error) {
      e = error;
      console.warn(e);
    }
    ALIAS__drawItemName.call(this, ...arguments);
    if (fontName != null) {
      this.contents.fontFace = __prevFont;
    }
  };
  //?MZ only
  //@[ALIAS]
  ALIAS__processColorChange = _.processColorChange;
  _.processColorChange = function(colorIndex) {
    var userColor;
    userColor = PKD_FTSM.PP.getUserColorIndex(colorIndex);
    if (userColor != null) {
      this.changeTextColor(userColor);
    } else {
      ALIAS__processColorChange.call(this, colorIndex);
    }
  };
  //?MV only
  //@[ALIAS]
  ALIAS__textColor = _.textColor;
  _.textColor = function(colorIndex) {
    var userColor;
    if (colorIndex > 0) {
      userColor = PKD_FTSM.PP.getUserColorIndex(colorIndex);
      if (userColor != null) {
        return userColor;
      }
    }
    return ALIAS__textColor.call(this, ...arguments);
  };
})();

// ■ END Window_Base.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_Base.prototype;
  _.pApplyFontSettings = function(fontSymbol) {
    var e, font;
    try {
      if (isFinite(fontSymbol)) {
        font = PKD_FTSM.PP.getFontNameByIndex(Number(fontSymbol));
      } else {
        font = fontSymbol;
      }
      this.pApplyFontByName(font);
    } catch (error) {
      e = error;
      console.warn(e);
      this.contents.fontFace = this.pDefaultFontFace();
    }
  };
  _.pApplyFontByName = function(font) {
    var e;
    try {
      if (!((font != null) || font === "")) {
        this.contents.fontFace = this.pDefaultFontFace();
      } else {
        this.contents.fontFace = font;
      }
    } catch (error) {
      e = error;
      console.warn(e);
      this.contents.fontFace = this.pDefaultFontFace();
    }
  };
  _.pDefaultFontFace = function() {
    if (PKD_FTSM.Utils.isMV()) {
      return this.standardFontFace();
    } else {
      return $gameSystem.mainFontFace();
    }
  };
  _.pGetFontForItem = function(item) {
    var e;
    if (item == null) {
      return null;
    }
    try {
      if ((item.meta != null) && (item.meta.FF != null)) {
        return item.meta.FF;
      } else {
        if (DataManager.isItem(item)) {
          return PKD_FTSM.PP.allItemsFont();
        } else if (DataManager.isArmor(item)) {
          return PKD_FTSM.PP.allArmorsFont();
        } else if (DataManager.isWeapon(item)) {
          return PKD_FTSM.PP.allWeaponsFont();
        } else if (DataManager.isSkill(item)) {
          return PKD_FTSM.PP.allSkillsFont();
        }
      }
    } catch (error) {
      e = error;
      console.warn(e);
    }
    return null;
  };
  _.pObtainEscapeParamPlus = function(textState) {
    var e, param;
    try {
      param = this.obtainEscapeParam(textState);
      if (param !== '') {
        return param;
      } else {
        return this.pObtainEscapeParamText(textState);
      }
    } catch (error) {
      e = error;
      console.warn(e);
    }
    return '';
  };
  _.pObtainEscapeParamText = function(textState) {
    var arr, e, regExp;
    try {
      regExp = /^\[([a-zA-Z0-9_]+)\]/;
      arr = regExp.exec(textState.text.slice(textState.index));
      if (arr != null) {
        textState.index += arr[0].length;
        return arr[1];
      } else {
        return '';
      }
    } catch (error) {
      e = error;
      console.warn(e);
    }
    return '';
  };
})();

// ■ END Window_Base.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_StatusBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__drawActorClass, ALIAS__drawActorLevel, ALIAS__drawActorName, ALIAS__drawActorNickname, _;
  //@[DEFINES]
  if (PKD_FTSM.Utils.isMV()) {
    _ = Window_Base.prototype;
  } else {
    _ = Window_StatusBase.prototype;
  }
  //@[ALIAS]
  ALIAS__drawActorName = _.drawActorName;
  _.drawActorName = function(actor, x, y, width) {
    var __prevFont, fontName;
    fontName = this.pGetFontForActorState(actor, 'name');
    if (fontName !== null) {
      __prevFont = this.contents.fontFace;
      this.pApplyFontByName(fontName);
    }
    ALIAS__drawActorName.call(this, ...arguments);
    if (fontName != null) {
      this.contents.fontFace = __prevFont;
    }
  };
  
  //@[ALIAS]
  ALIAS__drawActorClass = _.drawActorClass;
  _.drawActorClass = function(actor, x, y, width) {
    var __prevFont, fontName;
    fontName = this.pGetFontForActorState(actor, 'class');
    if (fontName !== null) {
      __prevFont = this.contents.fontFace;
      this.pApplyFontByName(fontName);
    }
    ALIAS__drawActorClass.call(this, ...arguments);
    if (fontName != null) {
      this.contents.fontFace = __prevFont;
    }
  };
  
  //@[ALIAS]
  ALIAS__drawActorNickname = _.drawActorNickname;
  _.drawActorNickname = function(actor, x, y, width) {
    var __prevFont, fontName;
    fontName = this.pGetFontForActorState(actor, 'nickname');
    if (fontName !== null) {
      __prevFont = this.contents.fontFace;
      this.pApplyFontByName(fontName);
    }
    ALIAS__drawActorNickname.call(this, ...arguments);
    if (fontName != null) {
      this.contents.fontFace = __prevFont;
    }
  };
  
  //@[ALIAS]
  ALIAS__drawActorLevel = _.drawActorLevel;
  _.drawActorLevel = function(actor, x, y) {
    var __prevFont, fontName;
    fontName = this.pGetFontForActorState(actor, 'level');
    if (fontName !== null) {
      __prevFont = this.contents.fontFace;
      this.pApplyFontByName(fontName);
    }
    ALIAS__drawActorLevel.call(this, ...arguments);
    if (fontName != null) {
      this.contents.fontFace = __prevFont;
    }
  };
})();

// ■ END Window_StatusBase.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_StatusBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  if (PKD_FTSM.Utils.isMV()) {
    _ = Window_Base.prototype;
  } else {
    _ = Window_StatusBase.prototype;
  }
  _.pGetFontForActorState = function(actor, state) {
    var e, fontName, fontSymbol;
    try {
      fontSymbol = this.pGetFontSymbolForActorState(actor, state);
      if (fontSymbol != null) {
        if (isFinite(fontSymbol)) {
          fontName = PKD_FTSM.PP.getFontNameByIndex(parseInt(fontSymbol));
        } else {
          fontName = fontSymbol;
        }
        return fontName;
      }
    } catch (error) {
      e = error;
      console.warn(e);
    }
    return null;
  };
  _.pGetFontSymbolForActorState = function(actor, state) {
    var e;
    if (actor == null) {
      return null;
    }
    try {
      if (state === 'name' && (actor.actor().meta != null) && (actor.actor().meta.FF != null)) {
        return actor.actor().meta.FF;
      } else {
        switch (state) {
          case 'name':
            return PKD_FTSM.PP.allActorNamesFont();
          case 'class':
            return PKD_FTSM.PP.allActorClassFont();
          case 'nickname':
            return PKD_FTSM.PP.allActorNickFont();
          case 'level':
            return PKD_FTSM.PP.allActorLevelFont();
        }
      }
    } catch (error) {
      e = error;
      console.warn(e);
    }
    return null;
  };
})();

// ■ END Window_StatusBase.coffee
//---------------------------------------------------------------------------

//Plugin PKD_FontsManager builded by PKD PluginBuilder 2.2 - 22.11.2023