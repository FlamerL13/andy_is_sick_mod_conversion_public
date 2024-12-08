//=======================================
// LUX Title Screen
// LUX_TitleScreen.js
//=======================================
var Imported = Imported || {};
Imported.LUX_TitleScreen = true;

var LUX = LUX || {};
LUX.TitleScreen = LUX.TitleScreen || {};
LUX.TitleScreen.version = '0.5.0';


//========================================

/*:
 * @plugindesc v0.5.0 Customize your title screen!
 * @author Lux
 * @help
 * 
 * ===============================================
 * INTRODUCTION
 * ===============================================
 * LUX_TitleScreen.js is made for RPG Maker MV.
 * 
 * Brief overview of the current plugin features:
 * 1. Window Title Command customization.
 * 2. Title Text customization.
 * 3. Custom text labels with customization.
 * 4. Overlays and parallaxes.
 * 5. Custom pictures or sprites.
 * 
 * Features to add:
 * - Window Title Command cursor and text effects on hover.
 * - Title text color gradient.
 * - Tweening or easing animations.
 * - Particles~
 * - Many more!
 * 
 * ===============================================
 * POSITIONING TUTORIAL
 * ===============================================
 * RPG Maker MV Coordinate System:
 * RMMV and most of other game engines have coordinate system that begins on top-left.
 * That is (0, 0) being on top-left of your screen.
 * 
 *                (0,0) ------------------------------ (Graphics.width,0)
 *                      |                            |
 *                      |                            |
 *                      |                            |
 *                      |                            |
 *                      |                            |
 * (0,Graphics.height)  ------------------------------ (Graphics.width, Graphics.height)
 * 
 * There are several useful built-in engine variables to make
 * your positioning easier.
 * - Graphics.width or Graphics.boxWidth   : get screen width
 * - Graphics.height or Graphics.boxHeight : get screen height
 * 
 * Thus you can write:
 * - Graphics.width / 2 : get x part of the center of the screen.
 * - Graphics.height / 2: get y part of the center of the screen.
 * 
 * TIPS:
 * - If you only want to move just a little from the default position, use offset!
 * 
 * ===============================================
 * TEXT CUSTOMIZATIONS
 * ===============================================
 * There are several quirks of text customizations that might be worth explaining.
 * 
 * FONT
 * ------------
 * To use custom font, make sure the font file is in your 'fonts' folder.
 * 
 * Setting a custom font to a text involves two parameters, font and font file.
 *    - Font: The font name, can input anything, make sure the name isn't used by other custom fonts.
 *    - Font File: The font filename in your 'fonts' folder. Make sure to include the extension too (.ttf)
 * 
 * For example, to set a custom font to the title text, you need to set:
 *    1. Title Font
 *    2. Title Font File
 * 
 * TEXT POSITIONING
 * --------------------
 * As has been explained on "POSITIONING TUTORIAL", most of the UI elements positions including text are also 
 * defined from its top-left position.
 * But any text are actually contained within a box. Moving the text means you are moving the box.
 * 
 * Example:
 * You set the text position into (0, 10) it means you set the position of the top-left box to (0, 10).
 * 
 * (0, 10)----------
 *        |Hello   |
 *        ----------
 * So to avoid any confusion while moving around a text, try to set the alignment on LEFT first.
 * If your alignment is on CENTER or RIGHT, your calculation will be different than the actual text position.
 * 
 * Example:
 * CENTER ALIGNMENT
 * -----------
 * |  Hello  |
 * -----------
 * 
 * RIGHT ALIGNMENT
 * -----------
 * |    Hello|
 * -----------
 * 
 * If a part of your text is not showing, then you need to enlarge your text width.
 * Text width doesn't mean the width of your text, but it is the ALLOWED width of the text.
 * 
 * Tips:
 * - If you want to place a text on the centre of the screen WITHOUT ROTATING:
 *      - Position it on x: 0.
 *      - Use text width = Graphics.width.
 *      - Change text align to CENTER.
 * - To make positioning text easier:
 *      - Make sure the alignment is on LEFT first.
 *      - Show the text display box.
 * - Common horizontal positioning:
 *      - LEFT: 0
 *      - CENTER: Graphics.width / 2 - <your text width / 2>
 *      - RIGHT: Graphics.width - <your text width>
 * - Common vertical positioning:
 *      - TOP: 0
 *      - CENTER: Graphics.height / 2 - <your line height>
 *      - BOTTOM: Graphics.height - <your line height>
 * 
 * ===============================================
 * SPRITES CUSTOMIZATIONS
 * ===============================================
 * 
 * SPRITE POSITIONING
 * --------------------
 * Unlike the other components, sprite position is defined by it's center position.
 * 
 * So setting a sprite position means you're setting it's center position.
 * 
 * ===============================================
 * OVERLAYS / VIGNETTES / PARALLAXES
 * ===============================================
 * Overlays are loaded from your \img\ folder.
 * Make sure its in PNG format and has the same dimension with your game dimension.
 * 
 * Stuffs in title scene are applied in these order:
 * - Background
 * - Title frame
 * - Sprites
 * - Overlays
 * - UI components (title text, windows, text labels, etc.)
 * 
 * ===============================================
 * TERMS OF USAGE
 * ===============================================
 * Free to use in any RPG Maker MV projects, as long as you credit me.
 * 
 * For crediting, use 'Lux Ferra'.
 * 
 * Do not change the header or redistribute.
 * If you want to share it, please link my itch.io page.
 * https://luxferra.itch.io/title-screen-customizer-for-rpg-maker-mv
 * 
 * @param ---Window Title Command---
 * @desc Window Title Command is the choice window containing:
 * new game, continue, and options.
 * @default
 * 
 * @param Size
 * @parent ---Window Title Command---
 * @desc Manipulate the size of the Window Title Command.
 * @default
 * 
 * @param Maximum Columns
 * @parent Size
 * @type number
 * @min 1
 * @desc The number of columns for the Window Title Command.
 * Default: 1
 * @default 1
 * 
 * @param Maximum Rows
 * @parent Size
 * @type number
 * @min 1
 * @desc The number of visible rows for the Window Title Command.
 * Default: 3
 * @default 3
 * 
 * @param Window Width
 * @parent Size
 * @type string
 * @desc Width for the Window Title Command in pixels.
 * Default: 240 * this.maxCols()
 * @default 240 * this.maxCols()
 * 
 * @param Padding
 * @parent Size
 * @type number
 * @desc Padding for the Window Title Command contents in pixels.
 * Default: 18
 * @default 18
 * 
 * @param Position
 * @parent ---Window Title Command---
 * @desc Manipulate the position of the Window Title Command.
 * @default
 * 
 * @param X Position
 * @parent Position
 * @type string
 * @desc Window Title Command x position.
 * Default: (Graphics.width - this.width) / 2
 * @default (Graphics.width - this.width) / 2
 * 
 * @param Y Position
 * @parent Position
 * @type string
 * @desc Window Title Command y position.
 * Default: Graphics.height - this.height - 96
 * @default Graphics.height - this.height - 96
 * 
 * @param Offset X
 * @parent Position
 * @type number
 * @min -9999
 * @desc Negative number to move left, positive number to move right.
 * Default: 0
 * @default 0
 * 
 * @param Offset Y
 * @parent Position
 * @type number
 * @min -9999
 * @desc Negative number to move up, positive number to move down.
 * Default: 0
 * @default 0
 * 
 * @param Display
 * @parent ---Window Title Command---
 * @desc Change the display settings of the Window Title Command.
 * @default
 * 
 * @param Background Type
 * @parent Display
 * @type number
 * @max 3
 * @min 0
 * @desc Set Window Title Command background type.
 * 0.Solid     1.Dim     2.Transparent     3. Image 
 * @default 0
 * 
 * @param Windowskin
 * @parent Display
 * @type file
 * @dir /img/system
 * @default Window
 * @desc The windowskin file.
 * 
 * @param Window Background Image
 * @parent Display
 * @type file
 * @dir /img/
 * @desc The background image file for the window.
 * Only be used if background type is 3.
 * 
 * @param Window Opacity
 * @parent Display
 * @type number
 * @max 255
 * @min 0
 * @desc Set window title command opacity.
 * Default: 255
 * @default 255
 * 
 * @param Choice Highlight
 * @parent Display
 * @type boolean
 * @desc Enable choice highlight (cursor from windowskin).
 * Default: true
 * @default true
 * 
 * @param Dim Background
 * @parent Display
 * @desc Dim background type is a gradient between
 * Dim Color 1 and Dim Color 2.
 * @default
 * 
 * @param Dim Color 1
 * @parent Dim Background
 * @type string
 * @default rgba(0, 0, 0, 0.6)
 * 
 * @param Dim Color 2
 * @parent Dim Background
 * @type string
 * @default rgba(0, 0, 0, 0)
 * 
 * @param Show Icons?
 * @parent Display
 * @type boolean
 * @desc Display window title command icons?
 * YES - true       NO - false
 * @default false
 * 
 * @param Command Icons
 * @parent Show Icons?
 * @type number[]
 * @desc Place icon number on the corresponding command index.
 * New Game: 1, Continue: 2, Options: 3
 * 
 * @param Text
 * @parent ---Window Title Command---
 * @desc Change text settings on the Window Title Command.
 * @default
 * 
 * @param Text Font
 * @parent Text
 * @type string
 * @desc Font name.
 * @default GameFont
 * 
 * @param Text Font File
 * @parent Text
 * @type string
 * @desc Name of the font file.
 * @default mplus-1m-regular.ttf
 * 
 * @param Text Font Size
 * @parent Text
 * @type number
 * @desc Font size for the text in Window Title Command.
 * Default: 28
 * @default 28
 * 
 * @param Text Padding
 * @parent Text
 * @type number
 * @desc Padding for the text in Window Title Command.
 * Default: 6
 * @default 6
 * 
 * @param Text Align
 * @parent Text
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment of the choices in Window Title Command.
 * left     center     right
 * @default left
 * 
 * @param Text Color
 * @parent Text
 * @type text
 * @desc Color for the choices. Can use hex or RGBA.
 * Example: #ffffff or rgba(255, 255, 255, 0.8)
 * @default #ffffff
 * 
 * @param Text Outline Color
 * @parent Text
 * @type text
 * @desc Outline color for the choices. Can use hex or RGBA.
 * Example: #ffffff or rgba(255, 255, 255, 0.8)
 * @default #000000
 * 
 * @param Use Highlight Color?
 * @parent Text
 * @type boolean
 * @desc If true, a highlighted command will use different text color.
 * @default false
 * 
 * @param Highlighted Text Color
 * @parent Use Highlight Color?
 * @type text
 * @desc Color for the highlighted command.
 * Only works if highlight color is enabled.
 * @default #ffff00
 * 
 * @param Highlighted Text Outline Color
 * @parent Use Highlight Color?
 * @type text
 * @desc Outline color for the highlighted command.
 * Only works if highlight color is enabled.
 * @default #000000
 * 
 * @param Disabled Text Highlight Color
 * @parent Use Highlight Color?
 * @type text
 * @desc Color for the highlighted but disabled command.
 * @default #ffffff
 * 
 * @param Disabled Text Highlight Outline Color
 * @parent Use Highlight Color?
 * @type text
 * @desc Outline color of the highlighted but disabled command.
 * @default #000000
 * 
 * @param Disabled Text Highlight Opacity
 * @parent Use Highlight Color?
 * @type number
 * @desc Opacity for the highlighted but disabled command.
 * @default 160
 * 
 * @param Text Highlight Effect
 * @parent Text
 * @type combo
 * @option None
 * @desc TBA. Please wait!~
 * @default None
 * 
 * @param Commands
 * @parent ---Window Title Command---
 * @desc Customize commands / choices.
 * @default
 * 
 * @param Enable quit command?
 * @parent Commands
 * @type boolean
 * @desc Enable quit command to quit the game from menu.
 * Default: false
 * @default false
 * 
 * @param Quit command name
 * @parent Enable quit command?
 * @type text
 * @desc Displayed name for the quit command.
 * Default: Quit
 * @default Quit
 * 
 * @param ---Title Text---
 * @desc Change title text settings.
 * @default
 * 
 * @param Title Text Align
 * @parent ---Title Text---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment of the title text.
 * left     center     right
 * @default left
 * 
 * @param Title Text X Position
 * @parent ---Title Text---
 * @type string
 * @desc Title Text x position.
 * Default: (Graphics.width / 2) - (this._gameTitleSprite.width / 2)
 * @default (Graphics.width / 2) - (this._gameTitleSprite.width / 2)
 * 
 * @param Title Text Y Position
 * @parent ---Title Text---
 * @type string
 * @desc Title Text y position.
 * Default: Graphics.height / 4
 * @default Graphics.height / 4
 * 
 * @param Title Text Offset X
 * @parent ---Title Text---
 * @type number
 * @min -9999
 * @desc Negative number to move left, positive number to move right.
 * Default: 0
 * @default 0
 * 
 * @param Title Text Offset Y
 * @parent ---Title Text---
 * @type number
 * @min -9999
 * @desc Negative number to move up, positive number to move down.
 * Default: 0
 * @default 0
 * 
 * @param Title Text Rotation
 * @parent ---Title Text---
 * @type number
 * @min -360
 * @max 360
 * @desc Rotate the text around its center.
 * Use angle, can work with negative angle.
 * @default 0
 * 
 * @param Title Font
 * @parent ---Title Text---
 * @type text
 * @desc Font name.
 * @default GameFont
 * 
 * @param Title Font File
 * @parent ---Title Text---
 * @type text
 * @desc Name of the font file.
 * @default mplus-1m-regular.ttf
 * 
 * @param Title Font Size
 * @parent ---Title Text---
 * @type number
 * @desc Font size of the title text.
 * Default: 72
 * @default 72
 * 
 * @param Title Text Color
 * @parent ---Title Text---
 * @type text
 * @desc Color for the title text.
 * Default: #ffffff
 * @default #ffffff
 * 
 * @param Title Text Outline Color
 * @parent ---Title Text---
 * @type text
 * @desc Outline color for the title text.
 * Default: #000000
 * @default #000000
 * 
 * @param Title Text Outline Width
 * @parent ---Title Text---
 * @type number
 * @desc Outline width for the title text.
 * Default: 8
 * @default 8
 * 
 * @param ---Title Background---
 * @type Change title background settings.
 * @default
 * 
 * @param Use System Title Background?
 * @parent ---Title Background---
 * @type boolean
 * @desc If set to true, will use the image chosen using the system.
 * Default: true
 * @default true
 * 
 * @param Title Background Image
 * @parent ---Title Background---
 * @type file
 * @dir /img/
 * @desc image for the title background image located in /img folder.
 * 
 * @param Animate Title Background?
 * @parent ---Title Background---
 * @type boolean
 * @desc Set to true if you want it to become an animated looping parallax.
 * Only works if you set `Title Background Image`.
 * @default false
 * 
 * @param Title Background X Speed
 * @parent ---Title Background---
 * @type number
 * @min -999
 * @max 999
 * @desc The horizontal speed of the title background (Only works if animated).
 * Default: 0
 * @default 0
 * 
 * @param Title Background Y Speed
 * @parent ---Title Background---
 * @type number
 * @min -999
 * @max 999
 * @desc The vertical speed of the title background (Only works if animated).
 * Default: 0
 * @default 0
 * 
 * @param ---Custom Text Labels---
 * @desc Create your own custom text labels.
 * @default
 * 
 * @param Text Labels
 * @parent ---Custom Text Labels---
 * @type struct<TextLabel>[]
 * 
 * @param ---Sprites---
 * @desc Add sprites to be displayed on the title screen.
 * @default
 * 
 * @param Sprites
 * @parent ---Sprites---
 * @type struct<Sprites>[]
 * 
 * @param ---Overlays/Vignette---
 * @desc Add image overlays. These will be positioned in front of
 * title image and behind texts.
 * @default
 * 
 * @param Show Overlays?
 * @parent ---Overlays/Vignette---
 * @type boolean
 * @desc On to enable overlays, off to disable them.
 * Default: false
 * @default false
 * 
 * @param Overlays
 * @parent ---Overlays/Vignette---
 * @type struct<Overlays>[]
 */

