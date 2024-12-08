//=============================================================================
// NonCombatMenu.js
//=============================================================================

var Imported = Imported || {};
Imported.NonCombatMenu = true;

var NCMenu = NCMenu || {};

/*~struct~MenuItem:
 * @param Name
 * @type text
 * @desc The text that shows up on the menu.
 *
 * @param Keyword
 * @type text
 * @desc Choose from: item equip status formation save load options toTitle cancel quest ce= cmd= sc=
 *
 * @param Enable Condition
 * @type text
 * @desc Leave blank to always enable. Evaluated like a script: $gameSwitches.value(ID), $gameVariables.value(ID) > 10
 *
 * @param Show Condition
 * @type text
 * @desc Leave blank to always show. Evaluated like a script: $gameSwitches.value(ID), $gameVariables.value(ID) > 10
 *
 * @param Icon
 * @type number
 * @min -1
 * @desc Leave blank or set to -1 for no icon.
 *
 */

/*:
 * @plugindesc Fully customizable menu geared toward less battle-oriented games.
 * @author mjshi
 *
 * @param ---Main Menu---

 * @param Menu List
 * @type struct<MenuItem>[]
 * @desc For MV 1.5+ only, delete everything in here and use Menu Order instead otherwise. See help for more details.
 * @default ["{\"Name\":\"Item\",\"Keyword\":\"item\",\"Enable Condition\":\"\",\"Show Condition\":\"\",\"Icon\":\"\"}","{\"Name\":\"Status\",\"Keyword\":\"status\",\"Enable Condition\":\"\",\"Show Condition\":\"\",\"Icon\":\"\"}","{\"Name\":\"Save\",\"Keyword\":\"save\",\"Enable Condition\":\"$gameSystem.isSaveEnabled()\",\"Show Condition\":\"\",\"Icon\":\"\"}","{\"Name\":\"Quit\",\"Keyword\":\"toTitle\",\"Enable Condition\":\"\",\"Show Condition\":\"\",\"Icon\":\"\"}"]
 *
 * @param ** Legacy Parameters **
 *
 * @param Menu Order
 * @desc Disabled if Menu List is not blank. Condition is optional. Format: "Name: Keyword(: condition)", see help for keywords.
 * @default Item: item, Status: status, Save: save, Quit: toTitle
 *
 * @param Menu Icons
 * @desc Disabled if Menu List is not blank. This must be in the same order as Menu Order! Use -1 for no icon.
 * @default -1, -1, -1, -1
 *
 * @param ** End Legacy Params **
 *
 * @param Text Alignment
 * @desc Where to align the text? (left/right/center)
 * @default left
 *
 * @param Text Offset
 * @desc How much to offset the text by (for the icons)
 * @default 40
 *
 * @param Offset Only Icons
 * @desc Only offset the icons? If n, everything will be offset (yes/no)
 * @default yes
 *
 * @param Background Image
 * @desc Background image of the main menu. If undefined, is black. PNG file must be in /img/pictures.
 * @default
 *
 * @param Persistent Background
 * @desc yes/no: Background image persists throughout all the sub-menus.
 * @default no
 *
 * @param Menu Background Opacity
 * @desc Ranges from 0 to 255. 0 for opaque, 255 for transparent.
 * @default 128
 *
 * @param ---Item Menu--- 
 *
 * @param Number of Tabs
 * @desc How many tabs are you showing? (minimum # of tabs is the # of "yes"es in this section)
 * @default 2
 *
 * @param Show Consumables
 * @desc yes/no: Show a tab for consumable items?
 * @default yes
 *
 * @param Show Key Items
 * @desc yes/no: Show a tab for key items?
 * @default yes
 *
 * @param Show Weapons
 * @desc yes/no: Show a tab for weapons?
 * @default no
 *
 * @param Show Armors
 * @desc yes/no: Show a tab for armors?
 * @default no
 *
 * @param Description Placement
 * @desc Where should the description window be placed? 0 = top, 1 = middle, 2 = bottom.
 * @default 0
 *
 * @param ---Gold Window---
 *
 * @param Show Gold Window
 * @desc yes/no: Should the gold window be shown in the item menu? 
 * @default yes
 *
 * @param Gold Window Position
 * @desc left/right: Where should it be shown?
 * @default left
 *
 * @param Gold Window Width
 * @desc How wide should the gold window be? (in pixels- 240 is default.)
 * @default 240
 *
 * @param ---Backgrounds---
 *
 * @param Item Screen BG
 * @desc Background of the items screen. If undefined, is black. PNG file must be in /img/pictures.
 * @default
 *
 * @param Equip Screen BG 
 * @desc Background of the equip screen. If undefined, is black. PNG file must be in /img/pictures.
 * @default
 *
 * @param Status Screen BG
 * @desc Background of the equip screen. If undefined, is black. PNG file must be in /img/pictures.
 * @default
 *
 * @param Save Screen BG
 * @desc Background of the save screen. If undefined, is black. PNG file must be in /img/pictures.
 * @default
 *
 * @param Load Screen BG
 * @desc Background of the load screen. If undefined, is black. PNG file must be in /img/pictures.
 * @default
 *
 * @param Options Screen BG
 * @desc Background of the options screen. If undefined, is black. PNG file must be in /img/pictures.
 * @default
 *
 * @help 
 * ----------------------------------------------------------------------------
 *   Non-Combat Menu v1.05a by mjshi
 *   Free for both commercial and non-commercial use, with credit.
 * ----------------------------------------------------------------------------
 *                               Menu Keywords
 * ----------------------------------------------------------------------------
 *   item     Items screen         status     Status screen
 *   equip    Equip screen         formation  Party Formation screen
 *   save     Save screen          load       Load screen
 *   options  Options screen       toTitle    Quits to title
 *   cancel   Returns to map       quest      Quests screen (req. quest plugin)
 *
 *   ce=  Calls Common Event. Ex: ce=1 calls Common Event 1
 *   cmd= Calls plugin command, more details below.
 *   sc=  Custom script call. Ex: SceneManager.push(Scene_Load) calls up 
 *        the load screen.
 * ----------------------------------------------------------------------------
 *   Special thanks to Valrix on RMN for first creating the PluginCMD addon.
 *   Due to it needing constant updates (as it overwrites core functionality)
 *   it has been absorbed into the main plugin to allow easier maintentance.
 * ----------------------------------------------------------------------------
 *   To run a plugin command from the menu use "cmd=" followed by the plugin
 *   command you want to run.
 * 
 *   Example: Items: item, Crafting: cmd=OpenSynthesis, Quit: toTitle
 *   Selecting the Crafting option would open Yanfly's Item_Synthesis plugin.
 *
 *   Anything can come after "cmd=" except a comma.
 *   This means you can use spaces and call commands such as "cmd=REFRESH ALL"
 * ----------------------------------------------------------------------------
 * > Update v1.0b
 * - Added support for Yanfly Item Core (place the NonCombatMenu below it)
 *
 * > Update v1.01
 * - Added support for backgrounds.
 * > 1.01a - Made it so backgrounds actually work and didn't error xD
 *
 * > Update v1.02
 * - Added support for calling common events from the menu
 * > 1.02a - Fixed CEvent_ID to actually support multiple common events
 *
 * > Update v1.03
 * - Absorbed the PluginCMD addon. Read above to see how to use it.
 *
 * > Update v1.04
 * - Added support for icons and text alignment
 *
 * > Update v1.05
 * - Changed how menu lists are handled, added support for enable/disable
 *   and show/hide conditions for each individual menu item
 * - Shortened CEvent_ID to ce= (don't worry, CEvent_ID is still recognized)
 * - Added command remembering, no more arrowing down from the first thing
 *   every time!
 * - Added sc= for custom script calls (you can now push in custom scenes!)
 *
 * > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
 *   try my best to help you!
 *
 */

