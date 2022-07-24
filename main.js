song1 = ""
song2 = ""
song1_status = ""
song2_status = ""
leftWrist_score = 0
rightWrist_score = 0
leftwristX = 0
leftwristY = 0
rightwristX = 0
rightwristY = 0

function preload() {
    song1 = loadSound("music.mp3")
    song2 = loadSound("music2.mp3")
}

function setup() {
    canvas = createCanvas(600, 500)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelloaded)
    poseNet.on("pose", gotposes)
}

function draw() {
    image(video, 0, 0, 600, 500)
    song1_status = song1.isPlaying()
    song2_status = song2.isPlaying()

    fill("red")
    stroke("red")

    if (leftWrist_score > 0.01) {
        console.log("showing leftWrist")
        circle(leftwristX, leftwristY, 30)
        song2.stop()
        if (song1_status == false) {
            song1.play()
            document.getElementById("song_name").innerHTML = "playing harry potter theme song"
        }
    }

    if (rightWrist_score > 0.01) {
        console.log("showing rightWrist")
        circle(rightwristX, rightwristY, 30)
        song1.stop()
        if (song2_status == false) {
            song2.play()
            document.getElementById("song_name").innerHTML = "playing peter pan theme song"
        }
    }
}
function modelloaded() {
    console.log('posNet is inisalized')
}

function gotposes(results) {
    if (results.length > 0) {
        console.log(results)
        leftwristX = results[0].pose.leftWrist.x
        leftwristY = results[0].pose.leftWrist.y
        rightwristX = results[0].pose.rightWrist.x
        rightwristY = results[0].pose.rightWrist.y
    }
}