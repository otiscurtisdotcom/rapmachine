//Setup
var lines = [];
var couplets = [];
var counter = 0;
var showlines = true;

Tone.Transport.loopEnd = '2m';
Tone.Transport.loop = true;
Tone.Transport.bpm.value = 84;





//-----------Visuals---------------
//--------------------------------

var particles = [];
var num_particles = 10;
radius = 30;

	
function doshapes(shapes,clearbox) {

	if (clearbox == true) {
		particles = [];
	}

	var canvas = document.getElementById("shapes");
	var ctx = canvas.getContext('2d');
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;

	$(window).on("resize", function(){
	    ctx.canvas.width  = window.innerWidth;
	    ctx.canvas.height = window.innerHeight;
	});

	particles.push({
		'x' : canvas.width * Math.random(),
		'y' : canvas.height * Math.random(),
		'shapes' : shapes
	})

	function draw() {
		//Hide if no kick drum
	    if (showlines == true) {
	    	$(particles).each(function() {
	    		var thisp = this;
	    		if (thisp.shapes == 'circles') {
					ctx.arc(thisp.x,thisp.y,50,0,2*Math.PI);
				} else if (thisp.shapes == 'squares') {
					ctx.rect(thisp.x,thisp.y,40,40);
				}
				ctx.fillStyle = "#ffffff";
				ctx.fill();
				ctx.beginPath();
	    	})
		} else {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		}
	}

	draw();
}


var aniseq = new Tone.Sequence(function(time, shape){
	doshapes(shape);
}, ['squares'], "8n").start(0);




function playani(wrapper) {
	var frame = 1;
	var loopnum = 0;
	var dir = 'fwd';
	var thisimg = wrapper.find('img')
	var thisstring = thisimg.attr('src');
	var totalframes = $(wrapper).data('frames');
	var rev = $(wrapper).data('rev');
    
    var frametimer = setInterval(function() {
	    if (frame < 10) {
	      framestr = '0' + frame;
	    } else {
	      framestr = frame;
	    }

	    //Change frame
	    thisimg.attr('src', thisstring.substring(0, thisstring.length - 6) + framestr + '.svg');

	    if (frame == totalframes) {
	      //Last frame
	      if (rev == true) {
	        dir = 'bwd';
	      } else {
	        frame = 1;
	        clearInterval(frametimer);
	        return;
	      }
	    }

	    //End loop
	    if (frame == 1 && dir == 'bwd') {
	      clearInterval(frametimer);
	      return;
	    }
	    


	    if (dir == 'fwd') {
	      frame++;
	    } else {
	      frame--;
	    }

  }, 100);
};




function airhornviz() {
	$('<img id="airhorn" height="240" width="320" src="http://www.reactiongifs.com/wp-content/uploads/2013/06/supa-hot-fire.gif" style="left:' + (Math.random() * ($(window).width() - 320)) +  'px; top: ' + (Math.random() * ($(window).height() - 240)) + 'px" />').appendTo('body');
	setTimeout(function() {
		$("#airhorn").remove();
	}, 2200);
	airhorn.start();
}

function heyviz() {
	console.log('HEY');
	//$('<h1 style="position: absolute; font-size: 200px; left:' + (Math.random() * ($(window).width() - 320)) +  'px; top: ' + (Math.random() * ($(window).height() - 240)) + 'px;">HEY</h1>').appendTo('body');
	$('#hey').css({
		'left' : Math.random() * ($(window).width() - 280),
		'top' : Math.random() * ($(window).height() - 380),
		'display' : 'block'
	});
	playani($('#hey'));
}




//-----------Drums---------------
//--------------------------------

var snare = new Tone.Player("drums/snarenew.wav").toMaster();
var hat = new Tone.Player("drums/hat.wav").toMaster();
var openhat = new Tone.Player("drums/openhat.wav").toMaster();
var kick = new Tone.Player("drums/kick1.wav").toMaster();
var kick2 = new Tone.Player("drums/kick1.wav").toMaster();


