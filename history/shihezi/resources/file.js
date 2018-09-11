document.addEventListener("deviceready",function(){
    
    if(device.platform=="Android"){
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
            //自定义：安卓系统上应用的目录
            fileSystem.root.getDirectory("shz", {create:true, exclusive:false}, function(directoryEntry){
                window.appRoot=directoryEntry;
                window.appRootURL=directoryEntry.toURL();
                window.appRootPath=window.appRootURL.replace("file://","");
                
                //自定义
                getDirectoryInRoot("cache");
                
            },function(){
                console.log("create root directory error!");
            });
        }, function(){
            console.log("request file system error!");
        });
    }else{ //IOS
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
            window.appRoot=fileSystem.root;
            window.appRootPath=device.home+"/Documents";
            
            //自定义
            getDirectoryInRoot("cache");
            
        }, function(){
            console.log("request file system error!");
        });
    }
},false);

function getDirectoryInRoot(name){
    getDirectory(name,window.appRoot,window.appRootPath);
}

function getDirectory(name,parentDirectory,parentDirectoryPath){
    parentDirectory.getDirectory(name, {create:true, exclusive:false}, function(directoryEntry){
        window[name+"Directory"]=directoryEntry;
        window[name+"DirectoryPath"]=parentDirectoryPath+"/"+name;

    },function(){
        console.log("create "+name+" directory error!");
    });
}

function isFileExist(name,directory,callback){
    directory.getFile(name, {create:false, exclusive:false}, function(fileEntry){
        if(callback)
            callback(true);
    }, function(){
        if(callback)
            callback(false);
    });
}

function removeFile(name,directory,success,error){
    directory.getFile(name, {create:false, exclusive:false}, function(fileEntry){
        fileEntry.remove(function(){
            if(success) success();
        },function(){
            if(error) error();
        });
    }, function(){
        if(error)
            error("文件不存在！");
    });
}