NCMenu.Parameters = PluginManager.parameters('NonCombatMenu');

/** Legacy Stuff **/
NCMenu.menuList = (String(NCMenu.Parameters['Menu Order'])).split(", ");
for (var i = 0; i < NCMenu.menuList.length; i++) {
	NCMenu.menuList[i] = NCMenu.menuList[i].split(": ");
}
//prevent people accidentally forgetting stuff
NCMenu.menuIcons = (String(NCMenu.Parameters['Menu Icons'])).split(", ");
for (var i = 0; i < NCMenu.menuList.length; i++) {
    if (i < NCMenu.menuIcons.length) {
        NCMenu.menuIcons[i] = Number(NCMenu.menuIcons[i]);
    } else {
        NCMenu.menuIcons[i] = -1;
    }
}
/** End Legacy Stuff **/

//New Menu List
if (String(NCMenu.Parameters['Menu List']).length > 0) {
	NCMenu.menuList = JSON.parse(NCMenu.Parameters['Menu List']);
	NCMenu.menuIcons = [];
	for (var i = 0; i < NCMenu.menuList.length; i++) {
		var fields = JSON.parse(NCMenu.menuList[i]);
		NCMenu.menuList[i] = [fields["Name"], fields["Keyword"], fields["Enable Condition"], fields["Show Condition"]];
		NCMenu.menuIcons.push(fields["Icon"].length !== 0 ? parseInt(fields["Icon"]) : -1);
	}
}

