//Setup
var lines = [];
var couplets = [];
var counter = 0;

Tone.Transport.loopEnd = '2m';
Tone.Transport.loop = true;
Tone.Transport.bpm.value = 72;





//-----------Visuals---------------
//--------------------------------

var colourarray = [
	'65E597',
	'EE7CC1',
	'ECB275',
	'EA8270',
	'707DEA',
	'E0D25A',
	'E06D5A',
	'9BE3EF',
	'C8F0F7',
	'EDED66',
	'5E767A',
	'76F49C'
];













//-----------Drums---------------
//--------------------------------

var snare = new Tone.Player("drums/snarenew.wav").toMaster();
var hat = new Tone.Player("drums/hat.wav").toMaster();
var kick = new Tone.Player("drums/kick1.wav").toMaster();
var kick2 = new Tone.Player("drums/kick1.wav").toMaster();

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
//hat.sync().start('1m + 2n + 4n + 12n').stop(0.3);
//hat.sync().start('1m + 2n + 4n + 6n').stop(0.3);


kick2.sync().start(0).stop(0.3);


var kickarray = [
'8n',
'3n',
'4n + 3n',
'4n + 8n + 3n',
'2n + 8n',
'2n + 8n + 4n',
'2n + 8n + 4n + 3n',
'1m + 0',
'1m + 8n',
'1m + 3n',
'1m + 4n + 3n',
'1m + 4n + 8n + 3n',
'1m + 2n + 8n',
'1m + 2n + 8n + 4n',
'1m + 2n + 8n + 4n + 3n'
];


function newkicks() {
	kick.unsync();
	kickarray = shuffle(kickarray);
	for (i = 0; i < 6; i++) {
		var thiskick = kickarray[i];
		kick.sync().start(thiskick).stop(0.3);
	}
}

Tone.Transport.schedule(function(time){
	newkicks();
}, 0);



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
	basspart.at("0").value.noteName = rndnote.n1 + '2';
	basspart.at("2n + 3n").value.noteName = rndnote.n1 + '2';
	basspart.at("1m").value.noteName = rndnote.n1 + '2';
	basspart.at("1m + 2n + 8n").value.noteName = rndnote.n3 + '2';
	basspart.at("1m + 2n + 8n").value.noteName = rndnote.n2 + '2';
	
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


	//Melody
	melodypart.at("0").value.noteName = rndnote.scale.s1;
	melodypart.at("32n").value.noteName = rndnote.scale.s2;
	melodypart.at("16n").value.noteName = rndnote.scale.s3;
	melodypart.at("16n + 32n").value.noteName = rndnote.scale.s2;
	melodypart.at("2n + 16n").value.noteName = rndnote.scale.s8;
	melodypart.at("2n + 8n + 16n").value.noteName = rndnote.scale.s7;
	melodypart.at("2n + 4n + 16n").value.noteName = rndnote.scale.s3;
	melodypart.at("2n + 4n + 8n + 16n").value.noteName = rndnote.scale.s2;

	//update visuals
	console.log(colourarray[rndnote]);
	$('body').css('background-color','#' + colourarray[rndnum]);
	
}, 0);


//Bass
var basssynth = new Tone.Synth().toMaster();
var bassdistortion = new Tone.Distortion(0.2).toMaster();
basssynth.connect(bassdistortion);

