//board is of (0,0) to (7,7)

function abs() {
	this.dx = Math.abs(this.x - this.nx);
	this.dy = Math.abs(this.y - this.ny);
}

//add more rules here
var rule = {
	camel: function(maxStep) {
		if (maxStep) {
			return (this.dx === this.dy && this.dx == maxStep) ? true : false;
		}
		return (this.dx === this.dy) ? true : false;
	},
	elephant: function(maxStep) {
		if (maxStep) {
			return ((this.dx === 0 && this.dy === maxStep) || (this.dx === maxStep && this.dy === 0)) ? true : false;
		}
		return (this.dx === 0 || this.dy === 0) ? true : false;
	},
	horse: function() {
		return ((this.dx === 2 && this.dy === 1) || (this.dx === 1 && this.dy === 2)) ? true : false;
	},
	king: function() {
		if (!rule.camel.apply(move, [1])) {
			return rule.elephant.apply(move, [1]);
		}
		return false;
	},
	queen: function() {
		if (!rule.camel.apply(move)) {
			return rule.elephant.apply(move);
		}
		return false;
	},
	soldier: function() {
		//filter based on the player white and black
		return (this.dy === 1 && (this.dx === 1 || this.dx === 0)) ? true : false;
	}
};

function prevalidate(move) {
	//do upper and lower bound validation
	return (this.x < 0 || this.y < 0 || this.nx < 0 || this.ny < 0 || this.x > 7 || this.y > 7 || this.nx > 7 || this.ny > 7) ? false : true;
}

function validateMove(move) {
	var isValidInput = prevalidate();

	if (isValidInput) {
		abs.apply(move);
		isValidInput = rule[move.type].apply(move);
	}
	if (isValidInput) {
		console.log('valid move:-', move.type, " (", move.x, move.y, ') to  (', move.nx, move.ny, ')');
	}
}


for (var i = 0; i < 8; i++) {
	for (var j = 0; j < 8; j++) {
		//sample input
		var move = {
			type: 'soldier',
			x: 4,
			y: 4,
			nx: i,
			ny: j
		};
		validateMove(move);
	}
}
