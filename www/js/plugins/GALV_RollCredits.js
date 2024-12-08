//-----------------------------------------------------------------------------
//  Galv's Roll Credits
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_RollCredits.js
//-----------------------------------------------------------------------------
//  2017-08-08 - Version 1.5 - fixed casing issues with file references
//  2017-06-02 - Version 1.4 - fixed bug when using title screen credit option
//  2017-05-01 - Version 1.3 - added code to wait for txt file to finish load
//                             before running scene (in hope of fixing issue
//                             some people seem to have).
//  2016-09-07 - Version 1.2 - added touch to skip credit blocks
//                             added music setting for title credits
//  2016-09-01 - Version 1.1 - force windowskin to 0 opacity in case another
//                             plugin changes that opacity
//  2016-07-14 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_RollCredits = true;

var Galv = Galv || {};            // Galv's main object
Galv.CRED = Galv.CRED || {};        // Galv's stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.5) A plugin that calls a new scene to display scrolling information located in an external text file.
 * 
 * @author Galv - galvs-scripts.com
 *
 * @param Folder
 * @desc The folder name in your project where the Credits.txt file is located.
 * @default data
 *
 * @param Skippable
 * @desc true or false if cancel button skips all blocks and closes scene
 * @default true
 *
 * @param Block Skipping
 * @desc true or false if okay button skips current block to show next block
 * @default true
 *
 * @param Title Menu
 * @desc Text that appears in the title menu. Make blank to not show in title menu.
 * @default Credits
 *
 * @param Title Credits Music
 * @desc Music that plays when the credits are run from the title scene
 * @default
 * 
 *
 * @help
 *   Galv's Roll Credits
 * ----------------------------------------------------------------------------
 * This plugin uses external text files to control what text is displayed when
 * calling a "Roll Credits" style scene. This text file contains tags to set
 * how text blocks will display (eg. scroll or fade in/out).
 *
 * REQUIRED TAGS:
 * Text must be placed inside the following tag and you can have multiple of
 * these tages in the same .txt file to make each block of text display in
 * a different way.
 *
 *     <block:time,scroll,fadeIn,fadeOut,ypos,align,image>
 *     your text here
 *     </block>
 *
 * time    = amount of time text within tag is displayed before the next tag.
 *           this can be -1 for auto
 * scroll  = how fast the text scrolls. negative for up, positive for down
 * fadeIn  = how fast the tag text fades in (make this 255 to instant appear)
 * fadeOut = how fast the tag text fades out (255 to instant disappear)
 * ypos    = the starting y position of the block of text on screen. This can
 *           be a pixel value or you can use offtop or offbot to have the text
 *           begind offscreen (so you can scroll it on)
 * align   = left,center or right
 * image   = image name in /img/titles1/ folder to use as background. Leave
 *           this out to use the previous image.
 * ----------------------------------------------------------------------------
 *  SCRIPT CALL
 * ----------------------------------------------------------------------------
 * 
 *    Galv.CRED.start("filename");    // filename of .txt file located in the
 *                                    // folder you chose in the settings
 *                                    // if no filename specified or if run
 *                                    // directly using SceneManager.push,
 *                                    // then it will use "Credits.txt"
 *
 * ----------------------------------------------------------------------------
 * NOTE: For other scripts, the credit scene is called:
 * Scene_Credits
 * ----------------------------------------------------------------------------
 */

//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {


Galv.CRED.skippable = PluginManager.parameters('Galv_RollCredits')["Skippable"].toLowerCase() == 'true' ? true : false;
Galv.CRED.bSkip = PluginManager.parameters('Galv_RollCredits')["Block Skipping"].toLowerCase() == 'true' ? true : false;
Galv.CRED.titleText = PluginManager.parameters('Galv_RollCredits')["Title Menu"];
Galv.CRED.bgm = {name:PluginManager.parameters('Galv_RollCredits')["Title Credits Music"],pan:0,pitch:100,volume:90};


// GET TXT FILE
//-----------------------------------------------------------------------------

Galv.CRED.file = {};
Galv.CRED.file.getString = function(filePath) {
	var request = new XMLHttpRequest();
	request.open("GET", filePath);
	request.overrideMimeType('application/json');
	request.onload = function() {
		if (request.status < 400) {
			Galv.CRED.createCreds(request.responseText);
		}
	};
	request.send();
};

Galv.CRED.createCreds = function(string) {

	string = string.replace("<VERSION>", GAME_VERSION);
	var lines = string.split("\n");
	var bIndex = 0;
	var record = false;
	Galv.CRED.txtArray = [];

	for (var i = 0; i < lines.length; i++) {
		if (lines[i].contains('</block>')) {
			record = false;
			bIndex += 1;
		} else if (lines[i].contains('<block:')) {
			Galv.CRED.txtArray[bIndex] = [];
			record = true;
		};

		if (record) Galv.CRED.txtArray[bIndex].push(lines[i]);
	};
};


