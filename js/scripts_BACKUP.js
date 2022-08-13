//-----------OSC------------------
//--------------------------------
/*
var osc = new Tone.Oscillator({
	"frequency" : 'C4',
	"volume" : -10
}).toMaster();

osc.sync().start(0).stop('1m + 4n + 8n');

Tone.Transport.schedule(function(time){
	osc.frequency.value = 'C4';
}, 0);

Tone.Transport.schedule(function(time){
	osc.frequency.rampTo('C6', '32n');
}, '4n');

Tone.Transport.schedule(function(time){
	osc.frequency.rampTo('A6', '32n');
}, '2n + 4n');

Tone.Transport.schedule(function(time){
	osc.frequency.rampTo('C6', '32n');
}, '1m');

Tone.Transport.schedule(function(time) {
	osc.frequency.rampTo('C4', '32n');
}, '1m + 4n');
*/







//Drums
var snare = new Tone.Player("drums/snarenew.wav").toMaster();
var hat = new Tone.Player("drums/hat.wav").toMaster();
var kick = new Tone.Player("drums/kick1.wav").toMaster();
var kick2 = new Tone.Player("drums/kick1.wav").toMaster();


Tone.Transport.loopEnd = '2m';
Tone.Transport.loop = true;
Tone.Transport.bpm.value = 84;


var lines = [];
var couplets = [];
var counter = 0;


Tone.Transport.schedule(function(time){
	newkicks();
}, 0);

//COUPLETS
Tone.Transport.schedule(function(time){
	responsiveVoice.speak( couplets[counter].line1a, "US English Female", {rate: 1.2, pitch: 1});
	if (counter % 2 === 0) {
		$('div').html('');
	};
	$('div').append(couplets[counter].line1a + ', ' + couplets[counter].line1b + couplets[counter].rhyme1 + '. <br>');
}, 0);

Tone.Transport.schedule(function(time){
	responsiveVoice.speak( couplets[counter].line1b, "US English Female", {rate: 1.3, pitch: 1});
}, '4n + 8n + 16n');

Tone.Transport.schedule(function(time){
	responsiveVoice.speak( couplets[counter].rhyme1, "US English Female", {rate: 1.2, pitch: 1});
}, '2n + 4n');


Tone.Transport.schedule(function(time){
	responsiveVoice.speak( couplets[counter].line2a, "US English Female", {rate: 1.2, pitch: 1});
	$('div').append(couplets[counter].line2a + ', ' + couplets[counter].line2b + couplets[counter].rhyme2 + '. <br>');
}, '1m');

Tone.Transport.schedule(function(time){
	responsiveVoice.speak( couplets[counter].line2b, "US English Female", {rate: 1.3, pitch: 1});
}, '1m + 4n + 8n + 16n');

Tone.Transport.schedule(function(time){
	responsiveVoice.speak( couplets[counter].rhyme2, "US English Female", {rate: 1.2, pitch: 1});
	if (counter < couplets.length) {
		counter++;
	} else {
		counter = 0;
	}
}, '1m + 2n + 4n');

//Volumes
snare.volume.value = -5;
hat.volume.value = -12;
kick.volume.value = -4;
kick2.volume.value = -4;


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





	var synth = new Tone.PolySynth(3, Tone.Synth, {
			"oscillator" : {
				"type" : "fatsawtooth",
				"count" : 3,
				"spread" : 30,
				"volume" : -6
			},
			"envelope": {
				"attack": 0.01,
				"decay": 0.1,
				"sustain": 0.5,
				"release": 0.4,
				"attackCurve" : "exponential",
				"volume" : -6
			},
		}).toMaster();
		// Van Halen - Jump MIDI from http://www.midiworld.com/files/1121/
		// converted using 
		var part = new Tone.Part(function(time, note){
			synth.triggerAttackRelease(note.noteName, note.duration, time);
		}, [
			{
				"time": "0",
				"noteName": "G2",
				"duration": "8n"
			},
			{
				"time": "8n",
				"noteName": "B1",
				"duration": "4n"
			},
			{
				"time": "2n + 8n",
				"noteName": "F1",
				"duration": "4n"
			}
	]).start(0);
	part.loop = true;
	part.loopEnd = "2m";










var theme = 'music';
var rhymecounter = 0;
var linecounter = 0;

$(document).ready(function() {

	//console.log(responsiveVoice.getVoices());

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

					/*
					for (var l = 0; l < 3; l++) {
						var line = rhymingwords[Math.floor(Math.random() * rhymingwords.length)];

						if (line.tags[0] == 'n') {
							lines.push(nouns[Math.floor(Math.random() * nouns.length)].replace('XXX',''));
							
						} else if (line.tags[0] == 'n') {
							lines.push(verbs[Math.floor(Math.random() * verbs.length)].replace('XXX',''));
						} else {
							lines.push(adjectives[Math.floor(Math.random() * adjectives.length)].replace('XXX',''));
						}
						couplets.push(line.word);
					};
					*/

					//Tone.Transport.start('+0.1');
					if (rhymecounter == linecounter) {
						addlines();
					}
				});

			}
		});
	});

	


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
			Tone.Transport.start('+0.1');
		};
	});

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



