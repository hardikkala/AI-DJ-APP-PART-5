song="";
leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;
scoreLeftWrist=0

function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function gotPoses(results){
    if (results.length>0){
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score
        console.log("Scoreleftwrist="+scoreLeftWrist);
        
        leftwristX=results[0].pose.leftwrist.x;
        leftwristY=results[0].pose.leftwrist.y;
        console.log("LeftwristX="+leftwristX+"LeftwristY="+leftwristY);
        
        rightwristX=results[0].pose.rightwrist.x;
        rightwristY=results[0].pose.rightwrist.y;
        console.log("RightwristX= "+rightwristX+"RightwristY= "+rightwristY);
    }
}
function modelLoaded(){
    console.log("PoseNet is initialized!");
}
function draw(){
    image(video,0,0,600,500);

    fill("#FF0000");
    strok("#FF0000");

    if(scoreLeftWrist > 0.2){
        circle(leftwristX,leftwristY,20);
        InNumberleftwristY= Number(leftwristY);
        remove_decimals=floor(InNumberleftwristY);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="volume="+volume;
        song.setVolume(volume);
    }
}
function play(){
    song.play();
    song.setvolume(1);
    song.rate(1);
}