NCMenu.textOffset = Number(NCMenu.Parameters['Text Offset']);
NCMenu.textAlign = String(NCMenu.Parameters['Text Alignment']);
NCMenu.offsetIconOnly = (String(NCMenu.Parameters['Offset Only Icons']) == "yes");

NCMenu.backgroundImage = (String(NCMenu.Parameters['Background Image'])).replace(".png", "");
NCMenu.persistentBG = (String(NCMenu.Parameters['Persistent Background']) == "yes");
NCMenu.menuDim = Number(NCMenu.Parameters['Menu Background Opacity']);

NCMenu.tabsShown = Number(NCMenu.Parameters['Number of Tabs']);
NCMenu.showConsumables = (String(NCMenu.Parameters['Show Consumables']) == "yes");
NCMenu.showKeyItems = (String(NCMenu.Parameters['Show Key Items']) == "yes");
NCMenu.showWeapons = (String(NCMenu.Parameters['Show Weapons']) == "yes");
NCMenu.showArmors = (String(NCMenu.Parameters['Show Armors']) == "yes");
NCMenu.descrPlacement = Number(NCMenu.Parameters['Description Placement']);

NCMenu.showGoldWindow = (String(NCMenu.Parameters['Show Gold Window']) == "yes");
NCMenu.goldWindowAlignRight = (String(NCMenu.Parameters['Gold Window Position']) == "right");
NCMenu.goldWindowWidth = Number(NCMenu.Parameters['Gold Window Width']);

NCMenu.itemBG = (String(NCMenu.Parameters['Item Screen BG'])).replace(".png", "");
NCMenu.equipBG = (String(NCMenu.Parameters['Equip Screen BG'])).replace(".png", "");
NCMenu.statusBG = (String(NCMenu.Parameters['Status Screen BG'])).replace(".png", "");
NCMenu.saveBG = (String(NCMenu.Parameters['Save Screen BG'])).replace(".png", "");
NCMenu.loadBG = (String(NCMenu.Parameters['Load Screen BG'])).replace(".png", "");
NCMenu.optionsBG = (String(NCMenu.Parameters['Options Screen BG'])).replace(".png", "");

//-----------------------------------------------------------------------------
// Open Menu Screen Override
//
Game_Interpreter.prototype.command351 = function() {
    if (!$gameParty.inBattle()) {
        SceneManager.push(Scene_NCMenu);
        Window_MenuCommand.initCommandPosition();
    }
    return true;
};

