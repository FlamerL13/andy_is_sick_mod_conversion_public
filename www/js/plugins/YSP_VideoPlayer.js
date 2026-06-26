/*:
 * @plugindesc v1.0.0 Plugin used for playing video.
 * @author Dr.Yami
 *
 * @help
 * Use script call:
 *   ysp.VideoPlayer.loadVideo(videoName) - Preload Video
 *   ysp.VideoPlayer.releaseVideo(videoName) - Release memory for a Video
 *   ysp.VideoPlayer.newVideo(videoName, id) - Create new Video object with id
 *   ysp.VideoPlayer.playVideoById(id) - Play a Video object by id
 *   ysp.VideoPlayer.stopVideoById(id) - Stop a Video object by id
 *   ysp.VideoPlayer.setLoopById(id) - Make a Video object playing loop by id
 *   ysp.VideoPlayer.getVideoById(id) - Get Video object by id
 *   ysp.VideoPlayer.isReady() - Check if all videos have been loaded
 *
 * Video Object is a PIXI.Sprite object, can be re-position by modifying x and y props
 * To preload a (or many) video(s), use loadVideo(videoName) followed by a loop in
 * an event, break the loop when isReady() returns true
 */

/*
 * Un-minified from the original webpack bundle, with three correctness/performance
 * fixes over the shipped version:
 *
 *   1. newVideo() no longer installs a per-frame `sprite.update = texture.update`.
 *      PIXI's VideoBaseTexture already auto-updates itself via ticker.shared while
 *      the source is playing (autoUpdate, on by default). The manual updater made
 *      MV's scene graph push a *second* GPU upload of every video frame each tick,
 *      doubling the per-frame video cost and dropping frames.
 *
 *   2. playVideo() waits for the source to be ready before calling play(). The
 *      original fired play() blind, so a call issued right after newVideo() was a
 *      no-op until the webm had buffered - which is why play had to be spammed.
 *
 *   3. stopVideoById()/releaseVideo() actually destroy the texture (texture.destroy
 *      removes the <video> element from PIXI's cache, clears its src, and unhooks it
 *      from the ticker) instead of only dropping a JS map entry, so video elements
 *      and GPU textures no longer leak across a play session.
 *
 * The public API (window.ysp.VideoPlayer) is unchanged.
 */

(function () {
    "use strict";

    // Object.values is used by isReady(); the original bundled a core-js polyfill
    // for older runtimes, so keep a fallback here.
    var objectValues = Object.values || function (obj) {
        return Object.keys(obj).map(function (key) { return obj[key]; });
    };

    // Spriteset_Base: add a container, above the map, that holds video sprites.
    (function (Spriteset) {
        var _createUpperLayer = Spriteset.prototype.createUpperLayer;
        Spriteset.prototype.createUpperLayer = function () {
            this.createVideos();
            _createUpperLayer.call(this);
        };

        Spriteset.prototype.createVideos = function () {
            this._videosContainer = new Sprite();
            this.addChild(this._videosContainer);
        };

        Spriteset.prototype.addVideo = function (video) {
            this._videosContainer.addChild(video);
        };

        Spriteset.prototype.removeVideo = function (video) {
            this._videosContainer.removeChild(video);
        };
    })(Spriteset_Base);

    // VideoPlayer
    var textureCache = {}; // PIXI.Texture keyed by video file name
    var videosById = {};   // PIXI.Sprite keyed by user-supplied id

    // Preload a video and cache its texture by file name.
    function loadVideo(name) {
        if (textureCache[name]) {
            return textureCache[name];
        }
        var texture = PIXI.Texture.fromVideo("movies/" + name);
        // Don't auto-start on load; playback is driven explicitly by playVideo().
        texture.baseTexture.autoPlay = false;
        textureCache[name] = texture;
        return texture;
    }

    // Create a sprite for a video and register it under an id (default "video").
    // Note: we deliberately do NOT add a manual texture.update() here - PIXI's
    // VideoBaseTexture updates itself via ticker.shared while playing (fix #1).
    function newVideo(name, id) {
        if (id === undefined) {
            id = "video";
        }
        var sprite = new PIXI.Sprite(loadVideo(name));
        sprite._videoName = name; // remembered so teardown can free the texture
        videosById[id] = sprite;
        return sprite;
    }

    // Add a video sprite to the scene and start playback once the source is ready.
    function playVideo(sprite) {
        SceneManager._scene._spriteset.addVideo(sprite);
        var source = sprite.texture.baseTexture.source;
        var start = function () {
            var promise = source.play();
            // play() rejects if interrupted (e.g. a quick pause); ignore that.
            if (promise && promise.catch) {
                promise.catch(function () {});
            }
        };
        if (source.readyState >= 3) { // HAVE_FUTURE_DATA or better
            start();
        } else {
            var onCanPlay = function () {
                source.removeEventListener("canplay", onCanPlay);
                start();
            };
            source.addEventListener("canplay", onCanPlay);
        }
    }

    function playVideoById(id) {
        var sprite = getVideoById(id);
        if (sprite) {
            playVideo(sprite);
        }
    }

    // Remove a video sprite from the scene and fully release its resources.
    function stopVideo(sprite) {
        SceneManager._scene._spriteset.removeVideo(sprite);
        var texture = sprite.texture;
        texture.baseTexture.source.pause();
        if (sprite._videoName) {
            delete textureCache[sprite._videoName];
        }
        // destroy(true) also destroys the base texture: removes it from PIXI's
        // cache, pauses + clears the <video> src, and unhooks it from the ticker.
        texture.destroy(true);
    }

    function stopVideoById(id) {
        var sprite = getVideoById(id);
        if (sprite) {
            stopVideo(sprite);
            delete videosById[id];
        }
    }

    function setLoop(sprite) {
        sprite.texture.baseTexture.source.loop = true;
    }

    function setLoopById(id) {
        var sprite = getVideoById(id);
        if (sprite) {
            setLoop(sprite);
        }
    }

    // Release a cached video texture by file name.
    function releaseVideo(name) {
        var texture = textureCache[name];
        if (texture) {
            texture.destroy(true);
        }
        delete textureCache[name];
    }

    function getVideoById(id) {
        return videosById[id];
    }

    function isReady() {
        return !objectValues(textureCache).some(function (texture) {
            return !texture.baseTexture.hasLoaded;
        });
    }

    function getVideoMap() {
        return videosById;
    }

    window.ysp = window.ysp || {};
    window.ysp.VideoPlayer = {
        newVideo: newVideo,
        loadVideo: loadVideo,
        playVideo: playVideo,
        playVideoById: playVideoById,
        stopVideoById: stopVideoById,
        setLoopById: setLoopById,
        releaseVideo: releaseVideo,
        getVideoById: getVideoById,
        isReady: isReady,
        getVideoMap: getVideoMap
    };
})();