/*~struct~TextLabel:
 * @param Text
 * @desc Text to show.
 * @type text
 * 
 * @param X Position
 * @desc X position of the text label.
 * leftmost: 0  rightmost: Graphics.width
 * @type text
 * 
 * @param Y Position
 * @desc Y position of the text label.
 * top: 0   bottom: Graphics.height - <your line height>
 * @type text
 * 
 * @param Text Width
 * @desc The maximum allowed width of the text label.
 * Default: 240
 * @type number
 * @min 0
 * @default 240
 * 
 * @param Line Height
 * @desc Line height of the text label.
 * Default: 20
 * @type number
 * @default 20
 * 
 * @param Rotation
 * @desc Rotate the text around its center.
 * Use angle, can work with negative angle.
 * @type number
 * @min -360
 * @max 360
 * @default 0
 * 
 * @param Text Align
 * @desc Text alignment of the text label.
 * @type combo
 * @option left
 * @option center
 * @option right
 * @default left
 * 
 * @param Text Font
 * @desc Font name of the text label.
 * @type text
 * 
 * @param Text Font File
 * @desc Font file of the text label.
 * @type text
 * 
 * @param Text Font Size
 * @desc Font size of the text label.
 * @type number
 * Default: 20
 * @default 20
 * 
 * @param Text Color
 * @type text
 * @desc Color of the text label.
 * Default: #ffffff
 * @default #ffffff
 * 
 * @param Text Outline Color
 * @type text
 * @desc Outline color of the text label.
 * Default: #000000
 * @default #000000
 */