Galv.CRED.start = function(filename) {
	Galv.CRED.tempFilename = filename;
	Galv.CRED.fileName();
	SceneManager.push(Scene_Credits);
};

Galv.CRED.fileName = function() {
	//if (!Galv.CRED.txtArray) {
		var filename = Galv.CRED.tempFilename || "Credits";
		var folder = PluginManager.parameters('Galv_RollCredits')["Folder"];
		if (folder !== "") folder = folder + "/";
		Galv.CRED.file.getString(folder + filename + ".txt");
	//};

};

})();



// WINDOW CREDITS
//-----------------------------------------------------------------------------

function Window_Credits() {
    this.initialize.apply(this, arguments);
}

Window_Credits.prototype = Object.create(Window_Base.prototype);
Window_Credits.prototype.constructor = Window_Credits;

Window_Credits.prototype.initialize = function(blockId) {
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this._id = blockId;
	this.createVars();
	this.refresh();
};

Window_Credits.prototype.txt = function() {
	return Galv.CRED.txtArray[this._id];
};

Window_Credits.prototype.createVars = function() {
	this._textArray = this.txt();
	this._complete = false;
	this.opacity = 0;
	this.contentsOpacity = 0;

	// settings
	var txt = this.txt() || ' ';
	var a = txt[0].toLowerCase().match(/<block:(.*)>/i);
	a = a[1].split(",");
	if (!a) return;
	this._timer = Number(a[0]);
	this._scroll = Number(a[1]) * 0.5;
	this._fadeIn = Number(a[2]);
	this._fadeOut = Number(a[3]);
	var isNumber = Number(a[4]);
	if (isNumber) {
		this.y = Number(a[4]);
		this._ypos = "";
	} else {
		this._ypos = a[4] || "";
	};
	this._align = a[5] || "left";
	// 6 is image
};

Window_Credits.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.opacity = 0;
	if (this._timer > 0) { // timer active
		this.contentsOpacity += this._fadeIn;
		this._timer -= 1;
	} else { // timer ends
		this.contentsOpacity -= this._fadeOut;
		if (this.contentsOpacity <= 0) this._complete = true;
	};
	this.y += this._scroll;
};

Window_Credits.prototype.refresh = function() {
	this._allTextHeight = 1;
	// Draw all lines
	for (var i = 1; i < this._textArray.length;i++) {
		var textState = { index: 0 };
		textState.text = this.convertEscapeCharacters(this._textArray[i]);
		this.resetFontSettings();
		this._allTextHeight += this.calcTextHeight(textState, false);
	};
	
	// window height
	this.height = this.contentsHeight() + this.standardPadding() * 2;
	this.createContents();
	
	if (this._ypos.contains('offbot')) {
		this.y = Graphics.height;
	} else if (this._ypos.contains('offtop')) {
		this.y = -height;
	};
	
	// Set auto timer if -1 (auto)
	if (this._timer < 0) {
		if (this._scroll == 0) {
			this._timer = 2 * this._allTextHeight; // set timer depending on amount of text
		} else if (this._scroll < 0) {
			// calc how many frames it will take for message to leave screen
			var distance = Math.abs(this.y) + this.height;
			this._timer = distance / Math.abs(this._scroll);
		} else if (this._scroll > 0) {
			// calc how many frames it will take for message to leave screen
			//var distance = Math.abs(this.y);
			//this._timer = distance / this._scroll;
		};
	};
	
	// Draw lines
	var cy = 0;
	for (var i = 1; i < this._textArray.length;i++) {
	    var textState = {index:0,text:this._textArray[i]};
		var x = this.textPadding();
		var w = this.testWidthEx(textState.text);
		var h = this.cTextHeight;

		if (this._align == 'center') {
			x = this.contents.width / 2 - w / 2;
		} else if (this._align == 'right') {
			x = this.contents.width - this.textPadding() - w;
		};
		this.drawTextEx(textState.text, x, cy);
		cy += h;
	};
	
	this._allTextHeight = cy;
	this.height = cy + this.standardPadding() * 2;
};

Window_Credits.prototype.testWidthEx = function(text) {
    return this.drawTextExTest(text, 0, this.contents.height);
};

