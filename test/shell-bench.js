// Shell version of benchmark.html.

// Pre-dependencies.
function clearInterval(x) { }

// Dependencies.
load("../source/nes.js");
load("../source/utils.js");
load("../source/cpu.js");
load("../source/keyboard.js");
load("../source/mappers.js");
load("../source/papu.js");
load("../source/ppu.js");
load("../source/rom.js");
load("../source/ui.js");

load("base64.js");
load("benchmark.js");

function test() {
	var currentRepeat = -1;
	var warmupCount = 3;
	var repeatCount = 10;
	var frameCount = 100; // number of frames in croomBenchmark();
	var results = [];
	var i;

	results.length = repeatCount;

	function benchmark() {
		var start = +new Date();
		croomBenchmark();
		return +new Date() - start;
	}

	// Warm-up runs.
	for (i = 0; i < warmupCount; i++) {
		var tempres = benchmark();
		print("warmup: " + tempres);
	}

	// Recorded runs.
	for (i = 0; i < repeatCount; i++) {
		results[i] = benchmark();
		print("result: " + results[i]);
	}

	// Output information and stuff.
	{
		var totalTime = 0;
		for (i = 0; i < repeatCount; i++)
			totalTime += results[i];

		var meanTime = totalTime / repeatCount;

		var totalFPS = 0;
		for (i = 0; i < repeatCount; i++)
			totalFPS += frameCount / (results[i] / 1000);

		var meanFPS = totalFPS / repeatCount;
		var avg = meanTime.toFixed(2);
		print("Average of " + repeatCount + " runs: " + avg + "ms.");
	}
}

test();
