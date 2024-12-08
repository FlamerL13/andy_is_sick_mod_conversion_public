//=============================================================================
// SimpleVoice.js
// ----------------------------------------------------------------------------
// (C)2017 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.3.0 2021/06/27 Added command to reserve voice performance
// 1.2.0 2021/03/04 Added ability to specify performance files from subfolders
// 1.1.3 2020/04/15 Fixed a problem in 1.1.2 where stopping voices played at the same time did not work
// 1.1.2 2020/04/08 Fixed problem with multiple voices playing at short intervals on different channels, where the voice played first would not play
// 1.1.1 2019/01/22 Fixed issue where SV_STOP_VOICE may not work when playing with event acceleration
// 1.1.0 07/16/2017 Added the ability to specify a channel for a voice. Voices on the same channel will not be played back at the same time.
// 1.0.1 2017/06/26 Changed how to specify plugin commands in English.
// 1.0.0 2017/06/25 First version
// ----------------------------------------------------------------------------
// [Blog]   : https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
* @plugindesc SimpleVoicePlugin
* @author triacontane
*
* @param FolderName
* @type string
* @desc The name of the folder where the voice files are stored.
* @default voice
*
* @param OptionName
* @type string
* @desc The name of the Volume Voice setting item displayed on the options screen.
* @default Volume Voice
*
* @param OptionValue
* @type number
* @desc The initial value of the Volume Voice.
* @default 100
*
* @help Provides simple support for voice performance.
* The storage folder can be separated from normal sound effects, and the volume can be specified separately on the options screen.
*
* Playing and looping are performed using plugin commands.
*
* Plugin command details
* Execute from the event command "Plugin command".
* (Separate parameters with a half-width space)
*
* SV_Voice Play aaa 90 100 0 2 # Plays the specified voice.
* SV_PLAY_VOICE aaa 90 100 0 2 # Same as above
* * Specific arguments are as follows.
* 0: File name (no extension required)
* 1: Volume (90 if omitted)
* 2: Pitch (100 if omitted)
* 3: Phase (0 if omitted)
* 4: Channel number
*
* If you specify a channel number (number), you can stop all voices at once that match the specified channel
* when stopping.
* This prevents voices on the same channel from playing at the same time.
*
* SV_Voice Loop Play aaa 90 100 0 # Plays the specified voice in a loop.
* SV_PLAY_LOOP_VOICE aaa 90 100 0 # Same as above
*
* SV_Stop_Voice aaa # Stops the playback of voice aaa.
* SV_STOP_VOICE aaa # Same as above
* SV_Stop_Voice 1 # Stops the playback of all voices played on channel [1].
* SV_STOP_VOICE 1 # Same as above
* * If the argument is omitted, all voices will be stopped.
*
* This plugin is released under the MIT License.
*/

/*:ja
* @plugindesc Simple voice plugin
* @author Triacontan
*
* @param Folder name
* @type string
* @desc The name of the folder where the voice files are stored.
* @default voice
*
* @param Option name
* @type string
* @desc The name of the Volume Voice setting item displayed on the options screen.
* @default Volume Voice
*
* @param Option default
* @type number
* @desc The default Volume Voice.
* @default 100
*
* @help Provides simple support for voice playing.
* The folder can be separated from normal sound effects, and the volume can be specified separately on the options screen.
*
* Playing and looping are performed using plugin commands.
*
* Plugin command details
* Execute from the event command "Plugin command".
* (Separate parameters with a half-width space)
*
* SV_Voice play aaa 90 100 0 2 # Plays the specified voice.
* SV_PLAY_VOICE aaa 90 100 0 2 # Same as above
* * Specific arguments are as follows.
* 0: File name (extension not required)
* 1: Volume (90 if omitted)
* 2: Pitch (100 if omitted)
* 3: Phase (0 if omitted)
* 4: Channel number
* * If you specify a path for the file name, you can play sound effects in subfolders.
* Example: SV_PLAY_VOICE sub/aaa 90 100 0 2
*
* If you specify a channel number (numeric value), you can stop all voices at once that match the specified channel
* This prevents voices on the same channel from being played at the same time.
*
* SV_Voice Loop Play aaa 90 100 0 # Play the specified voice in a loop.
* SV_PLAY_LOOP_VOICE aaa 90 100 0 # Same as above
*
* SV_Voice Stop aaa # Stop playing voice aaa.
* SV_STOP_VOICE aaa # As above
* SV_Stop_Voice 1 # Stops all voices played on channel [1].
* SV_STOP_VOICE 1 # As above
* * If the argument is omitted, all voices will be stopped.
*
* SV_Reserve_Voice_Playback aaa 90 100 0 2 # Reserves the specified voice performance.
* SV_RESERVE_VOICE aaa 90 100 0 2 # As above
* SV_Reserve_Voice_Loop_Playback aaa 90 100 0 2 # Reserves the specified loop voice performance.
* SV_RESERVE_LOOP_VOICE aaa 90 100 0 2 # As above
*
* Terms of Use:
* Modification and redistribution are possible without permission from the author, and there are no restrictions on the form of use (commercial use, 18+ use, etc.)
* * This plugin is now yours.
*/