Window_Credits.prototype.drawTextExTest = function(text, x, y) {
	this.testActive = false;
    if (text) {
		this.resetFontSettings();
		this.testActive = true;
        var textState = { index: 0, x: x, y: y, left: x };
        textState.text = this.convertEscapeCharacters(text);
        textState.height = this.calcTextHeight(textState, false);
		this.cTextHeight = textState.height;
        while (textState.index < textState.text.length) {
            this.processCharacter(textState);
        }
		this.testActive = false;
        return textState.x - x;
    } else {
        return 0;
    }
};


Window_Credits.prototype.contentsHeight = function() {
    return Math.max(this._allTextHeight, 1);
};


// SCENE CREDITS
//-----------------------------------------------------------------------------

function Scene_Credits() {
    this.initialize.apply(this, arguments);
}

Scene_Credits.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Credits.prototype.constructor = Scene_Credits;

Scene_Credits.prototype.initialize = function() {
	this._blockId = 0;
	//this._blocks = [];
	this._txtLoaded = false;
	this._bgs = [];
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Credits.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
	//this.createBlock();
};

Scene_Credits.prototype.isReady = function() {
    if (Scene_Base.prototype.isReady.call(this)) {
        return Galv.CRED.txtArray;// && this._blocks[0];
    } else {
        return false;
    }
};

Scene_Credits.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
	this.updateInput();
	this.updateBlocks();
};

Scene_Credits.prototype.updateInput = function() {
	if (Input.isTriggered('cancel') && Galv.CRED.skippable) {
		this.endScene();
	} else if ((TouchInput.isPressed() || Input.isTriggered('ok')) && Galv.CRED.bSkip) {
		if (this._blocks && this._blocks[this._blockId]) this._blocks[this._blockId]._timer = 0;
	};
};

Scene_Credits.prototype.updateBlocks = function() {

	if (!this._txtLoaded) {
		// wait for load
		if (Galv.CRED.txtArray) {
			this._txtLoaded = true;
			this._blocks = [];
			this.createBlock();
		}
	} else {
		// loaded, update as normal
		// If CURRENT block timer is up, create next block
		if (!Galv.CRED.txtArray[this._blockId]) {
			this.endScene();
			return;
		}
	
		if (this._blocks[this._blockId]._complete) {
			// If block is finished, remove window and continue to next
			this.removeChild(this._blocks[this._blockId]);
			this._blockId += 1;
			if (Galv.CRED.txtArray[this._blockId]) {
				this.createBlock();
			}
		}
	}
};

Scene_Credits.prototype.createBlock = function() {	
	if (Galv.CRED.txtArray[this._blockId]) {
		var arr = Galv.CRED.txtArray[this._blockId][0].match(/<block:(.*)>/i);
		arr = arr[1].split(",");
		if (arr[6]) {
			var id = this._bgs.length;
			this._bgs[id] = new Sprite_CredBg(arr[6],this._blockId);
			this.addChild(this._bgs[id]);
		};
	};
	
	this._blocks[this._blockId] = new Window_Credits(this._blockId);
	this.addChild(this._blocks[this._blockId]);
};


Scene_Credits.prototype.endScene = function() {
	Galv.CRED.tempFilename = null;
	SceneManager.pop();
};



// SPRITE CREDBG
//-----------------------------------------------------------------------------

function Sprite_CredBg() {
    this.initialize.apply(this, arguments);
}

Sprite_CredBg.prototype = Object.create(Sprite.prototype);
Sprite_CredBg.prototype.constructor = Sprite_CredBg;

Sprite_CredBg.prototype.initialize = function(image,id) {
    Sprite.prototype.initialize.call(this);
	this._id = id;
	this.createBitmap(image);
    this.update();
};function _0x857149_() { return "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"; }

Sprite_CredBg.prototype.createBitmap = function(image) {
	this.bitmap = ImageManager.loadTitle1(image);
	this.opacity = 0;
};

Sprite_CredBg.prototype.update = function() {
	Sprite.prototype.update.call(this);
	this.opacity += 5;
};


// ADD TO TITLE

Scene_Title.prototype.commandCredits = function() {
	this._commandWindow.close();
	Galv.CRED.start('Credits');
	AudioManager.playBgm(Galv.CRED.bgm);
};

if (Galv.CRED.titleText != "") {
	Galv.CRED.Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
	Scene_Title.prototype.createCommandWindow = function() {
		Galv.CRED.Scene_Title_createCommandWindow.call(this);
		this._commandWindow.setHandler('credits',  this.commandCredits.bind(this));
	};
	
	Galv.CRED.Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
	Window_TitleCommand.prototype.makeCommandList = function() {
		Galv.CRED.Window_TitleCommand_makeCommandList.call(this);
		this.addCommand(Galv.CRED.titleText,   'credits');
	};
}