/*~struct~Sprites:
 * @param Image
 * @type file
 * @dir /img/
 * @desc Image for the sprite located in /img folder.
 * 
 * @param X
 * @type text
 * @desc The x position of the sprite.
 * leftmost: 0  rightmost: Graphics.boxWidth
 * @default 0
 * 
 * @param Y
 * @type text
 * @desc The y position of the sprite.
 * leftmost: 0  rightmost: Graphics.boxHeight
 * @default 0
 * 
 * @param X Scale
 * @type text
 * @desc The scale factor of the x axis.
 * Default: 1
 * @default 1
 * 
 * @param Y Scale
 * @type text
 * @desc The scale factor of the y axis.
 * Default: 1
 * @default 1
 * 
 * @param Alpha
 * @type text
 * @desc The alpha value for the sprite.
 * @default 1
 * 
 * @param Rotation
 * @desc Rotate the sprite around its center.
 * Use angle, can work with negative angle.
 * @type number
 * @min -360
 * @max 360
 * @default 0
 */

/*~struct~Overlays:
 * @param Image
 * @type file
 * @dir /img/
 * @desc Image for the overlay located in /img folder.
 * 
 * @param X
 * @type text
 * @desc The x position of the overlay.
 * leftmost: 0  rightmost: Graphics.boxWidth
 * @default 0
 * 
 * @param Y
 * @type text
 * @desc The y position of the overlay.
 * leftmost: 0  rightmost: Graphics.boxHeight
 * @default 0
 * 
 * @param Width
 * @type text
 * @desc The display width of the overlay.
 * Screen width = Graphics.boxWidth
 * @default Graphics.boxWidth
 * 
 * @param Height
 * @type text
 * @desc The display height of the overlay. 
 * Screen height = Graphics.boxHeight
 * @default Graphics.boxHeight
 * 
 * @param Blend Color
 * @type text
 * @desc Set blend color for your overlay image (Only works if not animated).
 * Example: [r, g, b, a]
 * @default [0, 0, 0, 0]
 * 
 * @param Blend Mode
 * @type number
 * @min 0
 * @max 3
 * @desc Set blend mode for your overlay image.
 * 0 - Normal, 1 - Add, 2 - Multiply, 3 - Screen
 * @default 0
 * 
 * @param Color Tone
 * @type text
 * @desc Set color tone for your overlay image (Only works if not animated). 
 * Example: [r, g, b, gray]
 * @default [0, 0, 0, 0]
 * 
 * @param Animate?
 * @type boolean
 * @desc Set to true if you want it to become an animated looping parallax.
 * Default: false
 * @default false
 * 
 * @param X Speed
 * @type number
 * @min -999
 * @max 999
 * @desc The horizontal speed of the overlay (Only works if animated).
 * Default: 0
 * @default 0
 * 
 * @param Y Speed
 * @type number
 * @min -999
 * @max 999
 * @desc The vertical speed of the overlay (Only works if animated).
 * Default: 0
 * @default 0
 */

