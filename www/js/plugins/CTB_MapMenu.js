/*=============================================================================
 * CTB MapMenu
 * By CT_Bolt
 * CTB_MapMenu.js
 * Version: 2.20
 * Terms of Use:
 *   Free for commercial and non commercial use in projects.
 *   Enjoy! Happy Game Making!
 *
/*=============================================================================*/

var CTB = CTB || {};
CTB.mapMenu  = CTB.mapMenu || {};

var Imported = Imported || {};
Imported["CT_Bolt Map Menu"] = 2.20;

//=============================================================================
/*:
 * @plugindesc CT_Bolt's Menu On Map System v2.20
 * @author CT_Bolt
 *
 * @param ---Main Settings---
 * @text Main Settings
 *
 * @param Use CT_Bolt Menu
 * @text Use CT_Bolt Menu
 * @type boolean
 * @parent ---Main Settings---
 * @desc Use CT_Bolt Menu On Menu System as Menu
 * @default true
 *
 * @param Add Cancel
 * @text Add Cancel
 * @type boolean
 * @parent ---Main Settings---
 * @desc Add Cancel Command to Command List
 * @default true
 *
 * @help
 *
 * CT_Bolt's Menu On Map System
 * Version 2.20
 * CT_Bolt
 *
 * ***************** Description **********************
 * Menu directly on Map (with events/animated tiles/etc. running in BG)
 *
 * Note:
 *  This does not use Scene_Menu other menu plugin's
 *  are not likely to work that well with this... yet at least.
 *
 * ****************** How to Use **********************
 * Plug & Play :)
 * Adjust Parameters to Suit your needs.
 *
 * Functions:
 *  returnToProperWindow() // This returns the focus and refreshes the window.
 *
 *
 * ***************** Compatibility ********************
 * ???
 *
 *
 * History Log:
 *    v1.00 Initial Release
 *    v1.02 Bugfix
 *    v1.10 Compatibilty fix, 65% compatible with MOG Monogatari Menu (Only mouse/touch work)
 *    v1.20 Cleaned up code/core updates/compatibile with TYR Camera Control
 *    v1.30 Removed Scene_Equip, instead directly to Equip Windows on Map
 *    v1.35 Bugfix
 *    v1.40 Removed Scene_Skill, instead directly to Skill Windows on Map (1/20/2020)
 *    v1.42 Cleaned up code (1/20/2020)
 *    v1.50 More!!! (1/20/2020)
 *    v1.60 Fixed Action Button Triggered while in menu (2/5/2020)
 *    v1.70 Removed Scene_Item, instead directly to Skill Windows on Map (4/03/2020)
 *    v2.00 Almost Done (still todo: Replace Status, Save, Options, GameEnd) (4/04/2020)
 *    v2.10 Not much left now (still todo: Replace Status) (4/04/2020)
 *    v2.20 Added returnToProperWindow function (still todo: Replace Status) (4/16/2020)
 */
 
Array.prototype.swap = function(a, b){
  var t = this[b]; this[b] = this[a]; this[a] = t;
};

Array.prototype.moveToEnd = function(i) {
  var t = this[i]; this.copyWithin(i,i+1); this.splice(this.length-1,1,t);
};



// SAN_AnalogMove Patch
//-----------------------------------------------------------------------------
if (Imported.SAN_AnalogMove){
  // Alias Variables
  var ctb_CharacterMover_isMoving_tata = CharacterMover.prototype.isMoving;
  CharacterMover.prototype.isMoving = function() {var v = false; ($gamePlayer._mainMenu.inMenu) ? v = false : v = ctb_CharacterMover_isMoving_tata.call(this); return v;};

  CharacterMover.prototype.update = function() {
    if (!$gamePlayer._mainMenu.inMenu){
      this.updateLastPosition();
      this.updateTargetPosition();
      this.updateVelocity();
      this.updatePosition();
      this.updateThrough();
      this.updateCharacter();
    }
  };
}

// QMovement Patch
//-----------------------------------------------------------------------------
(function() {
  Game_CharacterBase.prototype.isMoving = function() {
    if (!$gamePlayer._mainMenu.inMenu){
      return this._isMoving;
    }else{
      return false;
    }
  };
});