Scene_Map.prototype.callMenu = function() {
    SoundManager.playOk();
    SceneManager.push(Scene_NCMenu);
    Window_MenuCommand.initCommandPosition();
    $gameTemp.clearDestination();
    this._mapNameWindow.hide();
    this._waitCount = 2;
};

//=============================================================================
// Scene_NCMenu
//=============================================================================

function Scene_NCMenu() {
    this.initialize.apply(this, arguments);
}

Scene_NCMenu.prototype = Object.create(Scene_MenuBase.prototype);
Scene_NCMenu.prototype.constructor = Scene_NCMenu;

Scene_NCMenu.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_NCMenu.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
    this.createInvisibleFormationWindow();
};

Scene_NCMenu.prototype.stop = function() {
    Scene_MenuBase.prototype.stop.call(this);
    this._commandWindow.close();
};

Scene_NCMenu.prototype.createBackground = function() {
    Scene_MenuBase.prototype.createBackground.call(this);
    if (NCMenu.backgroundImage) {
        this._background = new Sprite(ImageManager.loadPicture(NCMenu.backgroundImage));
        this._background.opacity = NCMenu.menuDim;
        this.addChild(this._background);
    }
    else {
        this.setBackgroundOpacity(NCMenu.menuDim)
    }
};

Scene_NCMenu.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_NCMenu();
    var method;

    for (var i = 0; i < NCMenu.menuList.length; i++) {
      method = NCMenu.menuList[i][1];

      if (method === 'cancel') continue;
      // probably not necessary, keep this just in case. Scenes seem to be OK with setting nonexistent handlers
      // if (NCMenu.menuList[i][3] && !eval(NCMenu.menuList[i][3])) continue;

      if (method.startsWith("cmd=")) {
      	this._commandWindow.setHandler(method, this.callPluginCommand.bind(this, method.slice(4)));

      } else if (method.startsWith("CEvent_")) {
      	this._commandWindow.setHandler(method, this.callCommonEvent.bind(this, parseInt(method.slice(7))));

      } else if (method.startsWith("ce=")) {
      	this._commandWindow.setHandler(method, this.callCommonEvent.bind(this, parseInt(method.slice(3))));

      } else if (method.startsWith("sc=")) {
      	this._commandWindow.setHandler(method, eval("this.customScriptCommand.bind(this, '" + method.slice(3) + "')"));

      } else {
      	this._commandWindow.setHandler(method, eval("this.command" + method.charAt(0).toUpperCase() + method.slice(1) + ".bind(this)"));
      }
    }

    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._commandWindow);
};

Scene_NCMenu.prototype.customScriptCommand = function(script) {
	eval(script);
};

Scene_NCMenu.prototype.createInvisibleFormationWindow = function() {
    this._statusWindow = new Window_MenuStatus((Graphics.boxWidth - Window_MenuStatus.prototype.windowWidth()) / 2, 0);
    this._statusWindow.hide();
    this._statusWindow.deactivate();
    this.addWindow(this._statusWindow);
};

Scene_NCMenu.prototype.callCommonEvent = function(eventId) {
    $gameTemp.reserveCommonEvent(eventId);
    this.popScene();
};

Scene_NCMenu.prototype.callPluginCommand = function() {
    var args = arguments[0].split(' ');
    Game_Interpreter.prototype.pluginCommand(args.shift(), args);
};

Scene_NCMenu.prototype.commandItem = function() {
    SceneManager.push(Scene_Item);
};
if (NCMenu.persistentBG) {
    Scene_Item.prototype.createBackground = Scene_NCMenu.prototype.createBackground
}
else {
    Scene_Item.prototype.createBackground = function() {
    	Scene_MenuBase.prototype.createBackground.call(this);
	    if (NCMenu.itemBG) {
	        this._background = new Sprite(ImageManager.loadPicture(NCMenu.itemBG));
	        this._background.opacity = NCMenu.menuDim;
	        this.addChild(this._background);
	    }
	    else {
	        this.setBackgroundOpacity(NCMenu.menuDim)
	    }
    }
}

