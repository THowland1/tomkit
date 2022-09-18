<script lang="ts">
	import { EpochDay } from './epoch-day';

	function dateToString(date: Date): string {
		return date.toISOString();
	}
	function stringToDate(str: string): Date {
		console.log(str);
		return new Date(str);
	}

	let datestring = '1970-01-01T01:00';
	$: date = stringToDate(datestring);
</script>

<div class="whole-thing">
	<h1>Epoch date</h1>
	<p>Hello</p>
	<ul />
	<p>{datestring}</p>
	<input type="datetime-local" bind:value={datestring} />
	<p>{date}</p>
	<p>{date.valueOf()}</p>
	<p>{EpochDay.fromDate(date)}</p>

	<p>Epoch day</p>
	<p>{0}</p>
	<p>As Date</p>
	<p>{EpochDay.toDate(0)}</p>
</div>

<style lang="scss">
	.whole-thing {
		position: absolute;
		inset: 0;
		margin: auto;
		width: 100%;
		height: 100%;
		max-width: 320px;
		max-height: 320px;
	}
</style>