//========================================
// Parameters
//========================================

LUX.Parameters = PluginManager.parameters('LUX_TitleScreen');

// Window Title Command
LUX.TitleScreen.maxCols = Number(LUX.Parameters['Maximum Columns']);
LUX.TitleScreen.maxRows = Number(LUX.Parameters['Maximum Rows']);
LUX.TitleScreen.windowWidth = String(LUX.Parameters['Window Width']);
LUX.TitleScreen.padding = Number(LUX.Parameters['Padding']);
LUX.TitleScreen.PosX = String(LUX.Parameters['X Position']);
LUX.TitleScreen.PosY = String(LUX.Parameters['Y Position']);
LUX.TitleScreen.OffsetX = Number(LUX.Parameters['Offset X']);
LUX.TitleScreen.OffsetY = Number(LUX.Parameters['Offset Y']);

LUX.TitleScreen.backgroundType = Number(LUX.Parameters['Background Type']);
LUX.TitleScreen.dimColor1 = String(LUX.Parameters['Dim Color 1']);
LUX.TitleScreen.dimColor2 = String(LUX.Parameters['Dim Color 2']);
LUX.TitleScreen.opacity = Number(LUX.Parameters['Window Opacity']);
LUX.TitleScreen.windowskin = String(LUX.Parameters['Windowskin']);
LUX.TitleScreen.windowBackgroundImage = String(LUX.Parameters['Window Background Image']);
LUX.TitleScreen.choiceHighlight = eval(LUX.Parameters['Choice Highlight']);
LUX.TitleScreen.showIcons = eval(LUX.Parameters['Show Icons?']);
if(LUX.TitleScreen.showIcons){
    try {
        LUX.TitleScreen.commandIcons = JSON.parse(LUX.Parameters['Command Icons']);
    } catch (error) {
        console.error('LUX_TitleScreen eval error: ' + 'You need to provide icons numbers.');
        LUX.TitleScreen.showIcons = false;
    }
}

LUX.TitleScreen.textFont = String(LUX.Parameters['Text Font']);
LUX.TitleScreen.textFontFile = String(LUX.Parameters['Text Font File']);