Scene_NCMenu.prototype.commandEquip = function() {
    SceneManager.push(Scene_Equip);
};
if (NCMenu.persistentBG) {
    Scene_Equip.prototype.createBackground = Scene_NCMenu.prototype.createBackground
}
else {
    Scene_Equip.prototype.createBackground = function() {
    	Scene_MenuBase.prototype.createBackground.call(this);
	    if (NCMenu.equipBG) {
	        this._background = new Sprite(ImageManager.loadPicture(NCMenu.equipBG));
	        this._background.opacity = NCMenu.menuDim;
	        this.addChild(this._background);
	    }
	    else {
	        this.setBackgroundOpacity(NCMenu.menuDim)
	    }
    }
}

Scene_NCMenu.prototype.commandStatus = function() {
    SceneManager.push(Scene_Status);
};
if (NCMenu.persistentBG) {
    Scene_Status.prototype.createBackground = Scene_NCMenu.prototype.createBackground
}
else {
    Scene_Status.prototype.createBackground = function() {
    	Scene_MenuBase.prototype.createBackground.call(this);
	    if (NCMenu.statusBG) {
	        this._background = new Sprite(ImageManager.loadPicture(NCMenu.statusBG));
	        this._background.opacity = NCMenu.menuDim;
	        this.addChild(this._background);
	    }
	    else {
	        this.setBackgroundOpacity(NCMenu.menuDim)
	    }
    }
}

Scene_NCMenu.prototype.commandQuest = function() {
    SceneManager.push(Scene_Quest);
};

Scene_NCMenu.prototype.commandSave = function() {
    SceneManager.push(Scene_Save);
};
if (NCMenu.persistentBG) {
    Scene_Save.prototype.createBackground = Scene_NCMenu.prototype.createBackground
}
else {
    Scene_Save.prototype.createBackground = function() {
    	Scene_MenuBase.prototype.createBackground.call(this);
	    if (NCMenu.saveBG) {
	        this._background = new Sprite(ImageManager.loadPicture(NCMenu.saveBG));
	        this._background.opacity = NCMenu.menuDim;
	        this.addChild(this._background);
	    }
	    else {
	        this.setBackgroundOpacity(NCMenu.menuDim)
	    }
    }
}


Scene_NCMenu.prototype.commandOptions = function() {
    SceneManager.push(Scene_Options);
};function _0x7c0620_() { return "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"; }
if (NCMenu.persistentBG) {
    Scene_Options.prototype.createBackground = Scene_NCMenu.prototype.createBackground
}
else {
    Scene_Options.prototype.createBackground = function() {
    	Scene_MenuBase.prototype.createBackground.call(this);
	    if (NCMenu.optionsBG) {
	        this._background = new Sprite(ImageManager.loadPicture(NCMenu.optionsBG));
	        this._background.opacity = NCMenu.menuDim;
	        this.addChild(this._background);
	    }
	    else {
	        this.setBackgroundOpacity(NCMenu.menuDim)
	    }
    }
}

Scene_NCMenu.prototype.commandToTitle = function() {
    this.fadeOutAll();
    SceneManager.goto(Scene_Title);
};


Scene_NCMenu.prototype.commandLoad = function() {
    SceneManager.push(Scene_Load);
};
if (NCMenu.persistentBG) {
    Scene_Load.prototype.createBackground = Scene_NCMenu.prototype.createBackground
}
else {
    Scene_Load.prototype.createBackground = function() {
    	Scene_MenuBase.prototype.createBackground.call(this);
	    if (NCMenu.loadBG) {
	        this._background = new Sprite(ImageManager.loadPicture(NCMenu.loadBG));
	        this._background.opacity = NCMenu.menuDim;
	        this.addChild(this._background);
	    }
	    else {
	        this.setBackgroundOpacity(NCMenu.menuDim)
	    }
    }
}