var tambo1  = new Tone.Player("drums/tambo1.wav").toMaster();
var tambo2  = new Tone.Player("drums/tambo2.wav").toMaster();
var tambo3  = new Tone.Player("drums/tambo3.wav").toMaster();


var hey = new Tone.Player("drums/hey.wav").toMaster();
var airhorn = new Tone.Player("drums/airhorn.wav").toMaster();


snare.sync().start('4n').stop(0.3);
snare.sync().start('2n + 4n').stop(0.3);
snare.sync().start('1m + 4n').stop(0.3);
snare.sync().start('1m + 2n + 4n').stop(0.3);


hat.sync().start(0).stop(0.3);
hat.sync().start('8n').stop(0.3);
hat.sync().start('4n').stop(0.3);
hat.sync().start('4n + 8n').stop(0.3);
hat.sync().start('2n').stop(0.3);
hat.sync().start('2n + 8n').stop(0.3);
hat.sync().start('2n + 4n').stop(0.3);
hat.sync().start('2n + 4n + 8n').stop(0.3);
hat.sync().start('1m').stop(0.3);
hat.sync().start('1m + 8n').stop(0.3);
hat.sync().start('1m + 4n').stop(0.3);
hat.sync().start('1m + 4n + 8n').stop(0.3);
hat.sync().start('1m + 2n').stop(0.3);
hat.sync().start('1m + 2n + 8n').stop(0.3);
hat.sync().start('1m + 2n + 4n').stop(0.3);
hat.sync().start('1m + 2n + 4n + 8n').stop(0.3);


openhat.sync().start('1m + 2n + 8n').stop(0.3);
openhat.sync().start('3m + 2n + 8n').stop(0.3);

kick2.sync().start(0).stop(0.3);
kick2.sync().start('1m').stop(0.3);



//TAMBOS
tambo1.sync().start(0).stop(0.3);
tambo3.sync().start('16n').stop(0.3);
tambo1.sync().start('8n').stop(0.3);
tambo3.sync().start('8n + 16n').stop(0.3);
tambo2.sync().start('4n').stop(0.3);
tambo3.sync().start('4n + 16n').stop(0.3);
tambo1.sync().start('4n + 8n').stop(0.3);
tambo3.sync().start('4n + 8n + 16n').stop(0.3);
tambo1.sync().start('2n').stop(0.3);
tambo3.sync().start('2n + 16n').stop(0.3);
tambo1.sync().start('2n + 8n').stop(0.3);
tambo3.sync().start('2n + 8n + 16n').stop(0.3);
tambo2.sync().start('2n + 4n').stop(0.3);
tambo3.sync().start('2n + 4n + 16n').stop(0.3);
tambo1.sync().start('2n + 4n + 8n').stop(0.3);
tambo3.sync().start('2n + 4n + 8n + 16n').stop(0.3);

tambo1.sync().start('1m').stop(0.3);
tambo3.sync().start('1m + 16n').stop(0.3);
tambo1.sync().start('1m + 8n').stop(0.3);
tambo3.sync().start('1m + 8n + 16n').stop(0.3);
tambo2.sync().start('1m + 4n').stop(0.3);
tambo3.sync().start('1m + 4n + 16n').stop(0.3);
tambo1.sync().start('1m + 4n + 8n').stop(0.3);
tambo3.sync().start('1m + 4n + 8n + 16n').stop(0.3);
tambo1.sync().start('1m + 2n').stop(0.3);
tambo3.sync().start('1m + 2n + 16n').stop(0.3);
tambo1.sync().start('1m + 2n + 8n').stop(0.3);
tambo3.sync().start('1m + 2n + 8n + 16n').stop(0.3);
tambo2.sync().start('1m + 2n + 4n').stop(0.3);
tambo3.sync().start('1m + 2n + 4n + 16n').stop(0.3);
tambo1.sync().start('1m + 2n + 4n + 8n').stop(0.3);
tambo3.sync().start('1m + 2n + 4n + 8n + 16n').stop(0.3);




