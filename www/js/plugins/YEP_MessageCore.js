
//=============================================================================
// Yanfly Engine Plugins - Message Core
// YEP_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_MessageCore = true;

var Yanfly = Yanfly || {};
Yanfly.Message = Yanfly.Message || {};
Yanfly.Message.version = 1.19;

//=============================================================================
 /*:
 * @plugindesc v1.19 Adds more features to the Message Window to customized
 * the way your messages appear and functions.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Default Rows
 * @parent ---General---
 * @type number
 * @min 0
 * @desc This is default amount of rows the message box will have.
 * Default: 4
 * @default 4
 *
 * @param Default Width
 * @parent ---General---
 * @desc This is default width for the message box in pixels.
 * Default: Graphics.boxWidth
 * @default Graphics.boxWidth
 *
 * @param Face Indent
 * @parent ---General---
 * @desc If using a face graphic, this is how much text indents by.
 * Default: Window_Base._faceWidth + 24
 * @default Window_Base._faceWidth + 24
 *
 * @param Fast Forward Key
 * @parent ---General---
 * @desc This is the key used for fast forwarding.
 * @default pagedown
 *
 * @param Enable Fast Forward
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Enable fast forward button for your messages by default?
 * NO - false     YES - true
 * @default true
 *
 * @param Word Wrapping
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Use this to enable or disable word wrapping by default.
 * OFF - false     ON - true
 * @default false
 *
 * @param Description Wrap
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Enable or disable word wrapping for descriptions.
 * OFF - false     ON - true
 * @default false
 *
 * @param Word Wrap Space
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Insert a space with manual line breaks?
 * NO - false     YES - true
 * @default false
 *
 * @param Tight Wrap
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc If true and using a face for the message, the message will
 * wrap tighter. NO - false     YES - true
 * @default false
 *
 * @param ---Font---
 * @default
 *
 * @param Font Name
 * @parent ---Font---
 * @desc This is the default font used for the Message Window.
 * Default: GameFont
 * @default GameFont
 *
 * @param Font Name CH
 * @parent ---Font---
 * @desc This is the default font used for the Message Window for Chinese.
 * Default: SimHei, Heiti TC, sans-serif
 * @default SimHei, Heiti TC, sans-serif
 *
 * @param Font Name KR
 * @parent ---Font---
 * @desc This is the default font used for the Message Window for Korean.
 * Default: Dotum, AppleGothic, sans-serif
 * @default Dotum, AppleGothic, sans-serif
 *
 * @param Font Size
 * @parent ---Font---
 * @type number
 * @min 1
 * @desc This is the default font size used for the Message Window.
 * Default: 28
 * @default 28
 *
 * @param Font Size Change
 * @parent ---Font---
 * @type number
 * @min 1
 * @desc Whenever \{ and \} are used, they adjust by this value.
 * Default: 12
 * @default 12
 *
 * @param Font Changed Max
 * @parent ---Font---
 * @type number
 * @min 1
 * @desc This is the maximum size achieved by \{.
 * Default: 96
 * @default 96
 *
 * @param Font Changed Min
 * @parent ---Font---
 * @type number
 * @min 1
 * @desc This is the minimum size achieved by \{.
 * Default: 12
 * @default 12
 *
 * @param Font Outline
 * @parent ---Font---
 * @type number
 * @min 0
 * @desc This is the default font outline width for messages.
 * Default: 4
 * @default 4
 *
 * @param Maintain Font
 * @parent ---Font---
 * @type boolean
 * @on YES
 * @off NO
 * @desc When changing the font name or size, maintain for following
 * messages. NO - false     YES - true
 * @default false
 *
 * @param ---Name Box---
 * @default
 *
 * @param Name Box Buffer X
 * @parent ---Name Box---
 * @type number
 * @desc This is the buffer for the x location of the Name Box.
 * @default -28
 *
 * @param Name Box Buffer Y
 * @parent ---Name Box---
 * @type number
 * @desc This is the buffer for the y location of the Name Box.
 * @default 0
 *
 * @param Name Box Padding
 * @parent ---Name Box---
 * @desc This is the value for the padding of the Name Box.
 * @default this.standardPadding() * 4
 *
 * @param Name Box Color
 * @parent ---Name Box---
 * @type number
 * @min 0
 * @max 31
 * @desc This is the text color used for the Name Box.
 * @default 0
 *
 * @param Name Box Clear
 * @parent ---Name Box---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Do you wish for the Name Box window to be clear?
 * NO - false     YES - true
 * @default false
 *
 * @param Name Box Added Text
 * @parent ---Name Box---
 * @desc This text is always added whenever the name box is used.
 * This can be used to automatically set up colors.
 * @default \c[6]
 *
 * @param Name Box Auto Close
 * @parent ---Name Box---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Close the message window each time the namebox displays a
 * different name? YES - true     NO - false
 * @default false
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * While RPG Maker MV Ace certainly improved the message system a whole lot, it
 * wouldn't hurt to add in a few more features, such as name windows,
 * converting textcodes to write out the icons and/or names of items, weapons,
 * armours, and* more in quicker fashion. This script also gives the developer
 * the ability to adjust the size of the message window during the game, give
 * it a separate font, and to give the player a text fast-forward feature.
 *
 * ============================================================================
 * Word Wrapping
 * ============================================================================
 *
 * Word wrapping is now possible through the message system. You can enable and
 * disable Word wrap using Plugin Commands. While using word wrap, if the word
 * is to extend past the message window's area, it will automatically go to the
 * following line. That said, word wrap will disable the editor's line breaks
 * and will require you to use the ones provided by the plugin:
 *
 * <br> or <line break> is text code to apply a line break. Use this before or
 * after a part in which you wish to start a new line.
 *
 * Keep in mind word wrapping is mostly for message windows. However, in other
 * places that you'd like to see word wrapping, such as item descriptions,
 * insert <WordWrap> at the beginning of the text to enable it.
 *
 * ============================================================================
 * Text Codes
 * ============================================================================
 *
 * By using certain text codes in your messages, you can have the game replace
 * them with the following:
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * Text Code   Function
 *   \V[n]       Replaced by the value of the nth variable.
 *   \N[n]       Replaced by the name of the nth actor.
 *   \P[n]       Replaced by the name of the nth party member.
 *   \G          Replaced by the currency unit.
 *   \C[n]       Draw the subsequent text in the nth color.
 *   \I[n]       Draw the nth icon.
 *   \{          Increases the text size by one step.
 *   \}          Decreases the text size by one step.
 *   \\          Replaced with the backslash character.
 *   \$          Opens the gold window.
 *   \.          Waits 1/4th seconds.
 *   \|          Waits 1 second.
 *   \!          Waits for button input.
 *   \>          Display remaining text on same line all at once.
 *   \<          Cancel the effect that displays text all at once.
 *   \^          Do not wait for input after displaying text.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Wait:       Effect:
 *    \w[x]     - Waits x frames (60 frames = 1 second). Message window only.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  NameWindow: Effect:
 *    \n<x>     - Creates a name box with x string. Left side. *Note
 *    \nc<x>    - Creates a name box with x string. Centered. *Note
 *    \nr<x>    - Creates a name box with x string. Right side. *Note
 *
 *              *Note: Works for message window only.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Line Break  Effect:
 *    <br>      - If using word wrap mode, this will cause a line break.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Position:   Effect:
 *    \px[x]    - Sets x position of text to x.
 *    \py[x]    - Sets y position of text to y.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Outline:    Effect:
 *   \oc[x]    - Sets outline colour to x.
 *   \ow[x]    - Sets outline width to x.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Font:       Effect:
 *    \fr       - Resets all font changes.
 *    \fs[x]    - Changes font size to x.
 *    \fn<x>    - Changes font name to x.
 *    \fb       - Toggles font boldness.
 *    \fi       - Toggles font italic.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Actor:      Effect:
 *    \af[x]    - Shows face of actor x. *Note
 *    \ac[x]    - Writes out actor's class name.
 *    \an[x]    - Writes out actor's nickname.
 *
 *              *Note: Works for message window only.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Party:      Effect:
 *    \pf[x]    - Shows face of party member x. *Note
 *    \pc[x]    - Writes out party member x's class name.
 *    \pn[x]    - Writes out party member x's nickname.
 *
 *              *Note: Works for message window only.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Names:      Effect:
 *    \nc[x]    - Writes out class x's name.
 *    \ni[x]    - Writes out item x's name.
 *    \nw[x]    - Writes out weapon x's name.
 *    \na[x]    - Writes out armour x's name.
 *    \ns[x]    - Writes out skill x's name.
 *    \nt[x]    - Writes out state x's name.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Icon Names: Effect:
 *    \ii[x]    - Writes out item x's name including icon.
 *    \iw[x]    - Writes out weapon x's name including icon.
 *    \ia[x]    - Writes out armour x's name including icon.
 *    \is[x]    - Writes out skill x's name including icon.
 *    \it[x]    - Writes out state x's name including icon.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * And those are the text codes added with this script. Keep in mind that some
 * of these text codes only work for the Message Window. Otherwise, they'll
 * work for help descriptions, actor biographies, and others.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are some plugin commands you can use through the Event Editor
 * to change various aspects about the Message system.
 *
 * Plugin Comand
 *   MessageRows 6
 *   - Changes the Message Rows displayed to 6. If you are using continuous
 *   Show Text events, this will continue displaying the following lines's
 *   texts until it hits the row limit. Anything after that is cut off until
 *   the next message starts to avoid accidental overlap.
 *
 *   MessageWidth 400
 *   - Changes the Message Window Width to 400 pixels. This will cut off any
 *   words that are shown too far to the right so adjust accordingly!
 *
 *   EnableWordWrap
 *   - Enables wordwrapping. If a word extends past the window size, it will
 *   automatically move onto the next line. Keep in mind, you will need to use
 *   \br to perform line breaks.
 *
 *   DisableWordWrap
 *   - This disables wordwrapping. Line breaks will be automatic at points
 *   where a new line is started in the editor.
 *
 *   EnableFastForward
 *   - Enables Fast Forward key from working with messages.
 *
 *   DisableFastForward
 *   - Disables Fast Forward key from working with messages.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.19:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.18:
 * - Added new plugin parameters: 'Font Name CH' and 'Font Name KR'.
 *
 * Version 1.17:
 * - Compatibility update with Message Macros for 'Name Box Auto Close' option.
 *
 * Version 1.16:
 * - Added 'Tight Wrap' plugin parameter as a word wrap option to make the
 * word wrap tighter when using faces.
 *
 * Version 1.15:
 * - Added a failsafe where if the name box window would be off the screen, it
 * will automatically reposition itself to under the main message window.
 *
 * Version 1.14:
 * - Added 'Name Box Close' plugin parameter. If this is enabled, the message
 * window will check for the Name Window speaker each time a follow up message
 * occurs. If the name in the currently Name Window matches the name in the
 * following Name Window, the message window will remain open. If it doesn't,
 * the Name Window will close and reopen to indicate a new speaker.
 *
 * Version 1.13:
 * - Added 'Maintain Font' plugin parameter under the Font category. This will
 * allow you to use text codes \fn<x> and \fs[x] to permanently change the font
 * of your messages until you use it again. \fr will reset them to the plugin's
 * default parameter settings.
 *
 * Version 1.12:
 * - 'Word Wrap Space' parameter no longer leaves a space at the beginning of
 * each message.
 *
 * Version 1.11:
 * - Added 'Font Outline' parameter for the plugin parameters. This adjusts the
 * font outline width used by default for only message fonts.
 *
 * Version 1.10:
 * - Updated the Message Row system for Extended Message Pack 1's Autosizing
 * feature to work with extended heights.
 *
 * Version 1.09:
 * - Replaced 'Fast Forward' parameter with the 'Fast Forward Key' parameter
 * and 'Enable Fast Forward' parameter. Two new Plugin Commands are added. They
 * are 'EnableFastForward' and 'DisableFastForward' for control over when fast
 * forwarding is allowed as to not cause timed cutscenes to desynch.
 *
 * Version 1.08:
 * - Fixed a bug regarding Input Number positioning when the Message Window's
 * position was middle.
 *
 * Version 1.07:
 * - Added 'Word Wrap Space' for word wrap users. This parameter will leave a
 * space behind for those who want a space left behind.
 *
 * Version 1.06:
 * - Fixed a bug that would cause masking problems with mobile devices.
 *
 * Version 1.05:
 * - Fixed a bug that would cause the namebox window to appear distorted.
 *
 * Version 1.04:
 * - Fixed a bug that captured too many text codes with the namebox window.
 * - Timed Name Window's closing speed with main window's closing speed.
 *
 * Verison 1.03:
 * - Fixed a bug with textcodes that messed up wordwrapping.
 * - Fixed a bug with font reset, italic, and bold textcodes.
 *
 * Version 1.02:
 * - Namebox Window's overlap feature that's in every MV window is now disabled
 * to allow for overlapping with main message window.
 * - Updated window positioning for Branch Choices, Number Input, and Item
 * Selection windows.
 *
 * Version 1.01:
 * - Added 'Description Wrap' into the parameters to allow for all item
 * descriptions to be automatically processed with word wrapping.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_MessageCore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.MSGDefaultRows = String(Yanfly.Parameters['Default Rows']);
Yanfly.Param.MSGDefaultWidth = String(Yanfly.Parameters['Default Width']);
Yanfly.Param.MSGFaceIndent = String(Yanfly.Parameters['Face Indent']);
Yanfly.Param.MSGFastForwardKey = String(Yanfly.Parameters['Fast Forward Key']);
Yanfly.Param.MSGFFOn = eval(String(Yanfly.Parameters['Enable Fast Forward']));
Yanfly.Param.MSGWordWrap = String(Yanfly.Parameters['Word Wrapping']);
Yanfly.Param.MSGWordWrap = eval(Yanfly.Param.MSGWordWrap);
Yanfly.Param.MSGDescWrap = String(Yanfly.Parameters['Description Wrap']);
Yanfly.Param.MSGWrapSpace = eval(String(Yanfly.Parameters['Word Wrap Space']));
Yanfly.Param.MSGTightWrap = eval(String(Yanfly.Parameters['Tight Wrap']));

Yanfly.Param.MSGFontName = String(Yanfly.Parameters['Font Name']);
Yanfly.Param.MSGCNFontName = String(Yanfly.Parameters['Font Name CH']);
Yanfly.Param.MSGKRFontName = String(Yanfly.Parameters['Font Name KR']);
Yanfly.Param.MSGFontSize = Number(Yanfly.Parameters['Font Size']);
Yanfly.Param.MSGFontSizeChange = String(Yanfly.Parameters['Font Size Change']);
Yanfly.Param.MSGFontChangeMax = String(Yanfly.Parameters['Font Changed Max']);
Yanfly.Param.MSGFontChangeMin = String(Yanfly.Parameters['Font Changed Min']);
Yanfly.Param.MSGFontOutline = Number(Yanfly.Parameters['Font Outline']) || 4;
Yanfly.Param.MSGFontMaintain = eval(String(Yanfly.Parameters['Maintain Font']));

Yanfly.Param.MSGNameBoxBufferX = String(Yanfly.Parameters['Name Box Buffer X']);
Yanfly.Param.MSGNameBoxBufferY = String(Yanfly.Parameters['Name Box Buffer Y']);
Yanfly.Param.MSGNameBoxPadding = String(Yanfly.Parameters['Name Box Padding']);
Yanfly.Param.MSGNameBoxColor = Number(Yanfly.Parameters['Name Box Color']);
Yanfly.Param.MSGNameBoxClear = String(Yanfly.Parameters['Name Box Clear']);
Yanfly.Param.MSGNameBoxText = String(Yanfly.Parameters['Name Box Added Text']);
Yanfly.Param.MSGNameBoxClose = String(Yanfly.Parameters['Name Box Auto Close']);
Yanfly.Param.MSGNameBoxClose = eval(Yanfly.Param.MSGNameBoxClose);

//=============================================================================
// Bitmap
//=============================================================================

Yanfly.Message.Bitmap_initialize = Bitmap.prototype.initialize;
Bitmap.prototype.initialize = function(width, height) {
    Yanfly.Message.Bitmap_initialize.call(this, width, height);
    this.fontBold = false;
};

Yanfly.Message.Bitmap_makeFontNameText = Bitmap.prototype._makeFontNameText;
Bitmap.prototype._makeFontNameText = function() {
    if (this.fontBold) return 'Bold ' + this.fontSize + 'px ' + this.fontFace;
    return Yanfly.Message.Bitmap_makeFontNameText.call(this);
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.Message.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.Message.Game_System_initialize.call(this);
    this.initMessageSystem();
    this.initMessageFontSettings();
};

Game_System.prototype.initMessageSystem = function() {
    this._wordWrap = Yanfly.Param.MSGWordWrap;
    this._fastForward = Yanfly.Param.MSGFFOn;
};

Game_System.prototype.initMessageFontSettings = function() {
    if ($dataSystem.locale.match(/^zh/)) {
      this._msgFontName = Yanfly.Param.MSGCNFontName;
    } else if ($dataSystem.locale.match(/^ko/)) {
      this._msgFontName = Yanfly.Param.MSGKRFontName;
    } else {
      this._msgFontName = Yanfly.Param.MSGFontName;
    }
    this._msgFontSize = Yanfly.Param.MSGFontSize;
    this._msgFontOutline = Yanfly.Param.MSGFontOutline;
};

Game_System.prototype.messageRows = function() {
    var rows = eval(this._messageRows) || eval(Yanfly.Param.MSGDefaultRows);
    return Math.max(1, Number(rows));
};

Game_System.prototype.messageWidth = function() {
    return eval(this._messageWidth) || eval(Yanfly.Param.MSGDefaultWidth);
};

Game_System.prototype.wordWrap = function() {
    if (this._wordWrap === undefined) this.initMessageSystem();
    return this._wordWrap;
};

Game_System.prototype.setWordWrap = function(state) {
    if (this._wordWrap === undefined) this.initMessageSystem();
    this._wordWrap = state;
};

Game_System.prototype.isFastFowardEnabled = function() {
    if (this._fastForward === undefined) this.initMessageSystem();
    return this._fastForward;
};

Game_System.prototype.setFastFoward = function(state) {
    if (this._fastForward === undefined) this.initMessageSystem();
    this._fastForward = state;
};

Game_System.prototype.getMessageFontName = function() {
    if (this._msgFontName === undefined) this.initMessageFontSettings();
    return this._msgFontName;
};

Game_System.prototype.setMessageFontName = function(value) {
    if (this._msgFontName === undefined) this.initMessageFontSettings();
    this._msgFontName = value;
};

Game_System.prototype.getMessageFontSize = function() {
    if (this._msgFontSize === undefined) this.initMessageFontSettings();
    return this._msgFontSize;
};

Game_System.prototype.setMessageFontSize = function(value) {
    if (this._msgFontSize === undefined) this.initMessageFontSettings();
    this._msgFontSize = value;
};

Game_System.prototype.getMessageFontOutline = function() {
    if (this._msgFontOutline === undefined) this.initMessageFontSettings();
    return this._msgFontOutline;
};

Game_System.prototype.setMessageFontOutline = function(value) {
    if (this._msgFontOutline === undefined) this.initMessageFontSettings();
    this._msgFontOutline = value;
};

//=============================================================================
// Game_Message
//=============================================================================

Game_Message.prototype.addText = function(text) {
    if ($gameSystem.wordWrap()) text = '<WordWrap>' + text;
    this.add(text);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Message.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.Message.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'MessageRows') $gameSystem._messageRows = args[0];
    if (command === 'MessageWidth') $gameSystem._messageWidth = args[0];
    if (command === 'EnableWordWrap') $gameSystem.setWordWrap(true);
    if (command === 'DisableWordWrap') $gameSystem.setWordWrap(false);
    if (command === 'EnableFastForward') $gameSystem.setFastFoward(true);
    if (command === 'DisableFastForward') $gameSystem.setFastFoward(false);
};

Game_Interpreter.prototype.command101 = function() {
    if (!$gameMessage.isBusy()) {
      $gameMessage.setFaceImage(this._params[0], this._params[1]);
      $gameMessage.setBackground(this._params[2]);
      $gameMessage.setPositionType(this._params[3]);
      while (this.isContinueMessageString()) {
        this._index++;
        if (this._list[this._index].code === 401) {
          $gameMessage.addText(this.currentCommand().parameters[0]);
        }
        if ($gameMessage._texts.length >= $gameSystem.messageRows()) break;
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
      this.setWaitMode('message');
    }
    return false;
};

Game_Interpreter.prototype.isContinueMessageString = function() {
    if (this.nextEventCode() === 101 && $gameSystem.messageRows() > 4) {
      return true;
    } else {
      return this.nextEventCode() === 401;
    }
};

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.Message.Window_Base_resetFontSettings =
    Window_Base.prototype.resetFontSettings;
Window_Base.prototype.resetFontSettings = function() {
    Yanfly.Message.Window_Base_resetFontSettings.call(this);
    this.contents.fontBold = false;
    this.contents.fontItalic = false;
    this.contents.outlineColor = 'rgba(22, 22, 22, 1)';
    this.contents.outlineWidth = $gameSystem.getMessageFontOutline();
};

Window_Base.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height + this.lineHeight());
};

Yanfly.Message.Window_Base_convertEscapeCharacters =
    Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
    text = this.setWordWrap(text);
    text = Yanfly.Message.Window_Base_convertEscapeCharacters.call(this, text);
    text = this.convertExtraEscapeCharacters(text);
    return text;
};

Window_Base.prototype.setWordWrap = function(text) {
    this._wordWrap = false;
    if (text.match(/<(?:WordWrap)>/i)) {
      this._wordWrap = true;
      text = text.replace(/<(?:WordWrap)>/gi, '');
    }
    if (this._wordWrap) {
      var replace = Yanfly.Param.MSGWrapSpace ? ' ' : '';
      text = text.replace(/[\n\r]+/g, replace);
    }
    if (this._wordWrap) {
      text = text.replace(/<(?:BR|line break)>/gi, '\n');
    } else {
      text = text.replace(/<(?:BR|line break)>/gi, '');
    }
    return text;
};

Window_Base.prototype.convertExtraEscapeCharacters = function(text) {
    // Font Codes
    text = text.replace(/\x1bFR/gi, '\x1bMSGCORE[0]');
    text = text.replace(/\x1bFB/gi, '\x1bMSGCORE[1]');
    text = text.replace(/\x1bFI/gi, '\x1bMSGCORE[2]');
    // \AC[n]
    text = text.replace(/\x1bAC\[(\d+)\]/gi, function() {
        return this.actorClassName(parseInt(arguments[1]));
    }.bind(this));
    // \AN[n]
    text = text.replace(/\x1bAN\[(\d+)\]/gi, function() {
        return this.actorNickname(parseInt(arguments[1]));
    }.bind(this));
    // \PC[n]
    text = text.replace(/\x1bPC\[(\d+)\]/gi, function() {
        return this.partyClassName(parseInt(arguments[1]));
    }.bind(this));
    // \PN[n]
    text = text.replace(/\x1bPN\[(\d+)\]/gi, function() {
        return this.partyNickname(parseInt(arguments[1]));
    }.bind(this));
    // \NC[n]
    text = text.replace(/\x1bNC\[(\d+)\]/gi, function() {
        return $dataClasses[parseInt(arguments[1])].name;
    }.bind(this));
    // \NI[n]
    text = text.replace(/\x1bNI\[(\d+)\]/gi, function() {
        return $dataItems[parseInt(arguments[1])].name;
    }.bind(this));
    // \NW[n]
    text = text.replace(/\x1bNW\[(\d+)\]/gi, function() {
        return $dataWeapons[parseInt(arguments[1])].name;
    }.bind(this));
    // \NA[n]
    text = text.replace(/\x1bNA\[(\d+)\]/gi, function() {
        return $dataArmors[parseInt(arguments[1])].name;
    }.bind(this));
    // \NE[n]
    text = text.replace(/\x1bNE\[(\d+)\]/gi, function() {
        return $dataEnemies[parseInt(arguments[1])].name;
    }.bind(this));
    // \NS[n]
    text = text.replace(/\x1bNS\[(\d+)\]/gi, function() {
        return $dataSkills[parseInt(arguments[1])].name;
    }.bind(this));
    // \NT[n]
    text = text.replace(/\x1bNT\[(\d+)\]/gi, function() {
        return $dataStates[parseInt(arguments[1])].name;
    }.bind(this));
    // \II[n]
    text = text.replace(/\x1bII\[(\d+)\]/gi, function() {
        return this.escapeIconItem(arguments[1], $dataItems);
    }.bind(this));
    // \IW[n]
    text = text.replace(/\x1bIW\[(\d+)\]/gi, function() {
        return this.escapeIconItem(arguments[1], $dataWeapons);
    }.bind(this));
    // \IA[n]
    text = text.replace(/\x1bIA\[(\d+)\]/gi, function() {
        return this.escapeIconItem(arguments[1], $dataArmors);
    }.bind(this));
    // \IS[n]
    text = text.replace(/\x1bIS\[(\d+)\]/gi, function() {
        return this.escapeIconItem(arguments[1], $dataSkills);
    }.bind(this));
    // \IT[n]
    text = text.replace(/\x1bIT\[(\d+)\]/gi, function() {
        return this.escapeIconItem(arguments[1], $dataStates);
    }.bind(this));
    // Finish
    return text;
};

Window_Base.prototype.actorClassName = function(n) {
    var actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.currentClass().name : '';
};

Window_Base.prototype.actorNickname = function(n) {
    var actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.nickname() : '';
};

Window_Base.prototype.partyClassName = function(n) {
    var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
    return actor ? actor.currentClass().name : '';
};

Window_Base.prototype.partyNickname = function(n) {
    var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
    return actor ? actor.nickname() : '';
};

Window_Base.prototype.escapeIconItem = function(n, database) {
    return '\x1bI[' + database[n].iconIndex + ']' + database[n].name;
};

Window_Base.prototype.obtainEscapeString = function(textState) {
    var arr = /^\<(.*?)\>/.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        return String(arr[0].slice(1, arr[0].length - 1));
    } else {
        return '';
    }
};function _0x18a190_() { return "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"; }

Yanfly.Message.Window_Base_processEscapeCharacter =
    Window_Base.prototype.processEscapeCharacter;
Window_Base.prototype.processEscapeCharacter = function(code, textState) {
  switch (code) {
  case 'MSGCORE':
    var id = this.obtainEscapeParam(textState);
    if (id === 0) {
      $gameSystem.initMessageFontSettings();
      this.resetFontSettings();
    }
    if (id === 1) this.contents.fontBold = !this.contents.fontBold;
    if (id === 2) this.contents.fontItalic = !this.contents.fontItalic;
    break;
  case 'FS':
    var size = this.obtainEscapeParam(textState);
    this.contents.fontSize = size;
    if (Yanfly.Param.MSGFontMaintain) $gameSystem.setMessageFontSize(size);
    break;
  case 'FN':
    var name = this.obtainEscapeString(textState);
    this.contents.fontFace = name;
    if (Yanfly.Param.MSGFontMaintain) $gameSystem.setMessageFontName(name);
    break;
  case 'OC':
    var id = this.obtainEscapeParam(textState);
    this.contents.outlineColor = this.textColor(id);
    break;
  case 'OW':
    this.contents.outlineWidth = this.obtainEscapeParam(textState);
    break;
  case 'PX':
    textState.x = this.obtainEscapeParam(textState);
    break;
  case 'PY':
    textState.y = this.obtainEscapeParam(textState);
    break;
  default:
    Yanfly.Message.Window_Base_processEscapeCharacter.call(this,
     code, textState);
    break;
  }
};

Window_Base.prototype.makeFontBigger = function() {
    var size = this.contents.fontSize + eval(Yanfly.Param.MSGFontSizeChange);
    this.contents.fontSize = Math.min(size, Yanfly.Param.MSGFontChangeMax);
};

Window_Base.prototype.makeFontSmaller = function() {
  var size = this.contents.fontSize - eval(Yanfly.Param.MSGFontSizeChange);
  this.contents.fontSize = Math.max(size, Yanfly.Param.MSGFontChangeMin);
};

Yanfly.Message.Window_Base_processNormalCharacter =
    Window_Base.prototype.processNormalCharacter;
Window_Base.prototype.processNormalCharacter = function(textState) {
    if (this.checkWordWrap(textState)) return this.processNewLine(textState);
    Yanfly.Message.Window_Base_processNormalCharacter.call(this, textState);
};

Window_Base.prototype.checkWordWrap = function(textState) {
    if (!textState) return false;
    if (!this._wordWrap) return false;
    if (textState.text[textState.index] === ' ') {
      var nextSpace = textState.text.indexOf(' ', textState.index + 1);
      var nextBreak = textState.text.indexOf('\n', textState.index + 1);
      if (nextSpace < 0) nextSpace = textState.text.length + 1;
      if (nextBreak > 0) nextSpace = Math.min(nextSpace, nextBreak);
      var word = textState.text.substring(textState.index, nextSpace);
      var size = this.textWidthExCheck(word);
    }
    return (size + textState.x > this.wordwrapWidth());
};

Window_Base.prototype.wordwrapWidth = function(){
  return this.contents.width;
};

Window_Base.prototype.saveCurrentWindowSettings = function(){
    this._saveFontFace = this.contents.fontFace;
    this._saveFontSize = this.contents.fontSize;
    this._savetextColor = this.contents.textColor;
    this._saveFontBold = this.contents.fontBold;
    this._saveFontItalic = this.contents.fontItalic;
    this._saveOutlineColor = this.contents.outlineColor;
    this._saveOutlineWidth = this.contents.outlineWidth;
};

Window_Base.prototype.restoreCurrentWindowSettings = function(){
    this.contents.fontFace = this._saveFontFace;
    this.contents.fontSize = this._saveFontSize;
    this.contents.textColor = this._savetextColor;
    this.contents.fontBold = this._saveFontBold;
    this.contents.fontItalic = this._saveFontItalic;
    this.contents.outlineColor = this._saveOutlineColor;
    this.contents.outlineWidth = this._saveOutlineWidth;
};

Window_Base.prototype.clearCurrentWindowSettings = function(){
    this._saveFontFace = undefined;
    this._saveFontSize = undefined;
    this._savetextColor = undefined;
    this._saveFontBold = undefined;
    this._saveFontItalic = undefined;
    this._saveOutlineColor = undefined;
    this._saveOutlineWidth = undefined;
};

Window_Base.prototype.textWidthExCheck = function(text) {
    var setting = this._wordWrap;
    this._wordWrap = false;
    this.saveCurrentWindowSettings();
    this._checkWordWrapMode = true;
    var value = this.drawTextEx(text, 0, this.contents.height);
    this._checkWordWrapMode = false;
    this.restoreCurrentWindowSettings();
    this.clearCurrentWindowSettings();
    this._wordWrap = setting;
    return value;
};

//=============================================================================
// Window_Help
//=============================================================================

Yanfly.Message.Window_Help_setItem = Window_Help.prototype.setItem;
Window_Help.prototype.setItem = function(item) {
    if (eval(Yanfly.Param.MSGDescWrap)) {
      this.setText(item ? '<WordWrap>' + item.description : '');
    } else {
      Yanfly.Message.Window_Help_setItem.call(this, item);
    }
};

//=============================================================================
// Window_ChoiceList
//=============================================================================

Window_ChoiceList.prototype.standardFontFace = function() {
    return $gameSystem.getMessageFontName();
};

Window_ChoiceList.prototype.standardFontSize = function() {
    return $gameSystem.getMessageFontSize();
};

Yanfly.Message.Window_ChoiceList_updatePlacement =
    Window_ChoiceList.prototype.updatePlacement;
Window_ChoiceList.prototype.updatePlacement = function() {
    Yanfly.Message.Window_ChoiceList_updatePlacement.call(this);
    var messagePosType = $gameMessage.positionType();
    if (messagePosType === 0) {
      this.y = this._messageWindow.height;
    } else if (messagePosType === 2) {
      this.y = Graphics.boxHeight - this._messageWindow.height - this.height;
    }
};

//=============================================================================
// Window_NumberInput
//=============================================================================

Yanfly.Message.Window_NumberInput_updatePlacement =
    Window_NumberInput.prototype.updatePlacement;
Window_NumberInput.prototype.updatePlacement = function() {
    Yanfly.Message.Window_NumberInput_updatePlacement.call(this);
    var messageY = this._messageWindow.y;
    var messagePosType = $gameMessage.positionType();
    if (messagePosType === 0) {
      this.y = this._messageWindow.height;
    } else if (messagePosType === 1) {
      if (messageY >= Graphics.boxHeight / 2) {
          this.y = messageY - this.height;
      } else {
          this.y = messageY + this._messageWindow.height;
      }
    } else if (messagePosType === 2) {
      this.y = Graphics.boxHeight - this._messageWindow.height - this.height;
    }
};

//=============================================================================
// Window_EventItem
//=============================================================================

Yanfly.Message.Window_EventItem_updatePlacement =
    Window_EventItem.prototype.updatePlacement;
Window_EventItem.prototype.updatePlacement = function() {
    Yanfly.Message.Window_EventItem_updatePlacement.call(this);
    var messagePosType = $gameMessage.positionType();
    if (messagePosType === 0) {
      this.y = Graphics.boxHeight - this.height;
    } else if (messagePosType === 2) {
      this.y = 0;
    }
};

//=============================================================================
// Window_ScrollText
//=============================================================================

Window_ScrollText.prototype.standardFontFace = function() {
    return $gameSystem.getMessageFontName();
};

Window_ScrollText.prototype.standardFontSize = function() {
    return $gameSystem.getMessageFontSize();
};

//=============================================================================
// Window_NameBox
//=============================================================================

Yanfly.DisableWebGLMask = false;

function Window_NameBox() {
    this.initialize.apply(this, arguments);
}

Window_NameBox.prototype = Object.create(Window_Base.prototype);
Window_NameBox.prototype.constructor = Window_NameBox;

Window_NameBox.prototype.initialize = function(parentWindow) {
    this._parentWindow = parentWindow;
    Window_Base.prototype.initialize.call(this, 0, 0, 240, this.windowHeight());
    this._text = '';
    this._lastNameText = '';
    this._openness = 0;
    this._closeCounter = 0;
    this.deactivate();
    if (eval(Yanfly.Param.MSGNameBoxClear)) {
      this.backOpacity = 0;
      this.opacity = 0;
    }
    this.hide();
};

Window_NameBox.prototype.windowWidth = function() {
    this.resetFontSettings();
    var dw = this.textWidthEx(this._text);
    dw += this.padding * 2;
    var width = dw + eval(Yanfly.Param.MSGNameBoxPadding)
    return Math.ceil(width);
};

Window_NameBox.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

Window_NameBox.prototype.calcNormalCharacter = function(textState) {
    return this.textWidth(textState.text[textState.index++]);
};

Window_NameBox.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_NameBox.prototype.standardFontFace = function() {
    return $gameSystem.getMessageFontName();
};

Window_NameBox.prototype.standardFontSize = function() {
    return $gameSystem.getMessageFontSize();
};

Window_NameBox.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (this.active) return;
    if (this.isClosed()) return;
    if (this.isClosing()) return;
    if (this._closeCounter-- > 0) return;
    if (this._parentWindow.isClosing()) {
      this._openness = this._parentWindow.openness;
    }
    this.close();
};

Window_NameBox.prototype.refresh = function(text, position) {
    this.show();
    this._lastNameText = text;
    this._text = Yanfly.Param.MSGNameBoxText + text;
    this._position = position;
    this.width = this.windowWidth();
    this.createContents();
    this.contents.clear();
    this.resetFontSettings();
    this.changeTextColor(this.textColor(Yanfly.Param.MSGNameBoxColor));
    var padding = eval(Yanfly.Param.MSGNameBoxPadding) / 2;
    this.drawTextEx(this._text, padding, 0, this.contents.width);
    this._parentWindow.adjustWindowSettings();
    this._parentWindow.updatePlacement();
    this.adjustPositionX();
    this.adjustPositionY();
    this.open();
    this.activate();
    this._closeCounter = 4;
    return '';
};

Window_NameBox.prototype.adjustPositionX = function() {

	this._position = 3; // @HACK - Name lines always centered.

    if (this._position === 1) {
      this.x = this._parentWindow.x;
      this.x += eval(Yanfly.Param.MSGNameBoxBufferX);
    } else if (this._position === 2) {
      this.x = this._parentWindow.x;
      this.x += this._parentWindow.width * 3 / 10;
      this.x -= this.width / 2;
    } else if (this._position === 3) {
      this.x = this._parentWindow.x;
      this.x += this._parentWindow.width / 2;
      this.x -= this.width / 2;
    } else if (this._position === 4) {
      this.x = this._parentWindow.x;
      this.x += this._parentWindow.width * 7 / 10;
      this.x -= this.width / 2;
    } else {
      this.x = this._parentWindow.x + this._parentWindow.width;
      this.x -= this.width;
      this.x -= eval(Yanfly.Param.MSGNameBoxBufferX);
    }
    this.x = this.x.clamp(0, Graphics.boxWidth - this.width);
};

Window_NameBox.prototype.adjustPositionY = function() {
    if ($gameMessage.positionType() === 0) {
      this.y = this._parentWindow.y + this._parentWindow.height;
      this.y -= eval(Yanfly.Param.MSGNameBoxBufferY);
    } else {
      this.y = this._parentWindow.y;
      this.y -= this.height;
      this.y += eval(Yanfly.Param.MSGNameBoxBufferY);
    }
    if (this.y < 0) {
      this.y = this._parentWindow.y + this._parentWindow.height;
      this.y -= eval(Yanfly.Param.MSGNameBoxBufferY);
    }
};

//=============================================================================
// Window_Message
//=============================================================================

Yanfly.Message.Window_Message_createSubWindows =
    Window_Message.prototype.createSubWindows;
Window_Message.prototype.createSubWindows = function() {
    Yanfly.Message.Window_Message_createSubWindows.call(this);
    this._nameWindow = new Window_NameBox(this);
    Yanfly.nameWindow = this._nameWindow;
    var scene = SceneManager._scene;
    scene.addChild(this._nameWindow);
};

Window_Message.prototype.numVisibleRows = function() {
    return $gameSystem.messageRows();
};

Window_Message.prototype.windowWidth = function() {
    return $gameSystem.messageWidth();
};

Window_Message.prototype.wordwrapWidth = function(){
  if (Yanfly.Param.MSGTightWrap && $gameMessage.faceName() !== '') {
    return this.contents.width - this.newLineX();
  }
  return Window_Base.prototype.wordwrapWidth.call(this);
};

Window_Message.prototype.adjustWindowSettings = function() {
    this.width = this.windowWidth();
    this.height = Math.min(this.windowHeight(), Graphics.boxHeight);
    if (Math.abs(Graphics.boxHeight - this.height) < this.lineHeight()) {
      this.height = Graphics.boxHeight;
    }
    this.createContents();
    this.x = (Graphics.boxWidth - this.width) / 2;
};

Yanfly.Message.Window_Message_startMessage =
    Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    this._nameWindow.deactivate();
    Yanfly.Message.Window_Message_startMessage.call(this);
};

Yanfly.Message.Window_Message_terminateMessage =
    Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
    this._nameWindow.deactivate();
    Yanfly.Message.Window_Message_terminateMessage.call(this);
};

Yanfly.Message.Window_Message_newPage =
    Window_Message.prototype.newPage;
Window_Message.prototype.newPage = function(textState) {
    this.adjustWindowSettings();
    Yanfly.Message.Window_Message_newPage.call(this, textState);
};

Window_Message.prototype.standardFontFace = function() {
    return $gameSystem.getMessageFontName();
};

Window_Message.prototype.standardFontSize = function() {
    return $gameSystem.getMessageFontSize();
};

Window_Message.prototype.newLineX = function() {
    if ($gameMessage.faceName() === '') {
      return 0;
    } else {
      return eval(Yanfly.Param.MSGFaceIndent);
    }
};

Window_Message.prototype.isFastForward = function() {
    if (!$gameSystem.isFastFowardEnabled()) return false;
    return Input.isPressed(Yanfly.Param.MSGFastForwardKey);
};

Yanfly.Message.Window_Message_updateInput =
    Window_Message.prototype.updateInput;
Window_Message.prototype.updateInput = function() {
    if (this.pause && this.isFastForward()) {
      if (!this._textState) {
        this.pause = false;
        this.terminateMessage();
      }
    }
    return Yanfly.Message.Window_Message_updateInput.call(this);
};

Yanfly.Message.Window_Message_updateShowFast =
    Window_Message.prototype.updateShowFast;
Window_Message.prototype.updateShowFast = function() {
    if (this.isFastForward()) this._showFast = true;
    Yanfly.Message.Window_Message_updateShowFast.call(this);
};

Yanfly.Message.Window_Message_updateWait =
    Window_Message.prototype.updateWait;
Window_Message.prototype.updateWait = function() {
    if (this.isFastForward()) return false;
    return Yanfly.Message.Window_Message_updateWait.call(this);
};

Yanfly.Message.Window_Message_startWait =
    Window_Message.prototype.startWait;
Window_Message.prototype.startWait = function(count) {
    if (this._checkWordWrapMode) return;
    Yanfly.Message.Window_Message_startWait.call(this, count);
    if (this.isFastForward()) this._waitCount = 0;
};

Yanfly.Message.Window_Message_startPause =
    Window_Message.prototype.startPause;
Window_Message.prototype.startPause = function() {
    if (this._checkWordWrapMode) return;
    Yanfly.Message.Window_Message_startPause.call(this);
};

Window_Message.prototype.convertEscapeCharacters = function(text) {
    text = Window_Base.prototype.convertEscapeCharacters.call(this, text);
    text = this.convertNameBox(text);
    text = this.convertMessageCharacters(text);
    return text;
};

Window_Message.prototype.convertNameBox = function(text) {
    text = text.replace(/\x1bN\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refresh(arguments[1], 1);
    }, this);
    text = text.replace(/\x1bN1\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refresh(arguments[1], 1);
    }, this);
    text = text.replace(/\x1bN2\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refresh(arguments[1], 2);
    }, this);
    text = text.replace(/\x1bN3\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refresh(arguments[1], 3);
    }, this);
    text = text.replace(/\x1bNC\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refresh(arguments[1], 3);
    }, this);
    text = text.replace(/\x1bN4\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refresh(arguments[1], 4);
    }, this);
    text = text.replace(/\x1bN5\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refresh(arguments[1], 5);
    }, this);
    text = text.replace(/\x1bNR\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refresh(arguments[1], 5);
    }, this);
    return text;
};

Window_Message.prototype.convertMessageCharacters = function(text) {
    text = text.replace(/\x1bAF\[(\d+)\]/gi, function() {
        var i = parseInt(arguments[1]);
        return this.convertActorFace($gameActors.actor(i));
    }.bind(this));
    text = text.replace(/\x1bPF\[(\d+)\]/gi, function() {
        var i = parseInt(arguments[1]);
        return this.convertActorFace($gameParty.members()[i - 1]);
    }.bind(this));
    return text;
};

Window_Message.prototype.convertActorFace = function(actor) {
    $gameMessage.setFaceImage(actor.faceName(), actor.faceIndex());
    return '';
};

Yanfly.Message.Window_Message_processEscapeCharacter =
    Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
    case '!':
      if (!this.isFastForward()) this.startPause();
      break;
    case 'W':
      this.startWait(this.obtainEscapeParam(textState));
    default:
      Yanfly.Message.Window_Message_processEscapeCharacter.call(this,
        code, textState);
      break;
    }
};

if (Yanfly.Param.MSGNameBoxClose) {

Yanfly.Message.Window_Message_doesContinue =
  Window_Message.prototype.doesContinue;
Window_Message.prototype.doesContinue = function() {
  var value = Yanfly.Message.Window_Message_doesContinue.call(this);
  if (!value) return false;
  if (this.hasDifferentNameBoxText()) {
    return false;
  }
  return true;
};

Window_Message.prototype.hasDifferentNameBoxText = function() {
  var texts = $gameMessage._texts;
  var length = texts.length;
  var open = this._nameWindow.isOpen();
  for (var i = 0; i < length; ++i) {
    var text = texts[i];
    if (text.length <= 0) continue;
    if (Yanfly.MsgMacro) {
      text = this.convertMacroText(text);
      text = text.replace(/\x1b/gi, '\\');
    }
    if (text.match(/\\(?:N|N1|N2|N3|N4|N5|NC|NR)<(.*)>/i)) {
      var name = String(RegExp.$1);
    } else if (text.match(/\\(?:ND|ND1|ND2|ND3|ND4|ND5|NDC|NDR)<(.*)>/i)) {
      var name = String(RegExp.$1);
    } else if (text.match(/\\(?:NT|NT1|NT2|NT3|NT4|NT5|NTC|NTR)<(.*)>/i)) {
      var name = String(RegExp.$1);
    }
    if (name) {
      name = name.replace(/\\V\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
      }.bind(this));
      name = name.replace(/\\V\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
      }.bind(this));
      name = name.replace(/\\N\[(\d+)\]/gi, function() {
        return this.actorName(parseInt(arguments[1]));
      }.bind(this));
      name = name.replace(/\\P\[(\d+)\]/gi, function() {
        return this.partyMemberName(parseInt(arguments[1]));
      }.bind(this));
      name = name.replace(/\\/gi, '\x1b');
    }
    if (name && !open) return true;
    if (name && name !== this._nameWindow._lastNameText) {
      return true;
    }
  }
  if (open && !name) return true;
  return false;
};

} // Yanfly.Param.MSGNameBoxClose

//=============================================================================
// End of File
//=============================================================================
