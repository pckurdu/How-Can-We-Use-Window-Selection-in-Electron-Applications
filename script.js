var app=angular.module('myApp',['ui.router']);
const {clipboard,nativeImage} = require('electron')
//electron-clipboard-watcher

app.config(['$stateProvider',function($stateProvider){

    $stateProvider
    .state('copy',{
      url:'/copy',
      templateUrl:'copy.html',
      controller:'copyCtrl'
    })
    .state('paste',{
        url:'/paste',
        templateUrl:'paste.html',
        controller:'pasteCtrl'
    })
    .state('selection',{
        url:'/selection',
        templateUrl:'selection.html',
        controller:'selectionCtrl'
    })  
   
  
  }]);

app.controller('copyCtrl',function($scope){

    
    $scope.doCopyText=function(){
        clipboard.writeText($scope.text, 'selection')
        
    }
    
    $scope.doCopyHTML=function(){
        clipboard.writeHtml($scope.html, 'selectionHTML')
        
    }

    $scope.doBookmark=function(){
        clipboard.writeBookmark($scope.title, $scope.url)
        
        
    }

    $scope.doCopyImage=function(){
        
        $scope.selectedFile = document.getElementById('file-copy2').files[0];
        $scope.path=$scope.selectedFile.path;
        clipboard.writeImage(nativeImage.createFromPath($scope.path));
    }

});

app.controller('pasteCtrl',function($scope){

    
    $scope.doPasteText=function(){
        
       $scope.text=clipboard.readText('selection')
       $scope.showtext=true;
        
    }
   
    $scope.doPasteHTML=function(){
        let p=document.getElementById('p');
        p.innerHTML=clipboard.readHtml('selectionHTML')
        
        $scope.showhtml=true;
        alert(window.getSelection().toString())
        
        
    }
    $scope.doPasteBookmark=function(){
        let abookmark=document.getElementById('bookmark');
        let bookmark=clipboard.readBookmark();
        abookmark.innerHTML=bookmark.title;
        abookmark.href=bookmark.url;
        $scope.showbookmark=true;
        
    }

    $scope.doPasteImage=function(){
        let image=clipboard.readImage();
        $scope.path=image.toDataURL();
        $scope.showImg=true;

    }

})


app.controller('selectionCtrl',function($scope){

   $scope.textSelected=function(){

        var range = window.getSelection ();                                        
        alert (range.toString ());
        
    }
    $scope.allSelected=function(){

        var selectText = document.getElementById ("selectText");
        var selection = window.getSelection ();
        selection.selectAllChildren (selectText);
        
    }

    $scope.copySelected=function(){

        var range = window.getSelection().toString(); 
        clipboard.writeText(range, 'selection')
        $scope.output=clipboard.readText('selection');
    }

    $scope.inputSelected=function(){

        if(document.activeElement.tagName.toLowerCase () == "input"){
            var text = document.activeElement.value;
            var subtext=text.substring(document.activeElement.selectionStart,document.activeElement.selectionEnd);
            $scope.output=subtext
        }      
    }

    $scope.colorSelected=function(){

            var color=window.getSelection().toString();
            console.log(color);
            if(color=="blue"){
                $scope.pclass="alert alert-info"
            }
            if(color=="green"){
                $scope.pclass="alert alert-success"
            }
            if(color=="yellow"){
                $scope.pclass="alert alert-warning"
            }
            if(color=="red"){
                $scope.pclass="alert alert-danger"
            }
    }

});