var kickarray = [
	'8n',
	'3n',
	'4n + 3n',
	'4n + 8n + 3n',
	'2n + 8n',
	'2n + 8n + 4n',
	'2n + 8n + 4n + 3n',
	'1m + 8n',
	'1m + 3n',
	'1m + 4n + 3n',
	'1m + 4n + 8n + 3n',
	'1m + 2n + 8n',
	'1m + 2n + 4n + 8n',
];

function newkicks() {
	kick.unsync();
	kickarray = shuffle(kickarray);
	for (i = 0; i < 6; i++) {
		var thiskick = kickarray[i];
		kick.sync().start(thiskick).stop(0.3);

		Tone.Transport.scheduleOnce(function(time){
			doshapes('circles');
		}, thiskick);
	}

	Tone.Transport.scheduleOnce(function(time){
		doshapes('circles',true);
	}, 0);

	Tone.Transport.scheduleOnce(function(time){
		doshapes('circles');
	}, '1m');
}

function newpercs() {
	//Just Tambos
	var rndseq1 = Math.random();
	if (rndseq1 < 0.3) {
		Tone.Transport.scheduleOnce(function(time) {
			snare.volume.rampTo(-500, '64n');
			kick.volume.rampTo(-200, '64n');

			keyssynth.volume.rampTo(-2300, '64n');
			pluckysynth.volume.rampTo(-2300, '64n');
			basssynth.volume.rampTo(-500, '64n');

			showlines = false;
			$('.img-wrapper').hide();
		}, '1m');

		Tone.Transport.scheduleOnce(function(time){
			snare.volume.rampTo(-5, '64n');
			kick.volume.rampTo(-2, '64n');

			keyssynth.volume.rampTo(-23, '64n');
			pluckysynth.volume.rampTo(-23, '64n');
			basssynth.volume.rampTo(-5, '64n');

			showlines = true;
			$('.img-wrapper:not("#hey")').show();
			airhornviz();
			

		}, '1m + 2n + 4n + 8n + 16n + 32n + 64n');
	}

	//HEY
	hey.unsync();

	var rndseq2 = Math.floor(Math.random() * 10);
	var heyarray = ['m + 8n', 'm + 4n + 8n', 'm + 2n + 8n', 'm + 2n + 4n + 8n'];

	if (rndseq2 < 2) {
		$(heyarray).each(function() {
			thistime = rndseq2 + this;
			console.log(thistime);
			//hey.sync().start(thistime);
			hey.sync().start(thistime).stop(0.3);

			Tone.Transport.scheduleOnce(function(time){
				heyviz();
			}, thistime);
		});
	}
}


Tone.Transport.schedule(function(time){
	newkicks();
	newpercs();
}, 0);

Tone.Transport.scheduleRepeat(function(time){
	$('#hey').hide();
}, '1m');


















//-----------Music---------------
//--------------------------------

