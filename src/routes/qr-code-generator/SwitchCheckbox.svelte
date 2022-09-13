<script lang="ts">
	export let checked: boolean;
</script>

<label class="switch">
	<input type="checkbox" bind:checked />
	<span class="slider round" />
</label>

<style lang="scss">
	/* The switch - the box around the slider */
	$height: 15px;
	$width: 25px;
	$padding: 3px;
	$thumbheight: $height - $padding - $padding;
	.switch {
		position: relative;
		display: inline-block;
		width: $width;
		height: $height;
	}

	/* Hide default HTML checkbox */
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #2951b9;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: $thumbheight;
		width: $thumbheight;
		left: $padding;
		bottom: $padding;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	input:checked + .slider {
		background-color: #35a6df;
	}

	input:focus + .slider {
		box-shadow: 0 0 1px #35a6df;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX($width - $height);
		-ms-transform: translateX($width - $height);
		transform: translateX($width - $height);
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
</style>