LUX.TitleScreen.isQuitEnabled = eval(LUX.Parameters['Enable quit command?']);
LUX.TitleScreen.quitCommandName = String(LUX.Parameters['Quit command name']);

// Title Text
LUX.TitleScreen.textAlign = String(LUX.Parameters['Text Align']);
LUX.TitleScreen.textColor = String(LUX.Parameters['Text Color']);
LUX.TitleScreen.textOutlineColor = String(LUX.Parameters['Text Outline Color']);
LUX.TitleScreen.highlightColor = eval(LUX.Parameters['Use Highlight Color?']);
LUX.TitleScreen.textHighlightColor = String(LUX.Parameters['Highlighted Text Color']);
LUX.TitleScreen.textHighlightOutlineColor = String(LUX.Parameters['Highlighted Text Outline Color']);
LUX.TitleScreen.disabledTextHighlightColor = String(LUX.Parameters['Disabled Text Highlight Color']);
LUX.TitleScreen.disabledTextHighlightOutlineColor = String(LUX.Parameters['Disabled Text Highlight Outline Color']);
LUX.TitleScreen.disabledTextHighlightOpacity = String(LUX.Parameters['Disabled Text Highlight Opacity']);
LUX.TitleScreen.textHighlightEffect = String(LUX.Parameters['Text Highlight Effect']);
LUX.TitleScreen.textFontSize = Number(LUX.Parameters['Text Font Size']);
LUX.TitleScreen.textPadding = Number(LUX.Parameters['Text Padding']);

LUX.TitleScreen.titleTextAlign = String(LUX.Parameters['Title Text Align']);
LUX.TitleScreen.titleTextPosX = String(LUX.Parameters['Title Text X Position']);
LUX.TitleScreen.titleTextPosY = String(LUX.Parameters['Title Text Y Position']);
LUX.TitleScreen.titleTextOffsetX = Number(LUX.Parameters['Title Text Offset X']);
LUX.TitleScreen.titleTextOffsetY = Number(LUX.Parameters['Title Text Offset Y']);
LUX.TitleScreen.titleRotation = Number(LUX.Parameters['Title Text Rotation']);
LUX.TitleScreen.titleFont = String(LUX.Parameters['Title Font']);
LUX.TitleScreen.titleFontFile = String(LUX.Parameters['Title Font File']);
LUX.TitleScreen.titleFontSize = Number(LUX.Parameters['Title Font Size']);
LUX.TitleScreen.titleTextColor = String(LUX.Parameters['Title Text Color']);
LUX.TitleScreen.titleTextOutlineColor = String(LUX.Parameters['Title Text Outline Color']);
LUX.TitleScreen.titleTextOutlineWidth = Number(LUX.Parameters['Title Text Outline Width']);

// Title Background Image
LUX.TitleScreen.useSystemTitleBackground = eval(LUX.Parameters['Use System Title Background?']);
LUX.TitleScreen.titleBackgroundImage = String(LUX.Parameters['Title Background Image']);
LUX.TitleScreen.animateTitleBackground = eval(LUX.Parameters['Animate Title Background?']);
LUX.TitleScreen.titleBackgroundXSpeed = Number(LUX.Parameters['Title Background X Speed']);
LUX.TitleScreen.titleBackgroundYSpeed = Number(LUX.Parameters['Title Background Y Speed']);

// Fonts pooling
LUX.TitleScreen.fonts = [];
LUX.TitleScreen.fonts.push([LUX.TitleScreen.textFont, LUX.TitleScreen.textFontFile]);
LUX.TitleScreen.fonts.push([LUX.TitleScreen.titleFont, LUX.TitleScreen.titleFontFile]);

// Custom Text Labels
try {
    LUX.TitleScreen.textLabels = JSON.parse(LUX.Parameters['Text Labels']);
    for(let i = 0; i < LUX.TitleScreen.textLabels.length; i++){
        let obj = JSON.parse(LUX.TitleScreen.textLabels[i]);
        LUX.TitleScreen.fonts.push([[obj['Text Font']], ['Text Font File']]);
    }
} catch (error) {
    LUX.TitleScreen.textLabels = [];
}

// Sprites
try {
    LUX.TitleScreen.spritesData = JSON.parse(LUX.Parameters['Sprites']);
} catch (error) {
    LUX.TitleScreen.spritesData = [];
}

// Overlays
LUX.TitleScreen.showOverlays = eval(LUX.Parameters['Show Overlays?'])
try{
    LUX.TitleScreen.overlays = JSON.parse(LUX.Parameters['Overlays']);
} catch(error) {
    LUX.TitleScreen.overlays = [];
}

//========================================
// LUX Functions
//========================================
LUX.Util = LUX.Util || {};

LUX.Util.degrees_to_radians = function(degrees){
  let pi = Math.PI;
  return degrees * (pi/180);
}

LUX.Util.loadCustomFont = function(fontname, filename){
    if(!Graphics.isFontLoaded(fontname)){
        Graphics.loadFont(fontname, '/fonts/' + filename);
    }
}

//========================================
// Font Loading
//========================================
for(let i = 0; i < LUX.TitleScreen.fonts.length; i++){
    LUX.Util.loadCustomFont(LUX.TitleScreen.fonts[i][0], LUX.TitleScreen.fonts[i][1]);
}

