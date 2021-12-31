video="";
status1="";
objects=[];
function preload(){

}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
   
}
function draw(){
    image(video,0,0,480,380);
    if(status1!=""){
        objectDetector.detect(video,gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="status : objects detected";
            document.getElementById("number_of_objects").innerHTML="number of objects detected :"+objects.length;
            fill("#ff0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
            
        
    }
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status: detecting objects "
}
function modelLoaded(){
    console.log("model is loaded");
    video.loop();
    status1=true;
    
}
function gotResult(error,results){
if(error){
    console.log(error);
}
else{
console.log(results);
objects=results;
}
}