//Pick random chords
var chordsarray = [
	{ n1 : "C", n2 : "E", n3 : "G", dir : "u", scale : { s1 : 'C5', s2 : 'D5', s3 : 'E5', s4 : 'F5', s5 : 'G5', s6 : 'A6', s7 : 'B6', s8 : 'C6' } },
	{ n1 : "C#", n2 : "F", n3 : "G#", dir : "u", scale : { s1 : 'C#5', s2 : 'D#5', s3 : 'F5', s4 : 'F#5', s5 : 'G#5', s6 : 'A#6', s7 : 'C6', s8 : 'C#6' }  },
	{ n1 : "D", n2 : "F#", n3 : "A", dir : "d1", scale : { s1 : 'D5', s2 : 'E5', s3 : 'F#5', s4 : 'G5', s5 : 'A6', s6 : 'B6', s7 : 'C#6', s8 : 'D6' } },
	{ n1 : "D#", n2 : "G", n3 : "B#", dir : "d1", scale : { s1 : 'D#5', s2 : 'F5', s3 : 'G5', s4 : 'G#5', s5 : 'A#5', s6 : 'C6', s7 : 'D6', s8 : 'D#6' } },
	{ n1 : "E", n2 : "G#", n3 : "B", dir : "d1", scale : { s1 : 'E5', s2 : 'F#5', s3 : 'G#5', s4 : 'A6', s5 : 'B6', s6 : 'C#6', s7 : 'D#6', s8 : 'E' } },
	{ n1 : "F", n2 : "A", n3 : "C", dir : "d2", scale : { s1 : 'F5', s2 : 'G5', s3 : 'A6', s4 : 'A#6', s5 : 'C6', s6 : 'D6', s7 : 'E6', s8 : 'F6' } },
	{ n1 : "F#", n2 : "A#", n3 : "C#", dir : "d2", scale : { s1 : 'F#5', s2 : 'G#5', s3 : 'A#6', s4 : 'B6', s5 : 'C#6', s6 : 'D#6', s7 : 'F6', s8 : 'F#6' } },
	{ n1 : "G", n2 : "B", n3 : "D", dir : "d2", scale : { s1 : 'G5', s2 : 'A6', s3 : 'B6', s4 : 'C6', s5 : 'D6', s6 : 'E6', s7 : 'F#6', s8 : 'G6' } },
	{ n1 : "G#", n2 : "C", n3 : "D#", dir : "d2", scale : { s1 : 'G#5', s2 : 'A#6', s3 : 'C6', s4 : 'C#6', s5 : 'D#6', s6 : 'F6', s7 : 'G6', s8 : 'G#6' } },
	{ n1 : "A", n2 : "C#", n3 : "E", dir : "u", scale : { s1 : 'A6', s2 : 'B6', s3 : 'C#6', s4 : 'D6', s5 : 'E6', s6 : 'F#6', s7 : 'G#6', s8 : 'A7' } },
	{ n1 : "A#", n2 : "D", n3 : "F", dir : "u", scale : { s1 : 'A#6', s2 : 'C6', s3 : 'D6', s4 : 'D#6', s5 : 'F6', s6 : 'G6', s7 : 'A7', s8 : 'A#7' } },
	{ n1 : "B", n2 : "D#", n3 : "F#", dir : "u", scale : { s1 : 'B6', s2 : 'C#6', s3 : 'D#6', s4 : 'E6', s5 : 'F#6', s6 : 'G#6', s7 : 'A#7', s8 : 'B7' } },
];

//Changes
Tone.Transport.schedule(function(time){
	var rndnum = Math.floor(Math.random() * chordsarray.length);
	var rndnote = chordsarray[rndnum];
	
	//Bass
	basspart.at("0").value.noteName = rndnote.n1 + '1';
	basspart.at("2n + 3n").value.noteName = rndnote.n1 + '1';
	basspart.at("1m").value.noteName = rndnote.n1 + '1';
	basspart.at("1m + 2n").value.noteName = rndnote.n3 + '1';
	basspart.at("1m + 2n + 8n").value.noteName = rndnote.n3 + '2';
	basspart.at("1m + 2n + 3n").value.noteName = rndnote.n2 + '2';
	
	//Keys
	keyspart.at("0").value.noteName = rndnote.n1 + '3';
	
	if (rndnote.dir == 'd2') {
		keyspart.at("1m + 2n").value.noteName = rndnote.n2 + '2';
	} else {
		keyspart.at("1m + 2n").value.noteName = rndnote.n2 + '3';
	}
	
	if (rndnote.dir == 'd1' || rndnote.dir == 'd2') {
		keyspart.at("1m + 2n + 4n").value.noteName = rndnote.n3 + '2';
	} else {
		keyspart.at("1m + 2n + 4n").value.noteName = rndnote.n3 + '3';
	}

	//Plucky
	pluckypart.at("0").value.noteNames = [rndnote.n1 + '4',rndnote.n2 + '4',rndnote.n3 + '4'];

	//Brass
	brasspart.at("0").value.noteName = rndnote.n1;
	brasspart.at("1i").value.noteName = rndnote.n2;
	brasspart.at("2i").value.noteName = rndnote.n3;


	//Piano
	/*
	pianopart.at("0").value.noteName = rndnote.scale.s1;
	pianopart.at("1i").value.noteName = rndnote.scale.s3;
	pianopart.at("2i").value.noteName = rndnote.scale.s4;
	pianopart.at("3i").value.noteName = rndnote.scale.s5;
	*/


	//update visuals
	$('#bg').removeClass().addClass('style' + [rndnum]);
	
}, 0);