(function() {
    'use strict';
    var pluginName    = 'SimpleVoice';
    var metaTagPrefix = 'SV_';

    //=============================================================================
    // Local function
    // Formats and checks plugin parameters and plugin command parameters
    //=============================================================================
    var getParamString = function(paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (var i = 0; i < paramNames.length; i++) {
            var name = PluginManager.parameters(pluginName)[paramNames[i]];
            if (name) return name;
        }
        return '';
    };

    var getParamNumber = function(paramNames, min, max) {
        var value = getParamString(paramNames);
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseInt(value) || 0).clamp(min, max);
    };

    var getArgNumber = function(arg, min, max) {
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseInt(arg) || 0).clamp(min, max);
    };

    var convertEscapeCharacters = function(text) {
        if (isNotAString(text)) text = '';
        var windowLayer = SceneManager._scene._windowLayer;
        return windowLayer ? windowLayer.children[0].convertEscapeCharacters(text) : text;
    };

    var isNotAString = function(args) {
        return String(args) !== args;
    };

    var convertAllArguments = function(args) {
        for (var i = 0; i < args.length; i++) {
            args[i] = convertEscapeCharacters(args[i]);
        }
        return args;
    };

    var setPluginCommand = function(commandName, methodName) {
        pluginCommandMap.set(metaTagPrefix + commandName, methodName);
    };

    //=============================================================================
    // Get and format the parameters
    //=============================================================================
    var param         = {};
    param.folderName  = getParamString(['FolderName', 'フォルダ名']);
    param.optionName  = getParamString(['OptionName', 'オプション名称']);
    param.optionValue = getParamNumber(['OptionValue', 'オプション初期値']);

    var pluginCommandMap = new Map();
    setPluginCommand('ボイスの演奏', 'execPlayVoice');
    setPluginCommand('PLAY_VOICE', 'execPlayVoice');
    setPluginCommand('ボイスのループ演奏', 'execPlayLoopVoice');
    setPluginCommand('PLAY_LOOP_VOICE', 'execPlayLoopVoice');
    setPluginCommand('ボイスの停止', 'execStopVoice');
    setPluginCommand('STOP_VOICE', 'execStopVoice');
    setPluginCommand('ボイスの演奏の予約', 'execReserveVoice');
    setPluginCommand('RESERVE_VOICE', 'execReserveVoice');
    setPluginCommand('ボイスのループ演奏の予約', 'execReserveLoopVoice');
    setPluginCommand('RESERVE_LOOP_VOICE', 'execReserveLoopVoice');

    //=============================================================================
    // Game_Interpreter
    // Define additional plugin commands.
    //=============================================================================
    var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        var pluginCommandMethod = pluginCommandMap.get(command.toUpperCase());
        if (pluginCommandMethod) {
            this[pluginCommandMethod](convertAllArguments(args));
        }
    };

    Game_Interpreter.prototype.execPlayVoice = function(args, loop) {
        var voice    = {};
        voice.name   = args.length >= 1 ? args[0] : '';
        voice.volume = args.length >= 2 ? getArgNumber(args[1], 0, 100) : 90;
        voice.pitch  = args.length >= 3 ? getArgNumber(args[2], 50, 150) : 100;
        voice.pan    = args.length >= 4 ? getArgNumber(args[3], -100, 100) : 0;
        var channel  = args.length >= 5 ? getArgNumber(args[4], 1) : undefined;
        AudioManager.playVoice(voice, loop || false, channel);
    };

    Game_Interpreter.prototype.execPlayLoopVoice = function(args) {
        this.execPlayVoice(args, true);
    };

    Game_Interpreter.prototype.execReserveVoice = function(args, loop) {
        var channel = args.length >= 5 ? getArgNumber(args[4], 1) : undefined;
        if (AudioManager.isExistVoiceChannel(channel)) {
            setTimeout(this.execReserveVoice.bind(this, args, loop), 16);
            return;
        }
        this.execPlayVoice(args, loop);
    };

    Game_Interpreter.prototype.execReserveLoopVoice = function(args) {
        this.execReserveVoice(args, true);
    };

    Game_Interpreter.prototype.execStopVoice = function(args) {
        var channel = Number(args[0]);
        if (isNaN(channel)) {
            AudioManager.stopVoice(args[0], null);
        } else {
            AudioManager.stopVoice(null, channel);
        }
    };

    //=============================================================================
    // ConfigManager
    // Add a Volume Voice setting function.
    //=============================================================================
    Object.defineProperty(ConfigManager, 'voiceVolume', {
        get: function() {
            return AudioManager._voiceVolume;
        },
        set: function(value) {
            AudioManager.voiceVolume = value;
        }
    });

    var _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData      = function() {
        var config         = _ConfigManager_makeData.apply(this, arguments);
        config.voiceVolume = this.voiceVolume;
        return config;
    };

    var _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData      = function(config) {
        _ConfigManager_applyData.apply(this, arguments);
        var symbol       = 'voiceVolume';
        this.voiceVolume = config.hasOwnProperty(symbol) ? this.readVolume(config, symbol) : param.optionValue;
    };

    //=============================================================================
    // Window_Options
    // Add a Volume Voice setting.
    //=============================================================================
    var _Window_Options_addVolumeOptions      = Window_Options.prototype.addVolumeOptions;
    Window_Options.prototype.addVolumeOptions = function() {
        _Window_Options_addVolumeOptions.apply(this, arguments);
        this.addCommand(param.optionName, 'voiceVolume');
    };

    //=============================================================================
    // AudioManager
    // Define additional voice playing functions.
    //=============================================================================
    Object.defineProperty(AudioManager, 'voiceVolume', {
        get: function() {
            return this._voiceVolume;
        },
        set: function(value) {
            this._voiceVolume = value;
        }
    });

    AudioManager.updateVoiceParameters = function(buffer, voice) {
        this.updateBufferParameters(buffer, this._voiceVolume, voice);
    };

    AudioManager._voiceBuffers = [];
    AudioManager._voiceVolume  = 100;
    AudioManager.playVoice     = function(voice, loop, channel) {
        if (voice.name) {
            this.stopVoice(voice.name, channel);
            var realPath = this.getRealVoicePath(param.folderName, voice.name);
            var realName = this.getRealVoiceName(voice.name);
            var buffer = this.createBuffer(realPath, realName);
            this.updateVoiceParameters(buffer, voice);
            buffer.play(loop);
            buffer.name = voice.name;
            buffer.channel = channel;
            this._voiceBuffers.push(buffer);
        }
    };

    AudioManager.getRealVoicePath = function(path1, path2) {
        if (path2.includes('/')) {
            return path1 + '/' + path2.replace(/(.*)\/.*/, function() {
                return arguments[1];
            });
        } else {
            return path1;
        }
    };

    AudioManager.getRealVoiceName = function(path) {
        if (path.includes('/')) {
            return path.replace(/.*\/(.*)/, function() {
                return arguments[1];
            });
        } else {
            return path;
        }
    };

    AudioManager.stopVoice = function(name, channel) {
        this._voiceBuffers.forEach(function(buffer) {
            if (!name && !channel || buffer.name === name || buffer.channel === channel) {
                buffer.stop();
            }
        });
        this.filterPlayingVoice();
    };

    AudioManager.filterPlayingVoice = function() {
        this._voiceBuffers = this._voiceBuffers.filter(function(buffer) {
            var playing = buffer.isPlaying() || !buffer.isReady();
            if (!playing) {
                buffer.stop();
            }
            return playing;
        });
    };

    AudioManager.isExistVoiceChannel = function(channel) {
        this.filterPlayingVoice();
        return this._voiceBuffers.some(function(buffer) {
            if (buffer._sourceNode && buffer._sourceNode.loop) {
                return false;
            }
            return buffer.channel === channel || channel === undefined;
        });
    };

    var _AudioManager_stopAll = AudioManager.stopAll;
    AudioManager.stopAll = function() {
        _AudioManager_stopAll.apply(this, arguments);
        this.stopVoice();
    };

    //=============================================================================
    // Scene_Base
    // SE will also stop playing when fading out.
    //=============================================================================
    var _Scene_Base_fadeOutAll = Scene_Base.prototype.fadeOutAll;
    Scene_Base.prototype.fadeOutAll = function() {
        _Scene_Base_fadeOutAll.apply(this, arguments);
        AudioManager.stopVoice();
    };
})();