var basspart = new Tone.Part(function(time, note){
	basssynth.triggerAttackRelease(note.noteName, note.duration, time, '1');
}, [
	{
		"time": "0",
		"noteName": "C2",
		"duration": "4n",
	},
	{
		"time": "2n + 3n",
		"noteName": "C2",
		"duration": "4n",
	},
	{
		"time": "1m",
		"noteName": "C2",
		"duration": "4n",
	},
	{
		"time": "1m + 2n + 8n",
		"noteName": "G2",
		"duration": "8n",
	},
	{
		"time": "1m + 2n + 3n",
		"noteName": "E2",
		"duration": "4n",
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
var distortion = new Tone.Distortion(0.2).toMaster();
var chorus = new Tone.Chorus({
	frequency  : '4n' ,
	delayTime  : 1 ,
	depth  : 0.2,
	type  : 'sine',
	spread  : 180
}).chain(distortion, Tone.Master);
keyssynth.connect(chorus);

var keyspart = new Tone.Part(function(time, note){
	keyssynth.triggerAttackRelease(note.noteName, note.duration, time, '1');
}, [
	{
		"time": "0",
		"noteName": "C3",
		"duration": "1m + 2n",
	},
	{
		"time": "1m + 2n",
		"noteName": "E3",
		"duration": "4n",
	},
	{
		"time": "1m + 2n + 4n",
		"noteName": "G3",
		"duration": "4n",
	}
]).start(0);
keyspart.loop = true;
keyspart.loopEnd = "2m";


//Plucky
var pluckysynth = new Tone.PolySynth(6, Tone.Synth, {
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

//Melody
var melodysynth = new Tone.Synth().toMaster();

var melodypart = new Tone.Part(function(time, note){
	melodysynth.triggerAttackRelease(note.noteName, note.duration, time, '1');
}, [
	{
		"time": "0",
		"noteName": "C5",
		"duration": "32n",
	},
	{
		"time": "32n",
		"noteName": "D5",
		"duration": "32n",
	},
	{
		"time": "16n",
		"noteName": "E5",
		"duration": "32n",
	},
	{
		"time": "16n + 32n",
		"noteName": "D5",
		"duration": "32n",
	},
	{
		"time": "2n + 16n",
		"noteName": "C6",
		"duration": "32n",
	},
	{
		"time": "2n + 8n + 16n",
		"noteName": "B6",
		"duration": "32n",
	},
	{
		"time": "2n + 4n + 16n",
		"noteName": "E5",
		"duration": "32n",
	},
	{
		"time": "2n + 4n + 8n + 16n",
		"noteName": "D5",
		"duration": "32n",
	},
]).start(0);
melodypart.loop = true;
melodypart.loopEnd = "1m";






//-----------Volumes---------------
//--------------------------------

snare.volume.value = -5;
hat.volume.value = -13;
kick.volume.value = -2;
kick2.volume.value = -2;
basssynth.volume.value = -6;
keyssynth.volume.value = -28;
pluckysynth.volume.value = -30;


$(document).ready(function() {
	$('a').addClass('ready')	
});


$('a').click(function(e){
	e.preventDefault();
	if ( $(this).hasClass('ready') ) {
		Tone.Transport.start('+0.6');
	};
});

































//-----------Lyrics---------------
//--------------------------------
var theme = 'music';
var rhymecounter = 0;
var linecounter = 0;

$(document).ready(function() {

	//console.log(responsiveVoice.getVoices());

	/*
	$.getJSON( 'https://api.datamuse.com/words?ml=' + theme + '&md=s', function( data ) {
		$(data).each(function(){
			
			if (this.numSyllables < 3) {
				var thisword = this.word;
				couplets.push({
					line1a : [''],
					line1b : [''],
					rhyme1 : [''],
					line2a : [''],
					line2b : [''],
				    rhyme2 : this
				});

				linecounter++;

				$.getJSON( 'https://api.datamuse.com/words?md=p&rel_rhy=' + thisword, function( data ) {
					var rhymingwords = [];
					$(data).each(function() {
						thisrhymeword = this;
						if ('tags' in thisrhymeword) {
							if ((thisrhymeword.tags[0] == 'n' || thisrhymeword.tags[0] == 'v' || thisrhymeword.tags[0] == 'adj') && thisrhymeword.numSyllables < 3) {
								rhymingwords.push(thisrhymeword);
							}
						}
					});

					if (rhymingwords.length > 0) {
						couplets[rhymecounter].rhyme1 = rhymingwords[Math.floor(Math.random() * rhymingwords.length)];
					} else {
						//Remove rhyme2
					};

					rhymecounter++;

					if (rhymecounter == linecounter) {
						addlines();
					}
				});

			}
		});
	});
	*/


	function addlines() {
		var coupletstemp = [];

		$(couplets).each( function(){
			if (this.rhyme1 != '') {
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

		})

		$('a').addClass('ready')
	}

	$('a').click(function(e){
		e.preventDefault();
		if ( $(this).hasClass('ready') ) {
			Tone.Transport.start('+0.6');
		};
	});

});

//COUPLETS
/*
Tone.Transport.schedule(function(time){
	responsiveVoice.speak( couplets[counter].line1a, "UK English Male", {rate: 1.3, pitch: 0.8});
	$('div').html('');
	$('div').append('<p class="words">' + couplets[counter].line1a + ', ' + couplets[counter].line1b + '</p><p class="rhymes">' + couplets[counter].rhyme1 + '!</p>');
}, '0');

Tone.Transport.schedule(function(time){
	responsiveVoice.speak( couplets[counter].line1b, "UK English Male", {rate: 1.3, pitch: 0.8});
}, '4n + 8n + 16n');

Tone.Transport.schedule(function(time){
	responsiveVoice.speak( couplets[counter].rhyme1, "UK English Male", {rate: 1.2, pitch: 0.8});
}, '2n + 4n');

Tone.Transport.schedule(function(time){
	responsiveVoice.speak( couplets[counter].line2a, "UK English Male", {rate: 1.3, pitch: 0.8});
	$('div').append('<p class="words">' + couplets[counter].line2a + ', ' + couplets[counter].line2b + '</p><p class="rhymes">' + couplets[counter].rhyme2 + '!</p>');
}, '1m');

Tone.Transport.schedule(function(time){
	responsiveVoice.speak( couplets[counter].line2b, "UK English Male", {rate: 1.3, pitch: 0.8});
}, '1m + 4n + 8n + 16n');

Tone.Transport.schedule(function(time){
	responsiveVoice.speak( couplets[counter].rhyme2, "UK English Male", {rate: 1.2, pitch: 0.8});
	if (counter < couplets.length) {
		counter++;
	} else {
		counter = 0;
	}
}, '1m + 2n + 4n');
*/




















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