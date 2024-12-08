/*=============================================================================
 *  CallMenu.js
 *=============================================================================*/

var Imported = Imported || {};
Imported.CallMenu = true;

/*:=============================================================================
* @plugindesc v1.4.6 Call menu during messages\choices on map by pressing one of the standard menu keys ESC, X, Insert, NUM 0.
* @author Krimer
* @help
* If you want call menu during choices just disallow cancel in choice command.
* Place this plugin below non-standard message systems or choice windows in
* plugin manager for better compatibility.

* =============================================================================*/

/*=============================================================================*/
/* Alias */
var _Game_Temp_initialize_Alias = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_Game_Temp_initialize_Alias.call(this)
	this._savedInterpreter = null;
	this._lastSelectedChoice = null;
};
/* NEW */
Game_Temp.prototype.saveInterpreter = function(f) {
    this._savedInterpreter = f
};
/* NEW */
Game_Temp.prototype.getSavedInterpreter = function() {
	return this._savedInterpreter
};
/* NEW */
Game_Temp.prototype.setLastSelectedChoice = function(f) {
    this._lastSelectedChoice = f
};
/* NEW */
Game_Temp.prototype.getLastSelectedChoice = function() {
	return this._lastSelectedChoice
};
/* Alias */
var _Window_ChoiceList_callOkHandler = Window_ChoiceList.prototype.callOkHandler
Window_ChoiceList.prototype.callOkHandler = function() {
	$gameTemp.setLastSelectedChoice(null)
	_Window_ChoiceList_callOkHandler.call(this);
};
/* Alias */
var _Window_ChoiceList_callCancelHandler = Window_ChoiceList.prototype.callCancelHandler
Window_ChoiceList.prototype.callCancelHandler = function() {
	$gameTemp.setLastSelectedChoice(null)
	_Window_ChoiceList_callCancelHandler.call(this);
};
/* Alias */
var _Window_ChoiceList_selectDefault = Window_ChoiceList.prototype.selectDefault
Window_ChoiceList.prototype.selectDefault = function() {
	if ($gameTemp.getLastSelectedChoice() !== null){
		this.select($gameTemp.getLastSelectedChoice());
	} else {
		_Window_ChoiceList_selectDefault.call(this);
	}  
};
/* Alias*/
var _Window_ChoiceList_update = Window_ChoiceList.prototype.update
Window_ChoiceList.prototype.update = function() {
	_Window_ChoiceList_update.call(this);
	 if ((Input.isTriggered('escape') || Input.isTriggered('menu') || TouchInput.isCancelled()) && $gameMessage.isBusy() && $gameSystem.isMenuEnabled()) {
		$gameTemp.setLastSelectedChoice(this._index)
    }

}; 

/* Alias */
var _Game_Interpreter_setupChoices_Alias = Game_Interpreter.prototype.setupChoices;
Game_Interpreter.prototype.setupChoices = function(params) {
	_Game_Interpreter_setupChoices_Alias.call(this, params);
	$gameTemp.saveInterpreter(this)
};
/* Alias */
var _DataManager_makeSaveContents_Alias = DataManager.makeSaveContents;
DataManager.makeSaveContents = function () {
    var contents = _DataManager_makeSaveContents_Alias.call(this);
    contents.message = $gameMessage;
	if ($gameMessage._choices.length !== 0) {
	   contents.interpreter = $gameTemp.getSavedInterpreter()
	}
    return contents;
};
/* Alias */
var _DataManager_extractSaveContents_Alias = DataManager.extractSaveContents;
DataManager.extractSaveContents = function (contents) {
    _DataManager_extractSaveContents_Alias.call(this, contents);
    $gameMessage = contents.message;
	if ($gameMessage._choices.length !== 0) {
		var gameInterpreter = contents.interpreter
		$gameTemp.saveInterpreter(gameInterpreter)
		$gameMessage.setChoiceCallback(function(n) {
			gameInterpreter._branch[gameInterpreter._indent] = n;
		}.bind(this));
	}
};
/* Alias */
var _Scene_Map_update_Alias = Scene_Map.prototype.update;
Scene_Map.prototype.update = function () {
    _Scene_Map_update_Alias.call(this);
    if ((Input.isTriggered('escape') || Input.isTriggered('menu') || TouchInput.isCancelled()) && $gameMessage.isBusy() && $gameSystem.isMenuEnabled()) {
        this.callMenu();
    }
};
/* OVERWRITE */
Window_Message.prototype.isTriggered = function () {
    return (Input.isRepeated('ok') || TouchInput.isRepeated());
};
/* Galv_VisualNovelChoices Compatibility */
if (Imported.Galv_VisualNovelChoices) {
	var _Window_ChoiceList_drawItem_Alias = Window_ChoiceList.prototype.drawItem 
	Window_ChoiceList.prototype.drawItem = function(index) {
	if(typeof this.choice_background === 'undefined'){
		this.choice_background = [];
	};
		_Window_ChoiceList_drawItem_Alias.call(this, index);
	};
}
/* SRD_TitleCommandCustomizer Compatibility */
if (Imported["SumRndmDde Title Command Customizer"]) {
	var _Scene_Title_createMessageWindow_Alias = Scene_Title.prototype.createMessageWindow
	Scene_Title.prototype.createMessageWindow = function() {
		$gameMessage.clear();
		_Scene_Title_createMessageWindow_Alias.call(this)
		
	};
}

/* End of File */
/*=============================================================================*/