//========================================
// Window_TitleCommand
//========================================
LUX.TitleScreen.Window_TitleCommand_initialize = Window_TitleCommand.prototype.initialize;
Window_TitleCommand.prototype.initialize = function() {
    LUX.TitleScreen.Window_TitleCommand_initialize.call(this);
    
    if(LUX.TitleScreen.backgroundType > 0 && LUX.TitleScreen.backgroundType < 3){
        this.setBackgroundType(LUX.TitleScreen.backgroundType);
    }
    else{
        this.opacity = LUX.TitleScreen.opacity;
    }

    if(LUX.TitleScreen.backgroundType == 3){
        this.opacity = 0;
        let img = LUX.TitleScreen.windowBackgroundImage.split('/');
        this.backgroundImage = new Sprite();
        this.backgroundImage.bitmap = ImageManager.loadBitmap(`/img/${img[0]}/`, img[1], true);
        this.backgroundImage.bitmap.addLoadListener(()=>{
            this.backgroundImage.opacity = LUX.TitleScreen.opacity;
            let scaleX = this.windowWidth() / this.backgroundImage.width;
            let scaleY = this.windowHeight() / this.backgroundImage.height;
            this.backgroundImage.scale.x = scaleX;
            this.backgroundImage.scale.y = scaleY;
        });
        this.addChildToBack(this.backgroundImage);
    } else{
        this.windowskin = ImageManager.loadSystem(LUX.TitleScreen.windowskin);
    }
};

LUX.TitleScreen.Window_TitleCommand_select = Window_TitleCommand.prototype.select;
Window_TitleCommand.prototype.select = function(index){
    LUX.TitleScreen.Window_TitleCommand_select.call(this, index);
    this.refresh();
}

LUX.TitleScreen.Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    LUX.TitleScreen.Window_TitleCommand_makeCommandList.call(this);
    if(LUX.TitleScreen.isQuitEnabled){
        this.addCommand(LUX.TitleScreen.quitCommandName, 'quit');
    }
};

Window_TitleCommand.prototype.resetFontSettings = function() {
    if(LUX.TitleScreen.textFont){
        this.contents.fontFace = LUX.TitleScreen.textFont;
        this.contents.fontSize = LUX.TitleScreen.textFontSize;
    }
    else{
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }
};

Window_TitleCommand.prototype._updateCursor = function() {
    Window.prototype._updateCursor.call(this);
    this._windowCursorSprite.visible = LUX.TitleScreen.choiceHighlight && 
                                                    this.isOpen() && !this._cursorIsMoving;
};

Window_TitleCommand.prototype.lineHeight = function() {
    return LUX.TitleScreen.textFontSize + Math.round(LUX.TitleScreen.textFontSize / 4);
};

Window_TitleCommand.prototype.drawItem = function(index) {
    let rect = this.itemRectForText(index);
    let align = this.itemTextAlign();
    let x = rect.x;

    // draw icon
    if(LUX.TitleScreen.showIcons){
        let pad = this.contents.fontSize / 4;
        this.drawIcon(parseInt(LUX.TitleScreen.commandIcons[index]), x, rect.y, pad);
        x += this.contents.fontSize + pad;
    }

    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    if(LUX.TitleScreen.highlightColor && this._index == index){
        this.changeTextColor(LUX.TitleScreen.textHighlightColor);
        this.contents.outlineColor = LUX.TitleScreen.textHighlightOutlineColor;
        if(this.isCommandEnabled(index) == false){
            this.changeTextColor(LUX.TitleScreen.disabledTextHighlightColor);
            this.contents.outlineColor = LUX.TitleScreen.disabledTextHighlightOutlineColor;
            this.contents.paintOpacity = LUX.TitleScreen.disabledTextHighlightOpacity;
        }
    }
    else{
        this.changeTextColor(LUX.TitleScreen.textColor);
    }

    this.contents.outlineColor = LUX.TitleScreen.textOutlineColor;
    this.drawText(this.commandName(index), x, rect.y, rect.width, align);
};

Window_TitleCommand.prototype.dimColor1 = function() {
    return LUX.TitleScreen.dimColor1;
};

Window_TitleCommand.prototype.dimColor2 = function() {
    return LUX.TitleScreen.dimColor2;
};

Window_TitleCommand.prototype.itemTextAlign = function(){
    return LUX.TitleScreen.textAlign;
};

Window_TitleCommand.prototype.maxCols = function(){
    return LUX.TitleScreen.maxCols;
}

Window_TitleCommand.prototype.numVisibleRows = function(){
    return LUX.TitleScreen.maxRows;
}

Window_TitleCommand.prototype.windowWidth = function(){
    try{
        return eval(LUX.TitleScreen.windowWidth);
    } catch(error){
        console.error('LUX_TitleScreen eval error: ' + error.message);
    }
}

Window_TitleCommand.prototype.standardPadding = function() {
    return LUX.TitleScreen.padding;
};

Window_TitleCommand.prototype.textPadding = function() {
    return LUX.TitleScreen.textPadding;
};

Window_TitleCommand.prototype.updatePlacement = function() {
    try {
        this.x = eval(LUX.TitleScreen.PosX);
        this.y = eval(LUX.TitleScreen.PosY);    
    } catch (error) {
        console.error('LUX_TitleScreen eval error: ' + error.message);
    }
    
    this.x += LUX.TitleScreen.OffsetX;
    this.y += LUX.TitleScreen.OffsetY;
};

//========================================
// Scene_Title
//========================================
LUX.TitleScreen.Scene_Title_initialize = Scene_Title.prototype.initialize;
Scene_Title.prototype.initialize = function() {
    LUX.TitleScreen.Scene_Title_initialize.call(this);
    this._backgroundReady = false;
    this._overlaysReady = false;
    this._creationComplete = false;
};

Scene_Title.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground()
        .then(() => {
            this._backgroundReady = true;
            return this.createSprites(); 
        })
        .then(() => {
            if (LUX.TitleScreen.showOverlays) {
                return this.createOverlays();
            }
        })
        .then(() => {
            if (LUX.TitleScreen.showOverlays) {
                this._overlaysReady = true;
            }
            return this.createForeground();
        })
        .then(() => {
            this.createWindowLayer();
            this.createCommandWindow();
            this._creationComplete = true;
        })
        .catch((error) => {
            console.error('Error in Scene_Title.create:', error);
        });
};