//Bass
var basssynth = new Tone.Synth({}).toMaster();
	
/* new Tone.PluckSynth({
	attackNoise  : 0.85,
	dampening  : 400,
	resonance  : 0.98*/


var bassdistortion = new Tone.Distortion (1);
var bassfx = new Tone.Chebyshev ( 1 )
basssynth.chain(bassfx, bassdistortion, Tone.Master);


var basspart = new Tone.Part(function(time, note){
	basssynth.triggerAttackRelease(note.noteName, note.duration, time, note.velocity);
}, [
	{
		"time": "0",
		"noteName": "C1",
		"duration": "3n",
		"velocity" : "1",
	},
	{
		"time": "2n + 3n",
		"noteName": "C1",
		"duration": "6n",
		"velocity" : "0.9",
	},
	{
		"time": "1m",
		"noteName": "C1",
		"duration": "3n",
		"velocity" : "1",
	},
	{
		"time": "1m + 2n",
		"noteName": "E1",
		"duration": "6n",
		"velocity" : "0.8",
	},
	{
		"time": "1m + 2n + 8n",
		"noteName": "G2",
		"duration": "6n",
		"velocity" : "0.6",
	},
	{
		"time": "1m + 2n + 3n",
		"noteName": "E2",
		"duration": "6n",
		"velocity" : "0.6",
	},
]).start(0);
basspart.loop = true;
basspart.loopEnd = "2m";



//Keys
var keyssynth = new Tone.PolySynth(3, Tone.Synth, {
	"oscillator" : {
		"type" : "fatsawtooth",
		"count" : 3,
		"spread" : 30
	},
	"envelope": {
		"attack": 0.01,
		"decay": 0.1,
		"sustain": 0.5,
		"release": 0.4,
		"attackCurve" : "exponential"
	},
}).toMaster();
var keyspanner = new Tone.Panner(0);
var distortion = new Tone.Distortion(0.2);
var chorus = new Tone.Chorus({
	frequency  : '4n',
	delayTime  : 1 ,
	depth  : 0.2,
	type  : 'sine',
	spread  : 180
}).chain(keyspanner, distortion, Tone.Master);
keyssynth.connect(chorus);

var keyspart = new Tone.Part(function(time, note){
	keyssynth.triggerAttackRelease(note.noteName, note.duration, time, note.velocity);
}, [
	{
		"time": "0",
		"noteName": "C3",
		"duration": "1m + 2n",
		"velocity" : 0.6
	},
	{
		"time": "1m + 2n",
		"noteName": "E3",
		"duration": "4n",
		"velocity" : 1
	},
	{
		"time": "1m + 2n + 4n",
		"noteName": "G3",
		"duration": "4n",
		"velocity" : 0.9
	}
]).start(0);
keyspart.loop = true;
keyspart.loopEnd = "2m";