"use strict";
(function ($) {
	//-----------------------------------------------------------------------------
	// Parameter Variables
	//-----------------------------------------------------------------------------
	function getPluginParameters() {var a = document.currentScript || (function() { var b = document.getElementsByTagName('script'); return b[b.length - 1]; })(); return PluginManager.parameters(a.src.substring((a.src.lastIndexOf('/') + 1), a.src.indexOf('.js')));} $.Param = getPluginParameters();
	CTB.Param = CTB.Param || {};
	CTB.Param.mapMenu = CTB.Param.mapMenu || {};
	CTB.Param.mapMenu.settings = $.Param['Menu Settings'] ? (JSON.parse($.Param['Menu Settings']) || {}) : {};
	CTB.Param.mapMenu.settings.useCTBMenu = $.Param['Use CT_Bolt Menu'] ? $.Param['Use CT_Bolt Menu'] : false;
	CTB.Param.mapMenu.settings.addCancel = $.Param['Add Cancel'] ? $.Param['Add Cancel'] : false;

	$['Game_Message.prototype.isBusy'] = Game_Message.prototype.isBusy;
	Game_Message.prototype.isBusy = function() {
		var isBusy = $['Game_Message.prototype.isBusy'].apply(this, arguments);
		if (isBusy){					
			$gamePlayer._mainMenu = $gamePlayer._mainMenu || {};			
			if (!this.oneTimeSetWhatWasActive){
				this.oneTimeSetWhatWasActive = true;
				//console.log("Busy");
			}			
			if ($gamePlayer._mainMenu.inMenu){
				SceneManager._scene._skillTypeWindow.deactivate();
				SceneManager._scene._itemWindow_skill.deactivate();
				SceneManager._scene._actorWindow_skill.deactivate();				
				SceneManager._scene._categoryWindow_item.deactivate();
				SceneManager._scene._itemWindow_item.deactivate();
				SceneManager._scene._actorWindow_item.deactivate();
			}			
		}else{
			if (this.oneTimeSetWhatWasActive){	
				this.oneTimeSetWhatWasActive = false;
				if ($gamePlayer._mainMenu.inMenu){					
					if (SceneManager._scene._itemWindow_skill.isOpen()){
						if (SceneManager._scene._actorWindow_skill.isOpen()){							
							SceneManager._scene._actorWindow_skill.activate();
						}else{
							SceneManager._scene._itemWindow_skill.activate();
						}
					}else if(SceneManager._scene._itemWindow_item.isOpen()){
						if (SceneManager._scene._actorWindow_item.isOpen()){							
							SceneManager._scene._actorWindow_item.activate();
						}else{
							SceneManager._scene._itemWindow_item.activate();
						}						
					}
				}
			}
			if(SceneManager._scene._categoryWindow_item.active){
				SceneManager._scene._actorWindow_item._openness = 0;
				SceneManager._scene._actorWindow_item.active = false;
				
				SceneManager._scene._actorWindow_skill._openness = 0;
				SceneManager._scene._actorWindow_skill.active = false;
			}
		}
		return isBusy;
	};

	var _gp_triggerButtonAction_ctb_mapMenu = Game_Player.prototype.triggerButtonAction;
	Game_Player.prototype.triggerButtonAction = function() {
	if (!$gamePlayer._mainMenu.inMenu) return _gp_triggerButtonAction_ctb_mapMenu.call(this);
	return false;
	};

	if (Imported.MOG_ChronoEngine){  
	var _gp_moveByInput_ctb_mapMenu = Game_Player.prototype.moveByInput; Game_Player.prototype.moveByInput = function() {if (!this.canMoveABS() || $gameSystem.isChronoMode() || $gamePlayer._mainMenu.inMenu) {return}; _gp_moveByInput_ctb_mapMenu.call(this);};
	}

	// Overwrite
	Game_Player.prototype.update = function(sceneActive) {
	if (!Imported.TYR_CameraControl){
	  // Standard MV
	  var lastScrolledX = this.scrolledX();
	  var lastScrolledY = this.scrolledY();
	  var wasMoving = this.isMoving();
	  this.updateDashing();
	  if (sceneActive) {
		// Small overwrite
		$gamePlayer._mainMenu = $gamePlayer._mainMenu || {inMenu:false};
		if (!$gamePlayer._mainMenu.inMenu) this.moveByInput();
	  }
	  Game_Character.prototype.update.call(this);
	  this.updateScroll(lastScrolledX, lastScrolledY);
	  this.updateVehicle();
	  if (!this.isMoving()) {
		  this.updateNonmoving(wasMoving);
	  }
	  this._followers.update();
	} else {
	  // Method by TYR (Compatibility by CTB)
	  var eventID = $gameMap._camFollowEventID;
	  if (eventID > 0 && typeof $gameMap._events[eventID] != 'undefined') {
		 var eventLastScrolledX = $gameMap._events[eventID].scrolledX();
		 var eventLastScrolledY = $gameMap._events[eventID].scrolledY();
	  }
	  var lastScrolledX = this.scrolledX();
	  var lastScrolledY = this.scrolledY();
	  var wasMoving = this.isMoving();
	  this.updateDashing();
	  if (sceneActive) {
		// Small overwrite (ctb compatibility)
		$gamePlayer._mainMenu = $gamePlayer._mainMenu || {inMenu:false};
		if (!$gamePlayer._mainMenu.inMenu) this.moveByInput();
	  }
	  Game_Character.prototype.update.call(this);
	if (eventID > 0 && typeof $gameMap._events[eventID] != 'undefined') {
		$gameMap._events[eventID].update();
	}
	switch ($gameMap._camFollow) {
		case 'player':
			this.updateScroll(lastScrolledX, lastScrolledY);
			break;
		case 'event':
			$gameMap._events[eventID].updateScroll(eventLastScrolledX, eventLastScrolledY);
			break;
		case 'map':
			break;
		default:
			this.updateScroll(lastScrolledX, lastScrolledY);
	}
	  this.updateVehicle();
	  if (!this.isMoving()) {
		  this.updateNonmoving(wasMoving);
	  }
	  this._followers.update();
	}
	};

	//-----------------------------------------------------------------------------
	// Scene_Map
	//-----------------------------------------------------------------------------
	// Overwrite
	Scene_Map.prototype.initialize = function() {
	  Scene_MenuBase.prototype.initialize.call(this);
	  this._waitCount = 0;
	  this._encounterEffectDuration = 0;
	  this._mapLoaded = false;
	  this._touchCount = 0;
	};

	// New
	Scene_Map.prototype.createCommandWindow = function() {
	  this._commandWindow = this._commandWindow || new Window_MenuCommand(0, 0);
	  Scene_Menu.prototype.createCommandWindow.call(this);
	  this._commandWindow.setHandler('cancel',    this.commandCancel.bind(this));
	}

	// New
	Scene_Map.prototype.actor = function() {
	  return this._actor;
	};

	// New
	Scene_Map.prototype.actor_skill = function() {
	var i = this._statusWindow._index > -1 ? this._statusWindow._index : 0;
	  return $gameParty.members()[i];
	};

	// New
	Scene_Map.prototype.updateActor = function() {
	  this._actor = $gameParty.menuActor();
	};

	// New
	Scene_Map.prototype.createBackground = function() {
	  this._backgroundSprite = new Sprite();
	  this._backgroundSprite.bitmap = null;//SceneManager.backgroundBitmap();
	  this.addChild(this._backgroundSprite);
	};

	// Overwrite
	Scene_Map.prototype.createDisplayObjects = function() {
	  Scene_MenuBase.prototype.create.call(this);

	  this.createSpriteset();
	  this.createMapNameWindow();
	  this.createBackground();
	  this.updateActor();

	  this.createWindowLayer();
	  this.createTopWindowLayer();

	  this.createCommandWindow();
	  this._commandWindow._openness = 0;
	  this._commandWindow.deactivate();

	  this.createGoldWindow();
	  this._goldWindow._openness = 0;
	  this._goldWindow.deactivate();
	  this.createStatusWindow();
	  this._statusWindow._openness = 0;
	  this._statusWindow.deactivate();

  	  this.create_ItemWindows();
	  this.create_skill();
	  this.create_save();
	  
	  this.createOptionsWindow();
	  this.createCommandWindow_gameEnd();
	  this.create_status();
	  this.createAllWindows();

	  if (Imported.MMOG_SceneMenu){
		Scene_Menu.prototype.loadBitmapsMain.call(this);
		Scene_Menu.prototype.createField.call(this);
		Scene_Menu.prototype.createMonogatari.call(this);
		this._location.visible = false;
		this._field.visible = false;
	  }
	  
	  this.createSceneEquip();

	  this._equip_commandWindow._openness = 0;
	  this._equip_commandWindow.deactivate();

	  this._equip_statusWindow._openness = 0;
	  this._equip_statusWindow.deactivate();

	  this._equip_helpWindow._openness = 0;
	  this._equip_helpWindow.deactivate();

	  this._equip_itemWindow._openness = 0;
	  this._equip_itemWindow.deactivate();

	  this._equip_slotWindow._openness = 0;
	  this._equip_slotWindow.deactivate();
	
	  this._helpWindow_item._openness = 0;
	  this._helpWindow_item.deactivate();

	  this._itemWindow_item._openness = 0;
	  this._itemWindow_item.deactivate();
	  
	  this._categoryWindow_item._openness = 0;
	  this._categoryWindow_item.deactivate();
	  
	  this._actorWindow_item._openness = 0;
	  this._actorWindow_item.deactivate();
	  
	  this._actorWindow_skill._openness = 0;
	  this._actorWindow_skill.deactivate();
	  
	  this._itemWindow_skill._openness = 0;
	  this._itemWindow_skill.deactivate();
	  
	  this._helpWindow_skill._openness = 0;
	  this._helpWindow_skill.deactivate();
	  
	  this._statusWindow_skill._openness = 0;
	  this._statusWindow_skill.deactivate();
	  
	  this._skillTypeWindow._openness = 0;
	  this._skillTypeWindow.deactivate();
	  
	  this._listWindow_save._openness=0;
	  this._listWindow_save.deactivate();
	  this._helpWindow_save._openness=0;
	  this._helpWindow_save.deactivate();
	  
	  this._optionsWindow._openness = 0;
	  this._optionsWindow.deactivate();
	  
	  this._commandWindow_gameEnd._openness = 0;
	  this._commandWindow_gameEnd.deactivate();
	  
	  
	};

	Scene_Map.prototype.addTopWindow = function(window) {
	  this._topWindowLayer.addChild(window);
	};

	Scene_Map.prototype.createTopWindowLayer = function() {
	  var width = Graphics.boxWidth;
	  var height = Graphics.boxHeight;
	  var x = (Graphics.width - width) / 2;
	  var y = (Graphics.height - height) / 2;
	  this._topWindowLayer = new WindowLayer();
	  this._topWindowLayer.move(x, y, width, height);
	  this.addChild(this._topWindowLayer);
	};

	Scene_Map.prototype.moveWindowToTopLayer = function(i){
		this._windowLayer.children.moveToEnd(i);
	};

	Scene_Map.prototype.moveWindowToTopLayerByName = function(windowName, windowIndex){
		var windowIndex = windowIndex || 0, count = 0;
		for (var i = 0; i < this._windowLayer.children.length; i++){
		  if (getObjectName(this._windowLayer.children[i]) === windowName){
			if (count === windowIndex) break;
			count++;
		  }
		}
		this._windowLayer.children.moveToEnd(i);
	};

	Scene_Map.prototype.swapWindowLayerByName = function(winA, winB){
		var n1 = winA.name;
		var n2 = winB.name;
		var windex1 = winA.index || 0;
		var windex2 = winB.index || 0;

		var count = 0;
		for (var i = 0; i < this._windowLayer.children.length; i++){
		  if (getObjectName(this._windowLayer.children[i]) === n1){
			if (count === windex1) {a = i; break;}
			count++;
		  }
		}

		count = 0;
		for (var i = 0; i < this._windowLayer.children.length; i++){
		  if (getObjectName(this._windowLayer.children[i]) === n2){
			if (count === windex2) {b = i; break;}
			count++;
		  }
		}

		this._windowLayer.children.swap(a,b);
	};

	Scene_Map.prototype.swapWindowLayer = function(a,b){
		this._windowLayer.children.swap(a,b);
	};


	Scene_Map.prototype.createActorWindow_skill = function() {
	  this._actorWindow_skill = new Window_MenuActor();
	  this._actorWindow_skill.setHandler('ok',     this.onActorOk_skill.bind(this));
	  this._actorWindow_skill.setHandler('cancel', this.onActorCancel_skill.bind(this));
	  this.addTopWindow(this._actorWindow_skill);
	};

	Scene_Map.prototype.commandCancel_skill = function() {
	  this._actorWindow_skill._openness = 0;
	  this._actorWindow_skill.deactivate();
	  this._itemWindow_skill._openness = 0;
	  this._itemWindow_skill.deactivate();
	  this._helpWindow_skill._openness = 0;
	  this._helpWindow_skill.deactivate();
	  this._statusWindow_skill._openness = 0;
	  this._statusWindow_skill.deactivate();
	  this._skillTypeWindow._openness = 0;
	  this._skillTypeWindow.deactivate();
	  this._statusWindow.refresh();
	  this._statusWindow.activate();
	}

	Scene_Map.prototype.item_skill = function() {
	  return this._itemWindow_skill.item();
	};

	Scene_Map.prototype.isCursorLeft_skill = function() {
	  return this._itemWindow_skill.index() % 2 === 0;
	};

	Scene_Map.prototype.showSubWindow_skill = function(window) {
	  window.x = this.isCursorLeft_skill() ? Graphics.boxWidth - window.width : 0;
	  window.show();
	  window.refresh();
	  window.activate();
	};

	Scene_Map.prototype.hideSubWindow_skill = function(window) {
	  window.hide();
	  window.deactivate();
	  this.activateItemWindow_skill();
	};

	Scene_Map.prototype.onActorOk_skill = function() {
	  if (this.canUse_skill()) {
		  this.useItem_skill();
	  } else {
		  SoundManager.playBuzzer();
	  }
	};

	Scene_Map.prototype.onActorCancel_skill = function() {
	  this.hideSubWindow_skill(this._actorWindow_skill);
	};

	Scene_Map.prototype.determineItem_skill = function() {
	  var action = new Game_Action(this.user_skill());
	  var item = this.item_skill();
	  action.setItemObject(item);
	  if (action.isForFriend()) {
		  this.showSubWindow_skill(this._actorWindow_skill);
		  this._actorWindow_skill.selectForItem(this.item_skill());
	  } else {
		  this.useItem_skill();
		  this.activateItemWindow_skill();
	  }
	};

	Scene_Map.prototype.activateItemWindow_skill = function() {
		$gamePlayer._mainMenu = $gamePlayer._mainMenu || {};
		$gamePlayer._mainMenu.inMenu = $gamePlayer._mainMenu.inMenu || {};
		$gamePlayer._mainMenu.inMenu.currentMenu = 'skill';
		this._itemWindow_skill.refresh();
		this._itemWindow_skill.activate();
	};

	Scene_Map.prototype.itemTargetActors_skill = function() {
	  var action = new Game_Action(this.user_skill());
	  action.setItemObject(this.item_skill());
	  if (!action.isForFriend()) {
		  return [];
	  } else if (action.isForAll()) {
		  return $gameParty.members();
	  } else {
		  return [$gameParty.members()[this._actorWindow_skill.index()]];
	  }
	};

	Scene_Map.prototype.canUse_skill = function() {
	  return this.user_skill().canUse(this.item_skill()) && this.isItemEffectsValid_skill();
	};

	Scene_Map.prototype.isItemEffectsValid_skill = function() {
	  var action = new Game_Action(this.user_skill());
	  action.setItemObject(this.item_skill());
	  return this.itemTargetActors_skill().some(function(target) {
		  return action.testApply(target);
	  }, this);
	};

	Scene_Map.prototype.applyItem_skill = function() {
	  var action = new Game_Action(this.user_skill());
	  action.setItemObject(this.item_skill());
	  this.itemTargetActors_skill().forEach(function(target) {
		  for (var i = 0; i < action.numRepeats(); i++) {
			  action.apply(target);
		  }
	  }, this);
	  action.applyGlobal();
	};

	Scene_Map.prototype.checkCommonEvent = function() {
		if ($gameTemp.isCommonEventReserved()) {

		}
	};

$['Game_Interpreter.prototype.iterateActorId'] = Game_Interpreter.prototype.iterateActorId;
Game_Interpreter.prototype.iterateActorId = function(param, callback) {
	$['Game_Interpreter.prototype.iterateActorId'].apply(this, arguments);	
	SceneManager._scene._actorWindow_item.refresh();
	SceneManager._scene._actorWindow_skill.refresh();
};


Scene_Map.prototype.createMessageWindow = function() {
    this._messageWindow = new Window_Message();
    this.addTopWindow(this._messageWindow);
    this._messageWindow.subWindows().forEach(function(window) {
        this.addTopWindow(window);
    }, this);
};

Scene_Map.prototype.createScrollTextWindow = function() {
    this._scrollTextWindow = new Window_ScrollText();
    this.addTopWindow(this._scrollTextWindow);
};

	Scene_Map.prototype.create_skill = function() {
	  this.createHelpWindow_skill();
	  this.createSkillTypeWindow_skill();
	  this.createStatusWindow_skill();
	  this.createItemWindow_skill();
	  this.createActorWindow_skill();
	};

	Scene_Map.prototype.start_skill = function() {
	  this._statusWindow_skill.refresh();
	  this.refreshActor_skill();
	};

	Scene_Map.prototype.createSkillTypeWindow_skill = function() {
	  var wy = this._helpWindow_skill.height;
	  this._skillTypeWindow = new Window_SkillType(0, wy);
	  this._skillTypeWindow.setHelpWindow(this._helpWindow_skill);
	  this._skillTypeWindow.setHandler('skill',    this.commandSkill_skill.bind(this));
	  this._skillTypeWindow.setHandler('cancel',   this.commandCancel_skill.bind(this));
	//      this._skillTypeWindow.setHandler('pagedown', this.nextActor_skill.bind(this));
	//      this._skillTypeWindow.setHandler('pageup',   this.previousActor_skill.bind(this));
	  this.addWindow(this._skillTypeWindow);
	};

	Scene_Map.prototype.nextActor_skill = function() {
	  $gameParty.makeMenuActorNext();
	  this.updateActor();
	  this.onActorChange_skill();
	};

	Scene_Map.prototype.previousActor_skill = function() {
	  $gameParty.makeMenuActorPrevious();
	  this.updateActor();
	  this.onActorChange_skill();
	};

	Scene_Map.prototype.createStatusWindow_skill = function() {
	  var wx = this._skillTypeWindow.width;
	  var wy = this._helpWindow_skill.height;
	  var ww = Graphics.boxWidth - wx;
	  var wh = this._skillTypeWindow.height;
	  this._statusWindow_skill = new Window_SkillStatus(wx, wy, ww, wh);
	  this._statusWindow_skill.reserveFaceImages();
	  this.addWindow(this._statusWindow_skill);
	};

	Scene_Map.prototype.createItemWindow_skill = function() {
	  var wx = 0;
	  var wy = this._statusWindow_skill.y + this._statusWindow_skill.height;
	  var ww = Graphics.boxWidth;
	  var wh = Graphics.boxHeight - wy;
	  this._itemWindow_skill = new Window_SkillList(wx, wy, ww, wh);
	  this._itemWindow_skill.setHelpWindow(this._helpWindow_skill);
	  this._itemWindow_skill.setHandler('ok',     this.onItemOk_skill.bind(this));
	  this._itemWindow_skill.setHandler('cancel', this.onItemCancel_skill.bind(this));
	  this._skillTypeWindow.setSkillWindow(this._itemWindow_skill);
	  this.addWindow(this._itemWindow_skill);
	};

	Scene_Map.prototype.refreshActor_skill = function() {
	  var actor = this.actor_skill();
	  this._skillTypeWindow.setActor(actor);
	  this._statusWindow_skill.setActor(actor);
	  this._itemWindow_skill.setActor(actor);
	};

	Scene_Map.prototype.user_skill = function() {
	  return this.actor_skill();
	};

	Scene_Map.prototype.commandSkill_skill = function() {
	  this._itemWindow_skill.activate();
	  this._itemWindow_skill.selectLast();
	};

	Scene_Map.prototype.onItemOk_skill = function() {
	  this.actor_skill().setLastMenuSkill(this.item_skill());
	  this.determineItem_skill();
	};

	Scene_Map.prototype.onItemCancel_skill = function() {
	  this._itemWindow_skill.deselect();
	  this._skillTypeWindow.activate();
	};

	Scene_Map.prototype.playSeForItem_skill = function() {
	  SoundManager.playUseSkill();
	};

	Scene_Map.prototype.useItem_skill = function() {
	  this.playSeForItem_skill();
	  this.user_skill().useItem(this.item_skill());
	  this.applyItem_skill();
	  this.checkCommonEvent();
	  this.checkGameover();
	  this._actorWindow_skill.refresh();
	  this._statusWindow_skill.refresh();
	  this._itemWindow_skill.refresh();
	};

	Scene_Map.prototype.onActorChange_skill = function() {
	  this.refreshActor_skill();
	  this._skillTypeWindow.activate();
	};


	Scene_Map.prototype.createSceneEquip = function(){
	  this.createEquipHelpWindow();
	  this.createEquipStatusWindow();
	  this.createEquipCommandWindow();
	  this.createEquipSlotWindow();
	  this.createEquipItemWindow();
	  this.refreshEquipActor();
	};

	Scene_Map.prototype.createEquipHelpWindow = function() {
	  this._equip_helpWindow = new Window_Help();
	  this.addWindow(this._equip_helpWindow);
	};


	Scene_Map.prototype.createEquipStatusWindow = function() {
	  this._equip_statusWindow = new Window_EquipStatus(0, this._equip_helpWindow.height);
	  this.addWindow(this._equip_statusWindow);
	};

	Scene_Map.prototype.createEquipCommandWindow = function() {
	  var wx = this._equip_statusWindow.width;
	  var wy = this._equip_helpWindow.height;
	  var ww = Graphics.boxWidth - this._equip_statusWindow.width;
	  this._equip_commandWindow = new Window_EquipCommand(wx, wy, ww);
	  this._equip_commandWindow.setHelpWindow(this._equip_helpWindow);
	  this._equip_commandWindow.setHandler('equip',    this.commandEquip.bind(this));
	  this._equip_commandWindow.setHandler('optimize', this.commandOptimize.bind(this));
	  this._equip_commandWindow.setHandler('clear',    this.commandClear.bind(this));
	  this._equip_commandWindow.setHandler('cancel',   this.commandCancel_equip.bind(this));
	//      this._equip_commandWindow.setHandler('pagedown', this.nextActor_equip.bind(this));
	//      this._equip_commandWindow.setHandler('pageup',   this.previousActor_equip.bind(this));
	  this.addWindow(this._equip_commandWindow);
	};

	Scene_Map.prototype.nextActor_equip = function() {
	//    $gameParty.makeMenuActorNext_equip();
	//    this.updateActor();
	  this.onActorChange_equip();
	};

	Scene_Map.prototype.previousActor_equip = function() {
	//    $gameParty.makeMenuActorPrevious();
	//    this.updateActor();
	  this.onActorChange_equip();
	};

	Scene_Map.prototype.commandCancel_equip = function() {
		this._equip_commandWindow._openness = 0;
		this._equip_commandWindow.deactivate();

		this._equip_statusWindow._openness = 0;
		this._equip_statusWindow.deactivate();

		this._equip_helpWindow._openness = 0;
		this._equip_helpWindow.deactivate();

		this._equip_itemWindow._openness = 0;
		this._equip_itemWindow.deactivate();

		this._equip_slotWindow._openness = 0;
		this._equip_slotWindow.deactivate();

		this._statusWindow.refresh();
		this._statusWindow.activate();
	};

	Scene_Map.prototype.createEquipSlotWindow = function() {
	  var wx = this._equip_statusWindow.width;
	  var wy = this._equip_commandWindow.y + this._equip_commandWindow.height;
	  var ww = Graphics.boxWidth - this._equip_statusWindow.width;
	  var wh = this._equip_statusWindow.height - this._equip_commandWindow.height;
	  this._equip_slotWindow = new Window_EquipSlot(wx, wy, ww, wh);
	  this._equip_slotWindow.setHelpWindow(this._equip_helpWindow);
	  this._equip_slotWindow.setStatusWindow(this._equip_statusWindow);
	  this._equip_slotWindow.setHandler('ok',       this.onSlotOk.bind(this));
	  this._equip_slotWindow.setHandler('cancel',   this.onSlotCancel.bind(this));
	  this.addWindow(this._equip_slotWindow);
	};

	Scene_Map.prototype.createEquipItemWindow = function() {
	  var wx = 0;
	  var wy = this._equip_statusWindow.y + this._equip_statusWindow.height;
	  var ww = Graphics.boxWidth;
	  var wh = Graphics.boxHeight - wy;
	  this._equip_itemWindow = new Window_EquipItem(wx, wy, ww, wh);
	  this._equip_itemWindow.setHelpWindow(this._equip_helpWindow);
	  this._equip_itemWindow.setStatusWindow(this._equip_statusWindow);
	  this._equip_itemWindow.setHandler('ok',     this.onItemOk_equip.bind(this));
	  this._equip_itemWindow.setHandler('cancel', this.onItemCancel_equip.bind(this));
	  this._equip_slotWindow.setItemWindow(this._equip_itemWindow);
	  this.addWindow(this._equip_itemWindow);
	};

	Scene_Map.prototype.refreshEquipActor = function() {
	  var actor = $gameParty.members()[this._statusWindow._index > -1 ? this._statusWindow._index : 0];
	  this._equip_statusWindow.setActor(actor);
	  this._equip_slotWindow.setActor(actor);
	  this._equip_itemWindow.setActor(actor);
	  
	  this._equip_slotWindow.refresh();
	  this._equip_itemWindow.refresh();
	  this._equip_statusWindow.refresh();
	};

	Scene_Map.prototype.commandEquip = function() {
	  this._equip_slotWindow.activate();
	  this._equip_slotWindow.select(0);
	};

	Scene_Map.prototype.commandOptimize = function() {
	  SoundManager.playEquip();
	  $gameParty.members()[this._statusWindow._index > -1 ? this._statusWindow._index : 0].optimizeEquipments();
	  this._equip_statusWindow.refresh();
	  this._equip_slotWindow.refresh();
	  this._equip_commandWindow.activate();
	};



	Scene_Map.prototype.commandClear = function() {
	  SoundManager.playEquip();
	  $gameParty.members()[this._statusWindow._index > -1 ? this._statusWindow._index : 0].clearEquipments();
	  this._equip_statusWindow.refresh();
	  this._equip_slotWindow.refresh();
	  this._equip_commandWindow.activate();
	};

	Scene_Map.prototype.onSlotOk = function() {
	  this._equip_itemWindow.activate();
	  this._equip_itemWindow.select(0);
	};

	Scene_Map.prototype.onSlotCancel = function() {
	  this._equip_slotWindow.deselect();
	  this._equip_commandWindow.activate();
	};

	Scene_Map.prototype.onItemOk_equip = function() {
	  SoundManager.playEquip();
	  $gameParty.members()[this._statusWindow._index > -1 ? this._statusWindow._index : 0].changeEquip(this._equip_slotWindow.index(), this._equip_itemWindow.item());
	  this._equip_slotWindow.activate();
	  this._equip_slotWindow.refresh();
	  this._equip_itemWindow.deselect();
	  this._equip_itemWindow.refresh();
	  this._equip_statusWindow.refresh();
	};

	Scene_Map.prototype.onItemCancel_equip = function() {
	  this._equip_slotWindow.activate();
	  this._equip_itemWindow.deselect();
	};

	Scene_Map.prototype.onActorChange_equip = function() {
	  this.refreshEquipActor();
	  this._equip_commandWindow.activate();
	};


	//==============================
	// * update
	//==============================
	var ctb_sceneMap_update = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function() {
	ctb_sceneMap_update.call(this)
	if (Imported.MMOG_SceneMenu){
	  Scene_Menu.prototype.update.call(this);
	}
	};

	// New
	Scene_Map.prototype.createGoldWindow = function() {
	Scene_Menu.prototype.createGoldWindow.call(this);
	};

	// New
	Scene_Map.prototype.createStatusWindow = function() {
	Scene_Menu.prototype.createStatusWindow.call(this);
	};

	// New
	Scene_Map.prototype.commandCancel = function() {
	//console.log('canceled');
	this.menuCalling = false;
	$gamePlayer._mainMenu = $gamePlayer._mainMenu || {};
	$gamePlayer._mainMenu.inMenu = false;

	this._backgroundSprite.bitmap = null

	this._commandWindow.close();
	this._goldWindow.close();
	this._statusWindow.close();
	};

	// New
	Scene_Map.prototype.commandItem = function() {
		//$gamePlayer._mainMenu.inMenu = false;
		//Scene_Menu.prototype.commandItem.call(this);
		
		this._helpWindow_item.open();
		this._categoryWindow_item.open();
		this._categoryWindow_item.activate();
		this._itemWindow_item.open();
		this._itemWindow_item.refresh();
		
		this._actorWindow_item.open();
		this._actorWindow_item.refresh();
		this._actorWindow_item.activate();
	};

	// New
	Scene_Map.prototype.commandPersonal = function() {

	Scene_Menu.prototype.commandPersonal.call(this);

	};



	// New
	Scene_Map.prototype.commandFormation = function() {
	if (Imported.MMOG_SceneMenu) $gamePlayer._mainMenu.inMenu = false;
	Scene_Menu.prototype.commandFormation.call(this);
	};

	// New
	Scene_Map.prototype.commandOptions = function() {
		this._optionsWindow.open();
		this._optionsWindow.refresh();
		this._optionsWindow.activate();
	};

	// New
	Scene_Map.prototype.commandSave = function() {
		this._helpWindow_save.open();
		this._listWindow_save.activate();
		this._listWindow_save.open();
		this._listWindow_save.refresh();
		this._helpWindow_save.refresh();
	};

	// New
	Scene_Map.prototype.commandGameEnd = function() {
		this._commandWindow_gameEnd.open();
		this._commandWindow_gameEnd.refresh();
		this._commandWindow_gameEnd.activate();
	};

	Scene_Map.prototype.createHelpWindow_skill = function() {
	  this._helpWindow_skill = new Window_Help();
	  this.addWindow(this._helpWindow_skill);
	};

	Scene_Map.prototype.onPersonalOk = function() {	
	  switch (this._commandWindow.currentSymbol()) {
	  case 'skill':
		  this._actorWindow_skill._openness = 255;
		  this._itemWindow_skill._openness = 255;
		  this._helpWindow_skill._openness = 255;
		  this._statusWindow_skill._openness = 255;
		  this._skillTypeWindow._openness = 255;
		  this._skillTypeWindow.activate();
		  this.start_skill();
		  break;
	  case 'equip':
		  if (this._equip_commandWindow){
			this._equip_commandWindow._openness = 255;
			this._equip_statusWindow._openness = 255;
			this._equip_helpWindow._openness = 255;
			this._equip_itemWindow._openness = 255;
			this._equip_slotWindow._openness = 255;
			var i = this._statusWindow._index > -1 ? this._statusWindow._index : 0
			$gameParty._equipActor = $gameParty.members()[i];
			
			this.refreshEquipActor();

			this._equip_commandWindow.activate();
		  }else{
			  $gamePlayer._mainMenu.inMenu = false;
			  SceneManager.push(Scene_Equip);
		  }
		  break;
	  case 'status':
			  $gamePlayer._mainMenu.inMenu = false;
			  SceneManager.push(Scene_Status);
		  //this._statusWindow_status._openess=255;
		  //this.refreshActor_status();
		  break;
	  }
	};


	// New
	Scene_Map.prototype.onPersonalCancel = function() {
	  Scene_Menu.prototype.onPersonalCancel.call(this);
	};

	// New
	Scene_Map.prototype.onFormationOk = function() {
	  Scene_Menu.prototype.onFormationOk.call(this);
	};

	// New
	Scene_Map.prototype.onFormationCancel = function() {
	  Scene_Menu.prototype.onFormationCancel.call(this);
	};

	// Overwrite
	Scene_Map.prototype.processMapTouch = function() {
	// Small overwrite
	$gamePlayer._mainMenu = $gamePlayer._mainMenu || {inMenu:false};
	if (!$gamePlayer._mainMenu.inMenu){

	  if (TouchInput.isTriggered() || this._touchCount > 0) {
		  if (TouchInput.isPressed()) {
			  if (this._touchCount === 0 || this._touchCount >= 15) {
				  var x = $gameMap.canvasToMapX(TouchInput.x);
				  var y = $gameMap.canvasToMapY(TouchInput.y);
				  $gameTemp.setDestination(x, y);
			  }
			  this._touchCount++;
		  } else {
			  this._touchCount = 0;
		  }
	  }

	}
	};

	// Overwrite
	Scene_Map.prototype.callMenu = function() {
	// Major Overwrite
	$gamePlayer._mainMenu = $gamePlayer._mainMenu || {};

	// Major Overwrite
	var useCTBMenu = CTB.Param.mapMenu.settings.useCTBMenu !== 'false' ? eval(CTB.Param.mapMenu.settings.useCTBMenu) : false;
	if (useCTBMenu){
	  if (!$gamePlayer._mainMenu.inMenu){

		$gamePlayer._mainMenu.inMenu = true;
		SoundManager.playOk();
		$gameTemp.clearDestination();
		this._mapNameWindow.hide();
		this._waitCount = 2;

		(Imported.MMOG_SceneMenu) ? this.callMenu_mog() : this.callMenu_ctb();

		this.menuCalling = false;
	  }
	}else{
	  SoundManager.playOk();
	  SceneManager.push(Scene_Menu);
	  Window_MenuCommand.initCommandPosition();
	  $gameTemp.clearDestination();
	  this._mapNameWindow.hide();
	  this._waitCount = 2;
	}
	};

	Scene_Map.prototype.callMenu_ctb = function(){
	if ($.Param['Blur BG']){
	  SceneManager.snapForBackground();
	  this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
	}

	this._commandWindow.open();
	this._statusWindow.open();
	this._goldWindow.open();
	this._commandWindow.activate();
	this._statusWindow.refresh();
	}

	Scene_Map.prototype.callMenu_mog = function(){
	this._location.visible = true;
	this._field.visible = true;
	//console.log(this);
	}

	//==============================
	// * create Moghunter Menu
	//==============================
	Scene_Map.prototype.createMagicCircle = function() {
	Scene_Menu.prototype.createMagicCircle.call(this);
	};

	Scene_Map.prototype.createCharacters = function() {
	Scene_Menu.prototype.createCharacters.call(this);
	};

	Scene_Map.prototype.createLayout = function() {
	Scene_Menu.prototype.createLayout.call(this);
	};
	Scene_Map.prototype.createCharStatus = function() {
	Scene_Menu.prototype.createCharStatus.call(this);
	};

	Scene_Map.prototype.createAfter = function() {
	Scene_Menu.prototype.createAfter.call(this);
	};

	Scene_Map.prototype.createCommands = function() {
	Scene_Menu.prototype.createCommands.call(this);
	};

	Scene_Map.prototype.createCommandName = function() {
	Scene_Menu.prototype.createCommandName.call(this);
	};

	Scene_Map.prototype.updateCommandName = function() {
	Scene_Menu.prototype.updateCommandName.call(this);
	};

	Scene_Map.prototype.refreshCommandName = function() {
	Scene_Menu.prototype.refreshCommandName.call(this);
	};

	Scene_Map.prototype.refresh_number = function(sprites,value,img_data,x) {
	Scene_Menu.prototype.refresh_number.call(this,sprites,value,img_data,x);
	};

	Scene_Map.prototype.setTouchArrow = function(index) {
	Scene_Menu.prototype.setTouchArrow.call(this, index);
	};

	Scene_Map.prototype.setTouchSelection = function(index) {
	Scene_Menu.prototype.setTouchSelection.call(this, index);
	};

	Scene_Map.prototype.createPlayTime = function() {
	Scene_Menu.prototype.createPlayTime.call(this);
	};

	Scene_Map.prototype.createLocation = function() {
	Scene_Menu.prototype.createLocation.call(this);
	};

	Scene_Map.prototype.createSelection = function() {
	Scene_Menu.prototype.createSelection.call(this);
	};

	Scene_Map.prototype.createFaceArrow = function() {
	Scene_Menu.prototype.createFaceArrow.call(this);
	};

	Scene_Map.prototype.createGold = function() {
	Scene_Menu.prototype.createGold.call(this);
	};

	Scene_Map.prototype.maxMembers = function() {
	   return Scene_Menu.prototype.maxMembers.call(this);
	};

	Scene_Map.prototype.playTimeSec = function() {
	  return Scene_Menu.prototype.playTimeSec.call(this);
	};

	Scene_Map.prototype.updateCommands = function() {
	Scene_Menu.prototype.updateCommands.call(this);
	};

	Scene_Map.prototype.isComEnabled = function(index) {
	return  Scene_Menu.prototype.isComEnabled.call(this, index);
	};

	Scene_Map.prototype.refreshTime = function() {
	  Scene_Menu.prototype.refreshTime.call(this);
	};

	Scene_Map.prototype.updateSelection = function() {
	  Scene_Menu.prototype.updateSelection.call(this);
	};

	Scene_Map.prototype.updateArrow = function() {
	  Scene_Menu.prototype.updateArrow.call(this);
	};

	Scene_Map.prototype.updateTime = function() {
	  Scene_Menu.prototype.updateTime.call(this);
	};

	Scene_Map.prototype.refreshActorName = function() {
	  Scene_Menu.prototype.refreshActorName.call(this);
	};

	Scene_Map.prototype.checkTouchOnSprites = function() {
	  Scene_Menu.prototype.checkTouchOnSprites.call(this);
	};

	Scene_Map.prototype.checkTouchSelection = function() {
	  Scene_Menu.prototype.checkTouchSelection.call(this);
	};

	Scene_Map.prototype.checkTouchCommand = function() {
	  Scene_Menu.prototype.checkTouchCommand.call(this);
	};

	Scene_Map.prototype.updateMagicCircle = function() {
	  Scene_Menu.prototype.updateMagicCircle.call(this);
	};

	Scene_Map.prototype.updateTouchScreen = function() {
	  Scene_Menu.prototype.updateTouchScreen.call(this);
	};

	Scene_Map.prototype.updateWindowStatus = function() {
	  Scene_Menu.prototype.updateWindowStatus.call(this);
	};

	Scene_Map.prototype.updateArrowAni = function() {
	  Scene_Menu.prototype.updateArrowAni.call(this);
	};

	Scene_Map.prototype.isArrow1Visible = function() {
	  Scene_Menu.prototype.isArrow1Visible.call(this);
	};

	Scene_Map.prototype.isArrow2Visible = function() {
	  Scene_Menu.prototype.isArrow2Visible.call(this);
	};

	Scene_Map.prototype.commandMoveTo = function(value,real_value) {
	return Scene_Menu.prototype.commandMoveTo.call(this, value, real_value);
	};

	Scene_Map.prototype.setTouchCommand = function(index) {
	Scene_Menu.prototype.setTouchCommand.call(this, index);
	};

	Scene_Map.prototype.isOnSprite = function(sprite) {
	return Scene_Menu.prototype.isOnSprite.call(this, sprite);
	};

	//-----------------------------------------------------------------------------
	// Window_MenuCommand
	//-----------------------------------------------------------------------------
	// Alias
	var ctb_AddBackButtonToCommandList = Window_MenuCommand.prototype.makeCommandList;
	Window_MenuCommand.prototype.makeCommandList = function() {
	  ctb_AddBackButtonToCommandList.call(this);
	  var addCancel = CTB.Param.mapMenu.settings.addCancel !== 'false' ? eval(CTB.Param.mapMenu.settings.addCancel) : false;
	  if (addCancel) this.addCommand('Cancel', 'cancel', true);
	};

	// Alias
	var ctb_mog_menu_wMenuCom_update = Window_MenuCommand.prototype.update;
	Window_MenuCommand.prototype.update = function() {
	(Imported.MMOG_SceneMenu) ? Window_Selectable.prototype.update.call(this) : ctb_mog_menu_wMenuCom_update.call(this);
	};
	
	//-----------------------------------------------------------------------------
// Scene_Item
//
// The scene class of the item screen.


Scene_Map.prototype.createActorWindow_item = function() {
    this._actorWindow_item = new Window_MenuActor();
    this._actorWindow_item.setHandler('ok',     this.onActorOk_item.bind(this));
    this._actorWindow_item.setHandler('cancel', this.onActorCancel_item.bind(this));
    this.addTopWindow(this._actorWindow_item);
};

Scene_Map.prototype.item_item = function() {
    return this._itemWindow_item.item();
};

Scene_Map.prototype.isCursorLeft_item = function() {
    return this._itemWindow_item.index() % 2 === 0;
};

Scene_Map.prototype.showSubWindow_item = function(window) {
    window.x = this.isCursorLeft_item() ? Graphics.boxWidth - window.width : 0;
    window.show();
	window.refresh();
    window.activate();
};

Scene_Map.prototype.hideSubWindow_item = function(window) {
    window.hide();
    window.deactivate();
    this.activateItemWindow_item();
};

Scene_Map.prototype.onActorOk_item = function() {
			
    if (this.canUse_item()) {
        this.useItem_item();
    } else {
        SoundManager.playBuzzer();
    }
	
	//Scene_Map.prototype.onActorCancel_item.call(this);	
};

Scene_Map.prototype.onActorCancel_item = function() {
    this.hideSubWindow_item(this._actorWindow_item);
};

Scene_Map.prototype.determineItem_item = function() {
    var action = new Game_Action(this.user_item());
    var item = this.item_item();
    action.setItemObject(item);
    if (action.isForFriend()) {
		
        this.showSubWindow_item(this._actorWindow_item);
        this._actorWindow_item.selectForItem(this.item_item());
		
		
		this._actorWindow_item.open();
		this._actorWindow_item.activate();
		
        //this.activateItemWindow_item();
    } else {
        this.useItem_item();
        this.activateItemWindow_item();
    }
};

Scene_Map.prototype.useItem_item = function() {	
    this.playSeForItem();
    this.user_item().useItem(this.item_item());
    this.applyItem_item();
    this.checkCommonEvent();
    this.checkGameover();
    this._actorWindow_item.refresh();
	this._itemWindow_item.redrawCurrentItem();
};

Scene_Map.prototype.activateItemWindow_item = function() {
	$gamePlayer._mainMenu = $gamePlayer._mainMenu || {};
	$gamePlayer._mainMenu.inMenu = $gamePlayer._mainMenu.inMenu || {};
	$gamePlayer._mainMenu.inMenu.currentMenu = 'item';
	
    this._itemWindow_item.refresh();
    this._itemWindow_item.activate();
};

Scene_Map.prototype.itemTargetActors_item = function() {
    var action = new Game_Action(this.user_item());
    action.setItemObject(this.item_item());
    if (!action.isForFriend()) {
        return [];
    } else if (action.isForAll()) {
        return $gameParty.members();
    } else {
        return [$gameParty.members()[this._actorWindow_item.index()]];
    }
};

Scene_Map.prototype.canUse_item = function() {
    return this.user_item().canUse(this.item_item()) && this.isItemEffectsValid_item();
};

Scene_Map.prototype.isItemEffectsValid_item = function() {
    var action = new Game_Action(this.user_item());
    action.setItemObject(this.item_item());
    return this.itemTargetActors_item().some(function(target) {
        return action.testApply(target);
    }, this);
};

Scene_Map.prototype.applyItem_item = function() {
    var action = new Game_Action(this.user_item());
    action.setItemObject(this.item_item());
    this.itemTargetActors_item().forEach(function(target) {
        for (var i = 0; i < action.numRepeats(); i++) {
            action.apply(target);
        }
    }, this);
    action.applyGlobal();
};

//--------------------------------------------------------------------------------------------------------------


$['Scene_Map.prototype.create'] = Scene_Map.prototype.create;
Scene_Map.prototype.create = function() {
    $['Scene_Map.prototype.create'].apply(this, arguments);

};

Scene_Map.prototype.createCategoryWindow_item = function() {
    this._categoryWindow_item = new Window_ItemCategory();
    this._categoryWindow_item.setHelpWindow(this._helpWindow_item);
    this._categoryWindow_item.y = this._helpWindow_item.height;
    this._categoryWindow_item.setHandler('ok',     this.onCategoryOk_item.bind(this));
    this._categoryWindow_item.setHandler('cancel', this.onCategoryClose_item.bind(this));
    this.addWindow(this._categoryWindow_item);
};

Scene_Map.prototype.createItemWindow_item = function() {
    var wy = this._categoryWindow_item.y + this._categoryWindow_item.height;
    var wh = Graphics.boxHeight - wy;
    this._itemWindow_item = new Window_ItemList(0, wy, Graphics.boxWidth, wh);
    this._itemWindow_item.setHelpWindow(this._helpWindow_item);
    this._itemWindow_item.setHandler('ok',     this.onItemOk_item.bind(this));
    this._itemWindow_item.setHandler('cancel', this.onItemCancel_item.bind(this));
    this.addWindow(this._itemWindow_item);
    this._categoryWindow_item.setItemWindow(this._itemWindow_item);
};

Scene_Map.prototype.user_item = function() {
    var members = $gameParty.movableMembers();
    var bestActor = members[0];
    var bestPha = 0;
    for (var i = 0; i < members.length; i++) {
        if (members[i].pha > bestPha) {
            bestPha = members[i].pha;
            bestActor = members[i];
        }
    }
    return bestActor;
};

Scene_Map.prototype.user = function() {
    var members = $gameParty.movableMembers();
    var bestActor = members[0];
    var bestPha = 0;
    for (var i = 0; i < members.length; i++) {
        if (members[i].pha > bestPha) {
            bestPha = members[i].pha;
            bestActor = members[i];
        }
    }
    return bestActor;
};

Scene_Map.prototype.onCategoryOk_item = function() {
    this._itemWindow_item.activate();
    this._itemWindow_item.selectLast();
};

Scene_Map.prototype.onCategoryClose_item = function() {
	this._helpWindow_item.close();
	this._actorWindow_item.close();
	this._actorWindow_item.deactivate();
	this._itemWindow_item.close();
    this._categoryWindow_item.close();
	this._categoryWindow_item.close();
	
	this._commandWindow.open();
	this._statusWindow.open();
	this._goldWindow.open();
	this._commandWindow.activate();
	this._statusWindow.refresh();
};

Scene_Map.prototype.onItemOk_item = function() {
    $gameParty.setLastItem(this.item_item());
    this.determineItem_item();
};

Scene_Map.prototype.onItemCancel_item = function() {
    this._itemWindow_item.deselect();
    this._categoryWindow_item.activate();
};

Scene_Map.prototype.playSeForItem = function() {
    SoundManager.playUseItem();
};

/*
Scene_Map.prototype.useItem_item = function() {
    Scene_MenuBase.prototype.useItem.call(this);
    this._itemWindow_item.redrawCurrentItem();
};
*/

Scene_Map.prototype.createHelpWindow_item = function() {
	this._helpWindow_item = new Window_Help();
	this.addWindow(this._helpWindow_item);
};



	Scene_Map.prototype.start_item = function() {
	  //this._statusWindow_item.refresh();
	  this.refreshActor_item();
	};

/* 	Scene_Map.prototype.createItemTypeWindow_item = function() {
	  var wy = this._helpWindow_item.height;
	  this._itemTypeWindow = new Window_ItemType(0, wy);
	  this._itemTypeWindow.setHelpWindow(this._helpWindow_item);
	  this._itemTypeWindow.setHandler('item',    this.commandItem.bind(this));
	  this._itemTypeWindow.setHandler('cancel',   this.commandCancel_item.bind(this));
	//      this._itemTypeWindow.setHandler('pagedown', this.nextActor_item.bind(this));
	//      this._itemTypeWindow.setHandler('pageup',   this.previousActor_item.bind(this));
	  this.addWindow(this._itemTypeWindow);
	}; */

	Scene_Map.prototype.nextActor_item = function() {
	  $gameParty.makeMenuActorNext();
	  this.updateActor();
	  this.onActorChange_item();
	};

	Scene_Map.prototype.previousActor_item = function() {
	  $gameParty.makeMenuActorPrevious();
	  this.updateActor();
	  this.onActorChange_item();
	};

	Scene_Map.prototype.createStatusWindow_item = function() {
	  var wx = this._itemTypeWindow.width;
	  var wy = this._helpWindow_item.height;
	  var ww = Graphics.boxWidth - wx;
	  var wh = this._itemTypeWindow.height;
	  this._statusWindow_item = new Window_ItemStatus(wx, wy, ww, wh);
	  this._statusWindow_item.reserveFaceImages();
	  this.addWindow(this._statusWindow_item);
	};

	Scene_Map.prototype.actor_item = function() {
	  var i = this._statusWindow._index > -1 ? this._statusWindow._index : 0;
	  return $gameParty.members()[i];
	};

	Scene_Map.prototype.refreshActor_item = function() {
	  var actor = this.actor_item();
	  this._itemTypeWindow.setActor(actor);
	  this._statusWindow_item.setActor(actor);
	  this._itemWindow_item.setActor(actor);
	};

	Scene_Map.prototype.user_item = function() {
	  return this.actor_item();
	};

	Scene_Map.prototype.commandItem_item = function() {
	  this._itemWindow_item.activate();
	  this._itemWindow_item.selectLast();
	};

	Scene_Map.prototype.playSeForItem_item = function() {
	  SoundManager.playUseItem();
	};


	Scene_Map.prototype.onActorChange_item = function() {
	  this.refreshActor_item();
	  this._itemTypeWindow.activate();
	};
	
	Scene_Map.prototype.create_ItemWindows = function() {
	  	this.createHelpWindow_item();
		this.createCategoryWindow_item();
		this.createItemWindow_item();
		this.createActorWindow_item();	  
	};

Scene_Map.prototype.savefileId_save = function() {
    return this._listWindow_save.index() + 1;
};

Scene_Map.prototype.create_save = function() {
this.createHelpWindow_save();
this.createListWindow_save();
}

Scene_Map.prototype.createHelpWindow_save = function() {
    this._helpWindow_save = new Window_Help(1);
    this._helpWindow_save.setText(this.helpWindowText_save());
    this.addWindow(this._helpWindow_save);
};

Scene_Map.prototype.createListWindow_save = function() {
    var x = 0;
    var y = this._helpWindow_save.height;
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight - y;
    this._listWindow_save = new Window_SavefileList(x, y, width, height);
    this._listWindow_save.setHandler('ok',     this.onSavefileOk_save.bind(this));
    this._listWindow_save.setHandler('cancel', this.onSavefileCancel_save.bind(this));
    this._listWindow_save.select(this.firstSavefileIndex_save());
    this._listWindow_save.setTopRow(this.firstSavefileIndex_save() - 2);
    this._listWindow_save.setMode(this.mode_save());
	
    this._listWindow_save.refresh();
    this.addWindow(this._listWindow_save);
};

Scene_Map.prototype.onSavefileCancel_save = function(){
	this._listWindow_save._openness=0;
	this._listWindow_save.deactivate();
	this._helpWindow_save._openness=0;
	this._helpWindow_save.deactivate();
	this._commandWindow.activate();
};


Scene_Map.prototype.activatelistWindow_save = function() {
    this._listWindow_save.activate();
};

Scene_Map.prototype.mode_save = function() {
    return 'save';
};

Scene_Map.prototype.helpWindowText_save = function() {
    return TextManager.saveMessage;
};

Scene_Map.prototype.firstSavefileIndex_save = function() {
    return DataManager.lastAccessedSavefileId() - 1;
};

Scene_Map.prototype.onSavefileOk_save = function() {	
    $gameSystem.onBeforeSave();
    if (DataManager.saveGame(this.savefileId_save())) {
        this.onSaveSuccess_save();
    } else {
        this.onSaveFailure_save();
    }
};

Scene_Map.prototype.onSaveSuccess_save = function() {
    SoundManager.playSave();
	StorageManager.cleanBackup(this.savefileId_save());
    
	this.onSavefileCancel_save();
};

Scene_Map.prototype.onSaveFailure_save = function() {
    SoundManager.playBuzzer();
    this.activatelistWindow_save();
};


Scene_Map.prototype.createOptionsWindow = function() {
    this._optionsWindow = new Window_Options();
    this._optionsWindow.setHandler('cancel', this.close_options.bind(this));
    this.addTopWindow(this._optionsWindow);
};


Scene_Map.prototype.close_options = function() {
    this._optionsWindow.close();
    ConfigManager.save();
	this._commandWindow.activate();
};


Scene_Map.prototype.createCommandWindow_gameEnd = function() {
    this._commandWindow_gameEnd = new Window_GameEnd();
	this._commandWindow_gameEnd.close();
    this._commandWindow_gameEnd.setHandler('toTitle',  this.commandToTitle.bind(this));
    this._commandWindow_gameEnd.setHandler('cancel',   this.close_gameEnd.bind(this));
    this.addTopWindow(this._commandWindow_gameEnd);
};

Scene_Map.prototype.close_gameEnd = function() {
    this._commandWindow_gameEnd.close();
	this._commandWindow.activate();
};

Scene_Map.prototype.commandToTitle = function() {
    this.fadeOutAll();
    SceneManager.goto(Scene_Title);
};

Scene_Map.prototype.close_status = function() {
    this._statusWindow_status._openness=0;
	this._statusWindow_status.deactivate();
	this._statusWindow.refresh();
	this._statusWindow.activate();
};

Scene_Map.prototype.create_status = function() {
    this._statusWindow_status = new Window_Status();
    this._statusWindow_status.setHandler('cancel',   this.close_status.bind(this));
    //this._statusWindow_status.setHandler('pagedown', this.nextActor.bind(this));
    //this._statusWindow_status.setHandler('pageup',   this.previousActor.bind(this));
    this._statusWindow_status.reserveFaceImages();
	this._statusWindow_status._openness=0;
	this._statusWindow_status._active=false;
    this.addWindow(this._statusWindow_status);
};

Scene_Map.prototype.refreshActor_status = function() {
    var actor = $gameParty.members()[0];
    this._statusWindow_status.setActor(actor);
};

Scene_Map.prototype.onActorChange_status = function() {
    this.refreshActor_status();
    this._statusWindow.activate();
};
	
})(CTB.mapMenu);

function returnToProperWindow(){
    if (SceneManager._scene._actorWindow_skill.isOpen() && SceneManager._scene._actorWindow_skill.visible){        SceneManager._scene._actorWindow_skill.activate(); SceneManager._scene._actorWindow_skill.refresh();
	} else if ( SceneManager._scene._actorWindow_item.isOpen() && SceneManager._scene._actorWindow_item.visible){ SceneManager._scene._actorWindow_item.activate();  SceneManager._scene._actorWindow_item.refresh() ;
	} else if ( SceneManager._scene._itemWindow_skill.isOpen()&& SceneManager._scene._itemWindow_skill.visible){ SceneManager._scene._itemWindow_skill.activate();  SceneManager._scene._itemWindow_skill.refresh() ;
	} else if (  SceneManager._scene._itemWindow_item.isOpen() && SceneManager._scene._itemWindow_item.visible){ SceneManager._scene._itemWindow_item.activate();   SceneManager._scene._itemWindow_item.refresh()  ;}
}