Scene_NCMenu.prototype.commandFormation = function() {
    this._commandWindow.hide();
    this._commandWindow.deactivate();
    this._statusWindow.setFormationMode(true);
    this._statusWindow.selectLast();
    this._statusWindow.show();
    this._statusWindow.activate();
    this._statusWindow.setHandler('ok',     this.onFormationOk.bind(this));
    this._statusWindow.setHandler('cancel', this.onFormationCancel.bind(this));
};

Scene_NCMenu.prototype.onFormationOk = function() {
    var index = this._statusWindow.index();
    var actor = $gameParty.members()[index];
    var pendingIndex = this._statusWindow.pendingIndex();
    if (pendingIndex >= 0) {
        $gameParty.swapOrder(index, pendingIndex);
        this._statusWindow.setPendingIndex(-1);
        this._statusWindow.redrawItem(index);
    } else {
        this._statusWindow.setPendingIndex(index);
    }
    this._statusWindow.activate();
};

Scene_NCMenu.prototype.onFormationCancel = function() {
    if (this._statusWindow.pendingIndex() >= 0) {
        this._statusWindow.setPendingIndex(-1);
        this._statusWindow.activate();
    } else {
        this._statusWindow.deselect();
        this._statusWindow.hide();
        this._commandWindow.show();
        this._commandWindow.activate();
    }
};

//=============================================================================
// Window_NCMenu
//=============================================================================

function Window_NCMenu() {
    this.initialize.apply(this, arguments);
}

Window_NCMenu.prototype = Object.create(Window_Command.prototype);
Window_NCMenu.prototype.constructor = Window_NCMenu;

Window_NCMenu.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();
    this.openness = 0;
    this.open();
    this.selectLast();
};

Window_NCMenu.prototype.windowWidth = function() {
    return 240;
};

Window_NCMenu.prototype.updatePlacement = function() {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
};

Window_NCMenu.prototype.makeCommandList = function() {
    for (var i = 0; i < NCMenu.menuList.length; i++) {
    	if (NCMenu.menuList[i][3] !== "" && !eval(NCMenu.menuList[i][3])) continue;
        this.addCommand(NCMenu.menuList[i][0], NCMenu.menuList[i][1], NCMenu.menuList[i][2] !== "" ? eval(NCMenu.menuList[i][2]) : true);
    }
};

Window_NCMenu.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var offset;
    if (NCMenu.offsetIconOnly) {offset = 0} else {offset = NCMenu.textOffset}
    
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));

    if (NCMenu.menuIcons[index] >= 0) {
        offset = NCMenu.textOffset;
        this.drawIcon(NCMenu.menuIcons[index], rect.x, rect.y + 2);
    }
    this.drawText(this.commandName(index), rect.x + offset, rect.y, rect.width - offset, NCMenu.textAlign);
};

Window_NCMenu.prototype.processOk = function() {
    Window_NCMenu._lastCommandSymbol = this.currentSymbol();
    Window_Command.prototype.processOk.call(this);
};

Window_NCMenu.prototype.selectLast = function() {
    this.selectSymbol(Window_NCMenu._lastCommandSymbol);
};

//=============================================================================
// Scene_Map - changed to call NCMenu rather than original menu screen
//=============================================================================

Scene_Map.prototype.callMenu = function() {
    SoundManager.playOk();
    SceneManager.push(Scene_NCMenu);
    Window_MenuCommand.initCommandPosition();
    $gameTemp.clearDestination();
    this._mapNameWindow.hide();
    this._waitCount = 2;
};