//PIANO
/*
this.piano = new Tone.Sampler({
	"C4" : "pianoC4.mp3",
}, { 'baseUrl': 'drums/' });
var pianopanner = new Tone.Panner(-0.1);
piano.chain(pianopanner, Tone.Master);


var pianopart = new Tone.Part(function(time, note){
	piano.triggerAttackRelease(note.noteName, note.duration, time, note.velocity);
}, [
	{
		"time": "0",
		"noteName": "C5",
		"duration": "4n",
		"velocity" : "1.2",
	},
	{
		"time": "1i",
		"noteName": "E5",
		"duration": "4n",
		"velocity" : "0.6",
	},
	{
		"time": "2i",
		"noteName": "F5",
		"duration": "4n",
		"velocity" : "0.6",
	},
	{
		"time": "3i",
		"noteName": "G5",
		"duration": "4n",
		"velocity" : "0.6",
	}
]).start(0);
pianopart.loop = true;
pianopart.loopEnd = "8n";
*/







//Plucky
var pluckysynth = new Tone.PolySynth(6, Tone.Synth, {
	oscillator : {
		type : "fatsawtooth"
	},
	envelope  : {
		attack  : 0.005 ,
		decay  : 0.1,
		sustain  : 0.3,
		release  : 1
	}
}).toMaster();
var pluckydistortion = new Tone.Distortion(0.05).toMaster();
pluckysynth.connect(pluckydistortion);

var pluckypart = new Tone.Part(function(time, note){
	pluckysynth.triggerAttackRelease(note.noteNames, note.duration, time, '1');
}, [
	{
		"time": "0",
		"noteNames": ["C4", "E4", "G4"],
		"duration": "32n",
	}
]).start(0);
pluckypart.loop = true;
pluckypart.loopEnd = "8n";













//BRASS
this.brass1 = new Tone.Sampler({
	"C4" : "trumpetC4.wav",
}, {
	'baseUrl': 'drums/', 
	/* 'onload': function() { }*/
}).toMaster();

this.brass2 = new Tone.Sampler({
	"C3" : "brassC3.wav",
}, { 'baseUrl': 'drums/', }).toMaster();

var brasspart = new Tone.Part(function(time, note){
	brass1.triggerAttackRelease(note.noteName + '4', note.duration, time, note.velocity);
	brass1.triggerAttackRelease(note.noteName + '3', note.duration, time, note.velocity);
	brass2.triggerAttackRelease(note.noteName + '4', note.duration, time, note.velocity);
	brass2.triggerAttackRelease(note.noteName + '3', note.duration, time, note.velocity);
}, [
	{
		"time": "0",
		"noteName": "C",
		"duration": "4n",
		"velocity" : "1.2",
	},
	{
		"time": "1i",
		"noteName": "E",
		"duration": "4n",
		"velocity" : "0.6",
	},
	{
		"time": "2i",
		"noteName": "G",
		"duration": "4n",
		"velocity" : "0.6",
	}
]).start(0);
brasspart.loop = true;
brasspart.loopEnd = "2m";





































//-----------Lyrics---------------
//--------------------------------
$(document).ready(function() {

	sizebox();

	$(window).resize(function() {
		sizebox();
	})

	$('form').submit(function(e){
		e.preventDefault();

		var theme = $('input').val();

		$('#loading').show();
		$('form, #titles').hide();
		
		$.getJSON( 'https://api.datamuse.com/words?ml=' + theme + '&md=s&max=20', function( data ) {
			data = shuffle(data);
			$(data).each(function(){

				var thisrhyme2 = this;
				if (thisrhyme2.numSyllables < 3) {
					couplets.push({
						line1a : [''],
						line1b : [''],
						rhyme1 : [''],
						line2a : [''],
						line2b : [''],
					    rhyme2 : thisrhyme2
					});
				}
			});

			getrhymers();
		});
	});
});

function sizebox() {
	var boxwidth = $('#Text_box')[0].getBoundingClientRect().width;
	var boxheight = $('#Text_box')[0].getBoundingClientRect().height;
	$('#intro').css({
		'width' : boxwidth + 'px',
		'height' : boxheight + 'px'
	});

	var labelwidth = $('#Label_box')[0].getBoundingClientRect().width;
	var labelheight = $('#Label_box')[0].getBoundingClientRect().height * 1.092;

	$('#labels').css({
		'width' : labelwidth + 'px',
		'height' : labelheight + 'px',
		'top' : (0 - labelheight) + 'px'
	});

	$('#labels p.rhymes').css('font-size',(labelwidth / 5) + 'px')
	$('#labels p.words').css('font-size',(labelwidth / 20) + 'px')
}