LUX.TitleScreen.Scene_Title_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
    if(this._creationComplete){
        LUX.TitleScreen.Scene_Title_update.call(this);

        this.updateTitleBackground();
        this.updateParallaxes();
    }
};

Scene_Title.prototype.createFadeSprite = function(white) {
    Scene_Base.prototype.createFadeSprite.call(this, white);
    if (this._fadeSprite) {
        this.removeChild(this._fadeSprite);
        this.addChild(this._fadeSprite); // Ensure fade sprite is on top
    }
};

Scene_Title.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    if(!(!LUX.TitleScreen.useSystemTitleBackground && LUX.TitleScreen.animateTitleBackground)){
        this.centerSprite(this._backSprite1);
    }
    this.centerSprite(this._backSprite2);
    this.playTitleMusic();
    this.startFadeIn(this.fadeSpeed(), false);
};

Scene_Title.prototype.createBackground = function() {
    return new Promise((resolve) => {
        if (!LUX.TitleScreen.useSystemTitleBackground) {
            let img = LUX.TitleScreen.titleBackgroundImage.split('/');
            if (LUX.TitleScreen.animateTitleBackground) {
                this._backSprite1 = new TilingSprite(ImageManager.loadBitmap(`/img/${img[0]}/`, img[1], true));
                this._backSprite1.move(0, 0, Graphics.boxWidth, Graphics.boxHeight);
                this._backSprite1.origin.x = 0;
                this._backSprite1.origin.y = 0;
            } else {
                this._backSprite1 = new Sprite(ImageManager.loadBitmap(`/img/${img[0]}/`, img[1], true));
            }

            // Title Frame Image
            this._backSprite2 = new Sprite(ImageManager.loadTitle2($dataSystem.title2Name));
            this.addChild(this._backSprite1);
            this.addChild(this._backSprite2);
        } else {
            // Title Background Image
            this._backSprite1 = new Sprite(ImageManager.loadTitle1($dataSystem.title1Name));
            // Title Frame Image
            this._backSprite2 = new Sprite(ImageManager.loadTitle2($dataSystem.title2Name));
        
            this.addChild(this._backSprite1);
            this.addChild(this._backSprite2);
        }

        resolve();
    });
};

Scene_Title.prototype.createOverlays = function() {
    return new Promise((resolve, reject) => {
        try {
            let overlays = LUX.TitleScreen.overlays;
            this._overlaySprites = [];
            this._parallaxesData = [];
            let loadPromises = overlays.map((data) => {
                return new Promise((resolve, reject) => {
                    let obj = JSON.parse(data);
                    let img = obj['Image'].split('/');
                    if (JSON.parse(obj['Animate?'])) {
                        let parallax = new TilingSprite(ImageManager.loadBitmap(`/img/${img[0]}/`, img[1], true));
                        parallax.blendMode = parseInt(obj['Blend Mode']);
                        parallax.move(eval(obj['X']), eval(obj['Y']), eval(obj['Width']), eval(obj['Height']));
                        parallax.origin.x = 0;
                        parallax.origin.y = 0;
                        this._overlaySprites.push(parallax);
                        this._parallaxesData.push({
                            'img': parallax,
                            'speedX': parseInt(obj['X Speed']),
                            'speedY': parseInt(obj['Y Speed'])
                        });
                        resolve();
                    } else {
                        let sprite = new Sprite(ImageManager.loadBitmap(`/img/${img[0]}/`, img[1], true));
                        sprite.bitmap.addLoadListener(() => {
                            sprite.position.set(eval(obj['X']), eval(obj['Y']));
                            sprite.width = eval(obj['Width']);
                            sprite.height = eval(obj['Height']);
                            sprite.blendMode = parseInt(obj['Blend Mode']);
                            sprite.setBlendColor(eval(obj['Blend Color']));
                            sprite.setColorTone(eval(obj['Color Tone']));
                            this._overlaySprites.push(sprite);
                            resolve();
                        });
                    }
                });
            });

            Promise.all(loadPromises).then(() => {
                this._overlaySprites.forEach(sprite => this.addChild(sprite));
                resolve();
            }).catch(reject);
        } catch (error) {
            console.error('LUX_TitleScreen eval error: ' + error.message);
            resolve();
        }
    });
};

Scene_Title.prototype.updateTitleBackground = function(){
    if(!LUX.TitleScreen.useSystemTitleBackground && LUX.TitleScreen.animateTitleBackground && this._backgroundReady){
        this._backSprite1.origin.x += LUX.TitleScreen.titleBackgroundXSpeed;
        this._backSprite1.origin.y += LUX.TitleScreen.titleBackgroundYSpeed;
    }
}

Scene_Title.prototype.updateParallaxes = function(){
    if(LUX.TitleScreen.showOverlays && this._overlaysReady){
        for(let i = 0; i < this._parallaxesData.length; i++){
            this._parallaxesData[i].img.origin.x += this._parallaxesData[i].speedX;
            this._parallaxesData[i].img.origin.y += this._parallaxesData[i].speedY;

            if(this._parallaxesData[i].img.origin.speedX > 0 && this._parallaxesData[i].img.origin.x == Graphics.boxWidth){
                this._parallaxesData[i].img.origin.x = 0;
            }
            else if(this._parallaxesData[i].img.origin.speedX < 0 && this._parallaxesData[i].img.origin.x == 0){
                this._parallaxesData[i].img.origin.x = Graphics.boxWidth;
            }

            if(this._parallaxesData[i].img.origin.speedY > 0 && this._parallaxesData[i].img.origin.y == Graphics.boxHeight){
                this._parallaxesData[i].img.origin.y = 0;
            }
            else if(this._parallaxesData[i].img.origin.speedY < 0 && this._parallaxesData[i].img.origin.y == 0){
                this._parallaxesData[i].img.origin.y = Graphics.boxHeight;
            }
        }
    }
}

