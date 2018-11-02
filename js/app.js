
function colorBlink(selector) {
	$(selector).animate({
			opacity: '1',
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'yellow');
			},
			queue: true
		}, 600)
		.delay(1000)
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'yellow');
				colorBlink('h1.main-titulo');
			},
			queue: true
		});
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}


function giveDulceArrays(arrayType, index) {

	var dulceCol1 = $('.col-1').children();
	var dulceCol2 = $('.col-2').children();
	var dulceCol3 = $('.col-3').children();
	var dulceCol4 = $('.col-4').children();
	var dulceCol5 = $('.col-5').children();
	var dulceCol6 = $('.col-6').children();
	var dulceCol7 = $('.col-7').children();

	var dulceColumns = $([dulceCol1, dulceCol2, dulceCol3, dulceCol4,
		dulceCol5, dulceCol6, dulceCol7
	]);

	if (typeof index === 'number') {
		var dulceRow = $([dulceCol1.eq(index), dulceCol2.eq(index), dulceCol3.eq(index),
			dulceCol4.eq(index), dulceCol5.eq(index), dulceCol6.eq(index),
			dulceCol7.eq(index)
		]);
	} else {
		index = '';
	}

	if (arrayType === 'columns') {
		return dulceColumns;
	} else if (arrayType === 'rows' && index !== '') {
		return dulceRow;
	}
}

function dulceRows(index) {
	var dulceRow = giveDulceArrays('rows', index);
	return dulceRow;
}

function dulceColumns(index) {
	var dulceColumn = giveDulceArrays('columns');
	return dulceColumn[index];
}

function columnValidation() {
	for (var j = 0; j < 7; j++) {
		var counter = 0;
		var dulcePosition = [];
		var extraDulcePosition = [];
		var dulceColumn = dulceColumns(j);
		var comparisonValue = dulceColumn.eq(0);
		var gap = false;
		for (var i = 1; i < dulceColumn.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcDulce = dulceColumn.eq(i).attr('src');

			if (srcComparison != srcDulce) {
				if (dulcePosition.length >= 3) {
					gap = true;
				} else {
					dulcePosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						dulcePosition.push(i - 1);
					} else {
						extraDulcePosition.push(i - 1);
					}
				}
				if (!gap) {
					dulcePosition.push(i);
				} else {
					extraDulcePosition.push(i);
				}
				counter += 1;
			}
			comparisonValue = dulceColumn.eq(i);
		}
		if (extraDulcePosition.length > 2) {
			dulcePosition = $.merge(dulcePosition, extraDulcePosition);
		}
		if (dulcePosition.length <= 2) {
			dulcePosition = [];
		}
		dulceCount = dulcePosition.length;
		if (dulceCount >= 3) {
			deleteColumnDulce(dulcePosition, dulceColumn);
			setScore(dulceCount);
		}
	}
}
function deleteColumnDulce(dulcePosition, dulceColumn) {
	for (var i = 0; i < dulcePosition.length; i++) {
		dulceColumn.eq(dulcePosition[i]).addClass('delete');
	}
}

function rowValidation() {
	for (var j = 0; j < 6; j++) {
		var counter = 0;
		var dulcePosition = [];
		var extraDulcePosition = [];
		var dulceRow = dulceRows(j);
		var comparisonValue = dulceRow[0];
		var gap = false;
		for (var i = 1; i < dulceRow.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcDulce = dulceRow[i].attr('src');

			if (srcComparison != srcDulce) {
				if (dulcePosition.length >= 3) {
					gap = true;
				} else {
					dulcePosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						dulcePosition.push(i - 1);
					} else {
						extraDulcePosition.push(i - 1);
					}
				}
				if (!gap) {
					dulcePosition.push(i);
				} else {
					extraDulcePosition.push(i);
				}
				counter += 1;
			}
			comparisonValue = dulceRow[i];
		}
		if (extraDulcePosition.length > 2) {
			dulcePosition = $.merge(dulcePosition, extraDulcePosition);
		}
		if (dulcePosition.length <= 2) {
			dulcePosition = [];
		}
		dulceCount = dulcePosition.length;
		if (dulceCount >= 3) {
			deleteHorizontal(dulcePosition, dulceRow);
			setScore(dulceCount);
		}
	}
}
function deleteHorizontal(dulcePosition, dulceRow) {
	for (var i = 0; i < dulcePosition.length; i++) {
		dulceRow[dulcePosition[i]].addClass('delete');
	}
}