function getrhymers() {
	var coupletcounter = 1;
	$(couplets).each(function() {
		var thiscouplet = this;

		//$.getJSON( 'https://api.datamuse.com/words?md=p&rel_rhy=' + thiscouplet.rhyme2.word, function( data ) {
		$.ajax({ 
			url: 'https://api.datamuse.com/words?md=p&max=10&rel_rhy=' + thiscouplet.rhyme2.word, 
			dataType: 'json', 
			success: function(data) {
				var rhymingwords = [];
				$(data).each(function() {
					thisrhymeword = this;
					if ('tags' in thisrhymeword) {
						if ((thisrhymeword.tags[0] == 'n' || thisrhymeword.tags[0] == 'v' || thisrhymeword.tags[0] == 'adj') && thisrhymeword.numSyllables < 3) {
							rhymingwords.push(thisrhymeword);
						}
					};
				});

				var randomrhyme = { word : '_BLANK_'};
				if (rhymingwords.length > 0) {
					randomrhyme = rhymingwords[Math.floor(Math.random() * rhymingwords.length)];
				};

				thiscouplet.rhyme1 = randomrhyme;

				if (coupletcounter == couplets.length) {
					addlines();
				} else {
					coupletcounter++;
				}

			}, 
			timeout: 20000, //3 second timeout, 
			error: function(jqXHR, status, errorThrown) {
				//do something
				console.log('error');
				thiscouplet.rhyme1 = { word : '_BLANK_'};

				if (coupletcounter == couplets.length) {
					addlines();
				} else {
					coupletcounter++;
				}

			} 
		});
	});
}


function addlines() {
	var coupletstemp = [];

	$(couplets).each( function(){
		if (this.rhyme1.word == '_BLANK_') {
			//console.log('No rhyme for ' + this.rhyme2.word)
		} else {
			coupletstemp.push(this);
		}
	});

	couplets = coupletstemp;
	
	$(couplets).each( function() {
		var thiscouplet = this;

		if (thiscouplet.rhyme1.tags[0] == 'adj' || thiscouplet.rhyme1.tags[1] == 'adj' || thiscouplet.rhyme1.tags[2] == 'adj') {
			thiscouplet.line1b = adjectives[Math.floor(Math.random() * adjectives.length)].replace('XXX','');
		} else if (thiscouplet.rhyme1.tags[0] == 'v' || thiscouplet.rhyme1.tags[1] == 'v' || thiscouplet.rhyme1.tags[2] == 'v') {
			thiscouplet.line1b = verbs[Math.floor(Math.random() * verbs.length)].replace('XXX','');
		} else {
			thiscouplet.line1b = nouns[Math.floor(Math.random() * nouns.length)].replace('XXX','');
		}

		if (thiscouplet.rhyme2.tags[0] == 'adj' || thiscouplet.rhyme2.tags[2] == 'adj' || thiscouplet.rhyme2.tags[2] == 'adj') {
			thiscouplet.line2b = adjectives[Math.floor(Math.random() * adjectives.length)].replace('XXX','');
		} else if (thiscouplet.rhyme2.tags[0] == 'v' || thiscouplet.rhyme2.tags[2] == 'v' || thiscouplet.rhyme2.tags[2] == 'v') {
			thiscouplet.line2b = verbs[Math.floor(Math.random() * verbs.length)].replace('XXX','');
		} else {
			thiscouplet.line2b = nouns[Math.floor(Math.random() * nouns.length)].replace('XXX','');
		}

		thiscouplet.line1a = plain[Math.floor(Math.random() * plain.length)];
		thiscouplet.line2a = plain[Math.floor(Math.random() * plain.length)];


		thiscouplet.rhyme1 = thiscouplet.rhyme1.word;
		thiscouplet.rhyme2 = thiscouplet.rhyme2.word;

	});

	$('#intro').fadeOut();
	setTimeout(function() {
		console.log(couplets.length)
		console.log(couplets);
		Tone.context.resume().then(() => {
			Tone.Transport.start('+0.6');
		});
		$(this).removeClass('ready');
		$('.img-wrapper').show();
	}, 1200);
}