Scene_Title.prototype.createForeground = function() {
    return new Promise((resolve) => {
        this._gameTitleSprite = new Sprite(new Bitmap(Graphics.boxWidth, Graphics.boxHeight));
        if ($dataSystem.optDrawTitle) {
            this.drawGameTitle();
        }
        this.addChild(this._gameTitleSprite);

        this.createTextLabels().then(resolve);
    });
};

Scene_Title.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_TitleCommand();
    this._commandWindow.setHandler('newGame',  this.commandNewGame.bind(this));
    this._commandWindow.setHandler('continue', this.commandContinue.bind(this));
    this._commandWindow.setHandler('options',  this.commandOptions.bind(this));
    this._commandWindow.setHandler('quit',  this.commandQuit.bind(this));
    this.addWindow(this._commandWindow);
};

Scene_Title.prototype.commandQuit = function(){
    this._commandWindow.close();
    SceneManager.exit();
}

Scene_Title.prototype.drawGameTitle = function() {
    let text = $dataSystem.gameTitle;
    this._gameTitleSprite.bitmap.textColor = LUX.TitleScreen.titleTextColor;
    this._gameTitleSprite.bitmap.outlineColor = LUX.TitleScreen.titleTextOutlineColor;
    this._gameTitleSprite.bitmap.outlineWidth = LUX.TitleScreen.titleTextOutlineWidth;
    if(LUX.TitleScreen.titleFont){
        this._gameTitleSprite.bitmap.fontFace = LUX.TitleScreen.titleFont;
    }
    this._gameTitleSprite.bitmap.fontSize = LUX.TitleScreen.titleFontSize;
    let pad = this._gameTitleSprite.bitmap.fontSize / 4;
    this._gameTitleSprite.width = this._gameTitleSprite.bitmap.measureTextWidth(text) + pad;
    this._gameTitleSprite.height = LUX.TitleScreen.titleFontSize + pad;
    let x = 0;
    let y = Graphics.height / 4;
    try{
        x = eval(LUX.TitleScreen.titleTextPosX) + LUX.TitleScreen.titleTextOffsetX;
        y = eval(LUX.TitleScreen.titleTextPosY) + LUX.TitleScreen.titleTextOffsetY;
    } catch (error){
        console.error('LUX_TitleScreen eval error: ' + error.message);
    }
    this._gameTitleSprite.position.set(x + this._gameTitleSprite.width/2, y + this._gameTitleSprite.height/2);
    this._gameTitleSprite.bitmap.drawText(text, 0 + pad, 0, this._gameTitleSprite.width, LUX.TitleScreen.titleFontSize + pad, LUX.TitleScreen.titleTextAlign);
    this._gameTitleSprite.rotation = LUX.Util.degrees_to_radians(parseInt(LUX.TitleScreen.titleRotation));
    this._gameTitleSprite.pivot.set(this._gameTitleSprite.width/2, this._gameTitleSprite.height/2);
};

Scene_Title.prototype.createTextLabels = function() {
    return new Promise((resolve) => {
        let textLabels = LUX.TitleScreen.textLabels;
        this._textLabelsSprites = [];
        for (let i = 0; i < textLabels.length; i++) {
            let textLabelSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
            this._textLabelsSprites.push(textLabelSprite);
            this.addChild(textLabelSprite);
        }

        for (let i = 0; i < textLabels.length; i++) {
            let obj = JSON.parse(textLabels[i]);
            let text = obj['Text'];
            let x, y;
            try {
                x = eval(obj['X Position']);
                y = eval(obj['Y Position']);
            } catch (error) {
                console.error('LUX_TitleScreen eval error: ' + error.message);
            }
            let maxWidth = obj['Text Width'];
            let lineHeight = parseInt(obj['Line Height']);
            let textAlign = obj['Text Align'];
            let sprite = this._textLabelsSprites[i];
            sprite.width = maxWidth;
            sprite.height = lineHeight + 5;
            if (obj['Text Font'] != '') {
                sprite.bitmap.fontFace = obj['Text Font'];
            }

            sprite.bitmap.fontSize = parseInt(obj['Text Font Size']);
            sprite.bitmap.textColor = obj['Text Color'];
            sprite.bitmap.outlineColor = obj['Text Outline Color'];
            sprite.position.set(x + sprite.width / 2, y + sprite.height / 2);
            sprite.bitmap.drawText(text, 0, 0, maxWidth, lineHeight, textAlign);
            sprite.rotation = LUX.Util.degrees_to_radians(parseInt(obj['Rotation']));
            sprite.pivot.set(sprite.width / 2, sprite.height / 2);
        }
        resolve();
    });
};

Scene_Title.prototype.createSprites = function() {
    let spriteData = LUX.TitleScreen.spritesData;
    this._customSprites = [];

    let loadPromises = spriteData.map((data) => {
        return new Promise((resolve) => {
            let obj = JSON.parse(data);
            let img = obj['Image'].split('/');
            let bitmap = ImageManager.loadBitmap(`/img/${img[0]}/`, img[1], true);

            bitmap.addLoadListener(() => {
                let sprite = new Sprite(bitmap);
                sprite.alpha = eval(obj['Alpha']);
                sprite.anchor.set(0.5, 0.5);
                sprite.pivot.set(0.5, 0.5);
                sprite.scale.set(eval(obj['X Scale']), eval(obj['Y Scale']));
                sprite.position.set(eval(obj['X']), eval(obj['Y']));
                sprite.rotation = LUX.Util.degrees_to_radians(parseInt(obj['Rotation']));

                this._customSprites.push(sprite);
                resolve();
            });
        });
    });

    return Promise.all(loadPromises).then(() => {
        this._customSprites.forEach(sprite => this.addChild(sprite));
    });
};