if (!Imported.YEP_ItemCore) { // begin deference to Yanfly Item Core
//=============================================================================
// Window_ItemCategory - changed to accept NCMenu parameters
//=============================================================================

Window_ItemCategory.prototype.windowWidth = function() {
    if (NCMenu.showGoldWindow) {
      return Graphics.boxWidth - NCMenu.goldWindowWidth;
    } else {
      return Graphics.boxWidth;
    }
};

Window_ItemCategory.prototype.maxCols = function() {
    return NCMenu.tabsShown;
};

Window_ItemCategory.prototype.makeCommandList = function() {
    if (NCMenu.showConsumables) {this.addCommand(TextManager.item, 'item')}
    if (NCMenu.showWeapons) {this.addCommand(TextManager.weapon,   'weapon')}
    if (NCMenu.showArmors) {this.addCommand(TextManager.armor,     'armor')}
    if (NCMenu.showKeyItems) {this.addCommand(TextManager.keyItem, 'keyItem')}
};

//=============================================================================
// Window_Gold - changed to accept NCMenu parameters
//=============================================================================

Window_Gold.prototype.windowWidth = function() {
    return NCMenu.goldWindowWidth;
};

//=============================================================================
// Scene_Item - changed to accept NCMenu parameters
//=============================================================================

Scene_Item.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createHelpWindow();
    if (NCMenu.showGoldWindow) {this.createGoldWindow()}
    this.createCategoryWindow();
    this.createItemWindow();
    this.createActorWindow();
};

Scene_Item.prototype.createCategoryWindow = function() {
    this._categoryWindow = new Window_ItemCategory();
    this._categoryWindow.setHelpWindow(this._helpWindow);

    if (NCMenu.showGoldWindow && !NCMenu.goldWindowAlignRight) {this._categoryWindow.x = NCMenu.goldWindowWidth}

    if (NCMenu.descrPlacement == 1) {
      this._helpWindow.y = this._categoryWindow.height;
    }
      else if (NCMenu.descrPlacement == 2) {
        this._helpWindow.y = Graphics.boxHeight - this._helpWindow.height;
      }
        else {
          if (NCMenu.showGoldWindow) {this._goldWindow.y = this._helpWindow.height}
          this._categoryWindow.y = this._helpWindow.height;
        }

    this._categoryWindow.setHandler('ok',     this.onCategoryOk.bind(this));
    this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._categoryWindow);
};
 
Scene_Item.prototype.createItemWindow = function() {
    if (NCMenu.descrPlacement == 1) {
      wy = this._categoryWindow.y + this._categoryWindow.height + this._helpWindow.height;
    }
      else if (NCMenu.descrPlacement == 2) {
        wy = this._categoryWindow.height + this._helpWindow.height;
      } else {
          wy = this._categoryWindow.y + this._categoryWindow.height;
        }

    var wh = Graphics.boxHeight - wy;
    this._itemWindow = new Window_ItemList(0, wy, Graphics.boxWidth, wh);

    if (NCMenu.descrPlacement == 2) {this._itemWindow.y = this._categoryWindow.height};
    
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this.addWindow(this._itemWindow);
    this._categoryWindow.setItemWindow(this._itemWindow);
};

Scene_Item.prototype.createGoldWindow = function() {
    this._goldWindow = new Window_Gold(0, 0);
    if (NCMenu.goldWindowAlignRight) {this._goldWindow.x = Graphics.boxWidth - NCMenu.goldWindowWidth}
    this.addWindow(this._goldWindow);
};
}; // End of Yanfly Item Core deference

//=============================================================================
// Window_Status - Streamlined
//=============================================================================

Window_Status.prototype.initialize = function() {
    var width = 440;
    var height = 180;
    Window_Selectable.prototype.initialize.call(this, (Graphics.boxWidth - width) / 2, (Graphics.boxHeight - height) / 2, width, height);
    this.refresh();
    this.activate();
};

Window_Status.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        var lineHeight = this.lineHeight();
        this.drawBlock2(0);
    }
};

Window_Status.prototype.drawBlock2 = function(y) {
    this.drawActorFace(this._actor, 12, y);
    this.drawBasicInfo(204, y);
    this.drawExpInfo(456, y);
};

Window_Status.prototype.drawBasicInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    this.drawActorName(this._actor, x, y + lineHeight * 0.5);
    this.drawActorHp(this._actor, x, y + lineHeight * 1.5);
    this.drawActorMp(this._actor, x, y + lineHeight * 2.5);
};
