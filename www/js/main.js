//=============================================================================
// main.js
//=============================================================================

const GAME_VERSION = "1.0";

PluginManager.setup($plugins);

window.onload = function() {
    SceneManager.run(Scene_Boot);
};