//COUPLETS
Tone.Transport.schedule(function(time){
	responsiveVoice.speak( couplets[counter].line1a, "UK English Male", {rate: 1.3, pitch: 0.8});
	$('div#words').html('');
	$('div#words').append('<p class="words">' + couplets[counter].line1a + ', ' + couplets[counter].line1b + '</p>');
	playani($('#zig-zag'));
	playani($('#blocks'));
	playani($('#triangle'));
	playani($('#diamond'));
}, '0');

Tone.Transport.schedule(function(time){
	responsiveVoice.speak( couplets[counter].line1b, "UK English Male", {rate: 1.4, pitch: 0.8});
}, '4n + 8n + 16n');

Tone.Transport.schedule(function(time){
	playani($('#zig-zag'));
	playani($('#blocks'));
	playani($('#triangle'));
	playani($('#diamond'));
}, '2n');

Tone.Transport.schedule(function(time){
	responsiveVoice.speak( couplets[counter].rhyme1, "UK English Male", {rate: 1.3, pitch: 0.8});
	$('div#words').append('<p class="rhymes">' + couplets[counter].rhyme1 + '</p>');
}, '2n + 4n');

Tone.Transport.schedule(function(time){
	playani($('#diamond'));
}, '2n + 3n');

Tone.Transport.schedule(function(time){
	responsiveVoice.speak( couplets[counter].line2a, "UK English Male", {rate: 1.3, pitch: 0.8});
	$('div#words').append('<p class="words">' + couplets[counter].line2a + ', ' + couplets[counter].line2b + '</p>');
	playani($('#zig-zag'));
	playani($('#blocks'));
	playani($('#triangle'));
	playani($('#diamond'));
}, '1m');

Tone.Transport.schedule(function(time){
	responsiveVoice.speak( couplets[counter].line2b, "UK English Male", {rate: 1.4, pitch: 0.8});
}, '1m + 4n + 8n + 16n');

Tone.Transport.schedule(function(time){
	playani($('#zig-zag'));
	playani($('#blocks'));
	playani($('#triangle'));
	playani($('#diamond'));
}, '1m + 2n');

Tone.Transport.schedule(function(time){
	responsiveVoice.speak( couplets[counter].rhyme2, "UK English Male", {rate: 1.3, pitch: 0.8});
	$('div#words').append('<p class="rhymes">' + couplets[counter].rhyme2 + '</p>');

	console.log('counter = ' + counter)

	if (counter < (couplets.length - 1)) {
		counter++;
	} else {
		counter = 0;
	}
}, '1m + 2n + 4n');






//-----------Volumes---------------
//--------------------------------

snare.volume.value = -4;
hat.volume.value = -16;
openhat.volume.value = -5;
kick.volume.value = -3;
kick2.volume.value = -3;

tambo1.volume.value = -6;
tambo2.volume.value = -1;
tambo3.volume.value = 2;

hey.volume.value = -13;

basssynth.volume.value = -14;
keyssynth.volume.value = -30;
pluckysynth.volume.value = -30;


brass1.volume.value = 10;
brass2.volume.value = -18;

airhorn.volume.value = -20;

//piano.volume.value = -23;





$(window).mousemove(function(event) {
	var xpos = event.pageX / $(document).width();
	var ypos = event.pageY / $(document).height()

	var pan = xpos * 2 - 1;
	keyspanner.pan.value = pan;

});







function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}