/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "noCache"       : false,
    // "noCache" set whether your resources will be loaded with a timestamp suffix in the url.
    // In this way, your resources will be force updated even if the browser holds a cache of it.
    // It's very useful for mobile browser debugging.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */

 (function () {
    if (typeof window.jsb === 'object') {
        var hotUpdateSearchPaths = cc.sys.localStorage.getItem('HotUpdateSearchPaths');
        if (hotUpdateSearchPaths) {
            var paths = JSON.parse(hotUpdateSearchPaths);
            jsb.fileUtils.setSearchPaths(paths);

            var fileList = [];
            var storagePath = paths[0] || '';
            var tempPath = storagePath + '_temp/';
            var baseOffset = tempPath.length;

            if (jsb.fileUtils.isDirectoryExist(tempPath) && !jsb.fileUtils.isFileExist(tempPath + 'project.manifest.temp')) {
                jsb.fileUtils.listFilesRecursively(tempPath, fileList);
                fileList.forEach(srcPath => {
                    var relativePath = srcPath.substr(baseOffset);
                    var dstPath = storagePath + relativePath;

                    if (srcPath[srcPath.length] == '/') {
                        cc.fileUtils.createDirectory(dstPath)
                    }
                    else {
                        if (cc.fileUtils.isFileExist(dstPath)) {
                            cc.fileUtils.removeFile(dstPath)
                        }
                        cc.fileUtils.renameFile(srcPath, dstPath);
                    }
                })
                cc.fileUtils.removeDirectory(tempPath);
            }
        }
    }
})();


cc.game.onStart = function(){
    console.log(" ============================== ban cu ==============================");
    try {
        if(gI){
            gI.setGameType();
        }
    } catch (error) {
        
    }

    if(sdkbox && sdkbox.PluginOneSignal){
        sdkbox.PluginOneSignal.init();
    }
    
    var searchPaths = jsb.fileUtils.getSearchPaths();
    searchPaths.push('script');
    searchPaths.push('src');
    searchPaths.push('res');
    searchPaths.push('/');
    jsb.fileUtils.setSearchPaths(searchPaths);

    cc.view.enableRetina(cc.sys.os === cc.sys.OS_IOS ? true : true);
    cc.view.adjustViewPort(true);


    var resizeCallback = function () {
         var scaleContent = 1;
         var scaleContentX = 1;
         var scaleContentY = 1;

         if (cc.sys.isNative || isShowBanCa) {

         } else if (baseLobby && !cc.sys.isMobile) {
             cc.view.setDesignResolutionSize(window.innerWidth, window.innerHeight, cc.ResolutionPolicy.NO_BORDER);
             scaleContentX = window.innerWidth / 1920;
             scaleContentY = window.innerHeight / 1080;
             scaleContent = window.innerWidth / 1920;
             baseLobby.positionTop = cc.p(960 * scaleContentX, window.innerHeight);
             baseLobby.positionContent = cc.p(960 * scaleContentX, 630 * scaleContentY);
             baseLobby.positionCenter = cc.p(960 * scaleContentX, 540 * scaleContentY);
             baseLobby.imageBg = "res/Base/Lobby/GUI/lobby-bg.jpg";
             baseLobby.bg.setPosition(baseLobby.positionCenter);
             baseLobby.main_content.setPosition(baseLobby.positionTop);
             baseLobby.bg.setScaleX(scaleContentX);
             baseLobby.bg.setScaleY(scaleContentY);
             baseLobby.main_content.setScale(scaleContent);
         }
         else if (baseLobby && cc.sys.isMobile) {
             cc.view.setDesignResolutionSize(1920, 1080, cc.ResolutionPolicy.SHOW_ALL);
             baseLobby.positionTop = cc.p(960, 1080);
             baseLobby.positionContent = cc.p(960, 630);
             baseLobby.positionCenter = cc.p(960, 540);
             baseLobby.imageBg = "res/Base/Lobby/GUI/lobby-bg.jpg";
             baseLobby.bg.setPosition(baseLobby.positionCenter);
             baseLobby.main_content.setPosition(baseLobby.positionTop);
             baseLobby.bg.setScale(scaleContent);
             baseLobby.main_content.setScale(scaleContent);
         }
     };
     
    var resolution = cc.ResolutionPolicy.FIXED_HEIGHT;
    if(cc.winSize.width/cc.winSize.height < 1280/720) {
        resolution = cc.ResolutionPolicy.SHOW_ALL;
    }
    cc.view.setDesignResolutionSize(1280, 720, resolution);

    cc.view.resizeWithBrowserSize(true);
    cc.view.setResizeCallback(resizeCallback);


    cc.LoaderScene.preload(g_resources, function (){
         try {
             if(BaseScene){
                BaseScene.BG_GUI = new cc.Layer();
                BaseScene.GAME_GUI = new cc.Layer();
                BaseScene.MINI_GAME_GUI = new cc.Layer();
                BaseScene.POP_UP_GUI = new cc.Layer();
                BaseScene.INFO_GUI = new cc.Layer();
                BaseScene.BAN_CA = new cc.Layer();
                BaseScene.BG_GUI.retain();
                BaseScene.GAME_GUI.retain();
                BaseScene.MINI_GAME_GUI.retain();
                BaseScene.POP_UP_GUI.retain();
                BaseScene.INFO_GUI.retain();
                BaseScene.BAN_CA.retain();
             }    
            

            // console.log("====== ton tai BaseScene");

            cc.director.runScene(new SplashScene());
         } catch (error) {
            // console.log("====== deo ton tai BaseScene");

            cc.director.runScene(new SplashScene());
         }
        
        resizeCallback.call();
    }, this);
};
cc.game.run();