function setScore(dulceCount) {
	var score = Number($('#score-text').text());
	switch (dulceCount) {
		case 3:
			score += 25;
			break;
		case 4:
			score += 50;
			break;
		case 5:
			score += 75;
			break;
		case 6:
			score += 100;
			break;
		case 7:
			score += 200;
	}
	$('#score-text').text(score);
}

function checkBoard() {
	fillBoard();
}

function fillBoard() {
	var top = 6;
	var column = $('[class^="col-"]');

	column.each(function () {
		var dulces = $(this).children().length;
		var agrega = top - dulces;
		for (var i = 0; i < agrega; i++) {
			var dulceType = getRandomInt(1, 5);
			if (i === 0 && dulces < 1) {
				$(this).append('<img src="image/' + dulceType + '.png" class="element"></img>');
			} else {
				$(this).find('img:eq(0)').before('<img src="image/' + dulceType + '.png" class="element"></img>');
			}
		}
	});
	addDulceEvents();
	setValidations();
}


function setValidations() {
	columnValidation();
	rowValidation();

	if ($('img.delete').length !== 0) {
		deletesDulceAnimation();
	}
}

function addDulceEvents() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 500,
		grid: [100, 100],
		zIndex: 10,
		drag: constrainDulceMovement
	});
	$('img').droppable({
		drop: swapDulce
	});
	enableDulceEvents();
}

function disableDulceEvents() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}

function enableDulceEvents() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}

function constrainDulceMovement(event, dulceDrag) {
	dulceDrag.position.top = Math.min(100, dulceDrag.position.top);
	dulceDrag.position.bottom = Math.min(100, dulceDrag.position.bottom);
	dulceDrag.position.left = Math.min(100, dulceDrag.position.left);
	dulceDrag.position.right = Math.min(100, dulceDrag.position.right);
}

function swapDulce(event, dulceDrag) {
	var dulceDrag = $(dulceDrag.draggable);
	var dragSrc = dulceDrag.attr('src');
	var dulceDrop = $(this);
	var dropSrc = dulceDrop.attr('src');
	dulceDrag.attr('src', dropSrc);
	dulceDrop.attr('src', dragSrc);

	setTimeout(function () {
		checkBoard();
		if ($('img.delete').length === 0) {
			dulceDrag.attr('src', dragSrc);
			dulceDrop.attr('src', dropSrc);
		} else {
			updateMoves();
		}
	}, 500);

}

function checkBoardPromise(result) {
	if (result) {
		checkBoard();
	}
}

function updateMoves() {
	var actualValue = Number($('#movimientos-text').text());
	var result = actualValue += 1;
	$('#movimientos-text').text(result);
}

function deletesDulceAnimation() {
	disableDulceEvents();
	$('img.delete').effect('pulsate', 400);
	$('img.delete').animate({
			opacity: '0'
		}, {
			duration: 300
		})
		.animate({
			opacity: '0'
		}, {
			duration: 400,
			complete: function () {
				deletesDulce()
					.then(checkBoardPromise)
					.catch(showPromiseError);
			},
			queue: true
		});
}

function showPromiseError(error) {
	console.log(error);
}

function deletesDulce() {
	return new Promise(function (resolve, reject) {
		if ($('img.delete').remove()) {
			resolve(true);
		} else {
			reject('No se pudo eliminar Dulce...');
		}
	})
}

function endGame() {
	$('div.panel-tablero, div.time').effect('fold');
	$('h1.main-titulo').addClass('title-over')
		.text('Gracias por jugar!');
	$('div.score, div.moves, div.panel-score').width('100%');

}

function initGame() {

	colorBlink('h1.main-titulo');

	$('.btn-reinicio').click(function () {
		if ($(this).text() === 'Reiniciar') {
			location.reload(true);
		}
		checkBoard();
		$(this).text('Reiniciar');
		$('#timer').startTimer({
			onComplete: endGame
		})
	});
}

$(function() {
	initGame();
});
