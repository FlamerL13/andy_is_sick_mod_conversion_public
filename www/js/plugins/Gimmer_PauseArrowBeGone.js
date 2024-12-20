if(Gimmer_Core === undefined){
    throw "Gimmer_Core is required for this plugin";
}

Imported = Imported || {};
Imported['Gimmer_PauseArrowBeGone'] = 1.0;

Gimmer_Core['PauseArrowBeGone'] = {'loaded':true};

//=============================================================================
/*:
 * @plugindesc v1.0 - Hide the pause arrow using a plugin command
 * @author Gimmer_
 * @help
 *
 * * =====================
 * Gimmer_PauseArrowBeGone
 * =======================
 *
 * Run the plugin command "HidePauseArrow" to hide the pause arrow in a Message window
 * Run the plugin command "ShowPauseArrow" to show the pause arrow in a message window
 *
 * Terms of Use:
 * =======================================================================
 * Free for both commercial and non-commercial use, with credit.
 * More Gimmer_ plugins at: https://github.com/gimmer/RPG-Maker-MV-Plugins
 * =======================================================================
 */

Gimmer_Core.PauseArrowBeGone.hidding = true;

Gimmer_Core.pluginCommands['HIDEPAUSEARROW'] = function (){
    Gimmer_Core.PauseArrowBeGone.hidding = true;
}

Gimmer_Core.pluginCommands['SHOWPAUSEARROW'] = function (){
    Gimmer_Core.PauseArrowBeGone.hidding = false;
}

Gimmer_Core.PauseArrowBeGone._Window_prototype_updatePauseSign = Window.prototype._updatePauseSign;
Window.prototype._updatePauseSign = function (){
    if(Gimmer_Core.PauseArrowBeGone.hidding){
        this._windowPauseSignSprite.visible = false;
    }
    else{
        Gimmer_Core.PauseArrowBeGone._Window_prototype_updatePauseSign.call(this);
    }
}