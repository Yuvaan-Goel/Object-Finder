status= "";
objects= [];

function preload()
{
}

function setup()
{
    canvas = createCanvas(600, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
}

function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);

    document.getElementById("status").innerHTML = "Status: Detecting Objects";

    object_name = document.getElementById("input").value;
}

function gotResult(error, result)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(result);
        objects = result;
    }
}

function draw() {
    image(video, 0, 0, 600, 400);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++) {

            if (objects[i].label == object_name) {
                document.getElementById("status").innerHTML = "Status: Objects Detected";
                document.getElementById("object-status").innerHTML = object_name + " found!";
                fill(r, g, b);
                noFill();
                stroke(r, g, b);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);

                rect(objects[i].x + 20, objects[i].y + 20, objects[i].width + 20, objects[i].height + 20);
            }
            else {
                document.getElementById("object-status").innerHTML = object_name + " not found!";
            }

        }
    }

}