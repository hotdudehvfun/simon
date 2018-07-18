var cpuArray=[];
var playerArray=[];
var abcd=["0","a","b","c","d"];

var boxA,boxB,boxC,boxD,playButton,message,scoreButton;

var feedingAllowed,isGameRunning;

var gameLength;
var score;
var animationKey;
var PMessageArray=["well done","great job","nice","you are best","get going","unstopable","great going","excellent","good","not bad"];
var WMessageArray=["pathetic","poor","very poor","you can do better","well...","not good","try again","loser","you lose","go home","nups"];
document.addEventListener("DOMContentLoaded",initiate);
function initiate()
{
	setUpListeners();
}
function setUpListeners(argument)
{
	boxA=document.getElementById('a');
	boxB=document.getElementById('b');
	boxC=document.getElementById('c');
	boxD=document.getElementById('d');
	playButton=document.getElementById('start');
	message=document.getElementById('message');
	scoreButton=document.getElementById('score');


	feedingAllowed=false;
	isGameRunning=false;
	gameLength=1;
	score=0;
	animationKey=null;
	scoreButton.innerHTML=score;
	boxA.addEventListener("click",function()
	{
		feedPlayerArray("a")
	});
	boxB.addEventListener("click",function()
	{
		feedPlayerArray("b")
	});
	boxC.addEventListener("click",function()
	{
		feedPlayerArray("c")
	});
	boxD.addEventListener("click",function()
	{
		feedPlayerArray("d")
	});
	
	playButton.addEventListener("click",playGame);


}
function feedPlayerArray(arg)
{
	if (feedingAllowed)
	{
		playerArray.push(arg);
		selectBox(arg);
		console.log(arg);

		if (cpuArray[playerArray.length-1]==arg)
		{
			console.log("correct");
			if (playerArray.length==cpuArray.length)
			{
				console.log("you win");
				message.innerHTML=PMessageArray[getRandomInt(0,PMessageArray.length-1)]+"!";
				gameLength++;
				score+=1;
				scoreButton.innerHTML=score;
				setTimeout(function()
				{
					feedCpuArray();
				},500);
			}		
			
		}else
		{
			console.log("wrong");
			message.innerHTML=WMessageArray[getRandomInt(0,WMessageArray.length-1)]+"!";
			isGameRunning=false;
			feedingAllowed=false;
			gameLength=1;
		}

	}
}
function selectBox(arg)
{
	document.getElementById(arg).setAttribute("class","box selected-"+arg); 
	setTimeout(function()
	{
		document.getElementById(arg).setAttribute("class","box");

	},400);
}
function feedCpuArray()
{
	var pos=0;
	feedingAllowed=false;
	
	cpuArray=[];
	playerArray=[];
		pos=0;
		for (var i = 0; i < gameLength; i++)
		{
			cpuArray.push(abcd[getRandomInt(1,4)]);
		}
		console.log(cpuArray);
		clearInterval(animationKey);
		animationKey=setInterval(function()
		{
			selectBox(cpuArray[pos]);
			
			pos++;
			if (pos>=cpuArray.length)
			{
				clearInterval(animationKey);
				feedingAllowed=true;
				console.log("feedingAllowed");
			}									

		},700);
	
}
function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function fillCpuArray()
{
	cpuArray=[];
	playerArray=[];
}

function playGame()
{
	if (!isGameRunning)
	{
		isGameRunning=true;
		score=0;
		scoreButton.innerHTML=score;
		feedCpuArray();
	}

}








