安装依赖
npm^5.42  nodejs^8.7  cordova^8.0.0(必须用npm安装) 
android-sdk-windows   jdk1.8.0_131
配置环境
npm 安装包位置修改 npm config set cache "D:\nodejs\node_cache";
                                npm config set prefix "D:\nodejs\node_global"
cordova正确安装方式  npm i cordova -g (不能使用cnpm)
ANDROID_HOME D:\evirenments\android-sdk-windows
JAVA_HOME    D:\evirenments\Java\jdk1.8.0_131
NODE_GLOBAL  D:\nodejs
Path         
%SystemRoot%\system32;  //如果有就不需要配置此项
%JAVA_HOME%\bin;
%NODE_GLOBAL%;
%ANDROID_HOME%\platform-tools;
%ANDROID_HOME%\tools;